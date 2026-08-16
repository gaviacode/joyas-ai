import type { Locale } from "@/lib/i18n";

export const EDITORIAL_REVIEW_DATE = "2026-08-17";

export const editorialDetails: Record<
  Locale,
  {
    authorName: string;
    reviewedBy: string;
    reviewDateLabel: string;
    methodologyLabel: string;
    methodology: string;
    aboutPath: string;
  }
> = {
  es: {
    authorName: "Equipo editorial de joyas.ai",
    reviewedBy: "Revisado por el equipo editorial de joyas.ai",
    reviewDateLabel: "Ultima revision: 17 de agosto de 2026",
    methodologyLabel: "Metodologia",
    methodology:
      "Contenido basado en criterios de compra, materiales, uso real y revision de fichas de producto. No sustituye comprobaciones del vendedor o de un profesional cuando el valor de la pieza sea relevante.",
    aboutPath: "/sobre-joyas-ai",
  },
  "pt-BR": {
    authorName: "Equipe editorial da joyas.ai",
    reviewedBy: "Revisado pela equipe editorial da joyas.ai",
    reviewDateLabel: "Ultima revisao: 17 de agosto de 2026",
    methodologyLabel: "Metodologia",
    methodology:
      "Conteudo baseado em criterios de compra, materiais, uso real e revisao de fichas de produto. Nao substitui verificacoes do vendedor ou de um profissional quando o valor da peca for relevante.",
    aboutPath: "/pt-br/sobre-joyas-ai",
  },
  en: {
    authorName: "joyas.ai editorial team",
    reviewedBy: "Reviewed by the joyas.ai editorial team",
    reviewDateLabel: "Last reviewed: August 17, 2026",
    methodologyLabel: "Methodology",
    methodology:
      "Content is based on buying criteria, materials, real-world use and product specification checks. It does not replace seller verification or professional assessment when the piece has meaningful value.",
    aboutPath: "/en/about-joyas-ai",
  },
};

export function getOpenGraphImagePath(locale: Locale) {
  if (locale === "pt-BR") {
    return "/pt-br/opengraph-image";
  }

  if (locale === "en") {
    return "/en/opengraph-image";
  }

  return "/opengraph-image";
}
