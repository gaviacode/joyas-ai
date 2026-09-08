import type { AffiliateProvider } from "@/lib/affiliate/types";

// Awin se conectará más adelante mediante su API o feed autorizado para devolver
// productos reales. No debe recibir datos comerciales inventados desde Gemini.
export const awinProvider: AffiliateProvider = {
  id: "awin",
  name: "Awin",
};
