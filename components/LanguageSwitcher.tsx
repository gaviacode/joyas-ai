"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { LANGUAGE_COOKIE_MAX_AGE, LANGUAGE_COOKIE_NAME } from "@/lib/language-preference";

export type LanguageLink = {
  locale: Locale;
  href: string;
  label: string;
};

const defaultLinks: LanguageLink[] = [
  { locale: "es", href: "/", label: "ES" },
  { locale: "pt-BR", href: "/pt-br", label: "PT-BR" },
  { locale: "en", href: "/en", label: "EN" },
];

export default function LanguageSwitcher({ links = defaultLinks }: { links?: LanguageLink[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Selector de idioma" className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#ead8b3] bg-white/80 p-1 text-xs font-semibold">
      {links.map((link) => {
        const active = isActiveLanguage(pathname, link.locale);

        return (
          <Link
            key={link.locale}
            href={link.href}
            hrefLang={link.locale}
            onClick={() => saveLanguagePreference(link.locale)}
            className={`whitespace-nowrap rounded-full px-3 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] ${
              active
                ? "bg-[#17120b] text-white"
                : "text-[#6f6255] hover:bg-[#fff5df] hover:text-[#17120b]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function saveLanguagePreference(locale: Locale) {
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${locale}; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

function isActiveLanguage(pathname: string, locale: Locale) {
  if (locale === "pt-BR") {
    return pathname === "/pt-br" || pathname.startsWith("/pt-br/");
  }

  if (locale === "en") {
    return pathname === "/en" || pathname.startsWith("/en/");
  }

  return !pathname.startsWith("/pt-br") && !pathname.startsWith("/en");
}
