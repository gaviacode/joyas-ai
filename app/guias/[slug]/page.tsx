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

const guidesWithEarlyAdvisorCta = new Set([
  "como-elegir-collar",
  "collares-segun-escote",
  "tipos-de-cadenas",
  "como-elegir-pendientes",
  "tipos-cierre-pendientes",
  "tipos-de-pendientes",
  "como-elegir-una-joya-para-regalar",
  "tipos-de-anillos",
  "moissanita-vs-diamante",
  "tipos-de-collares",
  "pulsera-tennis",
  "pendientes-boda-invitada",
  "joyas-para-regalar-mujer",
  "joyas-para-regalar-novia",
  "pulseras-de-la-amistad",
  "pulseras-para-mama",
  "joya-regalo-madre-primeriza",
  "joyas-para-parejas",
  "pulseras-para-regalar",
  "pendientes-madrina-mantilla",
  "pendientes-madrina-boda",
  "pendientes-vestido-azul-marino",
  "pendientes-vestido-rojo-boda",
  "collares-invitada-boda",
  "como-elegir-pendientes-novia",
  "anillo-de-promesa",
  "pulseras-con-coordenadas",
  "pulseras-nombres-hijos",
  "pulseras-de-novia",
  "pendientes-hipoalergenicos",
  "pendientes-graduacion",
  "esclavas-bebes-oro",
  "cadenas-oro-mujer",
  "collar-con-inicial",
  "pulsera-con-nombre",
  "pulseras-plata-mujer",
  "pulseras-oro-mujer",
  "cadenas-plata-mujer",
  "anillos-plata-mujer",
  "pendientes-oro-18k",
  "gargantillas-oro",
  "cruz-oro",
  "anillos-oro-mujer",
  "aros-plata-mujer",
  "aros-oro-mujer",
  "collar-estrella",
  "pulsera-infinito",
  "collar-sol",
  "collar-luna",
  "anillo-sello-mujer",
  "pendientes-estrella-plata",
  "pendientes-pequenos-plata",
  "anillos-tungsteno",
  "collares-conchas",
  "pulsera-grabada-mujer",
  "collares-finos-mujer",
  "cadena-fina-oro",
  "brazalete-oro-mujer",
]);

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
        siteName: "Joyas.ai",
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
      slug === "cadena-fina-oro"
        ? "Cadena fina de oro: grosores, medidas y cómo elegir | Joyas.ai"
        : slug === "brazalete-oro-mujer"
        ? "Brazaletes de oro para mujer: tipos y cómo elegir | Joyas.ai"
        : slug === "collares-conchas"
        ? "Collares de conchas: tipos, materiales y cómo elegir | Joyas.ai"
        : slug === "pulsera-grabada-mujer"
        ? "Pulseras grabadas para mujer: ideas y cómo elegir | Joyas.ai"
        : slug === "collares-finos-mujer"
        ? "Collares finos para mujer: tipos y cómo elegir | Joyas.ai"
        : slug === "pendientes-estrella-plata"
        ? "Pendientes de estrella de plata: tipos y cómo elegir | Joyas.ai"
        : slug === "pendientes-pequenos-plata"
        ? "Pendientes pequeños de plata: tipos, cierres y cómo elegir | Joyas.ai"
        : slug === "anillos-tungsteno"
        ? "Anillos de tungsteno: ventajas, tipos y cómo elegir | Joyas.ai"
        : slug === "collar-sol"
        ? "Collar de sol: significado, materiales y cómo elegir | Joyas.ai"
        : slug === "collar-luna"
        ? "Collar de luna: significado, materiales y cómo elegir | Joyas.ai"
        : slug === "anillo-sello-mujer"
        ? "Anillo sello para mujer: tipos, tamaños y cómo elegir | Joyas.ai"
        : slug === "collar-estrella"
        ? "Collar de estrella: significado, materiales y cómo elegir | Joyas.ai"
        : slug === "pulsera-infinito"
        ? "Pulsera infinito: significado, materiales y cómo elegir | Joyas.ai"
        : slug === "aros-plata-mujer"
        ? "Aros de plata para mujer: tamaños, estilos y cómo elegir | Joyas.ai"
        : slug === "aros-oro-mujer"
        ? "Aros de oro para mujer: tamaños, quilates y cómo elegir | Joyas.ai"
        : slug === "pendientes-oro-18k"
        ? "Pendientes de oro 18k: cómo elegirlos y acertar | Joyas.ai"
        : slug === "gargantillas-oro"
        ? "Gargantillas de oro: tipos, medidas y cómo elegir | Joyas.ai"
        : slug === "cruz-oro"
        ? "Cruz de oro: cómo elegir una para regalo o para llevar | Joyas.ai"
        : slug === "anillos-oro-mujer"
        ? "Anillos de oro para mujer: tipos, estilos y cómo elegir | Joyas.ai"
        : slug === "collar-con-inicial"
        ? "Collar con inicial: cómo elegir el adecuado | Joyas.ai"
        : slug === "pulsera-con-nombre"
        ? "Pulsera con nombre: materiales, estilos y cómo elegir | Joyas.ai"
        : slug === "pulseras-plata-mujer"
        ? "Pulseras de plata para mujer: tipos y cómo elegir | Joyas.ai"
        : slug === "pulseras-oro-mujer"
        ? "Pulseras de oro para mujer: tipos y cómo elegir | Joyas.ai"
        : slug === "cadenas-plata-mujer"
        ? "Cadenas de plata para mujer: tipos, medidas y cómo elegir | Joyas.ai"
        : slug === "anillos-plata-mujer"
        ? "Anillos de plata para mujer: tipos y cómo elegir | Joyas.ai"
        : slug === "esclavas-bebes-oro"
        ? "Esclavas para bebés de oro: cómo elegir la adecuada | Joyas.ai"
        : slug === "cadenas-oro-mujer"
        ? "Cadenas de oro para mujer: tipos, medidas y cómo elegir | Joyas.ai"
        : slug === "combinar-joyas-oro-plata"
        ? "Cómo combinar joyas de oro y plata y acertar | Joyas.ai"
        : slug === "pendientes-graduacion"
        ? "Pendientes para graduación: cómo elegir los adecuados | Joyas.ai"
        : slug === "pendientes-hipoalergenicos"
        ? "Pendientes hipoalergénicos: materiales y cómo elegirlos | Joyas.ai"
        : slug === "plata-925"
          ? "Plata de ley 925: qué significa y cómo saber si es auténtica | Joyas.ai"
        : slug === "collares-segun-escote"
          ? "Collares según escote: qué collar elegir para cada escote | Joyas.ai"
        : slug === "tipos-cierre-pendientes"
          ? "Tipos de cierre de pendientes: guía para elegir el más adecuado | Joyas.ai"
        : slug === "moissanita-vs-diamante"
          ? "Moissanita vs diamante: diferencias, precio y cuál elegir | Joyas.ai"
        : slug === "tipos-de-anillos"
          ? "Tipos de anillos: nombres, estilos y significado | Joyas.ai"
        : slug === "oro-rosa"
          ? "Oro rosa: qué es, composición, quilates y diferencias | Joyas.ai"
        : slug === "diamantes-rosados"
          ? "Diamantes rosados: qué son, por qué son raros y cuánto valen | Joyas.ai"
        : slug === "oro-laminado-chapado-bano"
          ? "Oro laminado, chapado y baño de oro: diferencias | Joyas.ai"
        : slug === "tipos-de-cadenas"
          ? "Tipos de cadenas: nombres, estilos y cómo elegir | Joyas.ai"
        : slug === "tipos-de-pendientes"
          ? "Tipos de pendientes: nombres, estilos y guía para elegir | Joyas.ai"
        : slug === "oro-blanco"
          ? "Oro blanco: qué es, composición, 18k y diferencias | Joyas.ai"
        : slug === "como-saber-si-una-perla-es-autentica"
          ? "Cómo saber si una perla es auténtica: real o falsa | Joyas.ai"
        : slug === "tipos-de-perlas"
          ? "Tipos de perlas: diferencias y qué determina su valor | Joyas.ai"
        : slug === "oro-vermeil"
          ? "Oro vermeil: qué es, duración y diferencias | Joyas.ai"
        : slug === "tipos-de-collares"
          ? "Tipos de collares: nombres, longitudes y estilos | Joyas.ai"
        : slug === "pulsera-tennis"
          ? "Pulsera tennis: qué es, origen y cómo elegirla | Joyas.ai"
        : slug === "como-limpiar-plata"
          ? "Cómo limpiar joyas de plata en casa sin dañarlas | Joyas.ai"
        : slug === "como-limpiar-oro"
          ? "Cómo limpiar oro en casa sin dañar tus joyas | Joyas.ai"
        : slug === "pendientes-boda-invitada"
          ? "Pendientes para invitada de boda: cómo elegirlos | Joyas.ai"
        : slug === "joyas-para-regalar-mujer"
          ? "Joyas para regalar a una mujer: ideas para acertar | Joyas.ai"
        : slug === "joyas-para-regalar-novia"
          ? "Joyas para regalar a mi novia: ideas para acertar | Joyas.ai"
        : slug === "como-elegir-pendientes-novia"
          ? "Pendientes de novia: cómo elegirlos para tu boda | Joyas.ai"
        : slug === "oro-14k-18k-24k"
          ? "Oro 14k, 18k y 24k: diferencias y qué significan | Joyas.ai"
          : slug === "como-saber-si-una-joya-es-de-oro"
            ? "Cómo saber si una joya es de oro: pruebas y marcas | Joyas.ai"
        : `${article.title} | Joyas.ai`;
  const seoDescription =
      slug === "plata-925"
        ? "Descubre qué significa plata de ley 925, su composición con 92,5 % de plata, cómo identificarla y cómo comprobar si una joya es auténtica."
        : slug === "oro-14k-18k-24k"
        ? "Descubre qué significan 14k, 18k y 24k, cuánta proporción de oro contiene cada aleación y qué diferencias tienen en joyería."
        : article.description;

  return {
    ...buildArticleMetadata({ ...article, title: seoTitle.replace(" | Joyas.ai", ""), description: seoDescription }, "guias", "es"),
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
      showGuideAdvisorCta={guidesWithEarlyAdvisorCta.has(article.slug)}
    />
  );
}
