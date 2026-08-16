import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | joyas.ai",
  description:
    "Respuestas transparentes sobre el recomendador de joyas con IA, presupuesto, afiliacion, tallas y materiales.",
};

const faqs = [
  {
    question: "joyas.ai vende joyas directamente?",
    answer:
      "No. joyas.ai orienta la eleccion y ofrece contenido informativo. Si en alguna seccion aparecen enlaces a tiendas externas, se deberan identificar con claridad.",
  },
  {
    question: "Las recomendaciones de la IA son independientes?",
    answer:
      "La IA genera recomendaciones a partir de la informacion proporcionada. Si existen enlaces comerciales o de afiliacion, la web debe explicarlo con transparencia para que el usuario pueda valorarlo.",
  },
  {
    question: "Como sabe la IA que joya recomendarme?",
    answer:
      "No lo sabe por si sola. Usa los datos que introduces, como ocasion, presupuesto, destinatario, estilo y materiales, para proponer opciones razonables.",
  },
  {
    question: "Tengo que indicar un presupuesto?",
    answer:
      "No es obligatorio, pero ayuda a evitar ideas poco realistas. Puede bastar con un rango aproximado.",
  },
  {
    question: "Puede ayudarme si no se nada de joyeria?",
    answer:
      "Si. Puedes describir a la persona y la ocasion con lenguaje normal. El recomendador te ayudara a ordenar opciones y dudas.",
  },
  {
    question: "Como puedo saber una talla de anillo?",
    answer:
      "Puedes medir un anillo que ya quede bien o consultar una joyeria. Para una compra sorpresa conviene revisar tambien la politica de ajuste.",
  },
  {
    question: "Que diferencia existe entre oro de 14k y 18k?",
    answer:
      "El oro de 18k contiene aproximadamente un 75 % de oro y el de 14k aproximadamente un 58,5 %. El resto son aleaciones que afectan a color, dureza y uso.",
  },
  {
    question: "Que significa plata 925?",
    answer:
      "Significa que la aleacion contiene un 92,5 % de plata. El resto corresponde a otros metales usados para mejorar su comportamiento en joyeria.",
  },
  {
    question: "Puede una recomendacion garantizar que el regalo guste?",
    answer:
      "No. Puede reducir dudas y proponer opciones coherentes, pero el gusto personal nunca se puede garantizar.",
  },
  {
    question: "joyas.ai puede mostrar productos de otras tiendas?",
    answer:
      "Puede incorporarlos en el futuro o en secciones concretas si se implementa. Cuando un enlace sea externo o de afiliado, debe indicarse de forma transparente.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs items={[{ href: "/preguntas-frecuentes", label: "Preguntas frecuentes" }]} />
        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Preguntas frecuentes
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#63584c]">
            Respuestas prudentes sobre el recomendador, materiales, tallas y transparencia comercial.
          </p>
        </header>
        <section className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-[-0.03em]">{faq.question}</h2>
              <p className="mt-3 leading-8 text-[#625746]">{faq.answer}</p>
            </article>
          ))}
        </section>
        <div className="mt-8 rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-6">
          <Link href="/#joyero-ia" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">
            Probar el joyero IA
          </Link>
          <span className="text-[#625746]"> o consultar las </span>
          <Link href="/guias" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">
            guias de joyeria
          </Link>
          <span className="text-[#625746]">.</span>
        </div>
      </article>
    </main>
  );
}
