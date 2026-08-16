import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JewelryChat from "@/components/JewelryChat";
import SiteHeader from "@/components/SiteHeader";
import {
  getHomeMetadataAlternates,
  getLocaleHomePath,
  getLocalizedIndexPath,
  localizeText,
  openGraphLocales,
  locales,
  type LocalizedLocale,
} from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  if (!locale) {
    return {};
  }

  const title = locale === "pt-BR" ? "Encontre a joia perfeita com IA | joyas.ai" : "Find the Perfect Jewelry With AI | joyas.ai";
  const description =
    locale === "pt-BR"
        ? "Joalheiro IA para escolher anéis, colares, pulseiras ou brincos conforme ocasião, orçamento e estilo da pessoa."
        : "AI jewelry advisor for choosing rings, necklaces, bracelets or earrings by occasion, budget and personal style.";

  return {
    title,
    description,
    alternates: getHomeMetadataAlternates(locale),
    openGraph: {
      title,
      description,
      url: getLocaleHomePath(locale),
      siteName: "joyas.ai",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => openGraphLocales[item]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  if (!locale) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
          {locale === "pt-BR" ? "Joalheiro pessoal com IA" : "Personal AI jeweler"}
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-6xl">
          {locale === "pt-BR" ? "Encontre a joia perfeita com IA" : "Find the perfect jewelry with AI"}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#63584c]">
          {locale === "pt-BR"
            ? "Explore guias localizados e use o recomendador para comparar joias por ocasião, orçamento, material e estilo."
            : "Explore localized guides and use the advisor to compare jewelry by occasion, budget, material and style."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`/${locale === "pt-BR" ? "pt-br" : "en"}#joyero-ia`} className="inline-flex justify-center rounded-xl bg-[#17120b] px-6 py-3 font-semibold text-white transition hover:bg-[#2b241f]">
            {localizeText("Probar el joyero IA", locale)}
          </Link>
          <Link href={getLocalizedIndexPath("guias", locale)} className="inline-flex justify-center rounded-xl border border-[#d7a63c] bg-white px-6 py-3 font-semibold text-[#9a6b08] transition hover:bg-[#fff5df]">
            {locale === "pt-BR" ? "Ver guias" : "View guides"}
          </Link>
        </div>
      </section>
      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <JewelryChat locale={locale} />
        </div>
      </section>
    </main>
  );
}

function parseLocale(value: string): LocalizedLocale | undefined {
  if (value === "pt-br") {
    return "pt-BR";
  }
  if (value === "en") {
    return "en";
  }
  return undefined;
}
