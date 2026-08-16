import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";

const pageUrl = "https://joyas.ai/guias/plata-925";

const faqs = [
  {
    question: "¿Qué significa el número 925 en una joya?",
    answer:
      "Indica que la aleación contiene 925 partes de plata por cada 1.000 partes de material, es decir, un 92,5 % de plata.",
  },
  {
    question: "¿La plata 925 es plata auténtica?",
    answer:
      "Si la pieza cumple esa finura, es plata autentica en aleacion de plata 925. Aun asi, el marcado o la descripcion deben poder verificarse con vendedor, documentacion o profesional.",
  },
  {
    question: "¿Plata 925 y plata de ley son lo mismo?",
    answer:
      "En joyería se usan a menudo como expresiones equivalentes cuando se habla de plata de ley 925. El concepto de plata de ley depende del sistema legal o comercial aplicable.",
  },
  {
    question: "¿La plata 925 se pone negra?",
    answer:
      "Puede oscurecerse con el tiempo por deslustre. Esto no significa automáticamente que sea falsa.",
  },
  {
    question: "¿La plata 925 se oxida?",
    answer:
      "La plata no se comporta como el hierro al oxidarse. Lo habitual es que se deslustre al reaccionar con compuestos de azufre y otras sustancias del entorno.",
  },
  {
    question: "¿La plata 925 se puede mojar?",
    answer:
      "Un contacto ocasional con agua no tiene por qué arruinarla, pero la exposición frecuente, piscina, agua salada, perfumes o productos de limpieza pueden acelerar cambios de aspecto o afectar acabados.",
  },
  {
    question: "¿Por qué una joya de plata cambia de color?",
    answer:
      "Puede cambiar por deslustre, contacto con cosmeticos, humedad, sustancias del ambiente, sudor o por tratamientos y acabados propios de la pieza.",
  },
  {
    question: "¿Cómo saber si una joya es plata 925?",
    answer:
      "Busca marcado o contraste, revisa la informacion del vendedor, conserva factura o documentacion y acude a un profesional si necesitas certeza.",
  },
  {
    question: "Un sello 925 garantiza que sea plata?",
    answer:
      "No por si solo. Es una indicacion de finura, pero un grabado puede falsificarse o no corresponder con la pieza. La autenticidad puede requerir comprobacion fiable.",
  },
  {
    question: "¿Qué diferencia hay entre plata 925 y baño de plata?",
    answer:
      "La plata 925 usa una aleación de plata como material de la pieza. Una pieza bañada puede tener otro metal base y solo una capa superficial de plata.",
  },
  {
    question: "¿Qué diferencia hay entre plata 925 y plata 999?",
    answer:
      "La plata 925 contiene un 92,5 % de plata. La plata fina marcada como 999 contiene aproximadamente un 99,9 % de plata, pero puede ser menos practica para determinadas joyas de uso diario.",
  },
  {
    question: "¿Es mejor plata 925 o acero inoxidable?",
    answer:
      "Depende del uso, presupuesto, aspecto buscado, mantenimiento y pieza concreta. No hay una opcion universalmente mejor.",
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
        { "@type": "ListItem", position: 4, name: "Plata 925", item: pageUrl },
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

export default function Silver925Guide({ languageLinks }: { languageLinks?: LanguageLink[] }) {
  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <Script
        id="silver-925-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader languageLinks={languageLinks} />

      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Breadcrumbs
          items={[
            { href: "/guias", label: "Guías" },
            { href: "/guias/metales", label: "Oro y metales" },
            { href: "/guias/plata-925", label: "Plata 925" },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Guía de materiales
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-5xl">
            Plata 925 o plata de ley: qué significa y cómo reconocerla
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-[#63584c]">
            <p>
              Plata 925 significa que la aleación contiene 925 partes de plata por cada 1.000 partes de material: un 92,5 % de plata. El porcentaje restante corresponde a otros metales de la aleación.
            </p>
            <p>
              Es una forma habitual de plata de ley utilizada en joyería porque combina contenido alto de plata con características prácticas para fabricar piezas que se puedan usar con más comodidad.
            </p>
          </div>
        </header>

        <Highlight>
          Una joya marcada como 925 puede ser una buena indicación, pero no demuestra por sí sola la autenticidad. Para una compra importante, revisa documentación, vendedor y condiciones de la pieza.
        </Highlight>

        <Section title="¿Qué significa plata 925?">
          <p>
            El numero 925 indica una finura de 925 milesimas: 925 partes de plata por cada 1.000 partes de aleacion. Dicho de forma sencilla, corresponde a un 92,5 % de plata.
          </p>
          <p>
            El 7,5 % restante son otros metales utilizados para ajustar propiedades prácticas como dureza, resistencia al uso o comportamiento durante la fabricación. La composición exacta de ese resto puede variar según fabricante o pieza.
          </p>
          <p>
            Por eso conviene evitar asumir que toda plata 925 contiene siempre exactamente los mismos metales secundarios, salvo que la joya concreta lo documente.
          </p>
        </Section>

        <Section title="¿Qué es la plata de ley?">
          <p>
            La expresión plata de ley hace referencia a plata que cumple una finura reconocida dentro de un contexto legal o comercial. En joyería, muchas piezas descritas como plata de ley son plata 925.
          </p>
          <p>
            Aun así, no conviene simplificar diciendo que plata de ley significa exactamente lo mismo en todos los países. Las denominaciones, contrastes y controles pueden depender de la normativa aplicable y del mercado donde se venda la pieza.
          </p>
        </Section>

        <Section title="¿Por qué se mezcla la plata con otros metales?">
          <p>
            La plata fina es relativamente blanda. Para ciertas joyas de uso frecuente, una aleacion puede mejorar propiedades practicas sin renunciar a un contenido alto de plata.
          </p>
          <p>
            Esto no significa que la plata pura no pueda utilizarse nunca en joyería. Significa que, para muchas piezas, una aleación como la plata 925 puede resultar más adecuada según el diseño, el grosor, el acabado y el uso previsto.
          </p>
        </Section>

        <SilverComparisonTable />

        <Section title="¿Qué significa que una joya lleve grabado 925?">
          <p>
            El grabado 925 pretende indicar la finura de la plata: una aleacion con un 92,5 % de plata. Puede aparecer como 925, S925, Sterling, plata de ley u otras variantes segun el fabricante y el mercado.
          </p>
          <p>
            Ver 925 no garantiza por si solo que una joya sea autentica. El marcado es una indicacion, pero la autenticidad depende de la pieza y puede requerir comprobacion profesional, documentacion fiable o compra a un vendedor de confianza.
          </p>
        </Section>

        <Section title="Plata 925 y plata de ley: ¿son lo mismo?">
          <p>
            En el uso habitual de joyería, plata 925 y plata de ley suelen referirse a la misma idea cuando la pieza contiene un 92,5 % de plata. La forma más precisa es hablar de plata de ley 925.
          </p>
          <p>
            Si una descripcion solo dice plata de ley sin indicar finura, conviene revisar la ficha del producto o preguntar al vendedor. La informacion completa evita confundir plata 925 con banos, chapados u otras aleaciones.
          </p>
        </Section>

        <Section title="¿La plata 925 se pone negra?">
          <p>
            Sí, la plata 925 puede oscurecerse con el tiempo. Ese cambio se conoce habitualmente como deslustre y no significa automáticamente que la joya sea falsa.
          </p>
          <p>
            La plata puede reaccionar con compuestos presentes en el ambiente y con sustancias como perfumes, cosmeticos, humedad, sudor o productos de limpieza. El resultado suele ser una capa oscura superficial que puede limpiarse con metodos adecuados si la pieza lo permite.
          </p>
        </Section>

        <Section title="¿La plata 925 se oxida?">
          <p>
            Mucha gente usa la palabra oxidar para referirse a cualquier cambio de color, pero en plata conviene matizar. Lo mas habitual no es una oxidacion como la del hierro, sino el deslustre por reaccion con compuestos de azufre y otras sustancias.
          </p>
          <p>
            En la practica, el usuario ve que la joya se oscurece. La causa y la facilidad de limpieza dependen de la composicion, acabado, exposicion y cuidados de la pieza concreta.
          </p>
        </Section>

        <Section title="¿Se puede mojar la plata 925?">
          <p>
            Un contacto ocasional con agua no tiene por que arruinar automaticamente una joya de plata 925. Aun asi, mojarla con frecuencia puede acelerar cambios de aspecto, sobre todo si despues queda humedad retenida.
          </p>
          <p>
            Piscina, agua salada, perfumes, cosmeticos y productos de limpieza merecen mas precaucion. Ademas, algunas joyas incorporan piedras, perlas, banos, pavonados o tratamientos que pueden reaccionar de forma distinta.
          </p>
          <p>
            La recomendacion prudente es quitarse las piezas antes de nadar, ducharse con productos, limpiar con quimicos o aplicar perfume directamente sobre la zona.
          </p>
        </Section>

        <Section title="Plata 925 y baño de plata: ¿cuál es la diferencia?">
          <p>
            Una joya de plata 925 utiliza una aleación de plata como material de la pieza. Una pieza bañada en plata puede estar fabricada en otro metal y tener solo una capa superficial de plata.
          </p>
          <p>
            Esta diferencia importa porque afecta al desgaste, al mantenimiento, a la forma de reparar la pieza y a lo que realmente estás comprando. Una pieza bañada no tiene por qué ser mala: simplemente es un producto distinto y debe presentarse como tal.
          </p>
        </Section>

        <Section title="Cómo saber si una joya es realmente de plata 925">
          <p>
            Empieza por buscar el marcado o contraste, revisar la descripcion del fabricante, comprobar factura o documentacion y comprar en vendedores que indiquen con claridad la composicion.
          </p>
          <p>
            Si necesitas certeza, acude a un profesional. Las pruebas caseras como iman, color, sonido o hielo pueden dar pistas, pero no ofrecen por si solas una prueba absoluta.
          </p>
          <p>
            Que una pieza no sea atraida por un iman no demuestra por si solo que sea plata. Hay otros metales no magneticos y piezas con capas superficiales que pueden confundir.
          </p>
        </Section>

        <Section title="Plata 925 vs acero inoxidable">
          <p>
            La plata 925 es una aleacion con un 92,5 % de plata. El acero inoxidable es una familia de aleaciones basadas principalmente en hierro, con cromo y otros elementos segun el tipo de acero.
          </p>
          <p>
            La plata ofrece un brillo y una tradicion joyera muy reconocibles, pero requiere mas cuidado frente al deslustre. El acero inoxidable suele elegirse por mantenimiento sencillo y resistencia general en piezas cotidianas.
          </p>
          <p>
            Ninguno es universalmente mejor. La decision depende de estilo, presupuesto, uso, sensibilidad personal, acabado y pieza concreta.
          </p>
        </Section>

        <Section title="Cómo cuidar las joyas de plata 925">
          <ul className="grid gap-3">
            {[
              "Guarda las piezas secas y separadas para reducir roces.",
              "Evita exposicion innecesaria a perfumes, cosmeticos, cloro, agua salada y productos de limpieza.",
              "Limpia con paños o métodos adecuados para plata, sin usar abrasivos de forma indiscriminada.",
              "Comprueba las instrucciones del fabricante cuando haya piedras, perlas, esmaltes, banos o acabados especiales.",
              "No guardes una joya humeda en un estuche cerrado durante mucho tiempo.",
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="¿Cuánto dura la plata 925?">
          <p>
            No existe una duracion universal. Una joya de plata 925 puede conservarse muy bien o deteriorarse antes segun uso, cuidado, construccion de la pieza, grosor, engastes, acabados y exposicion a sustancias.
          </p>
          <p>
            Una cadena fina, un anillo de uso diario y unos pendientes ocasionales no sufren el mismo desgaste. Antes de comprar, revisa tambien cierre, soldaduras, grosor y condiciones de mantenimiento.
          </p>
        </Section>

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
            Preguntas frecuentes sobre plata 925
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

        <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-[#17120b] p-6 text-white shadow-xl shadow-[#805400]/10 sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">
            ¿Buscas una joya de plata?
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#f4e8d2]">
            Cuéntale al joyero IA qué tipo de joya buscas, para quién es, la ocasión y tu presupuesto.
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
            También te puede interesar
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
              { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
              { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
              { href: "/guias/platino", label: "Platino en joyería" },
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

function SilverComparisonTable() {
  const rows = [
    {
      label: "Contenido aproximado de plata",
      sterling: "92,5 % de plata",
      fine: "Aproximadamente 99,9 % en productos marcados como 999",
    },
    {
      label: "Dureza relativa",
      sterling: "Mas practica para muchas joyas de uso habitual",
      fine: "Relativamente mas blanda",
    },
    {
      label: "Uso habitual",
      sterling: "Anillos, pendientes, pulseras, collares y piezas de joyería",
      fine: "Lingotes, monedas, piezas especiales o diseños concretos",
    },
    {
      label: "Comportamiento practico",
      sterling: "Puede deslustrarse, pero suele equilibrar plata y resistencia de uso",
      fine: "Alta pureza, pero puede deformarse o marcarse con más facilidad según la pieza",
    },
  ];

  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
        Plata 925 vs plata fina
      </h2>
      <p className="mt-3 leading-7 text-[#625746]">
        Esta comparacion resume diferencias generales. La pieza concreta, su grosor, acabado y fabricacion pueden cambiar mucho el comportamiento real.
      </p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ead8b3]">
        <table className="min-w-[620px] w-full border-collapse text-left text-sm">
          <caption className="sr-only">Comparativa entre plata 925 y plata fina</caption>
          <thead className="bg-[#fff5df] text-[#5a4a38]">
            <tr>
              <th scope="col" className="p-3 font-semibold">Aspecto</th>
              <th scope="col" className="p-3 font-semibold">Plata 925</th>
              <th scope="col" className="p-3 font-semibold">Plata fina</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-[#ead8b3] odd:bg-white even:bg-[#fffdf8]">
                <th scope="row" className="p-3 font-semibold text-[#17120b]">{row.label}</th>
                <td className="p-3 leading-6 text-[#625746]">{row.sterling}</td>
                <td className="p-3 leading-6 text-[#625746]">{row.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-8 rounded-3xl border border-[#d7a63c] bg-[#fff5df] p-5 leading-7 text-[#68420c] shadow-sm sm:p-6">
      {children}
    </aside>
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
