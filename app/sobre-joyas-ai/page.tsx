import type { Metadata } from "next";
import AiAdvisorCta from "@/components/AiAdvisorCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Sobre joyas.ai | joyas.ai",
  description:
    "Conoce joyas.ai, un proyecto para elegir joyas con ayuda de IA, contenido educativo y criterios de compra claros.",
};

export default function AboutJoyasAiPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs items={[{ href: "/sobre-joyas-ai", label: "Sobre joyas.ai" }]} />
        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Sobre joyas.ai
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">
            joyas.ai nace con la idea de hacer mas sencilla una decision que a menudo resulta complicada: elegir una joya para otra persona o para uno mismo.
          </p>
        </header>
        <section className="mt-10 grid gap-5">
          {[
            ["Orientacion mediante IA", "El recomendador ayuda a ordenar informacion sobre ocasion, presupuesto, destinatario y estilo para proponer tipos de joyas y criterios de eleccion."],
            ["Contenido educativo", "Las guias explican materiales, tallas, cuidados y piedras con prudencia, indicando cuando algo depende de la pieza concreta."],
            ["Comparacion de opciones", "La web busca ayudar a comparar alternativas sin inventar clientes, metricas, expertos inexistentes ni garantias que no correspondan."],
          ].map(([title, text]) => (
            <section key={title} className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
              <p className="mt-4 leading-8 text-[#625746]">{text}</p>
            </section>
          ))}
        </section>
        <div className="mt-8">
          <AiAdvisorCta />
        </div>
      </article>
    </main>
  );
}
