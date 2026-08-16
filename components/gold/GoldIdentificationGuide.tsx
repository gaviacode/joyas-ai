import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";
import { FaqSection, GoldCta, Section } from "@/components/gold/GoldKaratGuide";

const pageUrl = "https://joyas.ai/guias/como-saber-si-una-joya-es-de-oro";

const faqs = [
  {
    question: "¿Cómo saber si una joya es de oro de verdad?",
    answer:
      "Revisa marcas, documentacion y vendedor. Si hay dudas o valor economico, la comprobacion profesional es la via mas fiable.",
  },
  {
    question: "¿Cómo saber si un anillo es de oro?",
    answer:
      "Busca marcas en el interior del aro, revisa documentacion y observa desgaste, pero no tomes ninguna señal aislada como prueba absoluta.",
  },
  {
    question: "¿Cómo saber si una cadena es de oro?",
    answer:
      "Revisa cierre, terminales y placas pequenas, donde suelen aparecer marcas. Si el marcado esta ausente o desgastado, consulta a un profesional.",
  },
  {
    question: "¿El oro se pega a un imán?",
    answer:
      "El oro no es ferromagnetico, pero esta prueba solo aporta una pista. Hay muchos metales no magneticos.",
  },
  {
    question: "Si no se pega a un imán, ¿significa que es oro?",
    answer:
      "No. Que no se pegue a un imán no demuestra que sea oro, porque otros materiales tampoco reaccionan fuertemente.",
  },
  {
    question: "¿Qué significa 750 en una joya?",
    answer:
      "750 indica 750 partes de oro por cada 1.000, relacionado con oro de 18k. El grabado por si solo no demuestra autenticidad.",
  },
  {
    question: "¿Qué significa 585?",
    answer:
      "585 indica aproximadamente 58,5 % de oro, asociado a oro de 14k.",
  },
  {
    question: "¿Cómo distinguir oro macizo de oro chapado?",
    answer:
      "Conceptualmente son distintos: el oro macizo usa una aleacion de oro en la pieza, mientras el chapado tiene una capa superficial. Visualmente puede no ser infalible.",
  },
  {
    question: "¿Se puede saber si es oro por el color?",
    answer:
      "No de forma fiable. Hay aleaciones, chapados, oro blanco, oro rosa e imitaciones que pueden parecerse.",
  },
  {
    question: "¿Cuál es la forma más fiable de comprobar una joya?",
    answer:
      "Un análisis profesional, junto con documentación y contraste fiable, ofrece mucha más seguridad que una prueba casera aislada.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://joyas.ai/" },
        { "@type": "ListItem", position: 2, name: "Guías", item: "https://joyas.ai/guias" },
        { "@type": "ListItem", position: 3, name: "Oro y metales", item: "https://joyas.ai/guias/metales" },
        { "@type": "ListItem", position: 4, name: "Cómo saber si una joya es de oro", item: pageUrl },
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

export default function GoldIdentificationGuide({ languageLinks }: { languageLinks?: LanguageLink[] }) {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <Script
        id="gold-identification-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader languageLinks={languageLinks} />

      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          items={[
            { href: "/guias", label: "Guías" },
            { href: "/guias/metales", label: "Oro y metales" },
            { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Guía de comprobación
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">
            Cómo saber si una joya es de oro: marcas, pruebas y métodos fiables
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-[#63584c]">
            <p>
              Ningún método casero aislado ofrece siempre certeza absoluta para saber si una joya es de oro. Las marcas, el aspecto o el imán pueden orientar, pero no sustituyen una comprobación fiable.
            </p>
            <p>
              La forma más prudente combina contrastes, documentación, vendedor fiable y, cuando haya dudas, análisis profesional. Si quieres entender qué significan 585, 750, 14k o 18k, consulta nuestra{" "}
              <Link href="/guias/oro-14k-18k-24k" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">
                guía sobre los quilates del oro
              </Link>
              .
            </p>
          </div>
        </header>

        <Section title="Busca marcas y contrastes">
          <p>
            Empieza por revisar marcas como 585, 750 o 999, o indicaciones de quilates como 14k, 18k o 24k. Estas marcas suelen aparecer en zonas discretas de la joya.
          </p>
          <p>
            585 se relaciona con oro de 14k, 750 con oro de 18k y 999 con oro de muy alta pureza. Aun así, un grabado puede falsificarse o interpretarse mal: 750 por sí solo no demuestra que una pieza sea oro de 18k.
          </p>
        </Section>

        <Section title="¿Sirve un imán para saber si es oro?">
          <p>
            El oro no es ferromagnético, por lo que una pieza de oro no debería comportarse como hierro frente a un imán. Pero esta prueba tiene límites importantes.
          </p>
          <p>
            Que una pieza no sea atraída por un imán no demuestra que sea oro. Muchos otros metales tampoco reaccionan fuertemente a un imán, y una joya puede combinar materiales.
          </p>
        </Section>

        <Section title="¿Se puede reconocer el oro por el color?">
          <p>
            El color no basta para confirmar oro. Existen oro amarillo, blanco y rosa, además de chapados, baños e imitaciones que pueden parecer oro a simple vista.
          </p>
          <p>
            El oro blanco puede tener tratamientos o recubrimientos, y el oro rosa depende de aleaciones. Por eso el aspecto visual debe tratarse solo como una pista.
          </p>
        </Section>

        <Section title="¿El peso puede indicar si una joya es de oro?">
          <p>
            El oro es un metal denso, pero el peso en la mano no es una prueba concluyente. Tamaño, diseño, huecos, piedras, cierres y otros materiales cambian mucho la sensacion.
          </p>
          <p>
            Una medicion de densidad fiable exige metodo, precision y conocer bien el volumen de la pieza. En joyas con piedras, huecos o combinaciones de materiales puede ser especialmente dificil.
          </p>
        </Section>

        <Section title="Pruebas caseras: cuales son sus limites">
          <p>
            En Internet circulan pruebas con cerámica, vinagre, limón, ácidos, hielo o sonido. Muchas pueden ser poco fiables y algunas pueden dañar la joya, piedras, acabados o recubrimientos.
          </p>
          <p>
            No recomiendo manipular acidos ni productos peligrosos en casa para comprobar oro. Las pruebas quimicas son mas apropiadas para profesionales capacitados y pueden afectar la pieza si se realizan mal.
          </p>
        </Section>

        <Section title="Cómo distinguir oro macizo de una pieza chapada">
          <p>
            En una pieza de oro macizo, la aleacion de la propia pieza contiene oro en la proporcion indicada. En una pieza chapada, otro material puede estar cubierto por una capa superficial de oro.
          </p>
          <p>
            Una pieza chapada puede parecer oro externamente, sobre todo cuando esta nueva. Desgaste en zonas de roce puede aportar pistas, pero no es un metodo visual infalible.
          </p>
        </Section>

        <Section title="Cómo saber si un anillo es de oro">
          <p>
            Revisa el interior del aro con buena luz. Muchas marcas aparecen ahi porque es una zona discreta y relativamente protegida.
          </p>
          <p>
            Busca numeros como 585 o 750, marcas del fabricante y documentacion de compra. El desgaste o cambio de color puede aportar informacion, pero no proporciona certeza absoluta.
          </p>
        </Section>

        <Section title="Cómo saber si una cadena es de oro">
          <p>
            En cadenas y collares, revisa el cierre, terminales, pequenas placas o zonas proximas al broche. Las marcas pueden ser diminutas y estar en lugares poco visibles.
          </p>
          <p>
            Ten en cuenta que cierres y eslabones pueden haber sido reparados o sustituidos. Una marca en una parte de la cadena no siempre describe todos los componentes si la pieza ha sido modificada.
          </p>
        </Section>

        <Section title="Cómo comprobar una joya antigua o heredada">
          <p>
            En joyas antiguas puede haber contrastes antiguos, marcados desgastados, reparaciones o piezas añadidas posteriormente. Esto hace mas dificil interpretar la joya solo con una inspeccion rapida.
          </p>
          <p>
            Si la pieza tiene valor económico o sentimental, merece la pena una valoración profesional. También puede ser útil para asegurar, vender o documentar la joya.
          </p>
        </Section>

        <Section title="¿Cuándo merece la pena una comprobación profesional?">
          <p>
            Acude a un joyero, tasador o profesional cualificado si la pieza tiene valor, quieres venderla, asegurarla, desconoces su procedencia o las señales superficiales son contradictorias.
          </p>
          <p>
            Un profesional puede utilizar métodos adecuados, como análisis instrumental o pruebas controladas, reduciendo el riesgo de dañar la joya o sacar conclusiones falsas.
          </p>
        </Section>

        <GoldCta />
        <FaqSection faqs={faqs} title="Preguntas frecuentes sobre cómo saber si una joya es de oro" />

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">También te puede interesar</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
              { href: "/guias/plata-925", label: "Plata 925 o plata de ley" },
              { href: "/guias/platino", label: "Platino en joyería" },
              { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
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
