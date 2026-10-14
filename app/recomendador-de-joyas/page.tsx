import type { Metadata } from "next";
import LocalizedInfoPage from "@/components/LocalizedInfoPage";
import {
  getInfoLanguageLinks,
  getInfoMetadataAlternates,
  getLocalizedInfoPath,
  openGraphLocales,
} from "@/lib/i18n";
import { getInfoPage } from "@/lib/info-pages";

const kind = "joyero-ia";
const page = getInfoPage(kind, "es");

export const metadata: Metadata = {
  title: "Recomendador de joyas con IA | Joyas.ai",
  description: "Usa el recomendador gratuito de Joyas.ai para elegir qué joya regalar según la persona, la ocasión, el estilo y el presupuesto.",
  alternates: getInfoMetadataAlternates(kind, "es"),
  openGraph: {
    title: "Recomendador de joyas con IA | Joyas.ai",
    description: "Encuentra qué joya regalar según la persona, la ocasión, el estilo y el presupuesto con ayuda de IA.",
    url: getLocalizedInfoPath(kind, "es"),
    siteName: "Joyas.ai",
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recomendador de joyas con IA | Joyas.ai",
    description: "Encuentra qué joya regalar según la persona, la ocasión, el estilo y el presupuesto con ayuda de IA.",
  },
};

export default function JewelryRecommenderPage() {
  return <LocalizedInfoPage page={page} locale="es" href={getLocalizedInfoPath(kind, "es")} languageLinks={getInfoLanguageLinks(kind)} />;
}
