import Link from "next/link";
import LanguageSwitcher, { type LanguageLink } from "@/components/LanguageSwitcher";
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
  const localizedNavLinks = navLinks.map((link) => ({
    href: localizeHref(link.href, locale),
    label: localizeText(link.label, locale),
  }));
  const advisorHref = localizeHref("/#joyero-ia", locale);
  const homeHref = localizeHref("/", locale);
  const labels = {
    mainNav: locale === "pt-BR" ? "Navegação principal" : locale === "en" ? "Main navigation" : "Navegación principal",
    home: locale === "pt-BR" ? "Ir para o início de joyas.ai" : locale === "en" ? "Go to joyas.ai home" : "Ir al inicio de joyas.ai",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8b3] bg-[#fffaf1]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Logo href={homeHref} ariaLabel={labels.home} />
          <Link
            href={advisorHref}
            className="inline-flex rounded-xl border border-[#d7a63c] bg-white px-4 py-2 text-sm font-semibold text-[#9a6b08] shadow-sm transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] md:hidden"
          >
            {locale === "en" ? "Try AI" : locale === "pt-BR" ? "Testar IA" : "Probar IA"}
          </Link>
        </div>

        <nav
          aria-label={labels.mainNav}
          className="flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-[#2b241f] md:items-center md:gap-6 md:overflow-visible md:pb-0"
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
          <Link
            href={advisorHref}
            className="rounded-xl border border-[#d7a63c] bg-white px-5 py-3 text-sm font-semibold text-[#9a6b08] shadow-sm transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
          >
            {localizeText("Probar el joyero IA", locale)}
          </Link>
        </div>
        <div className="lg:hidden">
          <LanguageSwitcher links={languageLinks} />
        </div>
      </div>
    </header>
  );
}
