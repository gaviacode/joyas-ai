import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Transparencia y afiliacion | joyas.ai",
  description:
    "Informacion sobre enlaces externos, posible afiliacion y criterios de transparencia en joyas.ai.",
};

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs items={[{ href: "/transparencia", label: "Transparencia" }]} />
        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Transparencia y afiliacion
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">
            Algunas secciones de joyas.ai pueden incorporar enlaces a tiendas externas. Cuando un enlace sea de afiliado, podremos recibir una comision si se realiza una compra, sin que ello suponga necesariamente un coste adicional para el usuario.
          </p>
        </header>
        <section className="mt-10 grid gap-5">
          <section className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Estado actual</h2>
            <p className="mt-4 leading-8 text-[#625746]">
              joyas.ai es un proyecto en desarrollo. No debe entenderse que todas las secciones tengan afiliacion activa ni que existan acuerdos comerciales con tiendas concretas salvo que se indique expresamente.
            </p>
          </section>
          <section className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Enlaces externos</h2>
            <p className="mt-4 leading-8 text-[#625746]">
              Antes de comprar en una tienda externa, revisa precio, disponibilidad, composicion, envio, devoluciones, garantia y condiciones de ajuste o personalizacion.
            </p>
          </section>
          <section className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Mas informacion</h2>
            <p className="mt-4 leading-8 text-[#625746]">
              Puedes consultar tambien el <Link href="/aviso-legal" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">aviso legal</Link> y la <Link href="/politica-privacidad" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">politica de privacidad</Link>.
            </p>
          </section>
        </section>
      </article>
    </main>
  );
}
