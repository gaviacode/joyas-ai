import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import GuideCategoryPage from "@/components/GuideCategoryPage";
import {
  buildArticleMetadata,
  findLocalizedArticle,
  findLocalizedGuideCategory,
  getArticleParent,
  getGuideBreadcrumbItems,
  getGuideCategoryLanguageLinks,
  getGuideCategoryMetadataAlternates,
  getLanguageLinks,
  getLocalizedPath,
  getLocalizedGuidesForCategory,
  getLocalizedGuideCategorySlug,
  getLocalizedSection,
  getLocalizedSlug,
  locales,
  openGraphLocales,
  type ContentKind,
  type Locale,
  type LocalizedLocale,
} from "@/lib/i18n";
import { guideCategories, guides, jewelryCategories, occasions } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string; section: string; slug: string }>;
};

const localizedLocales: LocalizedLocale[] = ["pt-BR", "en"];
const contentKinds: ContentKind[] = ["joyas", "ocasiones", "guias"];

export function generateStaticParams() {
  const articles = [
    ...jewelryCategories.map((article) => ({ kind: "joyas" as const, slug: article.slug })),
    ...occasions.map((article) => ({ kind: "ocasiones" as const, slug: article.slug })),
    ...guides.map((article) => ({ kind: "guias" as const, slug: article.slug })),
  ];

  const articleParams = localizedLocales.flatMap((locale) =>
    articles.map(({ kind, slug }) => {
      return {
        locale: locale === "pt-BR" ? "pt-br" : locale,
        section: getLocalizedSection(kind, locale),
        slug: getLocalizedSlug(kind, slug, locale),
      };
    }),
  );

  const categoryParams = localizedLocales.flatMap((locale) =>
    guideCategories.map((category) => {
      return {
        locale: locale === "pt-BR" ? "pt-br" : locale,
        section: getLocalizedSection("guias", locale),
        slug: getLocalizedGuideCategorySlug(category.slug, locale),
      };
    }),
  );

  return [...articleParams, ...categoryParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, section, slug } = await params;
  const locale = parseLocale(rawLocale);
  if (!locale) {
    return {};
  }

  const kind = parseSection(section, locale);

  if (!kind) {
    return {};
  }

  if (kind === "guias") {
    const category = findLocalizedGuideCategory(slug, locale);
    if (category) {
      const esSlug = guideCategories.find((item) => getLocalizedGuideCategorySlug(item.slug, locale) === category.slug)?.slug ?? category.slug;

      return {
        title: category.seoTitle,
        description: category.seoDescription,
        alternates: getGuideCategoryMetadataAlternates(esSlug, locale),
        openGraph: {
          title: category.seoTitle,
          description: category.seoDescription,
          url: category.href,
          siteName: "joyas.ai",
          locale: openGraphLocales[locale],
          alternateLocale: locales.filter((item) => item !== locale).map((item) => openGraphLocales[item]),
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: category.seoTitle,
          description: category.seoDescription,
        },
      };
    }
  }

  const article = findLocalizedArticle(kind, slug, locale);
  if (!article) {
    return {};
  }

  return buildArticleMetadata(article, kind, locale);
}

export default async function LocalizedArticlePage({ params }: PageProps) {
  const { locale: rawLocale, section, slug } = await params;
  const locale = parseLocale(rawLocale);
  const kind = locale ? parseSection(section, locale) : undefined;

  if (!locale || !kind) {
    notFound();
  }

  if (kind === "guias") {
    const category = findLocalizedGuideCategory(slug, locale);
    if (category) {
      const esSlug = guideCategories.find((item) => getLocalizedGuideCategorySlug(item.slug, locale) === category.slug)?.slug ?? category.slug;

      return (
        <GuideCategoryPage
          category={category}
          guides={getLocalizedGuidesForCategory(category, locale)}
          locale={locale}
          languageLinks={getGuideCategoryLanguageLinks(esSlug)}
        />
      );
    }
  }

  const article = findLocalizedArticle(kind, slug, locale);
  if (!article) {
    notFound();
  }
  const parent = getArticleParent(kind, locale);
  const breadcrumbItems = kind === "guias" ? getGuideBreadcrumbItems(article, locale) : undefined;

  return (
    <ArticlePage
      article={article}
      parent={parent}
      breadcrumbItems={breadcrumbItems}
      languageLinks={getLanguageLinks(kind, article.originalSlug ?? article.slug)}
      structuredData={getLocalizedStructuredData(kind, article, locale, parent, breadcrumbItems)}
    />
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

function parseSection(value: string, locale: Locale): ContentKind | undefined {
  return contentKinds.find((kind) => getLocalizedSection(kind, locale) === value);
}

function getLocalizedStructuredData(
  kind: ContentKind,
  article: NonNullable<ReturnType<typeof findLocalizedArticle>>,
  locale: LocalizedLocale,
  parent: { href: string; label: string },
  breadcrumbItems?: { href: string; label: string }[],
) {
  const originalSlug = article.originalSlug ?? article.slug;
  const faqs = localizedStructuredFaqs[locale][originalSlug];

  if (!faqs) {
    return undefined;
  }

  const breadcrumbs = breadcrumbItems ?? [
    { href: locale === "pt-BR" ? "/pt-br" : "/en", label: locale === "pt-BR" ? "Inicio" : "Home" },
    parent,
    { href: getLocalizedPath(kind, originalSlug, locale), label: article.title },
  ];

  return {
    id: `${locale === "pt-BR" ? "pt-br" : "en"}-${originalSlug}-structured-data`,
    canonicalPath: getLocalizedPath(kind, originalSlug, locale),
    breadcrumbs,
    faqs,
    faqTitle: locale === "pt-BR" ? "Perguntas frequentes" : "Frequently Asked Questions",
  };
}

const localizedStructuredFaqs: Record<LocalizedLocale, Record<string, Array<{ question: string; answer: string }>>> = {
  "pt-BR": {
    "oro-14k-18k-24k": [
      {
        question: "O que significa 18k em uma joia?",
        answer: "Significa que a liga contem 18 partes de ouro em 24, ou seja, cerca de 75% de ouro.",
      },
      {
        question: "Qual porcentagem de ouro tem o ouro 14k?",
        answer: "O ouro 14k contem aproximadamente 58,5% de ouro; o restante corresponde a outros metais da liga.",
      },
      {
        question: "O que significa 750 no ouro?",
        answer: "750 indica 750 partes de ouro por 1.000 partes de liga e costuma corresponder ao ouro 18k.",
      },
      {
        question: "Ouro 14k ou 18k: qual e melhor?",
        answer: "Depende da joia, do uso, do orcamento, da cor desejada e das preferencias de manutencao.",
      },
    ],
    "como-saber-si-una-joya-es-de-oro": [
      {
        question: "Como saber se uma joia e de ouro de verdade?",
        answer: "Revise marcas, documentacao e vendedor. Se houver duvidas ou valor economico relevante, uma avaliacao profissional e a opcao mais confiavel.",
      },
      {
        question: "O ouro gruda no ima?",
        answer: "O ouro nao e ferromagnetico, mas o teste do ima e apenas uma pista: muitos outros metais tambem nao reagem fortemente.",
      },
      {
        question: "O que significa 750 em uma joia?",
        answer: "750 indica 750 partes de ouro por 1.000, associado ao ouro 18k. O gravado sozinho nao prova autenticidade.",
      },
      {
        question: "Qual e a forma mais confiavel de comprovar uma joia?",
        answer: "Uma analise profissional, junto com documentacao e contraste confiavel, oferece mais seguranca do que testes caseiros isolados.",
      },
    ],
    "plata-925": [
      {
        question: "O que significa 925 em uma joia?",
        answer: "Indica que a liga contem 925 partes de prata por 1.000 partes de material, ou seja, 92,5% de prata.",
      },
      {
        question: "Prata 925 e prata autentica?",
        answer: "Se a peca cumprir essa finura, e prata autentica em liga 925, embora o marcado deva poder ser verificado.",
      },
      {
        question: "Prata 925 escurece?",
        answer: "Pode escurecer com o tempo por deslustre. Isso nao significa automaticamente que a joia seja falsa.",
      },
      {
        question: "Qual e a diferenca entre prata 925 e banho de prata?",
        answer: "A prata 925 usa uma liga de prata como material da peca; o banho de prata e apenas uma camada superficial sobre outro material.",
      },
    ],
    "como-saber-talla-anillo": [
      {
        question: "Como sei qual e o tamanho do meu anel?",
        answer: "Meca a circunferencia do dedo ou o diametro interno de um anel que ja sirva bem e compare com uma tabela de medidas.",
      },
      {
        question: "Como medir um anel que eu ja tenho?",
        answer: "Coloque o anel em uma superficie plana e meca apenas o diametro interno, de borda interna a borda interna.",
      },
      {
        question: "O tamanho do anel e igual em todos os dedos?",
        answer: "Nao. Cada dedo pode ter uma medida diferente, e tambem pode haver diferencas entre a mao direita e a esquerda.",
      },
      {
        question: "O que fazer se estou entre dois tamanhos?",
        answer: "Consulte a tabela da loja e considere largura, design, conforto e politica de troca ou ajuste.",
      },
    ],
  },
  en: {
    "oro-14k-18k-24k": [
      {
        question: "What does 18k mean in jewelry?",
        answer: "It means the alloy contains 18 parts gold out of 24, or about 75% gold.",
      },
      {
        question: "What percentage of gold is in 14k gold?",
        answer: "14k gold contains approximately 58.5% gold; the rest is made up of other metals in the alloy.",
      },
      {
        question: "What does 750 mean on gold?",
        answer: "750 means 750 parts gold per 1,000 parts alloy and usually corresponds to 18k gold.",
      },
      {
        question: "Is 14k or 18k gold better?",
        answer: "It depends on the piece, intended use, budget, color preference, and maintenance expectations.",
      },
    ],
    "como-saber-si-una-joya-es-de-oro": [
      {
        question: "How can I tell if jewelry is real gold?",
        answer: "Check hallmarks, documentation, and the seller. For valuable pieces or uncertainty, professional testing is the most reliable route.",
      },
      {
        question: "Does gold stick to a magnet?",
        answer: "Gold is not ferromagnetic, but a magnet test is only a clue because many other metals also do not react strongly.",
      },
      {
        question: "What does 750 mean on jewelry?",
        answer: "750 indicates 750 parts gold per 1,000 and is associated with 18k gold. The stamp alone does not prove authenticity.",
      },
      {
        question: "What is the most reliable way to verify a piece?",
        answer: "Professional analysis, together with reliable documentation and hallmarks, offers more confidence than isolated home tests.",
      },
    ],
    "plata-925": [
      {
        question: "What does 925 mean on jewelry?",
        answer: "It means the alloy contains 925 parts silver per 1,000 parts material, or 92.5% silver.",
      },
      {
        question: "Is 925 silver real silver?",
        answer: "If the piece meets that fineness, it is real silver in a 925 alloy, though the mark should be verifiable.",
      },
      {
        question: "Does 925 silver tarnish?",
        answer: "It can darken over time due to tarnish. That does not automatically mean the jewelry is fake.",
      },
      {
        question: "What is the difference between 925 silver and silver plating?",
        answer: "925 silver uses a silver alloy as the material of the piece; silver plating is only a surface layer over another material.",
      },
    ],
    "como-saber-talla-anillo": [
      {
        question: "How do I know my ring size?",
        answer: "Measure the finger circumference or the inner diameter of a ring that already fits well, then compare it with a size chart.",
      },
      {
        question: "How do I measure a ring I already have?",
        answer: "Place the ring on a flat surface and measure only the inner diameter, from inside edge to inside edge.",
      },
      {
        question: "Is ring size the same on every finger?",
        answer: "No. Each finger can have a different size, and there can also be differences between the right and left hand.",
      },
      {
        question: "What should I do if I am between two sizes?",
        answer: "Check the store's size guide and consider width, design, comfort, and the exchange or resizing policy.",
      },
    ],
  },
};
