import type { Metadata } from "next";
import LocalizedInfoPage from "@/components/LocalizedInfoPage";
import { getInfoLanguageLinks, getInfoMetadataAlternates, getLocalizedInfoPath, openGraphLocales } from "@/lib/i18n";
import { getInfoPage } from "@/lib/info-pages";

const kind = "politica-privacidad";
const page = getInfoPage(kind, "es");

export const metadata: Metadata = {
  title: `${page.title} | joyas.ai`,
  description: page.description,
  alternates: getInfoMetadataAlternates(kind, "es"),
  openGraph: { title: `${page.title} | joyas.ai`, description: page.description, url: getLocalizedInfoPath(kind, "es"), siteName: "joyas.ai", locale: openGraphLocales.es, alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en], type: "website" },
  twitter: { card: "summary_large_image", title: `${page.title} | joyas.ai`, description: page.description },
};

export default function PrivacyPolicyPage() {
  return <LocalizedInfoPage page={page} locale="es" href={getLocalizedInfoPath(kind, "es")} languageLinks={getInfoLanguageLinks(kind)} />;
}
