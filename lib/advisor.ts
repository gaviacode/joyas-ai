export type AdvisorMode = "direct" | "guided";
export type AdvisorLocale = "es" | "pt-BR" | "en";
export const MAX_ADVISOR_RECOMMENDATION_COUNT = 6;

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
  quickFilters?: Array<"necklaces_only" | "no_gemstones" | "more_discreet" | "more_affordable">;
  additionalRequest?: string;
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
  comparisonNote: string;
  beforeBuying: string;
  searchQuery: string;
  recommendedMaterials: string[];
  styles: string[];
  suitableOccasions: string[];
};

export type AdvisorResponse = {
  summary: string;
  recommendations: AdvisorRecommendation[];
  followUpMessage: string;
};
