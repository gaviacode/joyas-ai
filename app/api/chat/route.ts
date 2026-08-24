import { ApiError, GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import type {
  AdvisorRecommendation,
  AdvisorRequest,
  AdvisorResponse,
  AdvisorLocale,
  ConversationMessage,
  GuidedPreferences,
} from "@/lib/advisor";

const SYSTEM_PROMPT = `
Eres el joyero IA experto de joyas.ai.

Tu tarea es recomendar tipos genéricos de joyas, no productos comerciales concretos.

Reglas obligatorias:
- Responde en el idioma indicado por la petición: español si locale es "es", portugués brasileño natural si locale es "pt-BR" e inglés natural si locale es "en".
- Devuelve exclusivamente JSON válido con esta forma: {"summary":"...","recommendations":[...],"followUpMessage":"..."}.
- Incluye exactamente 3 recomendaciones salvo que falten datos esenciales; si faltan, devuelve recomendaciones prudentes y explica la incertidumbre en summary.
- Cada recomendación debe incluir: id, source, genericName, reason, recommendedMaterials, styles, suitableOccasions, estimatedPriceRange, jewelerTip y disclaimer.
- source debe ser siempre "generic".
- No inventes marcas, tiendas, URLs, ASIN, enlaces de afiliado, stock, descuentos, valoraciones, reseñas, disponibilidad ni precios exactos.
- Usa rangos de precio orientativos, nunca importes exactos, y deja claro que dependen del material y proveedor.
- No afirmes que una joya concreta existe en una tienda.
- Trata el género solo como una preferencia comercial indicada por el usuario; no impongas estereotipos.
- Permite opciones unisex y alternativas si el usuario no está seguro.
- Indica que las recomendaciones genéricas deben verificarse antes de comprar.
- No incluyas imágenes salvo que se proporcione una fuente propia o autorizada. En esta versión no incluyas imageUrl.
- Mantén un tono premium, claro, prudente y útil.
`;

const ALLOWED_GUIDED_JEWELRY_TYPES = new Set([
  "anillo",
  "collar",
  "colgante",
  "pulsera",
  "pendientes",
  "gemelos",
  "reloj",
  "no estoy seguro",
]);

const PRIMARY_GEMINI_MODEL = "gemini-2.5-flash-lite";
const FALLBACK_GEMINI_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_GEMINI_STATUS_CODES = new Set([404, 429, 500, 502, 503, 504]);
const GEMINI_TIMEOUT_MS = 18_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_UNKNOWN_CLIENT_MAX_REQUESTS = 200;
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type ClientIdentity = {
  key: string;
  limit: number;
};

// Best-effort per-instance limiter. If Railway scales horizontally, replace this
// with a shared store such as Redis so limits apply across all instances.
const rateLimitStore = new Map<string, RateLimitEntry>();
let lastRateLimitCleanup = 0;

type GeminiGenerationOptions = {
  ai: GoogleGenAI;
  contents: string;
};

class TemporaryGeminiUnavailableError extends Error {
  constructor(public readonly statusCode: number | undefined) {
    super("Gemini is temporarily unavailable.");
  }
}

class GeminiTimeoutError extends Error {
  constructor() {
    super("Gemini request timed out.");
  }
}

type ValidationResult =
  | { ok: true; value: AdvisorRequest }
  | { ok: false; error: string; status: number };

type ParsedAdvisorRecommendation = Omit<AdvisorRecommendation, "id"> & {
  id?: string | number;
};

type ParsedAdvisorResponse = Omit<AdvisorResponse, "recommendations"> & {
  recommendations: ParsedAdvisorRecommendation[];
};

export async function POST(request: Request) {
  try {
    const rateLimitResult = checkRateLimit(getClientIdentity(request));
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "RATE_LIMITED",
          message: "Demasiadas consultas. Inténtalo de nuevo más tarde.",
          retryAfterSeconds: rateLimitResult.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds),
          },
        },
      );
    }

    const rawApiKey = process.env.GEMINI_API_KEY;
    const apiKey = rawApiKey?.trim();

    logGeminiApiKeyState(rawApiKey, apiKey);

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as unknown;
    const validation = validateAdvisorRequest(body);

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await generateWithRetry({
      ai,
      contents: buildUserPrompt(validation.value),
    });

    const parsed = parseAdvisorResponse(response.text ?? "");
    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof TemporaryGeminiUnavailableError) {
      return NextResponse.json(
        {
          error: "TEMPORARILY_UNAVAILABLE",
          message:
            "El joyero IA está recibiendo muchas consultas. Inténtalo de nuevo en unos segundos.",
          retryable: true,
        },
        { status: 503 }
      );
    }

    if (error instanceof GeminiTimeoutError) {
      return NextResponse.json(
        {
          error: "TEMPORARILY_UNAVAILABLE",
          message:
            "El joyero IA está tardando demasiado en responder. Inténtalo de nuevo en unos segundos.",
          retryable: true,
        },
        { status: 503 },
      );
    }

    const statusCode = getGeminiStatusCode(error);
    console.error("Gemini advisor internal error", stringifyLogPayload({
      statusCode,
      retryable: statusCode ? FALLBACK_GEMINI_STATUS_CODES.has(statusCode) : false,
      errorName: error instanceof Error ? error.name : typeof error,
      errorMessage: getSanitizedErrorMessage(error),
    }));

    return NextResponse.json(
      {
        error:
          "No he podido generar recomendaciones ahora mismo. Inténtalo de nuevo en unos segundos.",
      },
      { status: 500 }
    );
  }
}

async function generateWithRetry({
  ai,
  contents,
}: GeminiGenerationOptions) {
  const modelAttempts = [
    { model: PRIMARY_GEMINI_MODEL, fallback: false },
    { model: FALLBACK_GEMINI_MODEL, fallback: true },
  ];
  let lastFallbackStatus: number | undefined;

  for (const [index, modelAttempt] of modelAttempts.entries()) {
    const attempt = index + 1;
    try {
      return await generateWithModel({
        ai,
        model: modelAttempt.model,
        contents,
        attempt,
        fallback: modelAttempt.fallback,
      });
    } catch (error) {
      const statusCode = getGeminiStatusCode(error);
      const fallbackAllowed = isFallbackGeminiError(statusCode);

      logGeminiError({
        model: modelAttempt.model,
        attempt,
        statusCode,
        fallback: modelAttempt.fallback,
        error,
      });

      if (error instanceof GeminiTimeoutError) {
        throw error;
      }

      if (!fallbackAllowed) {
        throw error;
      }

      lastFallbackStatus = statusCode;

      if (modelAttempt.fallback) {
        throw new TemporaryGeminiUnavailableError(statusCode);
      }
    }
  }

  throw new TemporaryGeminiUnavailableError(lastFallbackStatus);
}

async function generateWithModel({
  ai,
  model,
  contents,
  attempt,
  fallback,
}: GeminiGenerationOptions & {
  model: string;
  attempt: number;
  fallback: boolean;
}) {
  logGeminiAttempt({ model, attempt, fallback });
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1400,
        responseMimeType: "application/json",
        abortSignal: controller.signal,
      },
    });
    logGeminiResponse({ model, statusCode: 200 });
    return response;
  } catch (error) {
    if (controller.signal.aborted || isAbortError(error)) {
      throw new GeminiTimeoutError();
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

function getGeminiStatusCode(error: unknown) {
  if (error instanceof ApiError) {
    return error.status;
  }

  if (!error || typeof error !== "object") {
    return undefined;
  }

  const candidate = error as {
    status?: unknown;
    statusCode?: unknown;
    code?: unknown;
    response?: { status?: unknown; statusCode?: unknown };
    message?: unknown;
  };

  if (typeof candidate.status === "number") {
    return candidate.status;
  }

  if (typeof candidate.statusCode === "number") {
    return candidate.statusCode;
  }

  if (typeof candidate.code === "number") {
    return candidate.code;
  }

  if (typeof candidate.response?.status === "number") {
    return candidate.response.status;
  }

  if (typeof candidate.response?.statusCode === "number") {
    return candidate.response.statusCode;
  }

  if (typeof candidate.message === "string") {
    const statusMatch = candidate.message.match(/\b(400|401|403|404|429|500|502|503|504)\b/);
    return statusMatch ? Number(statusMatch[1]) : undefined;
  }

  return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function getClientIdentity(request: Request): ClientIdentity {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor
    ?.split(",")
    .map((value) => value.trim())
    .find(Boolean);

  const ip = (
    headers.get("cf-connecting-ip")?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    forwardedIp
  );

  if (ip) {
    return { key: `ip:${ip}`, limit: RATE_LIMIT_MAX_REQUESTS };
  }

  return {
    key: "missing-proxy-ip",
    limit: RATE_LIMIT_UNKNOWN_CLIENT_MAX_REQUESTS,
  };
}

function checkRateLimit(identity: ClientIdentity) {
  const now = Date.now();
  cleanupRateLimitStore(now);

  const current = rateLimitStore.get(identity.key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identity.key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true as const };
  }

  if (current.count >= identity.limit) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true as const };
}

function cleanupRateLimitStore(now: number) {
  if (now - lastRateLimitCleanup < RATE_LIMIT_CLEANUP_INTERVAL_MS) {
    return;
  }

  lastRateLimitCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function isAbortError(error: unknown) {
  return (
    error instanceof DOMException && error.name === "AbortError"
  ) || (
    error instanceof Error && /aborted|abort/i.test(error.name)
  );
}

function logGeminiApiKeyState(rawApiKey: string | undefined, apiKey: string | undefined) {
  console.info("Gemini API key configured:", Boolean(apiKey));

  if (rawApiKey === undefined) {
    return;
  }

  console.info("Gemini API key format", stringifyLogPayload({
    hasLeadingOrTrailingWhitespace: rawApiKey !== rawApiKey.trim(),
    hasWrappedQuotes:
      (apiKey?.startsWith("\"") && apiKey.endsWith("\"")) ||
      (apiKey?.startsWith("'") && apiKey.endsWith("'")) ||
      false,
    hasLineBreak: /\r|\n/.test(rawApiKey),
  }));
}

function isFallbackGeminiError(statusCode: number | undefined) {
  return statusCode !== undefined && FALLBACK_GEMINI_STATUS_CODES.has(statusCode);
}

function logGeminiAttempt({
  model,
  attempt,
  fallback,
}: {
  model: string;
  attempt: number;
  fallback: boolean;
}) {
  console.info("Gemini advisor request", stringifyLogPayload({
    model,
    attempt,
    fallback,
  }));
}

function logGeminiResponse({
  model,
  statusCode,
}: {
  model: string;
  statusCode: number;
}) {
  console.info("Gemini advisor response", stringifyLogPayload({
    model,
    statusCode,
  }));
}

function logGeminiError({
  model,
  attempt,
  statusCode,
  fallback,
  error,
}: {
  model: string;
  attempt: number;
  statusCode?: number;
  fallback: boolean;
  error: unknown;
}) {
  console.error("Gemini advisor error", stringifyLogPayload({
    model,
    attempt,
    statusCode,
    fallback,
    errorName: error instanceof Error ? error.name : typeof error,
    errorMessage: getSanitizedErrorMessage(error),
  }));
}

function getSanitizedErrorMessage(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  return message
    .replace(/AIza[0-9A-Za-z_-]{20,}/g, "[REDACTED_API_KEY]")
    .replace(/Bearer\s+[0-9A-Za-z._~+/=-]+/gi, "Bearer [REDACTED]")
    .replace(/key=([0-9A-Za-z_-]+)/gi, "key=[REDACTED]")
    .replace(/\s+/g, " ")
    .slice(0, 500);
}

function stringifyLogPayload(payload: unknown) {
  return JSON.stringify(payload, null, 2);
}

function validateAdvisorRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "La petición no tiene formato válido.", status: 400 };
  }

  const candidate = body as Partial<AdvisorRequest>;

  if (candidate.mode !== "direct" && candidate.mode !== "guided") {
    return { ok: false, error: "El modo del recomendador no es válido.", status: 400 };
  }

  if (candidate.mode === "direct") {
    if (
      typeof candidate.directDescription !== "string" ||
      !candidate.directDescription.trim()
    ) {
      return { ok: false, error: "Falta la descripción de búsqueda.", status: 400 };
    }

    if (candidate.directDescription.length > 900) {
      return { ok: false, error: "La descripción es demasiado larga.", status: 400 };
    }
  }

  if (candidate.mode === "guided") {
    const preferences = candidate.guidedPreferences;

    if (!preferences || typeof preferences !== "object") {
      return { ok: false, error: "Faltan las preferencias guiadas.", status: 400 };
    }

    if (!hasGuidedContent(preferences)) {
      return { ok: false, error: "Selecciona al menos una preferencia.", status: 400 };
    }

    if (!isValidGuidedPreferences(preferences)) {
      return { ok: false, error: "Las preferencias guiadas no son válidas.", status: 400 };
    }
  }

  if (
    candidate.conversation !== undefined &&
    (!Array.isArray(candidate.conversation) ||
      !candidate.conversation.every(isConversationMessage))
  ) {
    return { ok: false, error: "La conversación no tiene formato válido.", status: 400 };
  }

  return {
    ok: true,
    value: {
      mode: candidate.mode,
      locale: isAdvisorLocale(candidate.locale) ? candidate.locale : "es",
      directDescription: cleanOptionalString(candidate.directDescription),
      guidedPreferences: cleanGuidedPreferences(candidate.guidedPreferences),
      conversation: candidate.conversation?.slice(-10),
    },
  };
}

function hasGuidedContent(preferences: GuidedPreferences) {
  return Boolean(
    preferences.recipient ||
      preferences.jewelryType ||
      preferences.occasion ||
      preferences.styles?.length ||
      preferences.materials?.length ||
      preferences.budgetLabel ||
      preferences.budgetMin !== undefined ||
      preferences.budgetMax !== undefined ||
      preferences.additionalDetails?.trim()
  );
}

function isValidGuidedPreferences(preferences: GuidedPreferences) {
  const stringFields = [
    preferences.recipient,
    preferences.jewelryType,
    preferences.occasion,
    preferences.budgetLabel,
    preferences.additionalDetails,
  ];

  const numbersValid =
    (preferences.budgetMin === undefined ||
      (typeof preferences.budgetMin === "number" && preferences.budgetMin >= 0)) &&
    (preferences.budgetMax === undefined ||
      (typeof preferences.budgetMax === "number" && preferences.budgetMax >= 0));
  const jewelryTypeValid =
    preferences.jewelryType === undefined ||
    ALLOWED_GUIDED_JEWELRY_TYPES.has(preferences.jewelryType.trim().toLowerCase());

  return (
    stringFields.every((field) => field === undefined || typeof field === "string") &&
    isOptionalStringArray(preferences.styles) &&
    isOptionalStringArray(preferences.materials) &&
    numbersValid &&
    jewelryTypeValid
  );
}

function isOptionalStringArray(value: unknown) {
  return (
    value === undefined ||
    (Array.isArray(value) && value.every((item) => typeof item === "string"))
  );
}

function isConversationMessage(message: unknown): message is ConversationMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Partial<ConversationMessage>;

  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.length <= 2500
  );
}

function cleanGuidedPreferences(preferences?: GuidedPreferences) {
  if (!preferences) {
    return undefined;
  }

  return {
    recipient: cleanOptionalString(preferences.recipient),
    jewelryType: cleanOptionalString(preferences.jewelryType),
    occasion: cleanOptionalString(preferences.occasion),
    styles: preferences.styles?.map((item) => item.trim()).filter(Boolean).slice(0, 10),
    materials: preferences.materials?.map((item) => item.trim()).filter(Boolean).slice(0, 8),
    budgetMin: preferences.budgetMin,
    budgetMax: preferences.budgetMax,
    budgetLabel: cleanOptionalString(preferences.budgetLabel),
    additionalDetails: cleanOptionalString(preferences.additionalDetails),
  };
}

function cleanOptionalString(value: unknown) {
  return typeof value === "string" ? value.trim() || undefined : undefined;
}

function buildUserPrompt(request: AdvisorRequest) {
  const preferenceText =
    request.mode === "direct"
      ? `Modo directo. Descripción del usuario: ${request.directDescription}`
      : `Modo guiado. Preferencias: ${JSON.stringify(request.guidedPreferences)}`;

  const conversationText = request.conversation?.length
    ? request.conversation
        .map((message) => `${message.role === "user" ? "Usuario" : "Joyero IA"}: ${message.content}`)
        .join("\n")
    : "Sin conversación previa.";

  return `
${preferenceText}

Idioma de respuesta solicitado: ${getAdvisorLanguageName(request.locale ?? "es")}.

Contexto de conversación para conservar preferencias y refinamientos:
${conversationText}

Genera recomendaciones conceptuales personalizadas para joyas.ai. Devuelve solo JSON.
`;
}

function isAdvisorLocale(value: unknown): value is AdvisorLocale {
  return value === "es" || value === "pt-BR" || value === "en";
}

function getAdvisorLanguageName(locale: AdvisorLocale) {
  if (locale === "pt-BR") {
    return "portugués brasileño natural";
  }
  if (locale === "en") {
    return "inglés natural orientado a búsquedas de Estados Unidos";
  }
  return "español";
}

function parseAdvisorResponse(text: string): AdvisorResponse {
  const jsonText = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  const parsed = JSON.parse(jsonText) as unknown;
  const validationIssues = getAdvisorResponseValidationIssues(parsed);

  if (validationIssues.length > 0) {
    console.error("Gemini advisor response validation error", stringifyLogPayload({
      issues: validationIssues,
      textLength: text.length,
      textPreview: text.slice(0, 800),
      parsedKeys: isRecord(parsed) ? Object.keys(parsed) : [],
    }));
    throw new Error(`La respuesta de Gemini no tiene el formato esperado: ${validationIssues.join("; ")}`);
  }

  if (!isAdvisorResponse(parsed)) {
    throw new Error("La respuesta de Gemini no tiene el formato esperado.");
  }

  return {
    summary: parsed.summary,
    recommendations: parsed.recommendations.slice(0, 3).map(normalizeRecommendation),
    followUpMessage: parsed.followUpMessage,
  };
}

function isAdvisorResponse(value: unknown): value is ParsedAdvisorResponse {
  return getAdvisorResponseValidationIssues(value).length === 0;
}

function getAdvisorResponseValidationIssues(value: unknown) {
  const issues: string[] = [];
  const candidate = value as Partial<AdvisorResponse>;

  if (!value || typeof value !== "object") {
    return ["respuesta no es objeto"];
  }

  if (typeof candidate.summary !== "string") {
    issues.push("summary no es string");
  }

  if (typeof candidate.followUpMessage !== "string") {
    issues.push("followUpMessage no es string");
  }

  if (!Array.isArray(candidate.recommendations)) {
    issues.push("recommendations no es array");
    return issues;
  }

  candidate.recommendations.forEach((recommendation, index) => {
    getRecommendationValidationIssues(recommendation).forEach((issue) => {
      issues.push(`recommendations[${index}].${issue}`);
    });
  });

  return issues;
}

function getRecommendationValidationIssues(value: unknown) {
  const issues: string[] = [];

  if (!value || typeof value !== "object") {
    return ["no es objeto"];
  }

  const candidate = value as Partial<AdvisorRecommendation>;

  if (
    candidate.id !== undefined &&
    typeof candidate.id !== "string" &&
    typeof candidate.id !== "number"
  ) {
    issues.push("id no es string ni number");
  }

  if (typeof candidate.genericName !== "string") {
    issues.push("genericName no es string");
  }

  if (typeof candidate.reason !== "string") {
    issues.push("reason no es string");
  }

  if (!isStringArray(candidate.recommendedMaterials)) {
    issues.push("recommendedMaterials no es array de strings");
  }

  if (!isStringArray(candidate.styles)) {
    issues.push("styles no es array de strings");
  }

  if (!isStringArray(candidate.suitableOccasions)) {
    issues.push("suitableOccasions no es array de strings");
  }

  if (typeof candidate.estimatedPriceRange !== "string") {
    issues.push("estimatedPriceRange no es string");
  }

  if (typeof candidate.jewelerTip !== "string") {
    issues.push("jewelerTip no es string");
  }

  if (typeof candidate.disclaimer !== "string") {
    issues.push("disclaimer no es string");
  }

  return issues;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizeRecommendation(
  recommendation: ParsedAdvisorRecommendation,
  index: number
): AdvisorRecommendation {
  return {
    ...recommendation,
    id:
      typeof recommendation.id === "string"
        ? recommendation.id
        : typeof recommendation.id === "number"
          ? String(recommendation.id)
          : `generic-${index + 1}`,
    source: "generic",
    recommendedMaterials: recommendation.recommendedMaterials.slice(0, 4),
    styles: recommendation.styles.slice(0, 4),
    suitableOccasions: recommendation.suitableOccasions.slice(0, 4),
    disclaimer:
      recommendation.disclaimer ||
      "Recomendación orientativa: representa un tipo de joya, no un producto concreto disponible en una tienda.",
    affiliateUrl: undefined,
    imageUrl: undefined,
    merchant: undefined,
    productId: undefined,
    currentPrice: undefined,
  };
}
