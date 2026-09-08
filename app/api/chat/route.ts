import { ApiError, GoogleGenAI } from "@google/genai";
import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createClient } from "redis";
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
- Cada recomendación debe incluir: id, genericName, reason, searchQuery, recommendedMaterials, styles, suitableOccasions, estimatedPriceRange, jewelerTip y disclaimer.
- searchQuery debe ser una consulta de compra limpia de 3 a 8 términos útiles, describiendo el tipo de joya y, cuando proceda, material, estilo o destinatario. No debe contener frases conversacionales, URLs, Amazon, Awin, marketplaces, marcas, ASIN ni identificadores de producto.
- No inventes marcas, tiendas, URLs, ASIN, enlaces de afiliado, stock, descuentos, valoraciones, reseñas, disponibilidad ni precios exactos.
- Usa rangos de precio orientativos, nunca importes exactos, y deja claro que dependen del material y proveedor.
- No afirmes que una joya concreta existe en una tienda.
- Trata el género solo como una preferencia comercial indicada por el usuario; no impongas estereotipos.
- Si se proporciona una edad aproximada, úsala solo como una pista flexible para adaptar el estilo, tamaño, delicadeza y tipo de joya; evita estereotipos o reglas rígidas basados únicamente en la edad.
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

const PIECE_DETAILS_BY_TYPE: Record<string, readonly string[]> = {
  anillo: ["fine", "medium_band", "wide", "open", "gemstone", "no_gemstone", "signet", "no_preference"],
  collar: ["short", "medium_length", "long", "v_drop", "fine_chain", "bold_chain", "layers", "no_preference"],
  colgante: ["small", "geometric", "initial", "meaningful_symbol", "gemstone", "medallion", "vertical_drop", "no_preference"],
  pulsera: ["fine_chain", "bold_chain", "bangle", "adjustable", "charms", "gemstone", "minimal", "no_preference"],
  pendientes: ["stud", "small_hoops", "large_hoops", "drop", "climbers", "gemstone", "geometric", "no_preference"],
  gemelos: ["classic", "minimal", "geometric", "original", "formal", "personalizable", "gemstone", "no_preference"],
  reloj: ["case_small", "case_medium", "case_large", "dress", "minimal", "sport", "metal_bracelet", "leather_strap", "no_preference"],
};

const PIECE_DETAIL_LABELS: Record<AdvisorLocale, Record<string, string>> = {
  es: { fine: "fino y discreto", medium_band: "banda media", wide: "ancho con presencia", open: "abierto", gemstone: "con piedra", no_gemstone: "sin piedra", signet: "tipo sello", short: "corto cerca del cuello", medium_length: "longitud media", long: "largo", v_drop: "caída en V", fine_chain: "cadena fina", bold_chain: "cadena con presencia", layers: "capas", small: "pequeño y discreto", geometric: "geométrico", initial: "inicial o letra", meaningful_symbol: "símbolo con significado", medallion: "medallón", vertical_drop: "caída vertical", bangle: "rígida o brazalete", adjustable: "ajustable", charms: "con charms", minimal: "minimalista", stud: "botón o pequeños", small_hoops: "aros pequeños", large_hoops: "aros grandes", drop: "largos o colgantes", climbers: "trepadores", classic: "clásicos", original: "originales", formal: "elegantes o formales", personalizable: "personalizables", case_small: "caja pequeña", case_medium: "caja mediana", case_large: "caja grande", dress: "clásico o de vestir", sport: "deportivo", metal_bracelet: "correa metálica", leather_strap: "correa de piel", no_preference: "" },
  en: { fine: "slim and understated", medium_band: "medium band", wide: "wide and statement", open: "open", gemstone: "with gemstone", no_gemstone: "without gemstone", signet: "signet style", short: "short, close to the neck", medium_length: "medium length", long: "long", v_drop: "V drop", fine_chain: "fine chain", bold_chain: "statement chain", layers: "layered chains", small: "small and understated", geometric: "geometric", initial: "initial or letter", meaningful_symbol: "meaningful symbol", medallion: "medallion", vertical_drop: "vertical drop", bangle: "rigid bangle", adjustable: "adjustable", charms: "with charms", minimal: "minimal", stud: "stud or small", small_hoops: "small hoops", large_hoops: "large hoops", drop: "long or drop", climbers: "climbers", classic: "classic", original: "original", formal: "elegant or formal", personalizable: "personalizable", case_small: "small case", case_medium: "medium case", case_large: "large case", dress: "dress style", sport: "sport", metal_bracelet: "metal bracelet", leather_strap: "leather strap", no_preference: "" },
  "pt-BR": { fine: "fino e discreto", medium_band: "aro médio", wide: "largo e marcante", open: "aberto", gemstone: "com pedra", no_gemstone: "sem pedra", signet: "tipo sinete", short: "curto, junto ao pescoço", medium_length: "comprimento médio", long: "longo", v_drop: "caída em V", fine_chain: "corrente fina", bold_chain: "corrente marcante", layers: "camadas", small: "pequeno e discreto", geometric: "geométrico", initial: "inicial ou letra", meaningful_symbol: "símbolo com significado", medallion: "medalhão", vertical_drop: "queda vertical", bangle: "rígida ou bracelete", adjustable: "ajustável", charms: "com charms", minimal: "minimalista", stud: "botão ou pequenos", small_hoops: "argolas pequenas", large_hoops: "argolas grandes", drop: "longos ou pendentes", climbers: "ear climbers", classic: "clássicos", original: "originais", formal: "elegantes ou formais", personalizable: "personalizáveis", case_small: "caixa pequena", case_medium: "caixa média", case_large: "caixa grande", dress: "clássico ou social", sport: "esportivo", metal_bracelet: "pulseira metálica", leather_strap: "pulseira de couro", no_preference: "" },
};

const PRIMARY_GEMINI_MODEL = "gemini-2.5-flash-lite";
const FALLBACK_GEMINI_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_GEMINI_STATUS_CODES = new Set([404, 429, 500, 502, 503, 504]);
const GEMINI_TIMEOUT_MS = 18_000;
const RATE_LIMIT_SHORT_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_DAILY_WINDOW_SECONDS = 24 * 60 * 60;
const RATE_LIMIT_SHORT_MAX_REQUESTS = 15;
const RATE_LIMIT_DAILY_MAX_REQUESTS = 70;
const DEFAULT_GLOBAL_DAILY_LIMIT = 1000;
const ANONYMOUS_VISITOR_COOKIE = "joyas_ai_visitor";
const ANONYMOUS_VISITOR_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

const RATE_LIMIT_SCRIPT = `
for index, key in ipairs(KEYS) do
  local limit = tonumber(ARGV[(index - 1) * 2 + 1])
  local current = tonumber(redis.call("GET", key) or "0")
  if current >= limit then
    return { 0, index, redis.call("TTL", key) }
  end
end

for index, key in ipairs(KEYS) do
  local value = redis.call("INCR", key)
  if value == 1 then
    redis.call("EXPIRE", key, tonumber(ARGV[(index - 1) * 2 + 2]))
  end
end

return { 1, 0, 0 }
`;

let redisClient: ReturnType<typeof createClient> | undefined;
let redisConnection: Promise<ReturnType<typeof createClient>> | undefined;

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

class RateLimiterUnavailableError extends Error {
  constructor() {
    super("Rate limiter is temporarily unavailable.");
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
  const anonymousVisitor = getAnonymousVisitor(request);

  try {
    const body = (await request.json()) as unknown;
    const validation = validateAdvisorRequest(body);

    if (!validation.ok) {
      return withAnonymousVisitorCookie(
        NextResponse.json(
          { error: validation.error },
          { status: validation.status },
        ),
        anonymousVisitor,
      );
    }

    const rateLimitResult = await checkRateLimit({
      ip: getClientIp(request),
      visitorId: anonymousVisitor.value,
    });

    if (!rateLimitResult.allowed) {
      const isGlobalLimit = rateLimitResult.reason === "global";
      const locale = validation.value.locale ?? "es";
      return withAnonymousVisitorCookie(
        NextResponse.json(
          {
            error: isGlobalLimit ? "TEMPORARILY_UNAVAILABLE" : "RATE_LIMITED",
            message: getRateLimitMessage(locale, isGlobalLimit),
            retryable: isGlobalLimit,
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(rateLimitResult.retryAfterSeconds),
            },
          },
        ),
        anonymousVisitor,
      );
    }

    const rawApiKey = process.env.GEMINI_API_KEY;
    const apiKey = rawApiKey?.trim();

    logGeminiApiKeyState(rawApiKey, apiKey);

    if (!apiKey) {
      return withAnonymousVisitorCookie(
        NextResponse.json(
          { error: "Falta configurar GEMINI_API_KEY." },
          { status: 500 },
        ),
        anonymousVisitor,
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await generateWithRetry({
      ai,
      contents: buildUserPrompt(validation.value),
    });

    const parsed = parseAdvisorResponse(response.text ?? "");
    return withAnonymousVisitorCookie(NextResponse.json(parsed), anonymousVisitor);
  } catch (error) {
    if (error instanceof RateLimiterUnavailableError) {
      return withAnonymousVisitorCookie(
        NextResponse.json(
          {
            error: "TEMPORARILY_UNAVAILABLE",
            message: getRateLimitMessage("es", true),
            retryable: true,
          },
          { status: 503 },
        ),
        anonymousVisitor,
      );
    }

    if (error instanceof TemporaryGeminiUnavailableError) {
      return withAnonymousVisitorCookie(
        NextResponse.json(
          {
            error: "TEMPORARILY_UNAVAILABLE",
            message:
              "El joyero IA está recibiendo muchas consultas. Inténtalo de nuevo en unos segundos.",
            retryable: true,
          },
          { status: 503 },
        ),
        anonymousVisitor,
      );
    }

    if (error instanceof GeminiTimeoutError) {
      return withAnonymousVisitorCookie(
        NextResponse.json(
          {
            error: "TEMPORARILY_UNAVAILABLE",
            message:
              "El joyero IA está tardando demasiado en responder. Inténtalo de nuevo en unos segundos.",
            retryable: true,
          },
          { status: 503 },
        ),
        anonymousVisitor,
      );
    }

    const statusCode = getGeminiStatusCode(error);
    console.error("Gemini advisor internal error", stringifyLogPayload({
      statusCode,
      retryable: statusCode ? FALLBACK_GEMINI_STATUS_CODES.has(statusCode) : false,
      errorName: error instanceof Error ? error.name : typeof error,
      errorMessage: getSanitizedErrorMessage(error),
    }));

    return withAnonymousVisitorCookie(
      NextResponse.json(
        {
          error:
            "No he podido generar recomendaciones ahora mismo. Inténtalo de nuevo en unos segundos.",
        },
        { status: 500 },
      ),
      anonymousVisitor,
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

function getClientIp(request: Request) {
  // Railway's edge proxy supplies this header with the original client IP.
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function getAnonymousVisitor(request: Request) {
  const value = readCookie(request.headers.get("cookie"), ANONYMOUS_VISITOR_COOKIE);

  if (value && /^[0-9a-f-]{36}$/i.test(value)) {
    return { value, isNew: false };
  }

  return { value: randomUUID(), isNew: true };
}

function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const cookie = cookieHeader.split(";").map((value) => value.trim()).find((value) => value.startsWith(`${name}=`));
  if (!cookie) {
    return undefined;
  }

  try {
    return decodeURIComponent(cookie.slice(name.length + 1));
  } catch {
    return undefined;
  }
}

function withAnonymousVisitorCookie(
  response: NextResponse,
  visitor: { value: string; isNew: boolean },
) {
  if (visitor.isNew) {
    response.cookies.set({
      name: ANONYMOUS_VISITOR_COOKIE,
      value: visitor.value,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ANONYMOUS_VISITOR_COOKIE_MAX_AGE,
    });
  }

  return response;
}

async function checkRateLimit({ ip, visitorId }: { ip: string; visitorId: string }) {
  const ipHash = hashRateLimitIdentifier(ip);
  const visitorHash = hashRateLimitIdentifier(visitorId);
  const globalDailyLimit = getGlobalDailyLimit();
  const keys = [
    `joyas-ai:rate-limit:ip:${ipHash}:10m`,
    `joyas-ai:rate-limit:ip:${ipHash}:24h`,
    `joyas-ai:rate-limit:visitor:${visitorHash}:10m`,
    `joyas-ai:rate-limit:visitor:${visitorHash}:24h`,
    "joyas-ai:rate-limit:global:24h",
  ];

  try {
    const redis = await getRedisClient();
    const result = await redis.eval(RATE_LIMIT_SCRIPT, {
      keys,
      arguments: [
        String(RATE_LIMIT_SHORT_MAX_REQUESTS),
        String(RATE_LIMIT_SHORT_WINDOW_SECONDS),
        String(RATE_LIMIT_DAILY_MAX_REQUESTS),
        String(RATE_LIMIT_DAILY_WINDOW_SECONDS),
        String(RATE_LIMIT_SHORT_MAX_REQUESTS),
        String(RATE_LIMIT_SHORT_WINDOW_SECONDS),
        String(RATE_LIMIT_DAILY_MAX_REQUESTS),
        String(RATE_LIMIT_DAILY_WINDOW_SECONDS),
        String(globalDailyLimit),
        String(RATE_LIMIT_DAILY_WINDOW_SECONDS),
      ],
    });

    if (!Array.isArray(result) || result[0] !== 0) {
      return { allowed: true as const };
    }

    const failedKeyIndex = Number(result[1]);
    return {
      allowed: false as const,
      reason: failedKeyIndex === 5 ? "global" : "individual",
      retryAfterSeconds: Math.max(1, Number(result[2]) || RATE_LIMIT_SHORT_WINDOW_SECONDS),
    };
  } catch (error) {
    console.error("Redis rate limiter error", stringifyLogPayload({
      errorName: error instanceof Error ? error.name : typeof error,
      errorMessage: getSanitizedErrorMessage(error),
    }));
    throw new RateLimiterUnavailableError();
  }
}

async function getRedisClient() {
  if (redisClient?.isOpen) {
    return redisClient;
  }

  if (!redisConnection) {
    const redisUrl = process.env.REDIS_URL?.trim();
    if (!redisUrl) {
      throw new RateLimiterUnavailableError();
    }

    redisClient = createClient({ url: redisUrl });
    // node-redis emits `error` events for connection failures; registering one
    // prevents an unhandled EventEmitter error from terminating the process.
    redisClient.on("error", () => {});
    redisConnection = redisClient.connect()
      .then(() => redisClient!)
      .catch((error) => {
        redisClient = undefined;
        redisConnection = undefined;
        throw error;
      });
  }

  return redisConnection;
}

function hashRateLimitIdentifier(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getGlobalDailyLimit() {
  const configuredLimit = Number.parseInt(process.env.GEMINI_GLOBAL_DAILY_LIMIT ?? "", 10);
  return Number.isInteger(configuredLimit) && configuredLimit > 0
    ? configuredLimit
    : DEFAULT_GLOBAL_DAILY_LIMIT;
}

function getRateLimitMessage(locale: AdvisorLocale, isGlobalLimit: boolean) {
  const messages = isGlobalLimit
    ? {
        es: "El servicio está temporalmente ocupado. Inténtalo de nuevo más tarde.",
        en: "The service is temporarily busy. Please try again later.",
        "pt-BR": "O serviço está temporariamente ocupado. Tente novamente mais tarde.",
      }
    : {
        es: "Has realizado demasiadas búsquedas en poco tiempo. Espera unos minutos antes de volver a intentarlo.",
        en: "You've made too many searches in a short time. Please wait a few minutes before trying again.",
        "pt-BR": "Você fez muitas buscas em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
      };

  return messages[locale];
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
      preferences.pieceDetails?.length ||
      preferences.occasion ||
      preferences.styles?.length ||
      preferences.materials?.length ||
      preferences.budgetLabel ||
      preferences.budgetMin !== undefined ||
      preferences.budgetMax !== undefined ||
      preferences.age !== undefined ||
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
      (typeof preferences.budgetMax === "number" && preferences.budgetMax >= 0)) &&
    (preferences.age === undefined ||
      (typeof preferences.age === "number" && Number.isInteger(preferences.age) && preferences.age >= 1 && preferences.age <= 120));
  const jewelryTypeValid =
    preferences.jewelryType === undefined ||
    ALLOWED_GUIDED_JEWELRY_TYPES.has(preferences.jewelryType.trim().toLowerCase());

  return (
    stringFields.every((field) => field === undefined || typeof field === "string") &&
    isOptionalStringArray(preferences.styles) &&
    isOptionalStringArray(preferences.materials) &&
    isValidPieceDetails(preferences.jewelryType, preferences.pieceDetails) &&
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
    pieceDetails: preferences.pieceDetails?.filter((item) => typeof item === "string").slice(0, 3),
    occasion: cleanOptionalString(preferences.occasion),
    styles: preferences.styles?.map((item) => item.trim()).filter(Boolean).slice(0, 10),
    materials: preferences.materials?.map((item) => item.trim()).filter(Boolean).slice(0, 8),
    budgetMin: preferences.budgetMin,
    budgetMax: preferences.budgetMax,
    budgetLabel: cleanOptionalString(preferences.budgetLabel),
    age: preferences.age,
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
      : `Modo guiado. Preferencias: ${JSON.stringify({
          ...request.guidedPreferences,
          pieceDetails: request.guidedPreferences?.pieceDetails
            ?.map((detail) => PIECE_DETAIL_LABELS[request.locale ?? "es"][detail])
            .filter(Boolean),
        })}${request.guidedPreferences?.age !== undefined ? `\nEdad aproximada de la persona: ${request.guidedPreferences.age} años. Úsala como una pista flexible, no como una regla rígida.` : ""}`;

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

  if (!isValidSearchQuery(candidate.searchQuery)) {
    issues.push("searchQuery no es una consulta de búsqueda válida");
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

function isValidPieceDetails(jewelryType: string | undefined, details: string[] | undefined) {
  if (details === undefined) return true;
  if (!jewelryType || !Array.isArray(details)) return false;

  const normalizedType = jewelryType.trim().toLowerCase();
  const allowedDetails = PIECE_DETAILS_BY_TYPE[normalizedType];
  if (!allowedDetails || details.length > (normalizedType === "reloj" ? 3 : 2) || !details.every((detail) => allowedDetails.includes(detail))) return false;
  if (details.includes("no_preference")) return details.length === 1;

  return normalizedType !== "reloj" || details.filter((detail) => detail.startsWith("case_")).length <= 1;
}

function isValidSearchQuery(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const query = value.trim();
  const termCount = query.split(/\s+/).filter(Boolean).length;

  return (
    query.length > 0 &&
    query.length <= 160 &&
    termCount >= 3 &&
    termCount <= 8 &&
    !/(https?:\/\/|www\.|\b(amazon|awin|marketplaces?|etsy|ebay|aliexpress)\b)/i.test(query)
  );
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
    searchQuery: recommendation.searchQuery.trim(),
    recommendedMaterials: recommendation.recommendedMaterials.slice(0, 4),
    styles: recommendation.styles.slice(0, 4),
    suitableOccasions: recommendation.suitableOccasions.slice(0, 4),
    disclaimer:
      recommendation.disclaimer ||
      "Recomendación orientativa: representa un tipo de joya, no un producto concreto disponible en una tienda.",
  };
}
