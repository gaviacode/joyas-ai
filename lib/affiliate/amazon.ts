import type { Locale } from "@/lib/i18n";
import type { AffiliateProvider } from "@/lib/affiliate/types";

const amazonDomains: Record<Locale, string> = {
  es: "https://www.amazon.es",
  en: "https://www.amazon.es",
  "pt-BR": "https://www.amazon.es",
};

export function buildAmazonSearchUrl(query: string, locale: Locale = "es") {
  const searchQuery = query.trim();
  if (!searchQuery) {
    return undefined;
  }

  const url = new URL("/s", amazonDomains[locale]);
  url.searchParams.set("k", searchQuery);

  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG?.trim();
  if (affiliateTag) {
    url.searchParams.set("tag", affiliateTag);
  }

  return url.toString();
}

export const amazonProvider: AffiliateProvider = {
  id: "amazon",
  name: "Amazon",
  buildSearchUrl: buildAmazonSearchUrl,
};
