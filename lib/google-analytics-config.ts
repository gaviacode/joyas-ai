export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-CSDT48F3TY";

export const shouldLoadGoogleAnalytics = process.env.NODE_ENV === "production";
