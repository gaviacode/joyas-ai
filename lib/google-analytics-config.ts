export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

export const shouldLoadGoogleAnalytics = process.env.NODE_ENV === "production";
