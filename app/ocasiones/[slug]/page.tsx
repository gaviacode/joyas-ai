import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { buildArticleMetadata, getArticleParent, getLanguageLinks, localizeArticle } from "@/lib/i18n";
import { findArticle, occasions } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const birthdayFaqs = [
  { question: "¿Qué joya regalar por cumpleaños?", answer: "Elige según el estilo y el uso diario de la persona. Pendientes, collares finos y pulseras ajustables suelen ser opciones versátiles; un anillo requiere confirmar talla y significado." },
  { question: "¿Qué joya regalar a una mujer por su cumpleaños?", answer: "Observa las piezas que ya usa: metal, tamaño y nivel de presencia. Una joya que respete esas preferencias suele ser más acertada que seguir una tendencia general." },
  { question: "¿Qué joya regalar a un hombre?", answer: "Una cadena sobria, una pulsera de líneas limpias, unos gemelos o un anillo sello pueden encajar si ya usa accesorios. Comprueba antes el material y el grosor que prefiere." },
  { question: "¿Cuánto gastar en una joya de cumpleaños?", answer: "No hay una cifra universal. Define un presupuesto cómodo y compara material, medidas, cierre, cuidados y condiciones de cambio para valorar bien cada opción." },
  { question: "¿Qué joya elegir si no conozco bien su estilo?", answer: "Fíjate en las joyas que repite y elige una pieza versátil y fácil de combinar. Si tienes dudas, evita diseños muy llamativos o una talla difícil de confirmar." },
];

export function generateStaticParams() {
  return occasions.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(occasions, slug);

  if (!article) {
    return {};
  }

  return {
    ...buildArticleMetadata(article, "ocasiones", "es"),
  };
}

export default async function OccasionPage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(occasions, slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticlePage
      article={localizeArticle(article, "ocasiones", "es")}
      parent={getArticleParent("ocasiones", "es")}
      languageLinks={getLanguageLinks("ocasiones", article.slug)}
      structuredData={article.slug === "cumpleanos" ? {
        id: "es-cumpleanos-structured-data",
        canonicalPath: "/ocasiones/cumpleanos",
        breadcrumbs: [
          { href: "/", label: "Inicio" },
          { href: "/ocasiones", label: "Ocasiones" },
          { href: "/ocasiones/cumpleanos", label: article.title },
        ],
        faqs: birthdayFaqs,
        faqTitle: "Preguntas frecuentes sobre joyas para cumpleaños",
      } : undefined}
    />
  );
}
