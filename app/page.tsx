import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import AdvisorResetLink from "@/components/AdvisorResetLink";
import JewelryChat from "@/components/JewelryChat";
import ExternalGiftIdeasCta from "@/components/ExternalGiftIdeasCta";
import { getHomeMetadataAlternates, openGraphLocales } from "@/lib/i18n";
import { absoluteUrl, PUBLIC_CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Joyas.ai | Encuentra la joya perfecta con inteligencia artificial",
  description:
    "Joyas.ai te ayuda a encontrar la joya perfecta según persona, ocasión, estilo y presupuesto con inteligencia artificial.",
  alternates: getHomeMetadataAlternates("es"),
  openGraph: {
    title: "Joyas.ai | Encuentra la joya perfecta con inteligencia artificial",
    description:
      "Joyas.ai te ayuda a encontrar la joya perfecta según persona, ocasión, estilo y presupuesto con inteligencia artificial.",
    url: "/",
    siteName: "Joyas.ai",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Joyas.ai - Tu joyero IA" }],
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyas.ai | Encuentra la joya perfecta con inteligencia artificial",
    description:
      "Joyas.ai te ayuda a encontrar la joya perfecta según persona, ocasión, estilo y presupuesto con inteligencia artificial.",
    images: ["/opengraph-image"],
  },
};

const categories = [
  { href: "/joyas/anillos", title: "Anillos", text: "Uso diario, regalo, compromiso, alianzas y talla.", image: "/images/categories/categoria-anillos.png" },
  { href: "/joyas/collares", title: "Collares", text: "Longitud, colgantes, escotes y materiales.", image: "/images/categories/categoria-collares.png" },
  { href: "/joyas/pulseras", title: "Pulseras", text: "Cierres, talla, grabados y comodidad.", image: "/images/categories/categoria-pulseras.png" },
  { href: "/joyas/pendientes", title: "Pendientes", text: "Tamaño, cierre, peso, estilo y ocasión.", image: "/images/categories/categoria-pendientes.png" },
  { href: "/joyas/boda", title: "Joyas para boda", text: "Alianzas, novia, novio, madrina e invitadas.", image: "/images/categories/categoria-joyas-boda.png" },
];

const occasions = [
  { href: "/ocasiones/aniversario", label: "Aniversario" },
  { href: "/ocasiones/compromiso", label: "Compromiso" },
  { href: "/ocasiones/boda", label: "Boda" },
  { href: "/ocasiones/cumpleanos", label: "Cumpleaños" },
  { href: "/ocasiones/san-valentin", label: "San Valentín" },
  { href: "/ocasiones/dia-de-la-madre", label: "Día de la madre" },
  { href: "/ocasiones/graduacion", label: "Graduación" },
  { href: "/ocasiones/regalo-sorpresa", label: "Regalo sorpresa" },
];

const guideLinks = [
  { href: "/joyas/anillos/como-saber-talla-anillo", label: "Talla de anillo" },
  { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
  { href: "/guias/plata-925", label: "Plata 925" },
  { href: "/guias/piedras-preciosas", label: "Piedras preciosas" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <script
        id="home-website-organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeStructuredData()) }}
      />
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-0 pt-8 sm:px-8 md:pb-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-10 lg:pb-14 lg:pt-10">
        <div>
          <p className="mb-4 hidden rounded-full border border-[#d7a63c]/30 bg-white/80 px-4 py-2 text-sm text-[#9a6b08] shadow-sm md:inline-flex">
            Recomendador de joyas con inteligencia artificial
          </p>
          <h1 className="max-w-3xl text-[36px] font-semibold leading-[1.03] tracking-[-0.04em] text-[#17120f] md:text-6xl md:leading-[0.98] lg:text-7xl">
            Encuentra la joya perfecta con IA
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#63584c] md:mt-6 md:text-lg md:leading-8">
            La IA de joyas.ai te ayuda a elegir anillos, collares, pulseras o pendientes según la ocasión, el estilo y tu presupuesto.
          </p>
          <AdvisorResetLink href="/es#joyero-ia" className="mt-9 hidden w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#b97a05] to-[#d7a63c] px-7 py-4 font-semibold text-white shadow-lg shadow-[#b97a05]/20 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] sm:w-[220px] md:inline-flex">
            Probar el joyero IA
          </AdvisorResetLink>
        </div>
        <HeroJewelry className="hidden md:block" />
      </section>

      <section className="px-5 pb-0 pt-6 sm:px-8 md:py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <JewelryChat />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-0 pt-8 sm:px-8 md:py-14 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">Categorías</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Explora por tipo de joya</h2>
          <p className="mt-4 text-lg leading-8 text-[#63584c]">
            <span className="md:hidden">Guías para elegir mejor según estilo, material y ocasión.</span>
            <span className="hidden md:inline">Cada guía explica estilos, materiales, momentos de uso y errores frecuentes para elegir con más criterio.</span>
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </section>

      <ExternalGiftIdeasCta
        title="¿Buscas algo más que una joya?"
        description="Descubre ideas de regalos personalizadas con IA para encontrar otras opciones según la persona, la ocasión y el presupuesto."
        ctaLabel="Ver ideas de regalos en Regalar.ai"
      />

      <section className="bg-white/55 px-5 pb-0 pt-8 sm:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">Ocasiones</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Elige según el momento</h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-7 md:grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <Link key={occasion.href} href={occasion.href} className="flex min-h-16 items-center rounded-2xl border border-[#ead8b3] bg-white p-3 text-sm font-semibold leading-5 text-[#2b241f] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d7a63c] hover:text-[#9a6b08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] md:block md:min-h-0 md:p-5 md:text-base md:leading-normal">
                {occasion.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 pt-8 sm:px-8 md:py-14 lg:grid-cols-[1fr_1fr] lg:px-10">
        <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Guías para comprar mejor</h2>
          <p className="mt-4 leading-8 text-[#625746]">
            <span className="md:hidden">Lo esencial sobre tallas, materiales, cuidados y piedras.</span>
            <span className="hidden md:inline">Aprende lo esencial sobre materiales, tallas, cuidados y piedras antes de tomar una decisión.</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-1">
            {guideLinks.map((guide) => (
              <Link key={guide.href} href={guide.href} className="flex min-h-16 items-center rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-3 text-sm font-semibold leading-5 text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] md:block md:min-h-0 md:p-4 md:text-base md:leading-normal">
                {guide.label}
              </Link>
            ))}
          </div>
          <Link href="/guias" className="mt-6 inline-flex rounded-xl bg-[#17120b] px-5 py-3 font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
            Ver todas las guías
          </Link>
        </article>

        <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Preguntas frecuentes</h2>
          <p className="mt-4 leading-8 text-[#625746]">
            Respuestas claras sobre el recomendador, afiliación, tallas, oro, plata y límites de una recomendación.
          </p>
          <div className="mt-6 grid gap-3">
            {["¿Joyas.ai vende joyas directamente?", "¿Cómo sabe la IA qué joya recomendarme?", "¿Qué significa plata 925?"].map((question) => (
              <Link key={question} href="/preguntas-frecuentes" className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#2b241f] transition hover:bg-[#fff5df] hover:text-[#9a6b08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
                {question}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function buildHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: SITE_NAME,
        alternateName: ["Joyas", "joyas.ai"],
        url: absoluteUrl("/"),
      },
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        email: PUBLIC_CONTACT_EMAIL,
      },
    ],
  };
}

function HeroJewelry({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-[#ead8b3] bg-white p-3 shadow-2xl shadow-[#805400]/10 sm:p-4 ${className}`}>
      <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#f8ecd4] sm:aspect-[16/11] lg:min-h-[430px]">
        <Image src="/images/hero-joyas-aniversario.png" alt="Joyeria dorada elegante con collar, anillo, pulsera y pendientes sobre marmol claro" fill priority sizes="(max-width: 1024px) 100vw, 640px" className="object-cover object-center" />
      </div>
    </div>
  );
}

function CategoryCard({ href, title, text, image }: { href: string; title: string; text: string; image: string }) {
  return (
    <Link href={href} className="group flex min-h-[120px] overflow-hidden rounded-3xl border border-[#ead8b3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] md:block">
      <div className="relative w-[35%] shrink-0 self-stretch bg-[#f8ecd4] md:h-48 md:w-auto">
        <Image src={image} alt={`Guía de ${title.toLowerCase()} en Joyas.ai`} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center p-4 md:block md:p-6">
        <h3 className="text-lg font-semibold leading-tight tracking-[-0.03em] md:text-2xl md:leading-normal">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#7c7064] md:mt-2 md:line-clamp-none md:text-base md:leading-7">{text}</p>
        <span className="mt-2 inline-flex text-sm font-semibold text-[#9a6b08] md:mt-5 md:text-base">Ver guía</span>
      </div>
    </Link>
  );
}
