import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import RingMeasurementGuide from "@/components/ring-size/RingMeasurementGuide";
import RingSizeCalculator from "@/components/ring-size/RingSizeCalculator";
import RingSizeTable from "@/components/ring-size/RingSizeTable";

const pageUrl = "https://joyas.ai/joyas/anillos/como-saber-talla-anillo";

export const metadata: Metadata = {
  title: "Como saber tu talla de anillo: tabla y calculadora | joyas.ai",
  description:
    "Calcula tu talla de anillo midiendo el diametro de un anillo o la circunferencia de tu dedo. Consulta nuestra tabla de tallas y equivalencias.",
  alternates: {
    canonical: "/joyas/anillos/como-saber-talla-anillo",
  },
};

const faqs = [
  {
    question: "Como se cual es mi talla de anillo?",
    answer:
      "Mide la circunferencia del dedo en milimetros o el diametro interior de un anillo que ya te quede bien. Despues compara la medida con una tabla de tallas o usa la calculadora.",
  },
  {
    question: "Como puedo medir mi talla de anillo en casa?",
    answer:
      "Puedes rodear el dedo con una cinta flexible o una tira de papel, marcar el punto de union y medir esa longitud en milimetros sin apretar demasiado.",
  },
  {
    question: "Como puedo medir un anillo que ya tengo?",
    answer:
      "Coloca el anillo sobre una superficie plana y mide solo el diametro interior, de borde interno a borde interno. No incluyas el grosor del metal.",
  },
  {
    question: "Como se mide el diametro de un anillo?",
    answer:
      "El diametro se mide en linea recta atravesando el hueco interior del anillo. La regla debe tocar los dos bordes internos, no el borde exterior.",
  },
  {
    question: "Cual es la diferencia entre diametro y circunferencia?",
    answer:
      "El diametro es una linea recta dentro del anillo. La circunferencia es la vuelta completa interior. La circunferencia se obtiene multiplicando el diametro por pi.",
  },
  {
    question: "Como saber la talla de anillo de una mujer?",
    answer:
      "No existe una talla de anillo de mujer universal. Debe medirse el dedo concreto donde ira el anillo o usar un anillo que esa persona ya lleve en ese mismo dedo.",
  },
  {
    question: "Como saber la talla de anillo de un hombre?",
    answer:
      "La forma fiable es la misma: medir circunferencia del dedo o diametro interior de un anillo que le quede bien. Evita usar supuestas tallas medias.",
  },
  {
    question: "Como puedo saber la talla de mi pareja sin preguntarle?",
    answer:
      "Puedes medir discretamente un anillo que use en el mismo dedo, pedir ayuda a alguien cercano o comparar un anillo existente con una guia de tallas.",
  },
  {
    question: "La talla es igual en todos los dedos?",
    answer:
      "No. Cada dedo puede tener una medida distinta, y tambien puede haber diferencias entre la mano derecha y la izquierda.",
  },
  {
    question: "La talla de anillo es igual en todos los paises?",
    answer:
      "No. EU/ISO usa la circunferencia interior en milimetros. España usa habitualmente una variante local relacionada, y otros paises tienen escalas distintas.",
  },
  {
    question: "Que hago si estoy entre dos tallas?",
    answer:
      "Consulta la guia del fabricante. La decision puede depender del ancho, el diseño, los nudillos, la preferencia de ajuste y la politica de cambios.",
  },
  {
    question: "Puede cambiar mi talla segun el momento del dia?",
    answer:
      "Puede variar ligeramente por temperatura, actividad, hora del dia o hinchazon. Por eso conviene medir mas de una vez.",
  },
  {
    question: "Una talla de una marca equivale exactamente a la misma talla de otra?",
    answer:
      "No siempre. Las tablas comerciales pueden tener pequeñas variaciones. Antes de comprar, revisa la guia de tallas de la tienda concreta.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://joyas.ai/" },
        { "@type": "ListItem", position: 2, name: "Anillos", item: "https://joyas.ai/joyas/anillos" },
        { "@type": "ListItem", position: 3, name: "Como saber tu talla de anillo", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RingSizeSeoPage() {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <Script
        id="ring-size-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          items={[
            { href: "/joyas/anillos", label: "Anillos" },
            { href: "/joyas/anillos/como-saber-talla-anillo", label: "Como saber tu talla de anillo" },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Guia de tallas
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">
            Como saber tu talla de anillo: guia, tabla y calculadora
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-[#63584c]">
            <p>
              Para saber tu talla de anillo necesitas convertir una medida fisica en una talla comprensible para la tienda: puedes medir un anillo que ya te queda bien o medir la circunferencia del dedo.
            </p>
            <p>
              Si tienes un anillo de referencia, mide su diametro interior en milimetros. Si no lo tienes, rodea el dedo con una cinta flexible o una tira de papel y mide la vuelta completa.
            </p>
            <p>
              La calculadora y la tabla de esta pagina usan EU/ISO como referencia principal y muestran tambien talla española aproximada. Para una compra concreta, revisa siempre la guia de tallas del fabricante.
            </p>
          </div>
        </header>

        <div className="mt-10">
          <RingSizeCalculator />
        </div>

        <div className="mt-8">
          <RingMeasurementGuide />
        </div>

        <Section title="Como medir tu dedo para saber la talla">
          <p>
            Para calcular la talla de anillo midiendo el dedo, utiliza una cinta flexible, una tira de papel o un material fino que no se estire. Rodea la base del dedo donde ira el anillo y marca el punto exacto donde se une.
          </p>
          <p>
            Extiende la tira y mide la distancia en milimetros. Esa medida es la circunferencia del dedo. No aprietes demasiado, porque una medida muy ajustada puede dar como resultado un anillo incomodo.
          </p>
        </Section>

        <div className="mt-8">
          <RingSizeTable />
        </div>

        <Section title="Diametro y circunferencia: no son lo mismo">
          <p>
            El diametro interior de un anillo es la distancia en linea recta entre dos puntos opuestos del hueco interior. Es la medida que obtienes cuando colocas una regla atravesando el centro del anillo.
          </p>
          <p>
            La circunferencia interior es la vuelta completa del anillo o del dedo. Matematicamente, circunferencia = diametro por pi. Por eso un diametro de 17,2 mm se aproxima a una circunferencia de 54 mm, no a una talla 17.
          </p>
        </Section>

        <Section title="Como saber tu talla de anillo en casa">
          <p>
            El metodo mas simple en casa es hacer dos mediciones y compararlas. Primero, si tienes un anillo que queda bien en el mismo dedo, mide su diametro interior. Despues, si puedes, mide tambien la circunferencia del dedo con una tira de papel.
          </p>
          <p>
            Si ambas lecturas apuntan a la misma talla o a tallas muy cercanas, tendras una referencia mas fiable. Si difieren mucho, revisa si has medido el borde exterior, si el papel estaba demasiado apretado o si has usado otro dedo.
          </p>
        </Section>

        <Section title="Como saber la talla de un anillo para regalar">
          <p>
            Para un regalo, lo mas seguro es partir de una joya que la persona ya use. Elige un anillo que le quede bien y que lleve en el mismo dedo para el que quieres comprar la nueva pieza.
          </p>
          <p>
            Si no tienes acceso a un anillo de referencia, puedes preguntar a alguien cercano si conoce la talla o elegir una joya menos dependiente de la medida, como un collar o una pulsera ajustable.
          </p>
        </Section>

        <Section title="Como saber la talla de anillo de tu pareja sin preguntarle">
          <p>
            Si quieres mantener la sorpresa, puedes medir discretamente un anillo que tu pareja ya utiliza, comparar ese anillo con una guia de tallas o pedir ayuda a una persona de confianza.
          </p>
          <p>
            Comprueba en que dedo usa ese anillo. Un anillo del dedo indice, del medio o de la otra mano no garantiza la misma talla que el anular. No asumas que todas las medidas de una persona son iguales.
          </p>
          <p>
            Si ademas necesitas decidir que estilo regalar, puedes consultar la guia de{" "}
            <Link href="/joyas/anillos" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">
              anillos
            </Link>{" "}
            o pedir ideas al joyero IA.
          </p>
        </Section>

        <Section title="Influye el dedo o la mano?">
          <p>
            Si. Distintos dedos pueden requerir medidas diferentes, y una misma persona puede tener pequeñas diferencias entre una mano y otra. La mano dominante tambien puede sentirse distinta al llevar anillos.
          </p>
          <p>
            Mide siempre el dedo concreto y la mano concreta donde ira la pieza. Esta precaucion es especialmente importante en anillos de compromiso, alianzas o regalos personalizados.
          </p>
        </Section>

        <Section title="Puede cambiar el tamaño del dedo?">
          <p>
            El tamaño del dedo puede variar ligeramente por temperatura, momento del dia, actividad fisica o hinchazon. Una medida tomada con mucho frio, calor o despues de actividad intensa puede no representar el ajuste habitual.
          </p>
          <p>
            Para evitar depender de una unica lectura, mide mas de una vez y compara resultados. Si hay mucha diferencia entre mediciones, espera a un momento en el que la mano este en una situacion normal y comoda.
          </p>
        </Section>

        <Section title="Que ocurre si estoy entre dos tallas?">
          <p>
            Estar entre dos tallas no tiene una respuesta universal. Puede depender del diseño, la anchura del anillo, la forma del dedo, los nudillos, la preferencia de ajuste y la tabla utilizada por el fabricante.
          </p>
          <p>
            En una pieza concreta, la mejor referencia es la guia de la tienda y sus condiciones de cambio o ajuste. No conviene aplicar automaticamente la misma decision a todos los anillos.
          </p>
        </Section>

        <Section title="Anillos anchos y anillos finos">
          <p>
            Dos anillos con la misma talla nominal pueden sentirse diferentes. Un anillo ancho ocupa mas superficie del dedo y puede notarse mas ajustado que una pieza fina, incluso si la medida interior es la misma.
          </p>
          <p>
            Los anillos finos suelen resultar mas faciles de mover, mientras que los diseños anchos o con interior especial pueden requerir revisar recomendaciones especificas del fabricante.
          </p>
        </Section>

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
            Errores frecuentes al medir la talla
          </h2>
          <ul className="mt-5 grid gap-3 text-[#625746] sm:grid-cols-2">
            {[
              "Medir el diametro exterior en lugar del diametro interior.",
              "Confundir diametro y circunferencia.",
              "Utilizar centimetros cuando la tabla espera milimetros.",
              "Medir otro dedo diferente al que llevara el anillo.",
              "Usar como referencia un anillo que ya queda mal.",
              "Apretar demasiado el papel o la cinta flexible.",
              "Utilizar cuerda elastica o material que se estire.",
              "Mezclar sistemas de talla sin comprobar equivalencias.",
              "Asumir que todas las marcas utilizan exactamente la misma tabla.",
            ].map((error) => (
              <li key={error} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 leading-7">
                {error}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-[#17120b] p-6 text-white shadow-xl shadow-[#805400]/10 sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">
            Ya conoces la talla pero no sabes que anillo elegir?
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#f4e8d2]">
            Cuentale al joyero IA para quien es, la ocasion, su estilo y tu presupuesto.
          </p>
          <Link
            href="/#joyero-ia"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c971]"
          >
            Preguntar al joyero IA
          </Link>
        </section>

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
            Preguntas frecuentes sobre tallas de anillos
          </h2>
          <div className="mt-5 grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#17120b]">
                  {faq.question}
                </h3>
                <p className="mt-2 leading-7 text-[#625746]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
            Tambien te puede interesar
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/joyas/anillos", label: "Como elegir un anillo" },
              { href: "/joyas/regalos", label: "Joyas para regalar" },
              { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
              { href: "/guias/plata-925", label: "Plata 925" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#7a540f] transition hover:-translate-y-0.5 hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">{title}</h2>
      <div className="mt-4 space-y-4 leading-8 text-[#625746]">{children}</div>
    </section>
  );
}
