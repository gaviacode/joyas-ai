import type { Metadata } from "next";
import Image from "next/image";
import JewelryChat from "@/components/JewelryChat";

export const metadata: Metadata = {
  title: "joyas.ai | Tu joyero experto con IA",
  description:
    "Encuentra la joya perfecta con ayuda de inteligencia artificial: anillos, collares, pulseras, pendientes y regalos especiales según ocasión, presupuesto y estilo.",
};

const categories = [
  {
    title: "Anillos",
    image: "/images/categories/categoria-anillos.png",
    alt: "Anillos dorados sobre mármol y satén",
    description: "Ideas para compromiso, aniversario o regalos especiales.",
  },
  {
    title: "Collares",
    image: "/images/categories/categoria-collares.png",
    alt: "Collares dorados sobre mármol y satén",
    description: "Opciones elegantes, minimalistas o con significado personal.",
  },
  {
    title: "Pulseras",
    image: "/images/categories/categoria-pulseras.png",
    alt: "Pulseras doradas sobre mármol y satén",
    description: "Joyas versátiles para diario, ocasiones especiales o pareja.",
  },
  {
    title: "Pendientes",
    image: "/images/categories/categoria-pendientes.png",
    alt: "Pendientes dorados sobre mármol y satén",
    description: "Recomendaciones según estilo, rostro y tipo de ocasión.",
  },
  {
    title: "Joyas para boda",
    image: "/images/categories/categoria-joyas-boda.png",
    alt: "Joyas doradas para boda sobre mármol y satén",
    description: "Detalles para novia, invitadas, madrinas o aniversario.",
  },
  {
    title: "Regalos especiales",
    image: "/images/categories/categoria-regalos-especiales.png",
    alt: "Caja de regalo con joyas doradas sobre mármol y satén",
    description: "Joyas pensadas para cumpleaños, aniversarios y celebraciones.",
  },
];

const steps = [
  {
    number: "01",
    title: "Cuéntanos la ocasión",
    description:
      "Indica si buscas una joya para aniversario, boda, cumpleaños, compromiso o un detalle especial.",
  },
  {
    number: "02",
    title: "La IA actúa como joyero experto",
    description:
      "Analiza estilo, presupuesto, tipo de persona, material, ocasión y preferencias.",
  },
  {
    number: "03",
    title: "Recibe ideas seleccionadas",
    description:
      "Obtén recomendaciones claras para comparar y decidir mejor antes de comprar.",
  },
];

const occasions = [
  "Aniversario",
  "Compromiso",
  "Boda",
  "Cumpleaños",
  "San Valentín",
  "Día de la madre",
  "Graduación",
  "Regalo sorpresa",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#17120b]">
      <header className="sticky top-0 z-50 border-b border-[#eadfca] bg-[#fbf7ef]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <a href="#" className="text-2xl font-semibold tracking-tight">
            joyas<span className="text-[#b8872f]">.ai</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#625746] md:flex">
            <a href="#recomendador" className="transition hover:text-[#17120b]">
              Recomendador
            </a>
            <a href="#como-funciona" className="transition hover:text-[#17120b]">
              Cómo funciona
            </a>
            <a href="#categorias" className="transition hover:text-[#17120b]">
              Categorías
            </a>
          </nav>

          <a
            href="#recomendador"
            className="hidden rounded-full bg-[#17120b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2116] sm:inline-flex"
          >
            Empezar
          </a>
        </div>
      </header>

      <section
        id="recomendador"
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-24"
      >
        <div>
          <p className="mb-5 inline-flex rounded-full border border-[#d9c59a] bg-white/70 px-4 py-2 text-sm font-medium text-[#7a5a1d] shadow-sm">
            Recomendador de joyas con inteligencia artificial
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl lg:text-7xl">
            Encuentra la joya perfecta con IA
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#63584c]">
            Habla con un joyero experto con inteligencia artificial y descubre
            anillos, collares, pulseras o pendientes según la ocasión, tu
            presupuesto y su estilo.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#como-funciona"
              className="rounded-full bg-[#17120b] px-7 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-[#17120b]/10 transition hover:bg-[#2a2116]"
            >
              Ver cómo funcionará
            </a>

            <a
              href="#categorias"
              className="rounded-full border border-[#d9c59a] bg-white px-7 py-4 text-center text-sm font-semibold text-[#17120b] transition hover:border-[#b8872f]"
            >
              Explorar ideas
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#eadfca] bg-white/70 p-4">
              <p className="text-sm font-semibold">Sin métricas falsas</p>
              <p className="mt-2 text-sm leading-6 text-[#625746]">
                Solo recomendaciones honestas y claras.
              </p>
            </div>
            <div className="rounded-2xl border border-[#eadfca] bg-white/70 p-4">
              <p className="text-sm font-semibold">Pensado para regalos</p>
              <p className="mt-2 text-sm leading-6 text-[#625746]">
                Según ocasión, estilo y presupuesto.
              </p>
            </div>
            <div className="rounded-2xl border border-[#eadfca] bg-white/70 p-4">
              <p className="text-sm font-semibold">Diseño responsive</p>
              <p className="mt-2 text-sm leading-6 text-[#625746]">
                Móvil, tablet y escritorio desde el inicio.
              </p>
            </div>
          </div>
        </div>

        <HeroJewelry />

        <div className="lg:col-span-2">
          <JewelryChat />
        </div>
      </section>

      <section
        id="como-funciona"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Cómo funcionará
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Una guía sencilla para elegir mejor.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-[#eadfca] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#b8872f]">
                {step.number}
              </p>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#625746]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="categorias"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
              Categorías
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Ideas de joyas para empezar.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#625746]">
            La primera versión podrá organizar recomendaciones por tipo de joya,
            intención de regalo y ocasión.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className="group rounded-3xl border border-[#eadfca] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b8872f]/10"
            >
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[#f7ead0]">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#625746]">
                {category.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-[#7a6b57]">
          Imágenes ilustrativas. Las recomendaciones finales podrán incluir
          productos reales de tiendas afiliadas.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="rounded-[2rem] bg-[#17120b] p-8 text-white md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8ae5d]">
                Ocasiones
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                Para regalos donde acertar importa.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#d8d0c3]">
                La joya adecuada depende de la relación, el momento, el
                presupuesto y el mensaje que quieres transmitir.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {occasions.map((occasion) => (
                <div
                  key={occasion}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium"
                >
                  {occasion}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eadfca]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#625746] md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <p>
            joyas<span className="text-[#b8872f]">.ai</span> — Recomendador de
            joyas con IA.
          </p>
          <p>
            Proyecto en desarrollo. Las recomendaciones y enlaces comerciales se
            mostrarán con transparencia.
          </p>
        </div>
      </footer>
    </main>
  );
}
function HeroJewelry() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-[#ead8b3] bg-[#fff4dd] shadow-2xl shadow-[#805400]/10 sm:min-h-[390px] lg:min-h-[460px]">
      <Image
        src="/images/hero-joyas-aniversario.png"
        alt="Joyas doradas sobre mármol y seda"
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 680px"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-[#fffaf1]/10" />
    </div>
  );
}
