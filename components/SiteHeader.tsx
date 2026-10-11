"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher, { type LanguageLink } from "@/components/LanguageSwitcher";
import AdvisorResetLink from "@/components/AdvisorResetLink";
import Logo from "@/components/Logo";
import { localizeHref, localizeText, type Locale } from "@/lib/i18n";

const navLinks = [
  { href: "/#joyero-ia", label: "Recomendador" },
  { href: "/joyas", label: "Joyas" },
  { href: "/ocasiones", label: "Ocasiones" },
  { href: "/guias", label: "Guías" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

export default function SiteHeader({
  languageLinks,
  locale = "es",
}: {
  languageLinks?: LanguageLink[];
  locale?: Locale;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const localizedNavLinks = navLinks.map((link) => ({
    href: localizeHref(link.href, locale),
    label: localizeText(link.label, locale),
  }));
  const advisorHref = localizeHref("/#joyero-ia", locale);
  const homeHref = localizeHref("/", locale);
  const labels = {
    mainNav: locale === "pt-BR" ? "Navegação principal" : locale === "en" ? "Main navigation" : "Navegación principal",
    home: locale === "pt-BR" ? "Ir para o início de Joyas.ai" : locale === "en" ? "Go to Joyas.ai home" : "Ir al inicio de Joyas.ai",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8b3] bg-[#fffaf1]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-8 md:flex-col md:items-stretch md:gap-4 md:py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          <Logo href={homeHref} ariaLabel={labels.home} />
          <div className="md:hidden">
            <LanguageSwitcher links={languageLinks} variant="compact" />
          </div>
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <AdvisorResetLink
              href={advisorHref}
              className="hidden rounded-xl border border-[#d7a63c] bg-white px-4 py-2 text-sm font-semibold text-[#9a6b08] shadow-sm transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
            >
              {locale === "en" ? "Try AI" : locale === "pt-BR" ? "Testar IA" : "Probar IA"}
            </AdvisorResetLink>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-[#ead8b3] bg-white text-[#7a540f] shadow-sm transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
            >
              {isMobileMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav
          aria-label={labels.mainNav}
          className="hidden gap-2 overflow-x-auto pb-1 text-sm font-medium text-[#2b241f] md:flex md:items-center md:gap-6 md:overflow-visible md:pb-0"
        >
          {localizedNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-white hover:text-[#b97a05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher links={languageLinks} />
          <AdvisorResetLink
            href={advisorHref}
            className="rounded-xl border border-[#d7a63c] bg-white px-5 py-3 text-sm font-semibold text-[#9a6b08] shadow-sm transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
          >
            {localizeText("Probar el joyero IA", locale)}
          </AdvisorResetLink>
        </div>
        <div className="hidden md:block lg:hidden">
          <LanguageSwitcher links={languageLinks} />
        </div>
      </div>

      {isMobileMenuOpen ? <div id="mobile-navigation" className="border-t border-[#ead8b3] bg-[#fffaf1] px-5 py-4 shadow-lg shadow-[#805400]/10 md:hidden">
        <nav aria-label={labels.mainNav} className="mx-auto grid max-w-7xl gap-1 text-sm font-medium text-[#2b241f]">
          {localizedNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 transition hover:bg-white hover:text-[#b97a05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div> : null}
    </header>
  );
}
