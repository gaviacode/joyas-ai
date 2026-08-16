import { NextResponse } from "next/server";

type InspirationResponse = {
  title: string;
  prompt: string;
  imageUrl: string;
  alt: string;
};

const FALLBACK_IMAGE = "/images/hero-joyas-aniversario.png";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function selectInspirationImage(normalizedPrompt: string) {
  if (
    normalizedPrompt.includes("pendiente") ||
    normalizedPrompt.includes("circonita") ||
    normalizedPrompt.includes("perla")
  ) {
    return "/images/categories/categoria-pendientes.png";
  }

  if (normalizedPrompt.includes("collar") || normalizedPrompt.includes("gargantilla")) {
    return "/images/categories/categoria-collares.png";
  }

  if (normalizedPrompt.includes("pulsera") || normalizedPrompt.includes("brazalete")) {
    return "/images/categories/categoria-pulseras.png";
  }

  if (normalizedPrompt.includes("anillo") || normalizedPrompt.includes("compromiso")) {
    return "/images/categories/categoria-anillos.png";
  }

  if (normalizedPrompt.includes("boda") || normalizedPrompt.includes("novia")) {
    return "/images/categories/categoria-joyas-boda.png";
  }

  return FALLBACK_IMAGE;
}

function buildInspirationTitle(normalizedPrompt: string) {
  if (normalizedPrompt.includes("pendiente")) {
    return "Inspiración de pendientes elegantes";
  }

  if (normalizedPrompt.includes("collar") || normalizedPrompt.includes("gargantilla")) {
    return "Inspiración de collar fino";
  }

  if (normalizedPrompt.includes("pulsera") || normalizedPrompt.includes("brazalete")) {
    return "Inspiración de pulsera delicada";
  }

  if (normalizedPrompt.includes("anillo")) {
    return "Inspiración de anillo especial";
  }

  return "Inspiración de joya elegante";
}

function buildVisualPrompt(userPrompt: string) {
  const cleanPrompt = userPrompt.replace(/\s+/g, " ").trim().slice(0, 180);

  return [
    `Joya inspirada en: ${cleanPrompt}.`,
    "Estilo premium, limpio y realista, fondo claro cálido, sin marcas, sin logos, sin precio y sin texto comercial.",
  ].join(" ");
}

function buildMockInspiration(userPrompt: string): InspirationResponse {
  const normalizedPrompt = normalizeText(userPrompt);
  const title = buildInspirationTitle(normalizedPrompt);
  const imageUrl = selectInspirationImage(normalizedPrompt);

  return {
    title,
    prompt: buildVisualPrompt(userPrompt),
    imageUrl,
    alt: `${title} como imagen orientativa generada con IA`,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: unknown };

    if (typeof body.prompt !== "string" || !body.prompt.trim()) {
      return NextResponse.json(
        { error: "Falta la petición para generar la inspiración visual." },
        { status: 400 }
      );
    }

    return NextResponse.json(buildMockInspiration(body.prompt));
  } catch {
    return NextResponse.json(
      { error: "No se pudo generar la inspiración visual. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
