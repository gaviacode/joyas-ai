import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import GuideCategoryPage from "@/components/GuideCategoryPage";
import GoldIdentificationGuide from "@/components/gold/GoldIdentificationGuide";
import GoldKaratGuide from "@/components/gold/GoldKaratGuide";
import Silver925Guide from "@/components/silver/Silver925Guide";
import {
  buildArticleMetadata,
  getArticleParent,
  getGuideCategoryMetadataAlternates,
  getLanguageLinks,
  locales,
  localizeArticle,
  openGraphLocales,
} from "@/lib/i18n";
import {
  findArticle,
  findGuideCategory,
  findGuideCategoryForArticle,
  getGuidesForCategory,
  guideCategories,
  guides,
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...guideCategories.map((category) => ({ slug: category.slug })),
    ...guides.map((article) => ({ slug: article.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findGuideCategory(slug);

  if (category) {
    return {
      title: category.seoTitle,
      description: category.seoDescription,
      alternates: {
        ...getGuideCategoryMetadataAlternates(category.slug, "es"),
      },
      openGraph: {
        title: category.seoTitle,
        description: category.seoDescription,
        url: category.href,
        siteName: "joyas.ai",
        locale: openGraphLocales.es,
        alternateLocale: locales.filter((item) => item !== "es").map((item) => openGraphLocales[item]),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: category.seoTitle,
        description: category.seoDescription,
      },
    };
  }

  const article = findArticle(guides, slug);

  if (!article) {
    return {};
  }

  const seoTitle =
      slug === "plata-925"
        ? "Plata 925 o plata de ley: qué significa y cómo reconocerla | joyas.ai"
        : slug === "collares-segun-escote"
          ? "Collares según escote: qué collar elegir para cada escote | joyas.ai"
        : slug === "tipos-cierre-pendientes"
          ? "Tipos de cierre de pendientes: guía para elegir el más adecuado | joyas.ai"
        : slug === "moissanita-vs-diamante"
          ? "Moissanita vs diamante: diferencias, precio y cuál elegir | joyas.ai"
        : slug === "tipos-de-anillos"
          ? "Tipos de anillos: nombres, estilos y significado | joyas.ai"
        : slug === "oro-rosa"
          ? "Oro rosa: qué es, composición, quilates y diferencias | joyas.ai"
        : slug === "diamantes-rosados"
          ? "Diamantes rosados: qué son, por qué son raros y cuánto valen | joyas.ai"
        : slug === "oro-laminado-chapado-bano"
          ? "Oro laminado, chapado y baño de oro: diferencias | joyas.ai"
        : slug === "tipos-de-cadenas"
          ? "Tipos de cadenas: nombres, estilos y cómo elegir | joyas.ai"
        : slug === "tipos-de-pendientes"
          ? "Tipos de pendientes: nombres, estilos y guía para elegir | joyas.ai"
        : slug === "oro-blanco"
          ? "Oro blanco: qué es, composición, 18k y diferencias | joyas.ai"
        : slug === "como-saber-si-una-perla-es-autentica"
          ? "Cómo saber si una perla es auténtica: real o falsa | joyas.ai"
        : slug === "tipos-de-perlas"
          ? "Tipos de perlas: diferencias y qué determina su valor | joyas.ai"
        : slug === "oro-vermeil"
          ? "Oro vermeil: qué es, duración y diferencias | joyas.ai"
        : slug === "tipos-de-collares"
          ? "Tipos de collares: nombres, longitudes y estilos | joyas.ai"
        : slug === "pulsera-tennis"
          ? "Pulsera tennis: qué es, origen y cómo elegirla | joyas.ai"
        : slug === "como-limpiar-plata"
          ? "Cómo limpiar plata en casa sin dañar tus joyas | joyas.ai"
        : slug === "como-limpiar-oro"
          ? "Cómo limpiar oro en casa sin dañar tus joyas | joyas.ai"
        : slug === "pendientes-boda-invitada"
          ? "Pendientes para boda de invitada: cómo elegirlos | joyas.ai"
        : slug === "joyas-para-regalar-mujer"
          ? "Joyas para regalar a una mujer: ideas y consejos | joyas.ai"
        : slug === "como-elegir-pendientes-novia"
          ? "Cómo elegir pendientes de novia: guía completa | joyas.ai"
        : slug === "oro-14k-18k-24k"
          ? "Oro 14k, 18k y 24k: diferencias y qué significan | joyas.ai"
          : slug === "como-saber-si-una-joya-es-de-oro"
            ? "Cómo saber si una joya es de oro: pruebas y marcas | joyas.ai"
        : `${article.title} | joyas.ai`;
  const seoDescription =
      slug === "oro-14k-18k-24k"
        ? "Descubre qué significan 14k, 18k y 24k, cuánta proporción de oro contiene cada aleación y qué diferencias tienen en joyería."
        : article.description;

  return {
    ...buildArticleMetadata({ ...article, title: seoTitle.replace(" | joyas.ai", ""), description: seoDescription }, "guias", "es"),
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const category = findGuideCategory(slug);

  if (category) {
    return <GuideCategoryPage category={category} guides={getGuidesForCategory(category)} locale="es" />;
  }

  const article = findArticle(guides, slug);

  if (!article) {
    notFound();
  }

  if (slug === "plata-925") {
    return <Silver925Guide languageLinks={getLanguageLinks("guias", slug)} />;
  }

  if (slug === "oro-14k-18k-24k") {
    return <GoldKaratGuide languageLinks={getLanguageLinks("guias", slug)} />;
  }

  if (slug === "como-saber-si-una-joya-es-de-oro") {
    return <GoldIdentificationGuide languageLinks={getLanguageLinks("guias", slug)} />;
  }

  const articleCategory = findGuideCategoryForArticle(article);

  return (
    <ArticlePage
      article={localizeArticle(article, "guias", "es")}
      parent={getArticleParent("guias", "es")}
      breadcrumbItems={[
        { href: "/guias", label: "Guías" },
        ...(articleCategory ? [{ href: articleCategory.href, label: articleCategory.title }] : []),
        { href: `/guias/${article.slug}`, label: article.title },
      ]}
      languageLinks={getLanguageLinks("guias", article.slug)}
    />
  );
}
