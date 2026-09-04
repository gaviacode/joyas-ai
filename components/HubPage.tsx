import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";
import { getHubContent, type HubKind } from "@/lib/hub-content";
import { getLocalizedIndexPath, localizeText, type Locale } from "@/lib/i18n";

type HubPageProps = {
  kind: HubKind;
  locale?: Locale;
  languageLinks?: LanguageLink[];
};

export default function HubPage({ kind, locale = "es", languageLinks }: HubPageProps) {
  const content = getHubContent(kind, locale);
  const indexHref = getLocalizedIndexPath(kind, locale);
  const homeHref = locale === "es" ? "/" : locale === "pt-BR" ? "/pt-br" : "/en";

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} languageLinks={languageLinks} />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs homeLabel={localizeText("Inicio", locale)} homeHref={homeHref} items={[{ href: indexHref, label: content.eyebrow }]} />
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">{content.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">{content.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[#63584c]">{content.description}</p>
        </header>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => (
            <Link key={card.href} href={card.href} className="group flex min-h-full flex-col overflow-hidden rounded-3xl border border-[#ead8b3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
              {card.image ? (
                <div className="relative h-44 bg-[#f8ecd4]">
                  <Image src={card.image} alt={card.title} fill sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) calc(50vw - 3rem), 360px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                </div>
              ) : (
                <div className="flex h-24 items-end bg-gradient-to-br from-[#fff8e9] to-[#f4e3be] p-5">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">{content.eyebrow}</span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">{card.title}</h2>
                <p className="mt-3 leading-7 text-[#625746]">{card.description}</p>
                <span className="mt-5 inline-flex font-semibold text-[#8a5d07]">{card.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
