import type { MetadataRoute } from "next";
import { EDITORIAL_REVIEW_DATE } from "@/lib/editorial";
import {
  getAllLocalizedArticleRoutes,
  getAllLocalizedInfoRoutes,
  getGuideCategoryAlternates,
  getHomeAlternates,
  getIndexAlternates,
  getLocaleHomePath,
  getLocalizedGuideCategoryPath,
  getLocalizedIndexPath,
  locales,
  type InfoPageKind,
} from "@/lib/i18n";
import { guideCategories } from "@/lib/site-content";
import { absoluteUrl } from "@/lib/site-config";

type SitemapRoute = {
  route: string;
  languages?: Record<string, string>;
  lastModified?: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const nonIndexableInfoPageKinds = new Set<InfoPageKind>(["aviso-legal", "politica-privacidad"]);

const standaloneRoutes: SitemapRoute[] = [
  { route: "/", languages: getHomeAlternates(), changeFrequency: "weekly", priority: 1 },
  {
    route: "/joyas/anillos/como-saber-talla-anillo",
    lastModified: EDITORIAL_REVIEW_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedHomeRoutes = locales
    .filter((locale) => locale !== "es")
    .map((locale) => ({
    route: getLocaleHomePath(locale),
    languages: getHomeAlternates(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const indexRoutes = locales.flatMap((locale) =>
    (["joyas", "ocasiones", "guias"] as const).map((kind) => ({
      route: getLocalizedIndexPath(kind, locale),
      languages: getIndexAlternates(kind),
      lastModified: EDITORIAL_REVIEW_DATE,
      changeFrequency: "weekly" as const,
      priority: kind === "guias" ? 0.9 : 0.8,
    })),
  );

  const categoryRoutes = guideCategories.flatMap((category) =>
    locales.map((locale) => ({
      route: getLocalizedGuideCategoryPath(category.slug, locale),
      languages: getGuideCategoryAlternates(category.slug),
      lastModified: EDITORIAL_REVIEW_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const articleRoutes = getAllLocalizedArticleRoutes().map((item) => ({
    route: item.path,
    languages: item.languages,
    lastModified: EDITORIAL_REVIEW_DATE,
    changeFrequency: "monthly" as const,
    priority: item.kind === "guias" ? 0.7 : 0.6,
  }));

  const infoRoutes = getAllLocalizedInfoRoutes()
    .filter((item) => !nonIndexableInfoPageKinds.has(item.kind))
    .map((item) => ({
      route: item.path,
      languages: item.languages,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return uniqueByRoute([
    ...standaloneRoutes,
    ...localizedHomeRoutes,
    ...indexRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...infoRoutes,
  ]).map(({ route, languages, lastModified, changeFrequency, priority }) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency,
    priority,
    alternates: languages
      ? {
          languages: Object.fromEntries(
            Object.entries({ ...languages, "x-default": languages.es }).map(([locale, path]) => [locale, absoluteUrl(path)]),
          ),
        }
      : undefined,
  }));
}

function uniqueByRoute(routes: SitemapRoute[]) {
  return Array.from(new Map(routes.map((item) => [item.route, item])).values());
}
