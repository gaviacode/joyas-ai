export type AdvisorMode = "direct" | "guided";
export type AdvisorLocale = "es" | "pt-BR" | "en";

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GuidedPreferences = {
  recipient?: string;
  jewelryType?: string;
  occasion?: string;
  styles?: string[];
  materials?: string[];
  budgetMin?: number;
  budgetMax?: number;
  budgetLabel?: string;
  additionalDetails?: string;
};

export type AdvisorRequest = {
  mode: AdvisorMode;
  locale?: AdvisorLocale;
  directDescription?: string;
  guidedPreferences?: GuidedPreferences;
  conversation?: ConversationMessage[];
};

export type RecommendationSource = "generic" | "awin" | "amazon";

export type AdvisorRecommendation = {
  id: string;
  source: RecommendationSource;
  genericName: string;
  reason: string;
  recommendedMaterials: string[];
  styles: string[];
  suitableOccasions: string[];
  estimatedPriceRange: string;
  jewelerTip: string;
  disclaimer: string;
  country?: string;
  currency?: string;
  merchant?: string;
  productId?: string;
  affiliateUrl?: string;
  imageUrl?: string;
  currentPrice?: number;
};

export type AdvisorResponse = {
  summary: string;
  recommendations: AdvisorRecommendation[];
  followUpMessage: string;
};
