import type { Metadata } from "next";
import Link from "next/link";
import AiAdvisorCta from "@/components/AiAdvisorCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Como funciona el recomendador de joyas con IA | joyas.ai",
  description:
    "Explicacion transparente de como joyas.ai usa la informacion proporcionada para generar recomendaciones orientativas de joyas.",
};

const steps = [
  "El usuario explica que esta buscando.",
  "Puede indicar presupuesto, ocasion, destinatario, estilo y materiales preferidos.",
  "La IA utiliza esos datos para proponer tipos de joyas y criterios de eleccion.",
  "El usuario puede continuar la conversacion para afinar la recomendacion.",
  "Cuando existan productos externos o enlaces de afiliacion, deben identificarse correctamente.",
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs items={[{ href: "/como-funciona", label: "Como funciona" }]} />
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Joyero IA
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Como funciona joyas.ai
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">
            joyas.ai genera orientacion a partir de la informacion que le das. No conoce los gustos reales de otra persona ni sustituye la comprobacion de talla, materiales, precio o condiciones de compra.
          </p>
        </header>

        <section className="mt-10 rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Proceso</h2>
          <ol className="mt-5 grid gap-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1d2] font-semibold text-[#9a6b08]">
                  {index + 1}
                </span>
                <span className="leading-7 text-[#625746]">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Que puede y que no puede hacer
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-[#625746]">
            <p>
              Puede ayudarte a comparar tipos de joyas, identificar riesgos de compra y ordenar criterios como ocasion, presupuesto, metal, talla o estilo.
            </p>
            <p>
              No puede garantizar que el regalo guste, confirmar disponibilidad de productos externos ni verificar por si sola composicion, certificados o politicas de una tienda.
            </p>
            <p>
              Para dudas sobre materiales puedes consultar las <Link href="/guias" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">guias de joyeria</Link>.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <AiAdvisorCta />
        </div>
      </article>
    </main>
  );
}
