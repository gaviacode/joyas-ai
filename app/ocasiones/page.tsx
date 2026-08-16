import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import { getIndexMetadataAlternates, openGraphLocales } from "@/lib/i18n";
import { occasions } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Joyas por ocasion | joyas.ai",
  description:
    "Guias para elegir joyas en aniversarios, compromiso, boda, cumpleaños, San Valentin, Dia de la madre y graduacion.",
  alternates: getIndexMetadataAlternates("ocasiones", "es"),
  openGraph: {
    title: "Joyas por ocasion | joyas.ai",
    description:
      "Guias para elegir joyas en aniversarios, compromiso, boda, cumpleaños, San Valentin, Dia de la madre y graduacion.",
    url: "/ocasiones",
    siteName: "joyas.ai",
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyas por ocasion | joyas.ai",
    description:
      "Guias para elegir joyas en aniversarios, compromiso, boda, cumpleaños, San Valentin, Dia de la madre y graduacion.",
  },
};

export default function OccasionsIndexPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ href: "/ocasiones", label: "Ocasiones" }]} />
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Joyas por ocasion
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#63584c]">
          Cada ocasion pide una lectura distinta: simbolismo, comodidad, presupuesto y relacion con la persona.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((item) => (
            <Link
              key={item.slug}
              href={`/ocasiones/${item.slug}`}
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
