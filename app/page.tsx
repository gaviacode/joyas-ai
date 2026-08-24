import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import JewelryChat from "@/components/JewelryChat";
import { getHomeMetadataAlternates, openGraphLocales } from "@/lib/i18n";
import { absoluteUrl, PUBLIC_CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Encuentra el regalo ideal con IA | Regalos.ai",
  description:
    "Recomendador IA para encontrar regalos según la personalidad, gustos, ocasión y presupuesto de la persona.",
  alternates: getHomeMetadataAlternates("es"),
  openGraph: {
    title: "Encuentra el regalo ideal con IA | Regalos.ai",
    description:
      "Recomendador IA para encontrar regalos según la personalidad, gustos, ocasión y presupuesto de la persona.",
    url: "/",
    siteName: "Regalos.ai",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Regalos.ai - Recomendador de regalos con IA" }],
    locale: openGraphLocales.es,
    alternateLocale: [openGraphLocales["pt-BR"], openGraphLocales.en],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Encuentra el regalo ideal con IA | Regalos.ai",
    description:
      "Recomendador IA para encontrar regalos según la personalidad, gustos, ocasión y presupuesto de la persona.",
    images: ["/opengraph-image"],
  },
};

const categories = [
  { href: "/joyas/regalos", title: "Perfumes", text: "Aromas según personalidad, ocasión y estilo.", image: "/images/categories/categoria-regalos-especiales.png" },
  { href: "/guias", title: "Libros", text: "Lecturas para personas curiosas, creativas o tranquilas.", image: "/images/categories/categoria-collares.png" },
  { href: "https://joyas.ai", title: "Joyas", text: "Joyas y relojes preparados para conectar con joyas.ai.", image: "/images/categories/categoria-anillos.png" },
  { href: "/ocasiones", title: "Experiencias", text: "Planes memorables para compartir o disfrutar.", image: "/images/categories/categoria-joyas-boda.png" },
  { href: "/joyas/regalos", title: "Ropa", text: "Prendas y accesorios cuando el estilo está claro.", image: "/images/categories/categoria-pendientes.png" },
  { href: "/joyas/regalos", title: "Tecnología", text: "Ideas útiles para perfiles prácticos o tecnológicos.", image: "/images/categories/categoria-pulseras.png" },
  { href: "/joyas/regalos", title: "Juegos de mesa", text: "Regalos sociales, divertidos y fáciles de compartir.", image: "/images/categories/categoria-regalos-especiales.png" },
  { href: "/joyas/regalos", title: "Suscripciones", text: "Regalos que continúan después del momento de entrega.", image: "/images/categories/categoria-collares.png" },
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
      <Script
        id="home-website-organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeStructuredData()) }}
      />
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-10 lg:pb-14 lg:pt-10">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[#d7a63c]/30 bg-white/80 px-4 py-2 text-sm text-[#9a6b08] shadow-sm">
            Recomendador de regalos con inteligencia artificial
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#17120f] sm:text-6xl lg:text-7xl">
            Encuentra el regalo ideal con IA
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#63584c]">
            Describe cómo es esa persona y descubre regalos pensados para su personalidad, sus gustos, la ocasión y tu presupuesto.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#joyero-ia" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#b97a05] to-[#d7a63c] px-7 py-4 font-semibold text-white shadow-lg shadow-[#b97a05]/20 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
              Probar el recomendador IA
            </Link>
            <Link href="/joyas/regalos" className="inline-flex items-center justify-center rounded-xl border border-[#d7a63c] bg-white px-7 py-4 font-semibold text-[#9a6b08] shadow-sm transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
              Explorar ideas
            </Link>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            <InfoChip title="Recomendaciones honestas" text="Ideas claras, sin inventar productos ni valoraciones falsas." />
            <InfoChip title="Pensado para regalar" text="según ocasión, estilo, presupuesto y persona." />
            <InfoChip title="Orientación rápida" text="Dinos cómo es esa persona y la IA te ayuda a ordenar opciones." />
          </div>
        </div>
        <HeroJewelry />
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <JewelryChat />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">Categorías</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Explora por tipo de regalo</h2>
          <p className="mt-4 text-lg leading-8 text-[#63584c]">
            Las categorías ayudan a orientar la búsqueda, pero la IA decide qué encaja mejor según la persona.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </section>

      <section className="bg-white/55 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">ocasiónes</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Elige según el momento</h2>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <Link key={occasion.href} href={occasion.href} className="rounded-2xl border border-[#ead8b3] bg-white p-5 font-semibold text-[#2b241f] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d7a63c] hover:text-[#9a6b08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
                {occasion.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10">
        <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Guías para comprar mejor</h2>
          <p className="mt-4 leading-8 text-[#625746]">
            Aprende lo esencial sobre materiales, tallas, cuidados y piedras antes de tomar una decisión.
          </p>
          <div className="mt-6 grid gap-3">
            {guideLinks.map((guide) => (
              <Link key={guide.href} href={guide.href} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
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
            {["joyas.ai vende joyas directamente?", "Cómo sabe la IA que joya recomendarme?", "Qué significa plata 925?"].map((question) => (
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
        alternateName: "Regalos.ai - Recomendador de regalos con IA",
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

function HeroJewelry() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#ead8b3] bg-white p-3 shadow-2xl shadow-[#805400]/10 sm:p-4">
      <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#f8ecd4] sm:aspect-[16/11] lg:min-h-[430px]">
        <Image src="/images/hero-joyas-aniversario.png" alt="Joyeria dorada elegante con collar, anillo, pulsera y pendientes sobre marmol claro" fill priority sizes="(max-width: 1024px) 100vw, 640px" className="object-cover object-center" />
      </div>
    </div>
  );
}

function InfoChip({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#ead8b3] bg-white/75 p-4 shadow-sm">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-[#7c7064]">{text}</p>
    </div>
  );
}

function CategoryCard({ href, title, text, image }: { href: string; title: string; text: string; image: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-3xl border border-[#ead8b3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
      <div className="relative h-48 bg-[#f8ecd4]">
        <Image src={image} alt={`Guia de ${title.toLowerCase()} en joyas.ai`} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
        <p className="mt-2 leading-7 text-[#7c7064]">{text}</p>
        <span className="mt-5 inline-flex font-semibold text-[#9a6b08]">Ver guía</span>
      </div>
    </Link>
  );
}
