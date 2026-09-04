import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { getHubSeo } from "@/lib/hub-content";
import { getIndexLanguageLinks, getIndexMetadataAlternates, openGraphLocales } from "@/lib/i18n";

const seo = getHubSeo("ocasiones", "es");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: getIndexMetadataAlternates("ocasiones", "es"),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/ocasiones",
    siteName: "joyas.ai",
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export default function OccasionsIndexPage() {
  return <HubPage kind="ocasiones" languageLinks={getIndexLanguageLinks("ocasiones")} />;
}
