import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import { getLocalizedIndexPath, localizeText, type Locale } from "@/lib/i18n";
import type { ArticleData, GuideCategory } from "@/lib/site-content";

type GuideCategoryPageProps = {
  category: GuideCategory;
  guides: ArticleData[];
  locale?: Locale;
};

export default function GuideCategoryPage({ category, guides, locale = "es" }: GuideCategoryPageProps) {
  const guidesHref = getLocalizedIndexPath("guias", locale);

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          items={[
            { href: guidesHref, label: localizeText("Guías", locale) },
            { href: category.href, label: category.title },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            {localizeText("Guías de joyería", locale)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">
            {localizeText("Guías sobre", locale)} {category.title.toLowerCase()}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">{category.intro}</p>
        </header>

        <div className="mt-9 flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            href={guidesHref}
            className="rounded-full border border-[#d9bb76] bg-white px-4 py-2 text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
          >
            {localizeText("Todas las categorías", locale)}
          </Link>
          <Link
            href={locale === "es" ? "/#joyero-ia" : `/${locale === "pt-BR" ? "pt-br" : locale}#joyero-ia`}
            className="rounded-full border border-[#17120b] bg-[#17120b] px-4 py-2 text-white transition hover:bg-[#3a2b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
          >
            {localizeText("Preguntar al joyero IA", locale)}
          </Link>
        </div>

        <section className="mt-10" aria-labelledby="category-guides-title">
          <h2 id="category-guides-title" className="text-2xl font-semibold tracking-[-0.03em]">
            {localizeText("Guías disponibles", locale)}
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => {
              const guideHref = locale === "es" ? `/guias/${guide.slug}` : category.href.replace(category.slug, guide.slug);
              const isCurrentCategoryPage = guideHref === category.href;
              const cardContent = (
                <>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">
                  {category.title}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  {guide.title}
                </h3>
                <p className="mt-3 leading-7 text-[#625746]">{guide.description}</p>
                <span className="mt-5 inline-flex font-semibold text-[#8a5d07]">
                  {isCurrentCategoryPage ? localizeText("Guía incluida en esta categoría", locale) : localizeText("Leer guía", locale)}
                </span>
                </>
              );

              return isCurrentCategoryPage ? (
                <article
                  key={guide.slug}
                  className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm"
                >
                  {cardContent}
                </article>
              ) : (
                <Link
                  key={guide.slug}
                  href={guideHref}
                  className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </section>

        {category.futureGuides.length > 0 ? (
          <section className="mt-10 rounded-3xl border border-[#ead8b3] bg-white/80 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              {localizeText("Próximas guías previstas", locale)}
            </h2>
            <ul className="mt-5 grid gap-3 text-[#625746] sm:grid-cols-2">
              {category.futureGuides.map((guide) => (
                <li key={guide} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                  {guide}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </main>
  );
}
