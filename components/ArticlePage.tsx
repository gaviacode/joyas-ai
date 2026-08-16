import Link from "next/link";
import Script from "next/script";
import AiAdvisorCta from "@/components/AiAdvisorCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";
import type { ArticleData, LinkItem, RichParagraph } from "@/lib/site-content";
import { localizeText } from "@/lib/i18n";

type StructuredDataFaq = {
  question: string;
  answer: string;
};

type ArticleStructuredData = {
  id: string;
  canonicalPath: string;
  breadcrumbs: LinkItem[];
  faqs?: StructuredDataFaq[];
  faqTitle?: string;
};

type ArticlePageProps = {
  article: ArticleData;
  parent: LinkItem;
  breadcrumbItems?: LinkItem[];
  languageLinks?: LanguageLink[];
  structuredData?: ArticleStructuredData;
};

export default function ArticlePage({ article, parent, breadcrumbItems, languageLinks, structuredData }: ArticlePageProps) {
  const relatedLinks = article.related.filter((link) => link.href !== "/#joyero-ia");
  const locale = article.locale ?? "es";
  const jsonLd = structuredData ? buildStructuredData(structuredData) : undefined;

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      {jsonLd ? (
        <Script
          id={structuredData?.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <SiteHeader languageLinks={languageLinks} locale={locale} />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          homeLabel={localizeText("Inicio", locale)}
          homeHref={locale === "es" ? "/" : locale === "pt-BR" ? "/pt-br" : "/en"}
          items={breadcrumbItems ?? [parent, { href: `${parent.href}/${article.slug}`, label: article.title }]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            {article.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">{article.intro}</p>
        </header>

        <div className="mt-10 grid gap-5">
          {article.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-[#ead8b3] bg-white/85 p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#17120b]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#625746]">
                {section.paragraphs.map((paragraph) => (
                  <ArticleParagraph key={getParagraphKey(paragraph)} paragraph={paragraph} />
                ))}
              </div>
              {section.table ? (
                <div className="mt-6">
                  <div className="grid gap-3 sm:hidden">
                    {section.table.rows.map((row) => (
                      <article key={row.join("-")} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                        <h3 className="text-base font-semibold text-[#17120b]">{row[0]}</h3>
                        <dl className="mt-3 grid gap-2 leading-7 text-[#625746]">
                          {row.slice(1).map((value, index) => (
                            <div key={`${section.table?.columns[index + 1]}-${value}`}>
                              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b7b3a]">
                                {section.table?.columns[index + 1]}
                              </dt>
                              <dd>{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </article>
                    ))}
                  </div>
                  <div className="hidden overflow-hidden rounded-2xl border border-[#ead8b3] sm:block">
                    <table className="w-full table-fixed border-collapse text-left text-sm">
                      <caption className="sr-only">{section.title}</caption>
                      <thead className="bg-[#fff5df] text-[#5a4a38]">
                        <tr>
                          {section.table.columns.map((column) => (
                            <th key={column} scope="col" className="p-4 font-semibold">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("-")} className="border-t border-[#ead8b3] odd:bg-white even:bg-[#fffdf8]">
                            <th scope="row" className="p-4 font-semibold text-[#17120b]">
                              {row[0]}
                            </th>
                            {row.slice(1).map((value, index) => (
                              <td key={`${row[0]}-${section.table?.columns[index + 1]}`} className="p-4 leading-7 text-[#625746]">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              {section.bullets ? (
                <ul className="mt-5 grid gap-3 text-base leading-7 text-[#625746]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.subsections ? (
                <div className="mt-6 grid gap-5">
                  {section.subsections.map((subsection) => (
                    <section key={subsection.title} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-5">
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#17120b]">
                        {subsection.title}
                      </h3>
                      {subsection.paragraphs ? (
                        <div className="mt-3 space-y-4 leading-8 text-[#625746]">
                          {subsection.paragraphs.map((paragraph) => (
                            <ArticleParagraph key={getParagraphKey(paragraph)} paragraph={paragraph} />
                          ))}
                        </div>
                      ) : null}
                      {subsection.bullets ? (
                        <ul className="mt-4 grid gap-3 leading-7 text-[#625746]">
                          {subsection.bullets.map((bullet) => (
                            <li key={bullet} className="rounded-xl border border-[#ead8b3] bg-white p-4">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {relatedLinks.length > 0 ? (
        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            {localizeText("También te puede interesar", locale)}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#7a540f] transition hover:-translate-y-0.5 hover:border-[#d7a63c] hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
        ) : null}

        <div className="mt-8">
          <AiAdvisorCta title={article.advisorCta?.title} description={article.advisorCta?.description} locale={locale} />
        </div>

        {structuredData?.faqs?.length ? (
          <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              {structuredData.faqTitle ?? localizeText("Preguntas frecuentes", locale)}
            </h2>
            <div className="mt-5 grid gap-4">
              {structuredData.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#17120b]">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-[#625746]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}

function buildStructuredData(data: ArticleStructuredData) {
  const pageUrl = `https://joyas.ai${data.canonicalPath}`;
  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: data.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `https://joyas.ai${item.href}`,
      })),
    },
    {
      "@type": "Article",
      mainEntityOfPage: pageUrl,
      headline: data.breadcrumbs[data.breadcrumbs.length - 1]?.label,
    },
  ];

  if (data.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: data.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function ArticleParagraph({ paragraph }: { paragraph: string | RichParagraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }

  return (
    <p>
      {paragraph.parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={`${part}-${index}`}>{part}</span>
        ) : (
          <Link
            key={`${part.href}-${index}`}
            href={part.href}
            className="font-semibold text-[#8a5d07] underline decoration-[#d7a63c]/50 underline-offset-4 transition hover:text-[#17120b]"
          >
            {part.label}
          </Link>
        ),
      )}
    </p>
  );
}

function getParagraphKey(paragraph: string | RichParagraph) {
  return typeof paragraph === "string" ? paragraph : paragraph.parts.map((part) => (typeof part === "string" ? part : part.href)).join("|");
}
