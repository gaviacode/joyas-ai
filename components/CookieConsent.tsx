"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  cookieConsentChangedEvent,
  cookieConsentStorageKey,
  deleteKnownAnalyticsCookies,
  getStoredConsent,
  openCookieSettingsEvent,
  saveConsent,
} from "@/lib/cookie-consent";
import type { Locale } from "@/lib/i18n";

type ConsentView = "banner" | "settings" | "hidden";
type ViewOverride = Extract<ConsentView, "settings" | "hidden"> | null;
type RawConsentSnapshot = string | null | "server";

export default function CookieConsent({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const copy = cookieCopy[locale];
  const consentSnapshot = useSyncExternalStore(
    subscribeToConsent,
    getRawConsentSnapshot,
    getServerConsentSnapshot,
  );
  const storedAnalyticsEnabled = useMemo(() => parseAnalyticsConsent(consentSnapshot), [consentSnapshot]);
  const [viewOverride, setViewOverride] = useState<ViewOverride>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const view: ConsentView = viewOverride ?? (consentSnapshot === null ? "banner" : "hidden");

  useEffect(() => {
    function handleOpenSettings() {
      setAnalyticsEnabled(Boolean(getStoredConsent()?.analytics));
      setViewOverride("settings");
    }

    window.addEventListener(openCookieSettingsEvent, handleOpenSettings);
    return () => {
      window.removeEventListener(openCookieSettingsEvent, handleOpenSettings);
    };
  }, []);

  function acceptAnalytics() {
    saveConsent(true);
    setAnalyticsEnabled(true);
    setViewOverride(null);
  }

  function rejectAnalytics() {
    deleteKnownAnalyticsCookies(measurementId);
    saveConsent(false);
    setAnalyticsEnabled(false);
    setViewOverride(null);
  }

  function openSettings() {
    setAnalyticsEnabled(storedAnalyticsEnabled);
    setViewOverride("settings");
  }

  function saveSettings() {
    if (!analyticsEnabled) {
      deleteKnownAnalyticsCookies(measurementId);
    }

    saveConsent(analyticsEnabled);
    setViewOverride(null);
  }

  if (view === "hidden") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#ead8b3] bg-[#fffaf1] p-4 text-[#1f1a17] shadow-2xl shadow-[#805400]/20 sm:p-5">
        {view === "banner" ? (
          <section aria-label={copy.bannerAria}>
            <h2 className="text-lg font-semibold tracking-[-0.02em]">{copy.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#625746]">
              {copy.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={acceptAnalytics}
                className="min-h-12 rounded-xl border border-[#7a6a4b] bg-white px-5 py-3 text-sm font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {copy.accept}
              </button>
              <button
                type="button"
                onClick={rejectAnalytics}
                className="min-h-12 rounded-xl border border-[#7a6a4b] bg-white px-5 py-3 text-sm font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {copy.reject}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="min-h-12 rounded-xl border border-[#7a6a4b] bg-white px-5 py-3 text-sm font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {copy.configure}
              </button>
            </div>
          </section>
        ) : (
          <section aria-label={copy.settingsAria} className="max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">{copy.settingsTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-[#625746]">
                  {copy.settingsDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewOverride("hidden")}
                className="min-h-11 rounded-xl border border-[#ead8b3] bg-white px-4 py-2 text-sm font-semibold text-[#17120b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {copy.close}
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-[#ead8b3] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">
                      {copy.necessary}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#625746]">{copy.alwaysOn}</p>
                  </div>
                  <span className="rounded-full border border-[#d7a63c] bg-[#fff5df] px-3 py-1 text-xs font-semibold text-[#7a540f]">
                    {copy.active}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#ead8b3] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">
                      {copy.analytics}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#625746]">
                      {copy.analyticsDescription}
                    </p>
                  </div>
                  <label className="relative inline-flex min-h-11 shrink-0 cursor-pointer items-center">
                    <span className="sr-only">{copy.analyticsToggle}</span>
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="h-7 w-12 rounded-full border border-[#7a6a4b] bg-[#efe6d6] transition peer-checked:bg-[#17120b]" />
                    <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={saveSettings}
                className="min-h-12 rounded-xl border border-[#7a6a4b] bg-white px-5 py-3 text-sm font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {copy.save}
              </button>
              <button
                type="button"
                onClick={rejectAnalytics}
                className="min-h-12 rounded-xl border border-[#7a6a4b] bg-white px-5 py-3 text-sm font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {copy.rejectAnalytics}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
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

function getRawConsentSnapshot() {
  return window.localStorage.getItem(cookieConsentStorageKey);
}

function getServerConsentSnapshot(): RawConsentSnapshot {
  return "server";
}

function parseAnalyticsConsent(rawValue: RawConsentSnapshot) {
  if (!rawValue || rawValue === "server") {
    return false;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<{ analytics: unknown }>;
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

const cookieCopy: Record<Locale, Record<string, string>> = {
  es: {
    bannerAria: "Aviso de cookies",
    title: "Privacidad y cookies",
    description:
      "Utilizamos cookies necesarias para el funcionamiento de joyas.ai y cookies analíticas, como Google Analytics, únicamente si las autorizas. Nos ayudan a conocer cómo se utiliza la web y mejorarla.",
    accept: "Aceptar",
    reject: "Rechazar",
    configure: "Configurar",
    settingsAria: "Configuración de cookies",
    settingsTitle: "Configurar cookies",
    settingsDescription: "Puedes cambiar tu elección sobre cookies analíticas en cualquier momento.",
    close: "Cerrar",
    necessary: "Necesarias",
    alwaysOn: "Siempre activadas.",
    active: "Activas",
    analytics: "Analíticas",
    analyticsDescription:
      "Permiten medir de forma agregada cómo se utiliza joyas.ai. Para esta finalidad utilizamos Google Analytics cuando das tu consentimiento.",
    analyticsToggle: "Activar cookies analíticas",
    save: "Guardar configuración",
    rejectAnalytics: "Rechazar analíticas",
  },
  "pt-BR": {
    bannerAria: "Aviso de cookies",
    title: "Privacidade e cookies",
    description:
      "Usamos cookies necessárias para o funcionamento da joyas.ai e cookies analíticos, como o Google Analytics, apenas se você autorizar. Eles nos ajudam a entender como o site é usado e a melhorá-lo.",
    accept: "Aceitar",
    reject: "Recusar",
    configure: "Configurar",
    settingsAria: "Configuração de cookies",
    settingsTitle: "Configurar cookies",
    settingsDescription: "Você pode alterar sua escolha sobre cookies analíticos a qualquer momento.",
    close: "Fechar",
    necessary: "Necessários",
    alwaysOn: "Sempre ativados.",
    active: "Ativos",
    analytics: "Analíticos",
    analyticsDescription:
      "Permitem medir de forma agregada como a joyas.ai é usada. Para essa finalidade usamos Google Analytics quando você dá seu consentimento.",
    analyticsToggle: "Ativar cookies analíticos",
    save: "Salvar configuração",
    rejectAnalytics: "Recusar analíticos",
  },
  en: {
    bannerAria: "Cookie notice",
    title: "Privacy and cookies",
    description:
      "We use necessary cookies for joyas.ai to work and analytics cookies, such as Google Analytics, only if you allow them. They help us understand how the site is used and improve it.",
    accept: "Accept",
    reject: "Reject",
    configure: "Configure",
    settingsAria: "Cookie settings",
    settingsTitle: "Cookie settings",
    settingsDescription: "You can change your analytics cookie choice at any time.",
    close: "Close",
    necessary: "Necessary",
    alwaysOn: "Always active.",
    active: "Active",
    analytics: "Analytics",
    analyticsDescription:
      "They let us measure in aggregate how joyas.ai is used. For this purpose we use Google Analytics when you give consent.",
    analyticsToggle: "Enable analytics cookies",
    save: "Save settings",
    rejectAnalytics: "Reject analytics",
  },
};

function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) {
    return "pt-BR";
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return "es";
}
