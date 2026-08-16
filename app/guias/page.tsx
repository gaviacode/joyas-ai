import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import { getIndexLanguageLinks, getIndexMetadataAlternates, openGraphLocales } from "@/lib/i18n";
import { guideCategories, getGuidesForCategory } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Guías de joyería | joyas.ai",
  description:
    "Información práctica para entender materiales, tallas, piedras, cuidados y criterios de elección de joyas sin tecnicismos innecesarios.",
  alternates: getIndexMetadataAlternates("guias", "es"),
  openGraph: {
    title: "Guías de joyería | joyas.ai",
    description:
      "Información práctica para entender materiales, tallas, piedras, cuidados y criterios de elección de joyas sin tecnicismos innecesarios.",
    url: "/guias",
    siteName: "joyas.ai",
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guías de joyería | joyas.ai",
    description:
      "Información práctica para entender materiales, tallas, piedras, cuidados y criterios de elección de joyas sin tecnicismos innecesarios.",
  },
};

export default function GuidesIndexPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader languageLinks={getIndexLanguageLinks("guias")} />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ href: "/guias", label: "Guías" }]} />
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Guías de joyería
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#63584c]">
          Información práctica para entender materiales, tallas, piedras, cuidados y criterios de elección de joyas sin tecnicismos innecesarios.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guideCategories.map((category) => {
            const guideCount = getGuidesForCategory(category).length;

            return (
            <Link
              key={category.slug}
              href={category.href}
              className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">
                {guideCount} {guideCount === 1 ? "guía" : "guías"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {category.title}
              </h2>
              <p className="mt-3 leading-7 text-[#625746]">{category.description}</p>
              <span className="mt-5 inline-flex font-semibold text-[#8a5d07]">
                Ver guías de {category.title.toLowerCase()} →
              </span>
            </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
