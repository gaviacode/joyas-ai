import AiAdvisorCta from "@/components/AiAdvisorCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";
import type { Locale } from "@/lib/i18n";
import type { LocalizedInfoPage } from "@/lib/info-pages";

type LocalizedInfoPageProps = {
  page: LocalizedInfoPage;
  locale: Locale;
  href: string;
  languageLinks?: LanguageLink[];
};

export default function LocalizedInfoPage({
  page,
  locale,
  href,
  languageLinks,
}: LocalizedInfoPageProps) {
  const homeHref = locale === "es" ? "/" : locale === "pt-BR" ? "/pt-br" : "/en";
  const homeLabel = locale === "pt-BR" ? "Início" : locale === "en" ? "Home" : "Inicio";

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} languageLinks={languageLinks} />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          homeLabel={homeLabel}
          homeHref={homeHref}
          items={[{ href, label: page.title }]}
        />
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">{page.intro}</p>
        </header>

        <section className="mt-10 grid gap-5">
          {page.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 leading-8 text-[#625746]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </section>

        {page.ctaLabel ? (
          <div className="mt-8">
            <AiAdvisorCta locale={locale} />
          </div>
        ) : null}
      </article>
    </main>
  );
}
