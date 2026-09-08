export type AdvisorMode = "direct" | "guided";
export type AdvisorLocale = "es" | "pt-BR" | "en";

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GuidedPreferences = {
  recipient?: string;
  jewelryType?: string;
  pieceDetails?: string[];
  occasion?: string;
  styles?: string[];
  materials?: string[];
  budgetMin?: number;
  budgetMax?: number;
  budgetLabel?: string;
  age?: number;
  additionalDetails?: string;
};

export type AdvisorRequest = {
  mode: AdvisorMode;
  locale?: AdvisorLocale;
  directDescription?: string;
  guidedPreferences?: GuidedPreferences;
  conversation?: ConversationMessage[];
};

export type AdvisorRecommendation = {
  id: string;
  genericName: string;
  reason: string;
  searchQuery: string;
  recommendedMaterials: string[];
  styles: string[];
  suitableOccasions: string[];
  estimatedPriceRange: string;
  jewelerTip: string;
  disclaimer: string;
};

export type AdvisorResponse = {
  summary: string;
  recommendations: AdvisorRecommendation[];
  followUpMessage: string;
};
