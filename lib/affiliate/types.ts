import type { Locale } from "@/lib/i18n";

export type AffiliateProviderId = "amazon" | "awin";

export type AffiliateProvider = {
  id: AffiliateProviderId;
  name: string;
  buildSearchUrl?: (query: string, locale: Locale) => string | undefined;
};

// Los productos comerciales se obtendrán de proveedores autorizados, nunca de Gemini.
export type AffiliateProduct = {
  provider: AffiliateProviderId;
  merchant: string;
  productName: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
};

export type AffiliateProductSearchProvider = AffiliateProvider & {
  searchProducts: (query: string, locale: Locale) => Promise<AffiliateProduct[]>;
};
