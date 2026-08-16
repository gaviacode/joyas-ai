import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { buildArticleMetadata, getArticleParent, getLanguageLinks, localizeArticle } from "@/lib/i18n";
import { findArticle, jewelryCategories } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jewelryCategories.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(jewelryCategories, slug);

  if (!article) {
    return {};
  }

  return {
    ...buildArticleMetadata(article, "joyas", "es"),
  };
}

export default async function JewelryCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(jewelryCategories, slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticlePage
      article={localizeArticle(article, "joyas", "es")}
      parent={getArticleParent("joyas", "es")}
      languageLinks={getLanguageLinks("joyas", article.slug)}
    />
  );
}
