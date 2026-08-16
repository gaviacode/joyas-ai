"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { localizeHref, localizeText, type Locale } from "@/lib/i18n";

const footerGroups = [
  {
    title: "JOYAS.AI",
    links: [
      { href: "/#joyero-ia", label: "Recomendador" },
      { href: "/como-funciona", label: "Como funciona" },
      { href: "/sobre-joyas-ai", label: "Sobre joyas.ai" },
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
      { href: "/ocasiones/san-valentin", label: "San Valentin" },
      { href: "/ocasiones/dia-de-la-madre", label: "Dia de la madre" },
    ],
  },
  {
    title: "GUIAS",
    links: [
      { href: "/guias", label: "Guias de joyeria" },
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
      { href: "/aviso-legal", label: "Aviso legal" },
      { href: "/politica-privacidad", label: "Privacidad" },
      { href: "/cookies", label: "Cookies" },
    ],
    extra: "cookie-settings",
  },
];

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

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
                  : "Recomendador de joyas con IA, guias de compra y contenido informativo para elegir con mas criterio."}
            </p>
          </div>

          <nav aria-label="Enlaces del pie de pagina" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold tracking-[0.18em] text-[#9b7b3a]">
                  {group.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={localizeHref(link.href, locale)} className="transition hover:text-[#17120b]">
                        {localizeText(link.label, locale)}
                      </Link>
                    </li>
                  ))}
                  {group.extra === "cookie-settings" ? (
                    <li>
                      <CookieSettingsButton />
                    </li>
                  ) : null}
                </ul>
              </div>
            ))}
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
