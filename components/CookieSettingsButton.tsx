"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-left transition hover:text-[#17120b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
    >
      Configurar cookies
    </button>
  );
}
