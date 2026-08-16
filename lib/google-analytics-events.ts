"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID, shouldLoadGoogleAnalytics } from "@/lib/google-analytics-config";
import { getStoredConsent } from "@/lib/cookie-consent";

export type GAEventName =
  | "ai_recommender_open"
  | "ai_recommender_message"
  | "guide_click"
  | "affiliate_click";

export type GAEventParams = Record<string, string | number | boolean | null | undefined>;

export function trackGAEvent(name: GAEventName, params: GAEventParams = {}) {
  if (typeof window === "undefined" || !shouldLoadGoogleAnalytics || !getStoredConsent()?.analytics) {
    return;
  }

  sendGAEvent("event", name, {
    send_to: GA_MEASUREMENT_ID,
    ...removeEmptyParams(params),
  });
}

function removeEmptyParams(params: GAEventParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}
