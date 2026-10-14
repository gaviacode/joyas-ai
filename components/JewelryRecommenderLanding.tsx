import Link from "next/link";
import JewelryChat from "@/components/JewelryChat";
import type { LanguageLink } from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";
import { getLocalizedIndexPath, getLocalizedPath, type Locale } from "@/lib/i18n";
import { absoluteUrl, SITE_NAME } from "@/lib/site-config";

type JewelryRecommenderLandingProps = {
  locale: Locale;
  href: string;
  languageLinks?: LanguageLink[];
};

type LandingCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  howItWorksTitle: string;
  steps: Array<{ title: string; text: string }>;
  usefulForTitle: string;
  usefulFor: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  guidesTitle: string;
  guideLinks: Array<{ slug: string; label: string }>;
};

export default function JewelryRecommenderLanding({ locale, href, languageLinks }: JewelryRecommenderLandingProps) {
  const copy = getCopy(locale);
  const jsonLd = buildStructuredData(locale, href, copy);
  const homeHref = locale === "es" ? "/" : locale === "pt-BR" ? "/pt-br" : "/en";

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <script
        id="jewelry-recommender-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader locale={locale} languageLinks={languageLinks} />

      <section className="mx-auto max-w-7xl px-5 pb-5 pt-7 sm:px-8 sm:pb-12 sm:pt-14 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">{copy.eyebrow}</p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] tracking-[-0.04em] text-[#17120b] sm:mt-4 sm:text-5xl sm:leading-tight lg:text-6xl">{copy.title}</h1>
          <p className="mt-4 text-[17px] leading-[1.6] text-[#63584c] sm:mt-5 sm:text-lg sm:leading-8">{copy.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14 lg:px-10" aria-label={copy.title}>
        <JewelryChat locale={locale} />
      </section>

      <section className="bg-white/55 px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#17120b] sm:text-4xl">{copy.howItWorksTitle}</h2>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm font-semibold text-[#9a6b08]">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[#17120b]">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#625746]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#17120b] sm:text-3xl">{copy.usefulForTitle}</h2>
            <ul className="mt-5 grid gap-3 leading-7 text-[#625746]">
              {copy.usefulFor.map((item) => <li key={item} className="rounded-2xl bg-[#fffaf1] p-4">{item}</li>)}
            </ul>
          </article>
          <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#17120b] sm:text-3xl">{copy.guidesTitle}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {copy.guideLinks.map((guide) => (
                <Link key={guide.slug} href={getLocalizedPath("guias", guide.slug, locale)} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#7a540f] transition hover:border-[#d7a63c] hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
                  {guide.label}
                </Link>
              ))}
            </div>
            <Link href={getLocalizedIndexPath("guias", locale)} className="mt-6 inline-flex font-semibold text-[#8a5d07] underline decoration-[#d7a63c]/60 underline-offset-4 transition hover:text-[#17120b]">
              {locale === "en" ? "Explore all jewelry guides" : locale === "pt-BR" ? "Explorar todos os guias" : "Explorar todas las guías"}
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-[#17120b] px-5 py-10 text-white sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{copy.faqTitle}</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {copy.faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl border border-[#60492a] bg-white/5 p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{faq.question}</h3>
                <p className="mt-3 leading-7 text-[#f4e8d2]">{faq.answer}</p>
              </article>
            ))}
          </div>
          <Link href={homeHref} className="mt-8 inline-flex rounded-xl border border-[#d7a63c] px-5 py-3 font-semibold text-[#f6d98c] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c971]">
            {locale === "en" ? "Back to Joyas.ai" : locale === "pt-BR" ? "Voltar à Joyas.ai" : "Volver a Joyas.ai"}
          </Link>
        </div>
      </section>
    </main>
  );
}

function buildStructuredData(locale: Locale, href: string, copy: LandingCopy) {
  const pageUrl = absoluteUrl(href);
  const language = locale === "es" ? "es-ES" : locale === "pt-BR" ? "pt-BR" : "en";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#webapplication`,
        name: locale === "en" ? "Joyas.ai AI Jewelry Recommender" : locale === "pt-BR" ? "Recomendador de joias com IA Joyas.ai" : "Recomendador de joyas con IA Joyas.ai",
        url: pageUrl,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        inLanguage: language,
        description: copy.intro,
        provider: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Joyas.ai", item: absoluteUrl(locale === "es" ? "/" : locale === "pt-BR" ? "/pt-br" : "/en") },
          { "@type": "ListItem", position: 2, name: copy.title, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

function getCopy(locale: Locale): LandingCopy {
  if (locale === "en") {
    return {
      eyebrow: "AI jewelry recommender",
      title: "Find the right jewelry gift with AI",
      intro: "Joyas.ai is a free AI jewelry recommender that helps you choose a piece based on the recipient, occasion, personal style, preferences, and budget. It gives you clear ideas about what to look for before you buy.",
      howItWorksTitle: "How the jewelry recommendation tool works",
      steps: [
        { title: "Share the context", text: "Tell us who the jewelry is for, the occasion, your budget, and anything you know about their style." },
        { title: "Compare thoughtful options", text: "The AI suggests jewelry types and buying criteria that fit your situation; it does not invent stores, stock, or reviews." },
        { title: "Decide with context", text: "Use the recommendation as a starting point, then check the piece's size, materials, price, and seller conditions." },
      ],
      usefulForTitle: "When it can help",
      usefulFor: ["Choosing a jewelry gift when you do not know where to begin.", "Narrowing down a ring, necklace, bracelet, or pair of earrings.", "Thinking through an anniversary, birthday, engagement, wedding, or Mother's Day gift.", "Comparing options when you know the budget but not the exact piece."],
      guidesTitle: "Useful buying guides",
      guideLinks: [{ slug: "como-elegir-una-joya-para-regalar", label: "How to choose jewelry as a gift" }, { slug: "como-saber-talla-anillo", label: "How to measure ring size" }, { slug: "oro-14k-18k-24k", label: "14K vs 18K vs 24K gold" }, { slug: "plata-925", label: "925 sterling silver" }],
      faqTitle: "Frequently asked questions",
      faqs: [
        { question: "What is a jewelry recommender?", answer: "A jewelry recommender is a tool that turns details such as recipient, occasion, style, and budget into practical suggestions about which type of jewelry to consider." },
        { question: "Can AI help me choose a jewelry gift?", answer: "Yes. It can organize the details you provide and suggest suitable directions, but it cannot guarantee a person's taste or verify a specific seller's product information." },
        { question: "What information does Joyas.ai need?", answer: "It is useful to know who the gift is for, the occasion, budget, preferred styles or materials, and any practical details such as ring size. You can still use it if you do not know all of this." },
        { question: "Do I need jewelry knowledge to use it?", answer: "No. The recommender is designed to guide people who are unsure what to buy and explain the criteria behind each suggestion in plain language." },
      ],
    };
  }

  if (locale === "pt-BR") {
    return {
      eyebrow: "Recomendador de joias com IA",
      title: "Encontre a joia certa para presentear com IA",
      intro: "A Joyas.ai é um recomendador gratuito de joias com IA que ajuda você a escolher uma peça conforme a pessoa, a ocasião, o estilo, as preferências e o orçamento. Ele oferece ideias claras sobre o que procurar antes de comprar.",
      howItWorksTitle: "Como funciona a ferramenta de recomendação de joias",
      steps: [
        { title: "Conte o contexto", text: "Informe para quem é a joia, a ocasião, o orçamento e tudo o que souber sobre o estilo da pessoa." },
        { title: "Compare opções pensadas para o caso", text: "A IA sugere tipos de joia e critérios de compra coerentes com a situação; ela não inventa lojas, estoque ou avaliações." },
        { title: "Decida com contexto", text: "Use a recomendação como ponto de partida e confirme tamanho, materiais, preço e condições da loja antes de comprar." },
      ],
      usefulForTitle: "Quando pode ajudar",
      usefulFor: ["Escolher uma joia de presente sem saber por onde começar.", "Decidir entre anel, colar, pulseira ou brincos.", "Pensar em presentes para aniversário, noivado, casamento, Dia dos Namorados ou Dia das Mães.", "Comparar opções quando você sabe o orçamento, mas não a peça exata."],
      guidesTitle: "Guias úteis para comprar",
      guideLinks: [{ slug: "como-elegir-una-joya-para-regalar", label: "Como escolher uma joia para presentear" }, { slug: "como-saber-talla-anillo", label: "Como medir o tamanho do anel" }, { slug: "oro-14k-18k-24k", label: "Ouro 14K, 18K e 24K" }, { slug: "plata-925", label: "Prata 925" }],
      faqTitle: "Perguntas frequentes",
      faqs: [
        { question: "O que é um recomendador de joias?", answer: "É uma ferramenta que transforma informações como pessoa, ocasião, estilo e orçamento em sugestões práticas sobre que tipo de joia considerar." },
        { question: "A IA pode ajudar a escolher uma joia de presente?", answer: "Sim. Ela pode organizar as informações que você fornece e sugerir caminhos adequados, mas não garante o gosto da pessoa nem verifica dados de um produto específico." },
        { question: "Que informação a Joyas.ai precisa?", answer: "Ajuda saber para quem é a joia, a ocasião, o orçamento, estilos ou materiais preferidos e, quando fizer sentido, o tamanho do anel. Você também pode usar a ferramenta sem saber todos esses dados." },
        { question: "Posso usar se não sei nada sobre joias?", answer: "Sim. O recomendador foi pensado para orientar quem não sabe o que comprar e explicar os critérios de cada sugestão com linguagem simples." },
      ],
    };
  }

  return {
    eyebrow: "Recomendador de joyas con IA",
    title: "Encuentra qué joya regalar con inteligencia artificial",
    intro: "Joyas.ai es un recomendador gratuito de joyas con IA que te ayuda a elegir una pieza según la persona, la ocasión, el estilo, las preferencias y el presupuesto. Te da ideas claras sobre qué buscar antes de comprar.",
    howItWorksTitle: "Cómo funciona el recomendador de joyas",
    steps: [
      { title: "Cuéntanos el contexto", text: "Indica para quién es la joya, la ocasión, el presupuesto y todo lo que sepas sobre el estilo de esa persona." },
      { title: "Compara opciones razonadas", text: "La IA propone tipos de joya y criterios de compra coherentes con tu caso; no inventa tiendas, stock ni reseñas." },
      { title: "Decide con contexto", text: "Usa la orientación como punto de partida y comprueba talla, materiales, precio y condiciones de la tienda antes de comprar." },
    ],
    usefulForTitle: "Cuándo puede ayudarte",
    usefulFor: ["Elegir una joya para regalar cuando no sabes por dónde empezar.", "Decidir entre un anillo, collar, pulsera o pendientes.", "Pensar en regalos para aniversario, cumpleaños, compromiso, boda o Día de la Madre.", "Comparar opciones cuando conoces el presupuesto, pero no la pieza exacta."],
    guidesTitle: "Guías útiles para comprar",
    guideLinks: [{ slug: "como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }, { slug: "como-saber-talla-anillo", label: "Cómo saber la talla de anillo" }, { slug: "oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { slug: "plata-925", label: "Plata 925" }],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { question: "¿Qué es un recomendador de joyas?", answer: "Es una herramienta que transforma datos como destinatario, ocasión, estilo y presupuesto en sugerencias prácticas sobre qué tipo de joya valorar." },
      { question: "¿Puede una IA ayudarme a elegir una joya para regalar?", answer: "Sí. Puede ordenar la información que le das y sugerir caminos adecuados, pero no garantiza el gusto de una persona ni verifica los datos de un producto concreto." },
      { question: "¿Qué información necesita Joyas.ai?", answer: "Ayuda conocer para quién es, la ocasión, el presupuesto, estilos o materiales preferidos y, si aplica, la talla de anillo. También puedes usarla aunque no sepas todos esos datos." },
      { question: "¿Puedo utilizarlo si no sé nada de joyería?", answer: "Sí. El recomendador está pensado para orientar a quien no sabe qué comprar y explicar los criterios de cada sugerencia con lenguaje claro." },
    ],
  };
}
