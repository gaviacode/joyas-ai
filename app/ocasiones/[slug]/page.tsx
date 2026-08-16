import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { buildArticleMetadata, getArticleParent, getLanguageLinks, localizeArticle } from "@/lib/i18n";
import { findArticle, occasions } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
    />
  );
}
