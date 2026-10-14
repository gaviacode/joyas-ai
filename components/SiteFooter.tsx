"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { localizeHref, localizeText, type Locale } from "@/lib/i18n";

type FooterLink = {
  href: string;
  label: string;
  legal?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
  extra?: "cookie-settings";
};

const footerGroups: FooterGroup[] = [
  {
    title: "JOYAS.AI",
    links: [
      { href: "/recomendador-de-joyas", label: "Recomendador" },
      { href: "/como-funciona", label: "Cómo funciona" },
      { href: "/sobre-joyas-ai", label: "Sobre Joyas.ai" },
    ],
  },
  {
    title: "JOYAS",
    links: [
      { href: "/joyas/anillos", label: "Anillos" },
      { href: "/joyas/collares", label: "Collares" },
      { href: "/joyas/pulseras", label: "Pulseras" },
      { href: "/joyas/pendientes", label: "Pendientes" },
      { href: "/joyas/boda", label: "Joyas para boda" },
    ],
  },
  {
    title: "OCASIONES",
    links: [
      { href: "/ocasiones/aniversario", label: "Aniversario" },
      { href: "/ocasiones/compromiso", label: "Compromiso" },
      { href: "/ocasiones/cumpleanos", label: "Cumpleaños" },
      { href: "/ocasiones/san-valentin", label: "San Valentín" },
      { href: "/ocasiones/dia-de-la-madre", label: "Día de la madre" },
    ],
  },
  {
    title: "GUIAS",
    links: [
      { href: "/guias", label: "Guías de joyería" },
      { href: "/joyas/anillos/como-saber-talla-anillo", label: "Talla de anillo" },
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/como-cuidar-joyas", label: "Cuidado de joyas" },
    ],
  },
  {
    title: "INFORMACION",
    links: [
      { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
      { href: "/transparencia", label: "Transparencia" },
      { href: "/transparencia-afiliacion", label: "Transparencia de afiliación" },
      { href: "/contacto", label: "Contacto" },
      { href: "/aviso-legal", label: "Aviso legal", legal: true },
      { href: "/politica-privacidad", label: "Privacidad", legal: true },
      { href: "/cookies", label: "Cookies", legal: true },
    ],
    extra: "cookie-settings",
  },
];

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const footerAriaLabel =
    locale === "pt-BR" ? "Links do rodapé" : locale === "en" ? "Footer links" : "Enlaces del pie de página";

  function toggleGroup(title: string) {
    setOpenGroups((groups) => (
      groups.includes(title)
        ? groups.filter((group) => group !== title)
        : [...groups, title]
    ));
  }

  return (
    <footer className="border-t border-[#eadfca] bg-[#fbf7ef]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-[#625746] md:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-md">
            <Link href={localizeHref("/", locale)} className="font-semibold text-[#17120b]">
              joyas<span className="text-[#b8872f]">.ai</span>
            </Link>
            <p className="mt-3 leading-6">
              {locale === "pt-BR"
                ? "Recomendador de joias com IA, guias de compra e conteúdo informativo para escolher com mais critério."
                : locale === "en"
                  ? "AI jewelry advisor, buying guides and practical content for choosing with more confidence."
                : "Recomendador de joyas con IA, guías de compra y contenido informativo para elegir con más criterio."}
            </p>
          </div>

          <nav aria-label={footerAriaLabel} className="grid gap-0 border-t border-[#eadfca] md:grid-cols-2 md:gap-6 md:border-t-0 lg:grid-cols-5">
            {footerGroups.map((group, index) => {
              const isOpen = openGroups.includes(group.title);
              const groupTitle = group.title === "JOYAS.AI" ? group.title : localizeText(group.title, locale);
              const groupId = `footer-group-${index}`;

              return (
              <div key={group.title} className="border-b border-[#eadfca] md:border-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={groupId}
                  onClick={() => toggleGroup(group.title)}
                  className="flex w-full items-center justify-between py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#9b7b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] md:hidden"
                >
                  {groupTitle}
                  <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                <h2 className="hidden text-xs font-semibold tracking-[0.18em] text-[#9b7b3a] md:block">
                  {groupTitle}
                </h2>
                <ul id={groupId} className={`${isOpen ? "block" : "hidden"} space-y-2 pb-4 md:mt-3 md:block md:pb-0`}>
                  {group.links.map((link) => (
                    <li key={link.href} className={link.legal ? "hidden md:list-item" : undefined}>
                      <Link href={localizeHref(link.href, locale)} className="transition hover:text-[#17120b]">
                        {localizeText(link.label, locale)}
                      </Link>
                    </li>
                  ))}
                  {group.extra === "cookie-settings" ? (
                    <li className="hidden md:list-item">
                      <CookieSettingsButton locale={locale} />
                    </li>
                  ) : null}
                </ul>
              </div>
              );
            })}
            <div className="border-b border-[#eadfca] py-4 md:hidden">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {footerGroups.flatMap((group) => group.links.filter((link) => link.legal)).map((link) => (
                  <Link
                    key={link.href}
                    href={localizeHref(link.href, locale)}
                    className="text-xs transition hover:text-[#17120b]"
                  >
                    {localizeText(link.label, locale)}
                  </Link>
                ))}
                <CookieSettingsButton locale={locale} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) {
    return "pt-BR";
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return "es";
}
