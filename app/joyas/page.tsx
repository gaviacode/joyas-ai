import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import { getIndexLanguageLinks, getIndexMetadataAlternates, openGraphLocales } from "@/lib/i18n";
import { jewelryCategories } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Joyas: anillos, collares, pulseras y pendientes | joyas.ai",
  description:
    "Explora guías de joyas por categoría: anillos, collares, pulseras, pendientes, boda y regalos.",
  alternates: getIndexMetadataAlternates("joyas", "es"),
  openGraph: {
    title: "Joyas: anillos, collares, pulseras y pendientes | joyas.ai",
    description:
      "Explora guías de joyas por categoría: anillos, collares, pulseras, pendientes, boda y regalos.",
    url: "/joyas",
    siteName: "joyas.ai",
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyas: anillos, collares, pulseras y pendientes | joyas.ai",
    description:
      "Explora guías de joyas por categoría: anillos, collares, pulseras, pendientes, boda y regalos.",
  },
};

export default function JewelryIndexPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader languageLinks={getIndexLanguageLinks("joyas")} />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ href: "/joyas", label: "Joyas" }]} />
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          guías por tipo de joya
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#63584c]">
          Elige una categoría para comparar estilos, materiales, usos y errores frecuentes antes de comprar o regalar.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jewelryCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/joyas/${item.slug}`}
              className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10"
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
