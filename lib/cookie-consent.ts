export type ConsentChoice = {
  analytics: boolean;
  decidedAt: string;
};

export const cookieConsentStorageKey = "joyas_ai_cookie_consent_v1";
export const openCookieSettingsEvent = "joyas-ai:open-cookie-settings";
export const cookieConsentChangedEvent = "joyas-ai:cookie-consent-changed";

export function hasStoredConsent() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(cookieConsentStorageKey) !== null;
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(cookieConsentStorageKey);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ConsentChoice>;

    if (typeof parsed.analytics !== "boolean" || typeof parsed.decidedAt !== "string") {
      return null;
    }

    return {
      analytics: parsed.analytics,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  const consent: ConsentChoice = {
    analytics,
    decidedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(cookieConsentStorageKey, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent<ConsentChoice>(cookieConsentChangedEvent, {
      detail: consent,
    })
  );
}

export function openCookieSettings() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(openCookieSettingsEvent));
}

export function getGaSessionCookieName(measurementId: string) {
  return `_ga_${measurementId.replace(/^G-/, "").replace(/-/g, "_")}`;
}

export function deleteKnownAnalyticsCookies(measurementId?: string) {
  if (typeof document === "undefined") {
    return;
  }

  const names = ["_ga"];

  if (measurementId) {
    names.push(getGaSessionCookieName(measurementId));
  }

  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const domainCandidates = new Set([""]);

  if (domainParts.length > 1) {
    domainCandidates.add(hostname);
    domainCandidates.add(`.${hostname}`);
    domainCandidates.add(`.${domainParts.slice(-2).join(".")}`);
  }

  names.forEach((name) => {
    domainCandidates.forEach((domain) => {
      document.cookie = [
        `${name}=`,
        "expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "path=/",
        "SameSite=Lax",
        domain ? `domain=${domain}` : "",
      ]
        .filter(Boolean)
        .join("; ");
    });
  });
}
