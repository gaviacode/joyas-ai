"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import {
  cookieConsentChangedEvent,
  cookieConsentStorageKey,
  deleteKnownAnalyticsCookies,
  getStoredConsent,
} from "@/lib/cookie-consent";
import { shouldLoadGoogleAnalytics } from "@/lib/google-analytics-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

type ConsentSnapshot = "granted" | "denied" | "unset";

function getConsentSnapshot(): ConsentSnapshot {
  const storedConsent = getStoredConsent();

  if (!storedConsent) {
    return "unset";
  }

  return storedConsent.analytics ? "granted" : "denied";
}

function getServerConsentSnapshot(): ConsentSnapshot {
  return "unset";
}

function subscribeToConsent(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === null || event.key === cookieConsentStorageKey) {
      callback();
    }
  }

  window.addEventListener(cookieConsentChangedEvent, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(cookieConsentChangedEvent, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args as object);
    });
}

function updateConsent(analytics: boolean) {
  ensureGtag();

  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getServerConsentSnapshot);
  const analyticsAllowed = consent === "granted";
  const canLoadAnalytics = shouldLoadGoogleAnalytics && Boolean(measurementId) && analyticsAllowed;
  const lastPageViewRef = useRef<string | null>(null);

  const pagePath = useMemo(() => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    updateConsent(analyticsAllowed);

    if (!analyticsAllowed) {
      (window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = true;
      deleteKnownAnalyticsCookies(measurementId);
      lastPageViewRef.current = null;
      return;
    }

    (window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = false;
  }, [analyticsAllowed, measurementId]);

  useEffect(() => {
    if (!canLoadAnalytics) {
      return;
    }

    if (lastPageViewRef.current === null) {
      lastPageViewRef.current = pagePath;
      return;
    }

    if (lastPageViewRef.current === pagePath) {
      return;
    }

    lastPageViewRef.current = pagePath;
    window.gtag?.("event", "page_view", {
      send_to: measurementId,
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [canLoadAnalytics, measurementId, pagePath]);

  if (!canLoadAnalytics) {
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}
