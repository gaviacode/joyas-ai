import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";

const pageUrl = "https://joyas.ai/guias/oro-14k-18k-24k";

const faqs = [
  {
    question: "¿Qué significa 18k en una joya?",
    answer:
      "Significa que la aleación contiene 18 partes de oro sobre 24, es decir, un 75 % de oro y un 25 % de otros metales.",
  },
  {
    question: "18k significa oro puro?",
    answer:
      "No. El oro de 18k contiene un 75 % de oro. El oro de 24k representa conceptualmente la maxima pureza en la escala de 24 partes.",
  },
  {
    question: "¿Qué porcentaje de oro tiene el oro de 14k?",
    answer:
      "El oro de 14k contiene aproximadamente un 58,5 % de oro. El resto corresponde a otros metales de la aleacion.",
  },
  {
    question: "¿Qué significa 750 en oro?",
    answer:
      "750 indica 750 partes de oro por cada 1.000 partes de aleacion. Se corresponde con oro de 18 quilates.",
  },
  {
    question: "¿Qué significa 585?",
    answer:
      "585 indica aproximadamente 585 partes de oro por cada 1.000 partes de aleacion. Se asocia al oro de 14 quilates.",
  },
  {
    question: "¿Qué significa 999?",
    answer:
      "999 indica aproximadamente 99,9 % de oro, vinculado al oro comercial de muy alta pureza.",
  },
  {
    question: "¿Es mejor oro 14k o 18k?",
    answer:
      "Depende de la joya, uso, presupuesto, color, mantenimiento y preferencias. 18k tiene mas oro; 14k suele ofrecer mayor presencia de aleacion.",
  },
  {
    question: "24k es mejor que 18k?",
    answer:
      "No necesariamente. 24k tiene mayor pureza, pero puede ser menos practico para determinadas joyas de uso diario por su mayor blandura relativa.",
  },
  {
    question: "¿Por qué el oro blanco no es amarillo?",
    answer:
      "El color depende de la aleacion y, en algunas piezas, de tratamientos o recubrimientos. No todos los oros blancos usan la misma composicion.",
  },
  {
    question: "¿Es lo mismo oro macizo que chapado en oro?",
    answer:
      "No. En una pieza de oro macizo la aleacion de la pieza contiene oro. En una pieza chapada, hay una capa superficial de oro sobre otro material.",
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
        { "@type": "ListItem", position: 4, name: "Oro 14k, 18k y 24k", item: pageUrl },
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

export default function GoldKaratGuide({ languageLinks }: { languageLinks?: LanguageLink[] }) {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <Script
        id="gold-karat-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader languageLinks={languageLinks} />

      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          items={[
            { href: "/guias", label: "Guías" },
            { href: "/guias/metales", label: "Oro y metales" },
            { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Guía de materiales
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">
            Oro 14k, 18k y 24k: diferencias, pureza y cuál elegir
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-[#63584c]">
            <p>
              Los quilates del oro indican la proporción de oro que contiene una aleación. En joyería, entender 14k, 18k y 24k ayuda a comparar pureza, color, resistencia de uso y precio relativo sin caer en la idea de que más quilates siempre es mejor.
            </p>
            <p>
              Esta guía se centra en pureza, diferencias y elección. Si tienes una pieza y quieres comprobar si realmente es de oro, consulta nuestra{" "}
              <Link href="/guias/como-saber-si-una-joya-es-de-oro" className="font-semibold text-[#9a6b08] hover:text-[#17120b]">
                guía para saber si una joya es de oro
              </Link>
              .
            </p>
          </div>
        </header>

        <Section title="¿Qué significan los quilates del oro?">
          <p>
            Cuando hablamos de pureza del oro, 24 quilates representan conceptualmente 24 partes de oro sobre 24. Un oro de menor quilataje contiene menos partes de oro y mas partes de otros metales en la aleacion.
          </p>
          <p>
            El oro de 14k contiene aproximadamente un 58,5 % de oro, el oro de 18k contiene un 75 % y el oro de 24k se asocia a oro de muy alta pureza. El resto de la aleacion puede incorporar distintos metales segun color, fabricante, pieza y objetivo tecnico.
          </p>
        </Section>

        <GoldPurityTable />

        <Section title="¿Qué es el oro de 14 quilates?">
          <p>
            El oro de 14 quilates contiene aproximadamente un 58,5 % de oro. El porcentaje restante corresponde a otros metales que forman la aleacion y pueden influir en dureza, color y comportamiento de la pieza.
          </p>
          <p>
            En joyería puede usarse en anillos, cadenas, pendientes y piezas de uso frecuente. Su ventaja relativa es que combina presencia de oro con una proporción mayor de aleación. Su inconveniente relativo es que contiene menos oro que 18k o 24k.
          </p>
        </Section>

        <Section title="¿Qué es el oro de 18 quilates?">
          <p>
            El oro de 18 quilates contiene un 75 % de oro. Para muchas joyas se considera un equilibrio entre pureza alta y propiedades practicas de una aleacion.
          </p>
          <p>
            Es habitual en joyería fina, alianzas, anillos, collares y pendientes. Aun así, la calidad final no depende solo del quilataje: también importan diseño, fabricación, peso, engastes, acabados y mantenimiento.
          </p>
        </Section>

        <Section title="¿Qué es el oro de 24 quilates?">
          <p>
            El oro de 24 quilates se asocia con oro de muy alta pureza. En la practica comercial, las marcas como 999 o 999.9 expresan una pureza aproximada de 99,9 % o superior segun el producto y el sistema de marcado.
          </p>
          <p>
            Esa pureza no lo convierte automaticamente en la opcion mas practica para todas las joyas. El oro muy puro es relativamente mas blando, por lo que determinados anillos o piezas de uso diario pueden beneficiarse de aleaciones de menor quilataje.
          </p>
        </Section>

        <Section title="Oro 14k o 18k: ¿qué diferencia hay?">
          <p>
            La diferencia principal es la proporcion de oro: 14k contiene aproximadamente 58,5 % y 18k contiene 75 %. Esa diferencia puede influir en color, valor material, comportamiento y precio relativo.
          </p>
          <p>
            El precio real no depende solo del porcentaje de oro. También influyen peso, diseño, fabricación, marca, piedras, acabados y mercado del oro. Por eso no conviene comparar dos piezas solo por el quilataje.
          </p>
          <p>
            En uso diario, la elección puede depender de si priorizas más contenido de oro, una pieza concreta, presupuesto o mantenimiento. Ninguna opción es mejor universalmente.
          </p>
        </Section>

        <Section title="Oro 18k o 24k: ¿cuál conviene más en joyería?">
          <p>
            El oro de 24k tiene mas pureza, pero mayor pureza no equivale siempre a mejor eleccion para cualquier joya. El oro de 18k incorpora otros metales que pueden hacerlo mas practico para diseños que necesitan mayor estabilidad de uso.
          </p>
          <p>
            Para una pieza de uso frecuente, como un anillo, una alianza o una cadena fina, conviene mirar el diseño completo. Para piezas de inversion o usos culturales concretos, el oro de alta pureza puede tener otro sentido.
          </p>
        </Section>

        <Section title="¿Qué significan 585, 750 y 999 en el oro?">
          <p>
            Estos numeros expresan finura en partes por mil. 585 indica aproximadamente un 58,5 % de oro y se relaciona con 14k. 750 indica 75 % de oro y se relaciona con 18k. 999 indica aproximadamente 99,9 % de oro y se vincula al oro de muy alta pureza.
          </p>
          <p>
            Un numero grabado en una pieza no demuestra por si solo su autenticidad. Las marcas pueden desgastarse, falsificarse o interpretarse mal. Para comprobar una pieza, revisa documentacion y, si hace falta, acude a un profesional.
          </p>
        </Section>

        <Section title="¿Por qué existen oro amarillo, blanco y rosa?">
          <p>
            El color del oro de joyería depende en buena medida de la composición de la aleación. Al mezclar oro con otros metales se puede modificar el tono hacia amarillo, blanco o rosa.
          </p>
          <p>
            En algunas piezas tambien pueden existir tratamientos o recubrimientos, especialmente en oro blanco. No todos los oros blancos, amarillos o rosas contienen exactamente la misma mezcla, asi que conviene revisar la ficha de la pieza.
          </p>
        </Section>

        <Section title="¿Es lo mismo oro de 18k que una pieza chapada en oro de 18k?">
          <p>
            No. Una pieza de oro de 18k está fabricada con una aleación que contiene un 75 % de oro. Una pieza chapada en oro de 18k puede estar hecha de otro material y tener una capa superficial de oro de 18k.
          </p>
          <p>
            Ambas opciones pueden tener sentido segun presupuesto y uso, pero son productos distintos. La descripcion debe dejar claro si la pieza es de oro, chapada, banada, vermeil u otro tipo de acabado.
          </p>
        </Section>

        <Section title="¿Qué quilataje elegir?">
          <p>
            La eleccion depende del tipo de joya, frecuencia de uso, diseño, presupuesto, color preferido, mantenimiento y expectativas. Un anillo de diario no plantea las mismas necesidades que unos pendientes de uso ocasional.
          </p>
          <p>
            No recomiendo elegir siempre el quilataje mas alto. Es mejor valorar la pieza completa: material, construccion, comodidad, proveedor, garantia, politica de cambios y si realmente encaja con el uso previsto.
          </p>
        </Section>

        <GoldCta />
        <FaqSection faqs={faqs} title="Preguntas frecuentes sobre quilates del oro" />
        <RelatedLinks />
      </article>
    </main>
  );
}

function GoldPurityTable() {
  const rows = [
    {
      type: "Oro 14k",
      purity: "Aprox. 58,5 %",
      mark: "585",
      traits: "Menor proporción de oro que 18k, mayor presencia de aleación",
      use: "Joyas de uso frecuente, anillos, cadenas y piezas cotidianas",
    },
    {
      type: "Oro 18k",
      purity: "75 %",
      mark: "750",
      traits: "Equilibrio habitual entre pureza alta y uso joyero",
      use: "Joyería fina, alianzas, anillos, collares y pendientes",
    },
    {
      type: "Oro 24k",
      purity: "Aprox. 99,9 % en productos marcados 999",
      mark: "999",
      traits: "Muy alta pureza y mayor blandura relativa",
      use: "Piezas concretas, usos culturales o productos de alta pureza",
    },
  ];

  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
        Tabla comparativa de oro 14k, 18k y 24k
      </h2>
      <p className="mt-3 leading-7 text-[#625746]">
        Los marcados 585, 750 y 999 expresan partes de oro por cada 1.000 partes de aleacion. Los sistemas de marcado pueden variar por pais y pieza.
      </p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ead8b3]">
        <table className="min-w-[720px] w-full border-collapse text-left text-sm">
          <caption className="sr-only">Comparativa de pureza y uso de oro 14k, 18k y 24k</caption>
          <thead className="bg-[#fff5df] text-[#5a4a38]">
            <tr>
              <th scope="col" className="p-3 font-semibold">Tipo</th>
              <th scope="col" className="p-3 font-semibold">Pureza aproximada</th>
              <th scope="col" className="p-3 font-semibold">Marcado habitual</th>
              <th scope="col" className="p-3 font-semibold">Caracteristicas generales</th>
              <th scope="col" className="p-3 font-semibold">Uso en joyería</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.type} className="border-t border-[#ead8b3] odd:bg-white even:bg-[#fffdf8]">
                <th scope="row" className="p-3 font-semibold text-[#17120b]">{row.type}</th>
                <td className="p-3 leading-6 text-[#625746]">{row.purity}</td>
                <td className="p-3 leading-6 text-[#625746]">{row.mark}</td>
                <td className="p-3 leading-6 text-[#625746]">{row.traits}</td>
                <td className="p-3 leading-6 text-[#625746]">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function GoldCta() {
  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-[#17120b] p-6 text-white shadow-xl shadow-[#805400]/10 sm:p-8">
      <h2 className="text-3xl font-semibold tracking-[-0.04em]">¿Buscas una joya de oro?</h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#f4e8d2]">
        Cuéntale al joyero IA qué buscas, para quién es, la ocasión y tu presupuesto.
      </p>
      <Link
        href="/#joyero-ia"
        className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#17120b] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c971]"
      >
        Preguntar al joyero IA
      </Link>
    </section>
  );
}

export function FaqSection({
  faqs,
  title,
}: {
  faqs: { question: string; answer: string }[];
  title: string;
}) {
  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">{title}</h2>
      <div className="mt-5 grid gap-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#17120b]">{faq.question}</h3>
            <p className="mt-2 leading-7 text-[#625746]">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
    { href: "/guias/plata-925", label: "Plata 925 o plata de ley" },
    { href: "/guias/platino", label: "Platino en joyería" },
    { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
  ];

  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">También te puede interesar</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
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
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">{title}</h2>
      <div className="mt-4 space-y-4 leading-8 text-[#625746]">{children}</div>
    </section>
  );
}
