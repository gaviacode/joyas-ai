export type AdvisorMode = "direct" | "guided";
export type AdvisorLocale = "es" | "pt-BR" | "en";
export const ADVISOR_RECOMMENDATION_COUNT = 6;

export const guidedJewelryTypes = [
  "anillo",
  "collar",
  "colgante",
  "pulsera",
  "pendientes",
  "gemelos",
  "reloj",
  "charms / abalorios",
  "conjuntos",
  "no estoy seguro",
] as const;

export type GuidedJewelryType = (typeof guidedJewelryTypes)[number];

export type AdvisorContext = {
  jewelryType?: GuidedJewelryType;
  occasion?: "aniversario" | "cumpleanos" | "compromiso" | "boda" | "san-valentin" | "navidad" | "regalo-sorpresa";
  topic?: string;
};

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GuidedPreferences = {
  recipient?: string;
  jewelryType?: GuidedJewelryType;
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

export type RefinementPreferences = {
  improvementGoal?: "original" | "discreet" | "elegant" | "special" | "cheaper";
  prominence?: "discreet" | "balanced" | "statement";
  usage?: "daily" | "occasions" | "both";
  meaningful?: "yes" | "no" | "neutral";
  personalizable?: "yes" | "no" | "neutral";
  additionalAvoid?: string;
};

export type AdvisorRequest = {
  mode: AdvisorMode;
  locale?: AdvisorLocale;
  directDescription?: string;
  guidedPreferences?: GuidedPreferences;
  refinementPreferences?: RefinementPreferences;
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
