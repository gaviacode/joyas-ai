import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JewelryChat from "@/components/JewelryChat";
import SiteHeader from "@/components/SiteHeader";
import {
  getHomeMetadataAlternates,
  getLocaleHomePath,
  getLocalizedIndexPath,
  localizeText,
  openGraphLocales,
  locales,
  type LocalizedLocale,
} from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  if (!locale) {
    return {};
  }

  const title = locale === "pt-BR" ? "Encontre a joia perfeita com IA | joyas.ai" : "Find the Perfect Jewelry With AI | joyas.ai";
  const description =
    locale === "pt-BR"
        ? "Joalheiro IA para escolher anéis, colares, pulseiras ou brincos conforme ocasião, orçamento e estilo da pessoa."
        : "AI jewelry advisor for choosing rings, necklaces, bracelets or earrings by occasion, budget and personal style.";
  const ogImage = locale === "pt-BR" ? "/pt-br/opengraph-image" : "/en/opengraph-image";
  const ogAlt = locale === "pt-BR" ? "joyas.ai - Seu joalheiro IA" : "joyas.ai - Your AI jeweler";

  return {
    title,
    description,
    alternates: getHomeMetadataAlternates(locale),
    openGraph: {
      title,
      description,
      url: getLocaleHomePath(locale),
      siteName: "joyas.ai",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => openGraphLocales[item]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  if (!locale) {
    notFound();
  }
  const copy = getHomeCopy(locale);
  const localizedPrefix = locale === "pt-BR" ? "/pt-br" : "/en";

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#1f1a17]">
      <SiteHeader locale={locale} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-10 lg:pb-14 lg:pt-10">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[#d7a63c]/30 bg-white/80 px-4 py-2 text-sm text-[#9a6b08] shadow-sm">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#17120f] sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#63584c]">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`${localizedPrefix}#joyero-ia`} className="inline-flex justify-center rounded-xl bg-[#17120b] px-6 py-3 font-semibold text-white transition hover:bg-[#2b241f]">
            {localizeText("Probar el joyero IA", locale)}
          </Link>
          <Link href={getLocalizedIndexPath("guias", locale)} className="inline-flex justify-center rounded-xl border border-[#d7a63c] bg-white px-6 py-3 font-semibold text-[#9a6b08] transition hover:bg-[#fff5df]">
            {copy.guidesCta}
          </Link>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {copy.chips.map((chip) => (
              <InfoChip key={chip.title} title={chip.title} text={chip.text} />
            ))}
          </div>
        </div>
        <HeroJewelry alt={copy.heroAlt} />
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <JewelryChat locale={locale} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">{copy.categoriesEyebrow}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{copy.categoriesTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-[#63584c]">{copy.categoriesDescription}</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.categories.map((category) => (
            <CategoryCard key={category.href} {...category} cta={copy.cardCta} />
          ))}
        </div>
      </section>

      <section className="bg-white/55 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">{copy.occasionsEyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{copy.occasionsTitle}</h2>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.occasions.map((occasion) => (
              <Link key={occasion.href} href={occasion.href} className="rounded-2xl border border-[#ead8b3] bg-white p-5 font-semibold text-[#2b241f] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d7a63c] hover:text-[#9a6b08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
                {occasion.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10">
        <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">{copy.guidesTitle}</h2>
          <p className="mt-4 leading-8 text-[#625746]">{copy.guidesDescription}</p>
          <div className="mt-6 grid gap-3">
            {copy.guideLinks.map((guide) => (
              <Link key={guide.href} href={guide.href} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
                {guide.label}
              </Link>
            ))}
          </div>
          <Link href={getLocalizedIndexPath("guias", locale)} className="mt-6 inline-flex rounded-xl bg-[#17120b] px-5 py-3 font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
            {copy.allGuidesCta}
          </Link>
        </article>

        <article className="rounded-3xl border border-[#ead8b3] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">{copy.faqTitle}</h2>
          <p className="mt-4 leading-8 text-[#625746]">{copy.faqDescription}</p>
          <div className="mt-6 grid gap-3">
            {copy.faqs.map((question) => (
              <Link key={question} href={copy.faqHref} className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4 font-semibold text-[#2b241f] transition hover:bg-[#fff5df] hover:text-[#9a6b08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
                {question}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function parseLocale(value: string): LocalizedLocale | undefined {
  if (value === "pt-br") {
    return "pt-BR";
  }
  if (value === "en") {
    return "en";
  }
  return undefined;
}

function getHomeCopy(locale: LocalizedLocale) {
  if (locale === "pt-BR") {
    return {
      eyebrow: "Recomendador de joias com inteligência artificial",
      title: "Encontre a joia perfeita com IA",
      description: "Fale com um joalheiro especialista com inteligência artificial e descubra anéis, colares, pulseiras ou brincos conforme a ocasião, seu orçamento e o estilo da pessoa.",
      guidesCta: "Ver guias",
      heroAlt: "Joias douradas elegantes com colar, anel, pulseira e brincos sobre mármore claro",
      chips: [
        { title: "Recomendações honestas", text: "Ideias claras, sem inventar produtos nem avaliações falsas." },
        { title: "Pensado para presentear", text: "Conforme ocasião, estilo, orçamento e pessoa." },
        { title: "Orientação rápida", text: "Diga o que procura e o joalheiro IA ajuda a organizar opções." },
      ],
      categoriesEyebrow: "Categorias",
      categoriesTitle: "Explore por tipo de joia",
      categoriesDescription: "Cada guia explica estilos, materiais, momentos de uso e erros frequentes para escolher com mais critério.",
      cardCta: "Ver guia",
      categories: [
        { href: "/pt-br/joias/aneis", title: "Anéis", text: "Uso diário, presente, noivado, alianças e tamanho.", image: "/images/categories/categoria-anillos.png" },
        { href: "/pt-br/joias/colares", title: "Colares", text: "Comprimento, pingentes, decotes e materiais.", image: "/images/categories/categoria-collares.png" },
        { href: "/pt-br/joias/pulseiras", title: "Pulseiras", text: "Fechos, tamanho, gravações e conforto.", image: "/images/categories/categoria-pulseras.png" },
        { href: "/pt-br/joias/brincos", title: "Brincos", text: "Tamanho, fecho, peso, estilo e ocasião.", image: "/images/categories/categoria-pendientes.png" },
        { href: "/pt-br/joias/casamento", title: "Joias para casamento", text: "Alianças, noiva, noivo, madrinha e convidadas.", image: "/images/categories/categoria-joyas-boda.png" },
        { href: "/pt-br/joias/presentes", title: "Presentes", text: "Ideias para acertar sem conhecer tudo.", image: "/images/categories/categoria-regalos-especiales.png" },
      ],
      occasionsEyebrow: "Ocasiões",
      occasionsTitle: "Escolha conforme o momento",
      occasions: [
        { href: "/pt-br/ocasioes/aniversario", label: "Aniversário de relacionamento" },
        { href: "/pt-br/ocasioes/noivado", label: "Noivado" },
        { href: "/pt-br/ocasioes/casamento", label: "Casamento" },
        { href: "/pt-br/ocasioes/aniversario-presente", label: "Aniversário" },
        { href: "/pt-br/ocasioes/dia-dos-namorados", label: "Dia dos Namorados" },
        { href: "/pt-br/ocasioes/dia-das-maes", label: "Dia das Mães" },
        { href: "/pt-br/ocasioes/formatura", label: "Formatura" },
        { href: "/pt-br/ocasioes/presente-surpresa", label: "Presente surpresa" },
      ],
      guidesTitle: "Guias para comprar melhor",
      guidesDescription: "Aprenda o essencial sobre materiais, tamanhos, cuidados e pedras antes de tomar uma decisão.",
      guideLinks: [
        { href: "/pt-br/guias/como-saber-medida-do-anel", label: "Medida do anel" },
        { href: "/pt-br/guias/ouro-14k-18k-24k", label: "Ouro 14k, 18k e 24k" },
        { href: "/pt-br/guias/prata-925", label: "Prata 925" },
        { href: "/pt-br/guias/pedras-preciosas", label: "Pedras preciosas" },
      ],
      allGuidesCta: "Ver todos os guias",
      faqTitle: "Perguntas frequentes",
      faqDescription: "Respostas claras sobre o recomendador, afiliação, tamanhos, ouro, prata e limites de uma recomendação.",
      faqHref: "/pt-br/perguntas-frequentes",
      faqs: ["A joyas.ai vende joias diretamente?", "Como a IA sabe que joia recomendar?", "O que significa prata 925?"],
    };
  }

  return {
    eyebrow: "AI jewelry advisor",
    title: "Find the perfect jewelry with AI",
    description: "Talk to an expert AI jeweler and discover rings, necklaces, bracelets or earrings by occasion, budget and the person's style.",
    guidesCta: "View guides",
    heroAlt: "Elegant gold jewelry with necklace, ring, bracelet and earrings on light marble",
    chips: [
      { title: "Honest recommendations", text: "Clear ideas without invented products or fake reviews." },
      { title: "Built for gifting", text: "By occasion, style, budget and recipient." },
      { title: "Fast guidance", text: "Tell us what you need and the AI jeweler helps organize options." },
    ],
    categoriesEyebrow: "Categories",
    categoriesTitle: "Explore by jewelry type",
    categoriesDescription: "Each guide explains styles, materials, use cases and common mistakes so you can choose with more confidence.",
    cardCta: "View guide",
    categories: [
      { href: "/en/jewelry/rings", title: "Rings", text: "Everyday wear, gifts, engagement, wedding bands and sizing.", image: "/images/categories/categoria-anillos.png" },
      { href: "/en/jewelry/necklaces", title: "Necklaces", text: "Length, pendants, necklines and materials.", image: "/images/categories/categoria-collares.png" },
      { href: "/en/jewelry/bracelets", title: "Bracelets", text: "Clasps, sizing, engraving and comfort.", image: "/images/categories/categoria-pulseras.png" },
      { href: "/en/jewelry/earrings", title: "Earrings", text: "Size, backing, weight, style and occasion.", image: "/images/categories/categoria-pendientes.png" },
      { href: "/en/jewelry/wedding", title: "Wedding jewelry", text: "Wedding bands, bride, groom and guest jewelry.", image: "/images/categories/categoria-joyas-boda.png" },
      { href: "/en/jewelry/jewelry-gifts", title: "Gifts", text: "Ideas for choosing well without knowing everything.", image: "/images/categories/categoria-regalos-especiales.png" },
    ],
    occasionsEyebrow: "Occasions",
    occasionsTitle: "Choose by the moment",
    occasions: [
      { href: "/en/occasions/anniversary", label: "Anniversary" },
      { href: "/en/occasions/engagement", label: "Engagement" },
      { href: "/en/occasions/wedding", label: "Wedding" },
      { href: "/en/occasions/birthday", label: "Birthday" },
      { href: "/en/occasions/valentines-day", label: "Valentine's Day" },
      { href: "/en/occasions/mothers-day", label: "Mother's Day" },
      { href: "/en/occasions/graduation", label: "Graduation" },
      { href: "/en/occasions/surprise-gift", label: "Surprise gift" },
    ],
    guidesTitle: "Guides for buying better",
    guidesDescription: "Learn the essentials about materials, sizing, care and gemstones before making a decision.",
    guideLinks: [
      { href: "/en/guides/how-to-measure-ring-size", label: "Ring size" },
      { href: "/en/guides/14k-vs-18k-vs-24k-gold", label: "14k, 18k and 24k gold" },
      { href: "/en/guides/925-sterling-silver", label: "925 sterling silver" },
      { href: "/en/guides/precious-gemstones", label: "Precious gemstones" },
    ],
    allGuidesCta: "View all guides",
    faqTitle: "FAQ",
    faqDescription: "Clear answers about the advisor, affiliation, sizing, gold, silver and the limits of a recommendation.",
    faqHref: "/en/faq",
    faqs: ["Does joyas.ai sell jewelry directly?", "How does the AI know what jewelry to recommend?", "What does 925 silver mean?"],
  };
}

function HeroJewelry({ alt }: { alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#ead8b3] bg-white p-3 shadow-2xl shadow-[#805400]/10 sm:p-4">
      <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#f8ecd4] sm:aspect-[16/11] lg:min-h-[430px]">
        <Image src="/images/hero-joyas-aniversario.png" alt={alt} fill priority sizes="(max-width: 1024px) 100vw, 640px" className="object-cover object-center" />
      </div>
    </div>
  );
}

function InfoChip({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#ead8b3] bg-white/75 p-4 shadow-sm">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-[#7c7064]">{text}</p>
    </div>
  );
}

function CategoryCard({ href, title, text, image, cta }: { href: string; title: string; text: string; image: string; cta: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-3xl border border-[#ead8b3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#805400]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">
      <div className="relative h-48 bg-[#f8ecd4]">
        <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
        <p className="mt-2 leading-7 text-[#7c7064]">{text}</p>
        <span className="mt-5 inline-flex font-semibold text-[#9a6b08]">{cta}</span>
      </div>
    </Link>
  );
}
