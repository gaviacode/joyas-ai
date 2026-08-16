import type { MetadataRoute } from "next";
import {
  getAllLocalizedArticleRoutes,
  getGuideCategoryAlternates,
  getHomeAlternates,
  getIndexAlternates,
  getLocaleHomePath,
  getLocalizedGuideCategoryPath,
  getLocalizedIndexPath,
  locales,
} from "@/lib/i18n";
import { guideCategories, guides, jewelryCategories, occasions } from "@/lib/site-content";
import { absoluteUrl } from "@/lib/site-config";

const staticRoutes = [
  "/",
  "/afiliacion",
  "/joyas",
  "/joyas/anillos/como-saber-talla-anillo",
  "/ocasiones",
  "/guias",
  "/joyero-ia",
  "/como-funciona",
  "/preguntas-frecuentes",
  "/sobre-joyas-ai",
  "/transparencia",
  "/contacto",
  "/aviso-legal",
  "/politica-privacidad",
  "/cookies",
  "/sobre-nosotros",
  "/transparencia-afiliacion",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...jewelryCategories.map((item) => `/joyas/${item.slug}`),
    ...occasions.map((item) => `/ocasiones/${item.slug}`),
    ...guideCategories.map((item) => item.href),
    ...guides.map((item) => `/guias/${item.slug}`),
  ];

  const localizedIndexes = locales
    .filter((locale) => locale !== "es")
    .flatMap((locale) => [
      getLocaleHomePath(locale),
      getLocalizedIndexPath("joyas", locale),
      getLocalizedIndexPath("ocasiones", locale),
      getLocalizedIndexPath("guias", locale),
    ]);

  const homeRoutes = locales.map((locale) => ({
    route: getLocaleHomePath(locale),
    languages: getHomeAlternates(),
  }));

  const indexRoutes = locales.flatMap((locale) =>
    (["joyas", "ocasiones", "guias"] as const).map((kind) => ({
      route: getLocalizedIndexPath(kind, locale),
      languages: getIndexAlternates(kind),
    })),
  );

  const categoryRoutes = guideCategories.flatMap((category) =>
    locales.map((locale) => ({
      route: getLocalizedGuideCategoryPath(category.slug, locale),
      languages: getGuideCategoryAlternates(category.slug),
    })),
  );

  const articleRoutes = getAllLocalizedArticleRoutes().map((item) => ({
    route: item.path,
    languages: item.languages,
  }));

  const basicRoutes = Array.from(new Set([...routes, ...localizedIndexes])).map((route) => ({
    route,
    languages: undefined,
  }));

  const allRoutes = [...basicRoutes, ...homeRoutes, ...indexRoutes, ...categoryRoutes, ...articleRoutes];
  const uniqueRoutes = new Map(allRoutes.map((item) => [item.route, item]));

  return Array.from(uniqueRoutes.values()).map(({ route, languages }) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: getPriority(route),
    alternates: languages
      ? {
          languages: Object.fromEntries(
            Object.entries({
              es: languages.es,
              "pt-BR": languages["pt-BR"],
              en: languages.en,
              "x-default": languages.es,
            }).map(([locale, path]) => [locale, absoluteUrl(path)]),
          ),
        }
      : undefined,
  }));
}

function getPriority(route: string) {
  if (route === "/") {
    return 1;
  }

  if (route === "/guias") {
    return 0.9;
  }

  if (guideCategories.some((category) => category.href === route)) {
    return 0.8;
  }

  if (route.startsWith("/guias/")) {
    return 0.7;
  }

  return 0.6;
}
