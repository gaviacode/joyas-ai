import type { Locale } from "@/lib/i18n";

export const LANGUAGE_COOKIE_NAME = "joyas_locale";
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const LANGUAGE_HEADER_NAME = "x-joyas-locale";

export function isSupportedLocale(value: string | undefined): value is Locale {
  return value === "es" || value === "pt-BR" || value === "en";
}

export function localePath(locale: Locale) {
  if (locale === "es") {
    return "/es";
  }

  if (locale === "pt-BR") {
    return "/pt-br";
  }

  if (locale === "en") {
    return "/en";
  }

  return "/en";
}

export function localeFromPath(pathname: string): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return "es";
  }

  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) {
    return "pt-BR";
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return "es";
}

export function detectLocaleFromAcceptLanguage(header: string | null): Locale {
  for (const languageTag of getLanguageTags(header)) {
    const normalized = languageTag.toLowerCase();

    if (normalized === "es" || normalized.startsWith("es-")) {
      return "es";
    }

    if (normalized === "pt" || normalized.startsWith("pt-")) {
      return "pt-BR";
    }

    if (normalized === "en" || normalized.startsWith("en-")) {
      return "en";
    }
  }

  return "en";
}

function getLanguageTags(header: string | null) {
  return (
    header
      ?.split(",")
      .map((part) => part.trim())
      .filter((part) => Boolean(part) && getQuality(part) > 0)
      .sort((a, b) => getQuality(b) - getQuality(a))
      .map((part) => part.split(";")[0]?.trim())
      .filter((part): part is string => Boolean(part)) ?? []
  );
}

function getQuality(languageRange: string) {
  const quality = languageRange.match(/;\s*q=([0-9.]+)/i)?.[1];
  return quality ? Number(quality) || 0 : 1;
}
