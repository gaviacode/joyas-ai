import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import {
  getLocalizedGuideCategories,
  getIndexLanguageLinks,
  getLocalizedIndexPath,
  getLocalizedPath,
  getLocalizedSection,
  getIndexMetadataAlternates,
  getSectionLabel,
  localizeArticle,
  localizeText,
  locales,
  openGraphLocales,
  type ContentKind,
  type Locale,
  type LocalizedLocale,
} from "@/lib/i18n";
import { jewelryCategories, occasions } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string; section: string }>;
};

const contentKinds: ContentKind[] = ["joyas", "ocasiones", "guias"];

export function generateStaticParams() {
  const locales: LocalizedLocale[] = ["pt-BR", "en"];
  return locales.flatMap((locale) =>
    contentKinds.map((kind) => ({
      locale: locale === "pt-BR" ? "pt-br" : locale,
      section: getLocalizedSection(kind, locale),
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, section } = await params;
  const locale = parseLocale(rawLocale);
  const kind = locale ? parseSection(section, locale) : undefined;
  if (!locale || !kind) {
    return {};
  }

  const label = getSectionLabel(kind, locale);
  const title = `${label} | joyas.ai`;
  const description = getDescription(kind, locale);

  return {
    title,
    description,
    alternates: getIndexMetadataAlternates(kind, locale),
    openGraph: {
      title,
      description,
      url: getLocalizedIndexPath(kind, locale),
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

export default async function LocalizedSectionPage({ params }: PageProps) {
  const { locale: rawLocale, section } = await params;
  const locale = parseLocale(rawLocale);
  const kind = locale ? parseSection(section, locale) : undefined;
  if (!locale || !kind) {
    notFound();
  }

  const items = getItems(kind, locale);
  const indexHref = getLocalizedIndexPath(kind, locale);

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} languageLinks={getIndexLanguageLinks(kind)} />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <Breadcrumbs
          homeLabel={localizeText("Inicio", locale)}
          homeHref={locale === "pt-BR" ? "/pt-br" : "/en"}
          items={[{ href: indexHref, label: getSectionLabel(kind, locale) }]}
        />
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          {getHeading(kind, locale)}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#63584c]">
          {getDescription(kind, locale)}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">
                {item.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-[#625746]">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function getItems(kind: ContentKind, locale: Locale) {
  if (kind === "joyas") {
    return jewelryCategories.map((article) => {
      const localized = localizeArticle(article, kind, locale);
      return { ...localized, href: getLocalizedPath(kind, article.slug, locale), eyebrow: localized.eyebrow };
    });
  }

  if (kind === "ocasiones") {
    return occasions.map((article) => {
      const localized = localizeArticle(article, kind, locale);
      return { ...localized, href: getLocalizedPath(kind, article.slug, locale), eyebrow: localized.eyebrow };
    });
  }

  return getLocalizedGuideCategories(locale).map((category) => ({
    href: category.href,
    eyebrow: getSectionLabel("guias", locale),
    title: category.title,
    description: category.description,
  }));
}

function getHeading(kind: ContentKind, locale: Locale) {
  if (kind === "joyas") {
    return locale === "pt-BR" ? "Guias por tipo de joia" : "Jewelry Guides by Type";
  }
  if (kind === "ocasiones") {
    return locale === "pt-BR" ? "Joias por ocasião" : "Jewelry by Occasion";
  }
  return locale === "pt-BR" ? "Guias de joalheria" : "Jewelry Guides";
}

function getDescription(kind: ContentKind, locale: Locale) {
  if (kind === "joyas") {
    return locale === "pt-BR"
      ? "Compare estilos, materiais, usos e erros comuns antes de comprar ou presentear."
      : "Compare styles, materials, uses and common mistakes before buying or gifting jewelry.";
  }
  if (kind === "ocasiones") {
    return locale === "pt-BR"
      ? "Cada ocasião pede uma leitura diferente: simbolismo, conforto, orçamento e relação com a pessoa."
      : "Each occasion calls for a different lens: meaning, comfort, budget and relationship.";
  }
  return locale === "pt-BR"
    ? "Informação prática sobre materiais, medidas, pedras, cuidados e critérios de escolha."
    : "Practical information on materials, sizing, gemstones, care and buying criteria.";
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

function parseSection(value: string, locale: Locale): ContentKind | undefined {
  return contentKinds.find((kind) => getLocalizedSection(kind, locale) === value);
}
