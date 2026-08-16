"use client";

import { openCookieSettings } from "@/lib/cookie-consent";
import type { Locale } from "@/lib/i18n";

export default function CookieSettingsButton({ locale = "es" }: { locale?: Locale }) {
  const label = locale === "pt-BR" ? "Configurar cookies" : locale === "en" ? "Cookie settings" : "Configurar cookies";

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-left transition hover:text-[#17120b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
    >
      {label}
    </button>
  );
}
