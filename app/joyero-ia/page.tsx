import type { Metadata } from "next";
import Link from "next/link";
import AiAdvisorCta from "@/components/AiAdvisorCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Joyero IA: recomendador de joyas | joyas.ai",
  description:
    "Que puede hacer el joyero IA de joyas.ai y ejemplos de consultas para recibir recomendaciones orientativas.",
};

const examples = [
  "Busco un regalo de aniversario de hasta 150 euros.",
  "Quiero unos pendientes discretos para alguien que suele llevar plata.",
  "Que tipo de collar podria regalar a mi pareja?",
  "Busco una joya de graduacion que pueda conservar durante muchos años.",
];

export default function AiJewelerPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs items={[{ href: "/joyero-ia", label: "Joyero IA" }]} />
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Recomendador
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Joyero IA para elegir con mas claridad
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">
            Esta pagina explica el recomendador; el chat esta en la home para mantener una unica experiencia. Desde aqui puedes volver directamente al joyero IA.
          </p>
        </header>

        <section className="mt-10 rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Que puede hacer</h2>
          <div className="mt-4 space-y-4 leading-8 text-[#625746]">
            <p>
              Puede proponer tipos de joya segun ocasion, destinatario, estilo, presupuesto y materiales preferidos. Tambien puede explicar por que una opcion encaja y que detalles deberias verificar antes de comprar.
            </p>
            <p>
              No muestra necesariamente productos concretos ni sustituye la informacion de una joyeria. Si en el futuro se incorporan enlaces externos o afiliados, se deberan indicar de forma transparente.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Ejemplos de consulta</h2>
          <div className="mt-5 grid gap-3">
            {examples.map((example) => (
              <p key={example} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 leading-7 text-[#625746]">
                {example}
              </p>
            ))}
          </div>
          <p className="mt-5 leading-8 text-[#625746]">
            Tambien puedes apoyarte en las <Link href="/guias" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">guias</Link> antes de preguntar.
          </p>
        </section>

        <div className="mt-8">
          <AiAdvisorCta />
        </div>
      </article>
    </main>
  );
}
