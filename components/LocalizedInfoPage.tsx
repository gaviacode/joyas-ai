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
  compact?: boolean;
};

export default function LocalizedInfoPage({
  page,
  locale,
  href,
  languageLinks,
  compact = false,
}: LocalizedInfoPageProps) {
  const homeHref = locale === "es" ? "/es" : locale === "pt-BR" ? "/pt-br" : "/en";
  const homeLabel = locale === "pt-BR" ? "Início" : locale === "en" ? "Home" : "Inicio";
  const isCompactLegalNotice = compact && page.kind === "aviso-legal";

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} languageLinks={languageLinks} />
      <article className={`mx-auto max-w-5xl px-5 sm:px-8 lg:px-10 ${compact ? "py-7 sm:py-9" : "py-10 sm:py-14"}`}>
        <Breadcrumbs
          homeLabel={homeLabel}
          homeHref={homeHref}
          items={[{ href, label: page.title }]}
        />
        <header className={`max-w-3xl ${compact ? "mt-6" : "mt-8"}`}>
          <p className={`${compact ? "text-[13px] tracking-[0.18em]" : "text-sm tracking-[0.22em]"} font-semibold uppercase text-[#9b7b3a]`}>
            {page.eyebrow}
          </p>
          <h1 className={`${compact ? "mt-3 text-3xl sm:text-4xl" : "mt-4 text-4xl sm:text-5xl"} font-semibold tracking-[-0.04em]`}>
            {page.title}
          </h1>
          <p className={`${compact ? "mt-4 text-base leading-7" : "mt-6 text-lg leading-8"} text-[#63584c]`}>{page.intro}</p>
        </header>

        <section className={`grid ${compact ? "mt-7 gap-3" : "mt-10 gap-5"}`}>
          {page.sections.map((section) => (
            <section
              key={section.title}
              className={`${compact ? "rounded-2xl p-4 sm:p-5" : "rounded-3xl p-6 sm:p-8"} border border-[#ead8b3] bg-white shadow-sm`}
            >
              <h2 className={`${compact ? "text-lg" : "text-2xl"} font-semibold tracking-[-0.03em]`}>
                {section.title}
              </h2>
              <div className={`${compact ? "mt-2 space-y-2 text-sm leading-6" : "mt-4 space-y-4 leading-8"} text-[#625746]`}>
                {isCompactLegalNotice && section.title === "Titular" ? (
                  <>
                    <p>{`${section.paragraphs[0]} · ${section.paragraphs[1]}`}</p>
                    <p>{section.paragraphs[2]}</p>
                  </>
                ) : (
                  section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                )}
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
