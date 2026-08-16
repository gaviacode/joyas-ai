import type { Metadata } from "next";
import {
  findArticle,
  findGuideCategoryForArticle,
  guideCategories,
  guides,
  jewelryCategories,
  occasions,
  type ArticleData,
  type ArticleSection,
  type GuideCategory,
  type LinkItem,
  type RichParagraph,
} from "@/lib/site-content";

export const locales = ["es", "pt-BR", "en"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedLocale = Exclude<Locale, "es">;
export type ContentKind = "joyas" | "ocasiones" | "guias";

export const localePrefixes: Record<LocalizedLocale, string> = {
  "pt-BR": "pt-br",
  en: "en",
};

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  "pt-BR": "PT-BR",
  en: "EN",
};

export const openGraphLocales: Record<Locale, string> = {
  es: "es_ES",
  "pt-BR": "pt_BR",
  en: "en_US",
};

const localizedSections: Record<LocalizedLocale, Record<ContentKind, string>> = {
  "pt-BR": {
    joyas: "joias",
    ocasiones: "ocasioes",
    guias: "guias",
  },
  en: {
    joyas: "jewelry",
    ocasiones: "occasions",
    guias: "guides",
  },
};

const sectionLabels: Record<Locale, Record<ContentKind, string>> = {
  es: {
    joyas: "Joyas",
    ocasiones: "Ocasiones",
    guias: "Guías",
  },
  "pt-BR": {
    joyas: "Joias",
    ocasiones: "Ocasiões",
    guias: "Guias",
  },
  en: {
    joyas: "Jewelry",
    ocasiones: "Occasions",
    guias: "Guides",
  },
};

const guideCategoryLocalizations: Record<
  LocalizedLocale,
  Record<string, Pick<GuideCategory, "title" | "description" | "intro" | "seoTitle" | "seoDescription" | "futureGuides">>
> = {
  "pt-BR": {
    anillos: {
      title: "Anéis",
      description: "Tamanhos, modelos, materiais e dicas para escolher o anel certo.",
      intro: "Guias práticos sobre medidas, tipos de anéis, materiais e critérios para comprar com mais segurança.",
      seoTitle: "Guias sobre anéis: tamanhos, tipos e dicas | joyas.ai",
      seoDescription: "Guias sobre anéis: medidas, materiais, estilos e dicas para escolher uma peça adequada sem complicar.",
      futureGuides: ["Como escolher um anel", "Tipos de anéis", "Anéis de noivado", "Anéis por estilo", "Anéis para cada tipo de mão"],
    },
    collares: {
      title: "Colares e pingentes",
      description: "Comprimentos, estilos, decotes, materiais e dicas para escolher colares.",
      intro: "Guias para entender comprimentos, decotes, estilos e materiais antes de escolher um colar ou pingente.",
      seoTitle: "Guias sobre colares e pingentes | joyas.ai",
      seoDescription: "Dicas para escolher colares e pingentes conforme comprimento, decote, estilo, material e ocasião.",
      futureGuides: ["Comprimentos de colar", "Tipos de correntes", "Como combinar colares"],
    },
    pendientes: {
      title: "Brincos",
      description: "Tipos, fechos, tamanhos, estilos e dicas para escolher brincos.",
      intro: "Informação útil sobre tipos de brincos, fechos, tamanhos, peso, materiais e ocasiões de uso.",
      seoTitle: "Guias sobre brincos: tipos, fechos e dicas | joyas.ai",
      seoDescription: "Guias para escolher brincos por tamanho, fecho, estilo, material, formato do rosto e ocasião.",
      futureGuides: ["Tipos de brincos", "Tipos de fecho", "Brincos para cada formato de rosto", "Brincos por ocasião"],
    },
    pulseras: {
      title: "Pulseiras",
      description: "Tipos de pulseiras, medidas, materiais, pedras e dicas para escolher uma peça confortável.",
      intro: "Conheça os principais tipos de pulseiras, materiais, pedras e critérios para escolher uma peça confortável e adequada ao seu estilo.",
      seoTitle: "Guias sobre pulseiras: tipos, materiais e dicas | joyas.ai",
      seoDescription: "Guias sobre tipos de pulseiras, medidas, materiais, pedras e dicas para escolher uma peça confortável para cada ocasião.",
      futureGuides: ["Tipos de pulseiras", "Como medir o tamanho da pulseira", "Pulseiras de berloques", "Bracelete ou pulseira", "Pulseiras de ouro", "Pulseiras de prata"],
    },
    metales: {
      title: "Ouro e metais",
      description: "Guias sobre ouro, prata, platina, pureza, ligas e materiais usados em joias.",
      intro: "Guias para comparar ouro, prata, platina, purezas, marcações e acabamentos com critério antes de comprar.",
      seoTitle: "Guias sobre ouro, prata e metais | joyas.ai",
      seoDescription: "Guias sobre ouro 14k, 18k e 24k, prata 925, platina, pureza, marcações e materiais de joalheria.",
      futureGuides: ["Ouro branco vs ouro amarelo", "Ouro rosé", "Ouro 18k vs 14k", "Ouro maciço vs folheado", "O que significa 585", "O que significa 750"],
    },
    piedras: {
      title: "Pedras preciosas",
      description: "Diamantes, rubis, safiras, esmeraldas e outras pedras usadas em joias.",
      intro: "Guias sobre diamantes, moissanita, gemas coloridas e outras pedras usadas em joias, com características, diferenças, dureza e cuidados.",
      seoTitle: "Guias sobre pedras preciosas e gemas | joyas.ai",
      seoDescription: "Guias sobre diamantes, moissanita, gemas coloridas e pedras usadas em joias: características, diferenças e cuidados.",
      futureGuides: ["Diamantes", "Rubi", "Safira", "Esmeralda", "Ametista", "Topázio", "Água-marinha", "Granada"],
    },
    perlas: {
      title: "Pérolas",
      description: "Tipos de pérolas, autenticidade, qualidade, valor e dicas para escolher joias com pérolas.",
      intro: "Aprenda a reconhecer tipos de pérolas, entender fatores de qualidade e diferenciar uma pérola verdadeira de uma imitação.",
      seoTitle: "Guias sobre pérolas: tipos, autenticidade e valor | joyas.ai",
      seoDescription: "Guias para conhecer tipos de pérolas, diferenciar pérolas verdadeiras de imitações e entender qualidade e valor.",
      futureGuides: ["Pérolas naturais vs cultivadas", "Como cuidar de pérolas", "Pérolas do Taiti", "Pérolas Akoya", "Pérolas dos Mares do Sul", "Como escolher um colar de pérolas"],
    },
    cuidados: {
      title: "Cuidados com joias",
      description: "Limpeza, conservação, armazenamento e manutenção de joias e materiais.",
      intro: "Dicas para limpar, guardar e manter joias sem danificar metais, pedras, banhos ou acabamentos delicados.",
      seoTitle: "Guias para cuidar de joias: limpeza e conservação | joyas.ai",
      seoDescription: "Guias de cuidado de joias: limpeza, armazenamento, conservação e manutenção de metais e pedras.",
      futureGuides: ["Como limpar ouro", "Como limpar prata", "Como limpar diamantes", "Como guardar joias", "Como evitar que a prata escureça"],
    },
    regalos: {
      title: "Joias para presentear",
      description: "Dicas para escolher uma joia conforme pessoa, ocasião, orçamento e significado.",
      intro: "Ideias e critérios para escolher uma joia de presente conforme relação, ocasião, orçamento e estilo pessoal.",
      seoTitle: "Guias para presentear com joias: ideias e dicas | joyas.ai",
      seoDescription: "Dicas para presentear com joias conforme pessoa, ocasião, orçamento, estilo e significado.",
      futureGuides: ["Joias para aniversário de relacionamento", "Joias para aniversário", "Joias para Dia dos Namorados", "Joias para mãe", "Joias para parceiro ou parceira", "Joias por orçamento"],
    },
  },
  en: {
    anillos: {
      title: "Rings",
      description: "Ring sizes, styles, materials, and practical buying advice.",
      intro: "Practical guides to ring sizing, ring types, materials, and the criteria that help you choose with confidence.",
      seoTitle: "Ring Guides: Sizes, Styles and Buying Advice | joyas.ai",
      seoDescription: "Ring guides covering sizing, materials, styles, and practical tips for choosing the right piece.",
      futureGuides: ["How to choose a ring", "Types of rings", "Engagement rings", "Rings by style", "Rings for different hand shapes"],
    },
    collares: {
      title: "Necklaces and pendants",
      description: "Lengths, styles, necklines, materials, and tips for choosing necklaces.",
      intro: "Guides to necklace lengths, necklines, styles, and materials before choosing a necklace or pendant.",
      seoTitle: "Necklace and Pendant Guides | joyas.ai",
      seoDescription: "Advice for choosing necklaces and pendants by length, neckline, style, material, and occasion.",
      futureGuides: ["Necklace lengths", "Types of chains", "How to layer necklaces"],
    },
    pendientes: {
      title: "Earrings",
      description: "Earring types, backs, sizes, styles, and practical tips for choosing earrings.",
      intro: "Useful information on earring types, backs, sizes, weight, materials, and occasions.",
      seoTitle: "Earring Guides: Types, Backs and Buying Tips | joyas.ai",
      seoDescription: "Guides for choosing earrings by size, backing, style, material, face shape, and occasion.",
      futureGuides: ["Types of earrings", "Types of earring backs", "Earrings by face shape", "Earrings by occasion"],
    },
    pulseras: {
      title: "Bracelets",
      description: "Bracelet types, sizing, materials, gemstones, and tips for choosing a comfortable piece.",
      intro: "Learn about bracelet types, materials, gemstones, and the criteria that make a bracelet comfortable and easy to wear.",
      seoTitle: "Bracelet Guides: Types, Materials and Buying Tips | joyas.ai",
      seoDescription: "Bracelet guides covering types, sizing, materials, gemstones, and practical tips for choosing a comfortable piece.",
      futureGuides: ["Types of bracelets", "How to measure bracelet size", "Charm bracelets", "Bangle vs bracelet", "Gold bracelets", "Silver bracelets"],
    },
    metales: {
      title: "Gold and metals",
      description: "Guides to gold, silver, platinum, purity, alloys, and jewelry materials.",
      intro: "Guides to compare gold, silver, platinum, purity marks, and finishes before buying.",
      seoTitle: "Gold, Silver and Jewelry Metals Guides | joyas.ai",
      seoDescription: "Guides to 14k, 18k and 24k gold, 925 silver, platinum, purity marks, and jewelry materials.",
      futureGuides: ["White gold vs yellow gold", "Rose gold", "18k vs 14k gold", "Solid gold vs plated", "What 585 means", "What 750 means"],
    },
    piedras: {
      title: "Gemstones",
      description: "Diamonds, rubies, sapphires, emeralds, and other gemstones used in jewelry.",
      intro: "Guides to diamonds, moissanite, colored gems, and other jewelry stones, including characteristics, differences, hardness, and care.",
      seoTitle: "Gemstone Guides: Diamonds, Gems and Jewelry Stones | joyas.ai",
      seoDescription: "Guides to diamonds, moissanite, colored gems, and jewelry stones: characteristics, differences, and care.",
      futureGuides: ["Diamonds", "Ruby", "Sapphire", "Emerald", "Amethyst", "Topaz", "Aquamarine", "Garnet"],
    },
    perlas: {
      title: "Pearls",
      description: "Pearl types, authenticity, quality, value, and advice for choosing pearl jewelry.",
      intro: "Learn to recognize pearl types, understand quality factors, and tell real pearls from imitations.",
      seoTitle: "Pearl Guides: Types, Authenticity and Value | joyas.ai",
      seoDescription: "Guides to pearl types, real vs imitation pearls, and the factors that affect quality and value.",
      futureGuides: ["Natural vs cultured pearls", "How to care for pearls", "Tahitian pearls", "Akoya pearls", "South Sea pearls", "How to choose a pearl necklace"],
    },
    cuidados: {
      title: "Jewelry care",
      description: "Cleaning, storage, preservation, and maintenance for jewelry and materials.",
      intro: "Tips for cleaning, storing, and maintaining jewelry without damaging metals, stones, plating, or delicate finishes.",
      seoTitle: "Jewelry Care Guides: Cleaning and Storage | joyas.ai",
      seoDescription: "Jewelry care guides covering cleaning, storage, preservation, and maintenance for metals and stones.",
      futureGuides: ["How to clean gold", "How to clean silver", "How to clean diamonds", "How to store jewelry", "How to prevent silver tarnish"],
    },
    regalos: {
      title: "Jewelry gifts",
      description: "Advice for choosing jewelry by person, occasion, budget, and meaning.",
      intro: "Ideas and criteria for choosing a jewelry gift based on relationship, occasion, budget, and personal style.",
      seoTitle: "Jewelry Gift Guides: Ideas and Buying Advice | joyas.ai",
      seoDescription: "Advice for gifting jewelry by person, occasion, budget, style, and meaning.",
      futureGuides: ["Anniversary jewelry gifts", "Birthday jewelry gifts", "Valentine's Day jewelry", "Jewelry for mom", "Jewelry for a partner", "Jewelry by budget"],
    },
  },
};

const guideCategorySlugs: Record<string, Record<Locale, string>> = {
  anillos: { es: "anillos", "pt-BR": "aneis", en: "rings" },
  collares: { es: "collares", "pt-BR": "colares", en: "necklaces" },
  pendientes: { es: "pendientes", "pt-BR": "brincos", en: "earrings" },
  pulseras: { es: "pulseras", "pt-BR": "pulseiras", en: "bracelets" },
  metales: { es: "metales", "pt-BR": "metais", en: "metals" },
  piedras: { es: "piedras", "pt-BR": "pedras", en: "gemstones" },
  perlas: { es: "perlas", "pt-BR": "perolas", en: "pearls" },
  cuidados: { es: "cuidados", "pt-BR": "cuidados", en: "care" },
  regalos: { es: "regalos", "pt-BR": "presentes", en: "gifts" },
};

const articleSlugs: Record<ContentKind, Record<string, Record<Locale, string>>> = {
  joyas: {
    anillos: { es: "anillos", "pt-BR": "aneis", en: "rings" },
    collares: { es: "collares", "pt-BR": "colares", en: "necklaces" },
    pulseras: { es: "pulseras", "pt-BR": "pulseiras", en: "bracelets" },
    pendientes: { es: "pendientes", "pt-BR": "brincos", en: "earrings" },
    boda: { es: "boda", "pt-BR": "casamento", en: "wedding" },
    regalos: { es: "regalos", "pt-BR": "presentes", en: "jewelry-gifts" },
  },
  ocasiones: {
    aniversario: { es: "aniversario", "pt-BR": "aniversario", en: "anniversary" },
    compromiso: { es: "compromiso", "pt-BR": "noivado", en: "engagement" },
    boda: { es: "boda", "pt-BR": "casamento", en: "wedding" },
    cumpleanos: { es: "cumpleanos", "pt-BR": "aniversario-presente", en: "birthday" },
    "san-valentin": { es: "san-valentin", "pt-BR": "dia-dos-namorados", en: "valentines-day" },
    "dia-de-la-madre": { es: "dia-de-la-madre", "pt-BR": "dia-das-maes", en: "mothers-day" },
    graduacion: { es: "graduacion", "pt-BR": "formatura", en: "graduation" },
    "regalo-sorpresa": { es: "regalo-sorpresa", "pt-BR": "presente-surpresa", en: "surprise-gift" },
  },
  guias: {
    "oro-14k-18k-24k": { es: "oro-14k-18k-24k", "pt-BR": "ouro-14k-18k-24k", en: "14k-vs-18k-vs-24k-gold" },
    "como-saber-si-una-joya-es-de-oro": { es: "como-saber-si-una-joya-es-de-oro", "pt-BR": "como-saber-se-uma-joia-e-de-ouro", en: "how-to-tell-if-jewelry-is-gold" },
    "plata-925": { es: "plata-925", "pt-BR": "prata-925", en: "925-sterling-silver" },
    platino: { es: "platino", "pt-BR": "platina", en: "platinum-jewelry" },
    "como-saber-talla-anillo": { es: "como-saber-talla-anillo", "pt-BR": "como-saber-medida-do-anel", en: "how-to-measure-ring-size" },
    "como-elegir-collar": { es: "como-elegir-collar", "pt-BR": "como-escolher-colar", en: "how-to-choose-a-necklace" },
    "collares-segun-escote": { es: "collares-segun-escote", "pt-BR": "colares-para-cada-decote", en: "necklace-for-neckline" },
    "tipos-de-cadenas": { es: "tipos-de-cadenas", "pt-BR": "tipos-de-correntes", en: "types-of-necklace-chains" },
    "como-elegir-pendientes": { es: "como-elegir-pendientes", "pt-BR": "como-escolher-brincos", en: "how-to-choose-earrings" },
    "tipos-cierre-pendientes": { es: "tipos-cierre-pendientes", "pt-BR": "tipos-de-fecho-de-brinco", en: "types-of-earring-backs" },
    "tipos-de-pendientes": { es: "tipos-de-pendientes", "pt-BR": "tipos-de-brincos", en: "types-of-earrings" },
    "como-cuidar-joyas": { es: "como-cuidar-joyas", "pt-BR": "como-cuidar-de-joias", en: "how-to-care-for-jewelry" },
    "como-elegir-una-joya-para-regalar": { es: "como-elegir-una-joya-para-regalar", "pt-BR": "como-escolher-joia-para-presentear", en: "how-to-choose-jewelry-as-a-gift" },
    "piedras-preciosas": { es: "piedras-preciosas", "pt-BR": "pedras-preciosas", en: "precious-gemstones" },
    "tipos-de-anillos": { es: "tipos-de-anillos", "pt-BR": "tipos-de-aneis", en: "types-of-rings" },
    "oro-rosa": { es: "oro-rosa", "pt-BR": "ouro-rose", en: "rose-gold" },
    "oro-laminado-chapado-bano": { es: "oro-laminado-chapado-bano", "pt-BR": "ouro-laminado-folheado-banhado", en: "gold-filled-gold-plated-gold-vermeil" },
    "oro-blanco": { es: "oro-blanco", "pt-BR": "ouro-branco", en: "white-gold" },
    "moissanita-vs-diamante": { es: "moissanita-vs-diamante", "pt-BR": "moissanita-vs-diamante", en: "moissanite-vs-diamond" },
    "diamantes-rosados": { es: "diamantes-rosados", "pt-BR": "diamantes-rosa", en: "pink-diamonds" },
    "como-saber-si-una-perla-es-autentica": { es: "como-saber-si-una-perla-es-autentica", "pt-BR": "como-saber-se-perola-e-autentica", en: "how-to-tell-if-pearls-are-real" },
    "tipos-de-perlas": { es: "tipos-de-perlas", "pt-BR": "tipos-de-perolas", en: "types-of-pearls" },
    "oro-vermeil": { es: "oro-vermeil", "pt-BR": "ouro-vermeil", en: "gold-vermeil" },
    "tipos-de-collares": { es: "tipos-de-collares", "pt-BR": "tipos-de-colares", en: "types-of-necklaces" },
    "pulsera-tennis": { es: "pulsera-tennis", "pt-BR": "pulseira-tennis", en: "tennis-bracelet" },
    "como-limpiar-plata": { es: "como-limpiar-plata", "pt-BR": "como-limpar-prata", en: "how-to-clean-silver-jewelry" },
    "como-limpiar-oro": { es: "como-limpiar-oro", "pt-BR": "como-limpar-ouro", en: "how-to-clean-gold-jewelry" },
    "pendientes-boda-invitada": { es: "pendientes-boda-invitada", "pt-BR": "brincos-para-convidada-de-casamento", en: "wedding-guest-earrings" },
    "joyas-para-regalar-mujer": { es: "joyas-para-regalar-mujer", "pt-BR": "joias-para-presentear-mulher", en: "jewelry-gifts-for-her" },
    "como-elegir-pendientes-novia": { es: "como-elegir-pendientes-novia", "pt-BR": "como-escolher-brincos-de-noiva", en: "how-to-choose-bridal-earrings" },
  },
};

const articleTitleOverrides: Record<LocalizedLocale, Record<string, { title: string; description: string; intro?: string }>> = {
  "pt-BR": {
    "joyas:anillos": { title: "Como escolher anéis: estilos, materiais e ocasiões", description: "Guia para escolher anéis de uso diário, presente, noivado ou aliança considerando medida, material, estilo e ocasião." },
    "joyas:collares": { title: "Como escolher um colar pelo decote, estilo e ocasião", description: "Dicas para escolher colares e pingentes conforme comprimento, material, estilo pessoal e momento de uso." },
    "joyas:pulseras": { title: "Como escolher uma pulseira confortável e elegante", description: "Guia para escolher pulseiras finas, rígidas, de corrente ou personalizadas conforme uso, tamanho e estilo." },
    "joyas:pendientes": { title: "Como escolher brincos: tamanho, fecho, material e estilo", description: "Dicas para escolher brincos discretos, argolas, longos ou com pedras conforme rosto, uso e ocasião." },
    "joyas:boda": { title: "Joias para casamento: alianças, noiva, noivo e convidadas", description: "Guia para escolher joias de casamento, alianças e acessórios para noiva, noivo, madrinha e convidadas." },
    "joyas:regalos": { title: "Joias para presentear: como acertar sem saber tudo", description: "Ideias para presentear com joias conforme ocasião, relação, orçamento, estilo e pistas discretas." },
    "guias:oro-14k-18k-24k": { title: "Ouro 14k, 18k e 24k: diferenças, pureza e qual escolher", description: "Entenda o que significam 14k, 18k e 24k, a porcentagem de ouro em cada liga e como comparar joias de ouro." },
    "guias:plata-925": { title: "Prata 925: o que significa e como reconhecer", description: "Saiba o que é prata 925, sua composição de 92,5% de prata e os cuidados para avaliar joias de prata." },
    "guias:como-saber-si-una-joya-es-de-oro": { title: "Como saber se uma joia é de ouro: marcas e testes", description: "Veja como avaliar marcas, documentação e testes confiáveis para saber se uma joia é de ouro." },
    "ocasiones:aniversario": { title: "Que joia dar em um aniversário de relacionamento", description: "Dicas para escolher uma joia de aniversário conforme tempo de relação, estilo pessoal, metal, orçamento e personalização." },
    "ocasiones:compromiso": { title: "Como escolher um anel de noivado com critério", description: "Guia cuidadoso sobre solitários, halo, três pedras, metais, tamanho e orçamento em anéis de noivado." },
    "ocasiones:boda": { title: "Joias para casamento: alianças, noiva, noivo e convidados", description: "Ideias para alianças, joias da noiva, acessórios do noivo, madrinha, convidadas e presentes ligados ao casamento." },
    "ocasiones:cumpleanos": { title: "Joias de aniversário por idade, relação e estilo", description: "Como escolher joias de aniversário considerando idade, relação, uso diário, orçamento e estilo pessoal." },
    "ocasiones:san-valentin": { title: "Joias para o Dia dos Namorados: ideias com significado", description: "Dicas para escolher joias românticas sem exagero, considerando estilo, relação, orçamento e mensagem." },
    "ocasiones:dia-de-la-madre": { title: "Joias para o Dia das Mães: ideias elegantes e pessoais", description: "Ideias de joias para mães conforme estilo, rotina, significado familiar, materiais e orçamento." },
    "ocasiones:graduacion": { title: "Joias para formatura: presentes para marcar uma nova etapa", description: "Como escolher joias de formatura com equilíbrio entre significado, uso diário, material e orçamento." },
    "ocasiones:regalo-sorpresa": { title: "Joia como presente surpresa: como acertar sem perguntar", description: "Dicas para escolher uma joia surpresa usando pistas de estilo, ocasião, tamanho, material e relação." },
    "guias:platino": { title: "Platina em joias: o que é, vantagens e cuidados", description: "Entenda a platina em joias, suas características, manutenção e diferenças em relação a outros metais." },
    "guias:como-saber-talla-anillo": { title: "Como saber o tamanho do anel: tabela e dicas de medida", description: "Aprenda a medir um anel ou o dedo em casa e compare medidas com uma tabela antes de comprar." },
    "guias:como-elegir-collar": { title: "Como escolher um colar: comprimento, estilo e ocasião", description: "Dicas para escolher colares e pingentes considerando comprimento, decote, material, estilo e uso." },
    "guias:collares-segun-escote": { title: "Qual colar usar para cada tipo de decote", description: "Guia para combinar colares com decotes diferentes sem perder proporção, conforto e estilo." },
    "guias:tipos-de-cadenas": { title: "Tipos de correntes: nomes, estilos e como escolher", description: "Conheça os principais tipos de correntes para colares e o que observar antes de comprar." },
    "guias:como-elegir-pendientes": { title: "Como escolher brincos: tamanho, fecho e estilo", description: "Dicas para escolher brincos conforme rosto, ocasião, conforto, material e tipo de fecho." },
    "guias:tipos-cierre-pendientes": { title: "Tipos de fecho de brinco: como escolher o mais adequado", description: "Entenda os principais fechos de brincos, suas diferenças de conforto, segurança e uso." },
    "guias:tipos-de-pendientes": { title: "Tipos de brincos: nomes, estilos e quando usar", description: "Guia dos principais tipos de brincos, de modelos discretos a peças longas e com pedras." },
    "guias:como-cuidar-joyas": { title: "Como cuidar de joias: limpeza, armazenamento e conservação", description: "Dicas para cuidar de joias sem danificar metais, pedras, banhos, pérolas ou acabamentos delicados." },
    "guias:como-elegir-una-joya-para-regalar": { title: "Como escolher uma joia para presentear", description: "Guia para escolher uma joia de presente conforme pessoa, ocasião, orçamento, estilo e significado." },
    "guias:piedras-preciosas": { title: "Pedras preciosas em joias: tipos, dureza e cuidados", description: "Conheça pedras preciosas e gemas usadas em joias, com diferenças, resistência e cuidados básicos." },
    "guias:tipos-de-anillos": { title: "Tipos de anéis: nomes, estilos e significados", description: "Conheça modelos de anéis, seus usos mais comuns e como escolher conforme estilo e ocasião." },
    "guias:oro-rosa": { title: "Ouro rosé: composição, quilates e diferenças", description: "Entenda o que é ouro rosé, como sua cor é obtida e o que observar antes de comprar." },
    "guias:oro-laminado-chapado-bano": { title: "Ouro laminado, folheado e banho de ouro: diferenças", description: "Compare ouro laminado, folheado e banho de ouro para entender durabilidade, uso e cuidados." },
    "guias:oro-blanco": { title: "Ouro branco: composição, 18k, banho de ródio e diferenças", description: "Entenda o que é ouro branco, como é feito e o que observar em joias de ouro branco." },
    "guias:moissanita-vs-diamante": { title: "Moissanita vs diamante: diferenças, brilho e escolha", description: "Compare moissanita e diamante em aparência, dureza, brilho, cuidado e critérios de compra." },
    "guias:diamantes-rosados": { title: "Diamantes rosa: o que são, raridade e valor", description: "Entenda por que diamantes rosa são raros, quais fatores influenciam seu valor e cuidados ao avaliar uma peça." },
    "guias:como-saber-si-una-perla-es-autentica": { title: "Como saber se uma pérola é verdadeira", description: "Dicas para diferenciar pérolas verdadeiras de imitações e saber quando buscar avaliação profissional." },
    "guias:tipos-de-perlas": { title: "Tipos de pérolas: diferenças e fatores de valor", description: "Conheça pérolas Akoya, Tahiti, água doce e Mar do Sul, além dos fatores que influenciam qualidade e valor." },
    "guias:oro-vermeil": { title: "Ouro vermeil: o que é, duração e diferenças", description: "Entenda ouro vermeil, sua base de prata, camada de ouro e diferenças em relação a banho e folheado." },
    "guias:tipos-de-collares": { title: "Tipos de colares: nomes, comprimentos e estilos", description: "Conheça os principais tipos de colares e comprimentos para escolher uma peça proporcional e confortável." },
    "guias:pulsera-tennis": { title: "Pulseira tennis: o que é, origem e como escolher", description: "Entenda a pulseira tennis, seu estilo, fecho, cravação, materiais e pontos de atenção antes da compra." },
    "guias:como-limpiar-plata": { title: "Como limpar prata em casa sem danificar joias", description: "Dicas seguras para limpar joias de prata considerando acabamento, pedras, pérolas e frequência de uso." },
    "guias:como-limpiar-oro": { title: "Como limpar ouro em casa sem danificar joias", description: "Aprenda cuidados básicos para limpar joias de ouro sem prejudicar pedras, acabamentos ou banhos." },
    "guias:pendientes-boda-invitada": { title: "Brincos para convidada de casamento: como escolher", description: "Dicas para escolher brincos de casamento conforme vestido, penteado, horário, conforto e estilo." },
    "guias:joyas-para-regalar-mujer": { title: "Joias para presentear uma mulher: ideias e dicas", description: "Ideias de joias para presentear conforme relação, ocasião, estilo pessoal, orçamento e significado." },
    "guias:como-elegir-pendientes-novia": { title: "Como escolher brincos de noiva: vestido, penteado e estilo", description: "Dicas para escolher brincos de noiva conforme vestido, penteado, decote, véu, conforto e estilo do casamento." },
  },
  en: {
    "joyas:anillos": { title: "How to Choose a Ring: Styles, Metals and Occasions", description: "A practical guide to choosing everyday rings, gifts, engagement rings and wedding bands by size, metal, style and occasion." },
    "joyas:collares": { title: "How to Choose a Necklace for Neckline, Style and Occasion", description: "Tips for choosing necklaces and pendants by length, material, personal style and moment of use." },
    "joyas:pulseras": { title: "How to Choose a Comfortable, Elegant Bracelet", description: "Guide to choosing delicate, bangle, chain or personalized bracelets by fit, use and style." },
    "joyas:pendientes": { title: "How to Choose Earrings: Size, Backing, Material and Style", description: "Tips for choosing studs, hoops, drop earrings or gemstone earrings by face, use and occasion." },
    "joyas:boda": { title: "Wedding Jewelry: Rings, Bride, Groom and Guests", description: "Guide to wedding bands, bridal jewelry and accessories for the groom, mother of the bride and guests." },
    "joyas:regalos": { title: "Jewelry Gifts: How to Get It Right Without Knowing Everything", description: "Jewelry gift ideas by occasion, relationship, budget, style and subtle clues." },
    "guias:oro-14k-18k-24k": { title: "14k vs 18k vs 24k Gold: Differences, Purity and Which to Choose", description: "Learn what 14k, 18k and 24k mean, how much gold each alloy contains and how to compare gold jewelry." },
    "guias:plata-925": { title: "925 Sterling Silver: Meaning, Marks and How to Identify It", description: "Understand what 925 sterling silver means, its 92.5% silver content and what to check before buying silver jewelry." },
    "guias:como-saber-si-una-joya-es-de-oro": { title: "How to Tell if Jewelry Is Gold: Marks, Tests and Reliable Checks", description: "Learn how to check marks, documentation and reliable tests when you need to know whether jewelry is real gold." },
    "ocasiones:aniversario": { title: "Anniversary Jewelry Gifts: Meaningful Ideas by Style and Budget", description: "Tips for choosing anniversary jewelry by relationship length, personal style, metal, budget and personalization." },
    "ocasiones:compromiso": { title: "How to Choose an Engagement Ring With Confidence", description: "A careful guide to solitaires, halo rings, three-stone rings, metals, ring size and engagement ring budget." },
    "ocasiones:boda": { title: "Wedding Jewelry: Bands, Bride, Groom and Guests", description: "Ideas for wedding bands, bridal jewelry, groom accessories, wedding guests and meaningful wedding-related gifts." },
    "ocasiones:cumpleanos": { title: "Birthday Jewelry Gifts by Age, Relationship and Style", description: "How to choose birthday jewelry based on age, relationship, everyday wear, budget and personal style." },
    "ocasiones:san-valentin": { title: "Valentine's Day Jewelry Gifts: Meaningful Ideas Without Overdoing It", description: "Tips for choosing romantic jewelry by style, relationship, budget and message." },
    "ocasiones:dia-de-la-madre": { title: "Mother's Day Jewelry Gifts: Elegant and Personal Ideas", description: "Jewelry gift ideas for mothers based on style, routine, family meaning, materials and budget." },
    "ocasiones:graduacion": { title: "Graduation Jewelry Gifts: Pieces for a New Chapter", description: "How to choose graduation jewelry with meaning, everyday wear, material and budget in mind." },
    "ocasiones:regalo-sorpresa": { title: "Surprise Jewelry Gifts: How to Choose Without Asking", description: "Tips for choosing surprise jewelry using clues about style, size, material, occasion and relationship." },
    "guias:platino": { title: "Platinum Jewelry: Meaning, Benefits and Care", description: "Understand platinum jewelry, its main characteristics, maintenance and differences from other metals." },
    "guias:como-saber-talla-anillo": { title: "How to Measure Ring Size: Chart and Practical Tips", description: "Learn how to measure a ring or finger at home and compare measurements before buying." },
    "guias:como-elegir-collar": { title: "How to Choose a Necklace: Length, Style and Occasion", description: "Tips for choosing necklaces and pendants by length, neckline, material, style and use." },
    "guias:collares-segun-escote": { title: "What Necklace to Wear With Different Necklines", description: "A practical guide to matching necklaces with necklines while keeping proportion, comfort and style in mind." },
    "guias:tipos-de-cadenas": { title: "Types of Necklace Chains: Names, Styles and How to Choose", description: "Learn the main necklace chain styles and what to check before buying." },
    "guias:como-elegir-pendientes": { title: "How to Choose Earrings: Size, Backing and Style", description: "Tips for choosing earrings by face shape, occasion, comfort, material and backing type." },
    "guias:tipos-cierre-pendientes": { title: "Types of Earring Backs: How to Choose the Right One", description: "Understand common earring backs and how they differ in comfort, security and everyday use." },
    "guias:tipos-de-pendientes": { title: "Types of Earrings: Names, Styles and When to Wear Them", description: "A guide to common earring types, from subtle studs to drops, hoops and gemstone designs." },
    "guias:como-cuidar-joyas": { title: "How to Care for Jewelry: Cleaning, Storage and Maintenance", description: "Tips for caring for jewelry without damaging metals, stones, plating, pearls or delicate finishes." },
    "guias:como-elegir-una-joya-para-regalar": { title: "How to Choose Jewelry as a Gift", description: "A guide to choosing jewelry gifts by person, occasion, budget, style and meaning." },
    "guias:piedras-preciosas": { title: "Gemstones in Jewelry: Types, Hardness and Care", description: "Learn about gemstones used in jewelry, including differences, durability and basic care." },
    "guias:tipos-de-anillos": { title: "Types of Rings: Names, Styles and Meanings", description: "Learn common ring styles, what they are used for and how to choose by style and occasion." },
    "guias:oro-rosa": { title: "Rose Gold: Composition, Karats and Differences", description: "Understand rose gold, how its color is achieved and what to check before buying." },
    "guias:oro-laminado-chapado-bano": { title: "Gold Filled vs Gold Plated vs Gold Vermeil: Key Differences", description: "Compare gold filled, gold plated and vermeil jewelry by durability, use and care." },
    "guias:oro-blanco": { title: "White Gold: Composition, 18k, Rhodium Plating and Differences", description: "Understand white gold, how it is made and what to check in white gold jewelry." },
    "guias:moissanita-vs-diamante": { title: "Moissanite vs Diamond: Differences, Sparkle and How to Choose", description: "Compare moissanite and diamond by appearance, hardness, sparkle, care and buying criteria." },
    "guias:diamantes-rosados": { title: "Pink Diamonds: Meaning, Rarity and Value", description: "Understand why pink diamonds are rare, what affects their value and what to check when evaluating a piece." },
    "guias:como-saber-si-una-perla-es-autentica": { title: "How to Tell if Pearls Are Real", description: "Tips for distinguishing real pearls from imitations and knowing when to seek professional evaluation." },
    "guias:tipos-de-perlas": { title: "Types of Pearls: Differences and Value Factors", description: "Learn about Akoya, Tahitian, freshwater and South Sea pearls, plus the factors that affect quality and value." },
    "guias:oro-vermeil": { title: "Gold Vermeil: Meaning, Durability and Differences", description: "Understand gold vermeil, its sterling silver base, gold layer and differences from plating." },
    "guias:tipos-de-collares": { title: "Types of Necklaces: Names, Lengths and Styles", description: "Learn common necklace types and lengths so you can choose a proportional, comfortable piece." },
    "guias:pulsera-tennis": { title: "Tennis Bracelet: Meaning, Origin and How to Choose", description: "Understand tennis bracelets, including style, clasp, setting, materials and key buying checks." },
    "guias:como-limpiar-plata": { title: "How to Clean Silver Jewelry at Home Safely", description: "Safe tips for cleaning silver jewelry while considering finishes, stones, pearls and wear." },
    "guias:como-limpiar-oro": { title: "How to Clean Gold Jewelry at Home Safely", description: "Learn basic care for cleaning gold jewelry without damaging stones, finishes or plating." },
    "guias:pendientes-boda-invitada": { title: "Wedding Guest Earrings: How to Choose the Right Pair", description: "Tips for choosing wedding guest earrings by dress, hairstyle, time of day, comfort and style." },
    "guias:joyas-para-regalar-mujer": { title: "Jewelry Gifts for Her: Ideas and Buying Tips", description: "Jewelry gift ideas by relationship, occasion, personal style, budget and meaning." },
    "guias:como-elegir-pendientes-novia": { title: "How to Choose Bridal Earrings: Dress, Hairstyle and Style", description: "Tips for choosing bridal earrings by dress, hairstyle, neckline, veil, comfort and wedding style." },
  },
};

const articleContentOverrides: Record<LocalizedLocale, Record<string, { intro?: string; sections: ArticleSection[] }>> = {
  "pt-BR": {
    "guias:oro-14k-18k-24k": {
      intro: "O ouro puro e associado ao ouro 24k, mas em joalheria as ligas sao comuns porque metais muito puros podem ser pouco praticos em determinadas pecas.",
      sections: [
        {
          title: "Composicao aproximada",
          paragraphs: [
            "O ouro 18k contem aproximadamente 75% de ouro. O ouro 14k contem aproximadamente 58,5% de ouro.",
            "O restante da composicao depende das ligas usadas, que podem modificar cor, dureza, manutencao e comportamento da peca.",
          ],
        },
        {
          title: "Uso em joalheria",
          paragraphs: [
            "O ouro 24k tem alta pureza, mas pode ser menos pratico para joias submetidas ao uso diario. Por isso muitas pecas usam ligas.",
            "Nao existe um quilate universalmente melhor: a escolha depende do design, do uso, do orcamento e das preferencias de cor.",
          ],
        },
        {
          title: "Antes de comprar",
          paragraphs: [
            "Revise marcacao, ficha do produto, tratamento, garantia comercial e recomendacoes de cuidado. As caracteristicas concretas podem variar conforme fabricante e peca.",
          ],
        },
      ],
    },
    "guias:como-saber-si-una-joya-es-de-oro": {
      intro: "Nenhum metodo caseiro isolado oferece certeza absoluta. Esta guia explica como revisar marcas, documentacao e quando convem procurar um profissional.",
      sections: [
        {
          title: "Marcas e contrastes",
          paragraphs: [
            "Procure numeros como 585, 750 ou 999 e indicacoes de quilates, mas lembre que uma gravacao pode ser falsificada ou nao descrever toda a peca.",
          ],
        },
      ],
    },
    "guias:plata-925": {
      intro: "A prata 925 contem 92,5% de prata. O restante corresponde a outros metais que ajudam a melhorar seu comportamento em joias.",
      sections: [
        {
          title: "Por que a prata e ligada",
          paragraphs: [
            "A prata pura pode ser macia demais para muitas pecas de uso diario. A liga permite fabricar joias mais praticas.",
            "A composicao concreta e os tratamentos superficiais podem variar conforme fabricante e peca.",
          ],
        },
        {
          title: "Cuidados",
          paragraphs: [
            "A prata pode escurecer com o tempo por contato com ar, umidade, cosmeticos ou certas substancias. Isso nao significa necessariamente que seja falsa.",
            "Guarda-la seca, separada e limpa-la com produtos adequados ajuda a conservar melhor o aspecto.",
          ],
        },
        {
          title: "Antes de comprar",
          paragraphs: [
            "Verifique se a peca e prata macica, banho de prata ou outro acabamento. Manutencao e durabilidade nao sao iguais.",
          ],
        },
      ],
    },
    "guias:como-saber-talla-anillo": {
      intro: "O tamanho do anel e uma das variaveis mais delicadas ao presentear. Uma medida aproximada ajuda, mas confirmacao profissional ou possibilidade de ajuste continuam importantes.",
      sections: [
        {
          title: "Medir um anel existente",
          paragraphs: [
            "Se voce tem acesso a um anel que serve bem no mesmo dedo, pode medir seu diametro interno com cuidado ou leva-lo a uma joalheria.",
            "Deve ser um anel do dedo correto: o tamanho muda entre maos e dedos.",
          ],
        },
        {
          title: "Medir o dedo",
          paragraphs: [
            "Medicoes caseiras com papel ou fio podem falhar se ficarem apertadas demais. Temperatura e hora do dia tambem podem afetar levemente.",
            "Para uma compra importante, tente confirmar com um medidor confiavel ou pergunte sobre ajustes posteriores.",
          ],
        },
        {
          title: "Presente surpresa",
          paragraphs: [
            "Se voce nao conhece o tamanho, considere colares, pulseiras ajustaveis ou brincos. Se escolher um anel, revise a politica de troca e ajuste antes de comprar.",
          ],
        },
      ],
    },
  },
  en: {
    "guias:oro-14k-18k-24k": {
      intro: "Pure gold is associated with 24k gold, but alloys are common in jewelry because very pure metals can be impractical for some pieces.",
      sections: [
        {
          title: "Approximate Composition",
          paragraphs: [
            "18k gold contains approximately 75% gold. 14k gold contains approximately 58.5% gold.",
            "The remaining composition depends on the alloy used, which can affect color, hardness, maintenance and how the piece behaves in daily wear.",
          ],
        },
        {
          title: "Use in Jewelry",
          paragraphs: [
            "24k gold has high purity, but it may be less practical for jewelry exposed to everyday wear. That is why many pieces use alloys.",
            "There is no universally better karat: the right choice depends on design, use, budget and color preference.",
          ],
        },
        {
          title: "Before Buying",
          paragraphs: [
            "Check the hallmark, product details, treatment, warranty and care recommendations. The exact characteristics can vary by maker and piece.",
          ],
        },
      ],
    },
    "guias:como-saber-si-una-joya-es-de-oro": {
      intro: "No single home method gives absolute certainty. This guide explains how to review marks, documentation and when it is worth seeking professional testing.",
      sections: [
        {
          title: "Marks and Hallmarks",
          paragraphs: [
            "Look for numbers such as 585, 750 or 999 and karat marks, but remember that a stamp can be fake or may not describe the whole piece.",
          ],
        },
      ],
    },
    "guias:plata-925": {
      intro: "Sterling silver 925 contains 92.5% silver. The remaining percentage is made up of other metals that help make jewelry more practical.",
      sections: [
        {
          title: "Why Silver Is Alloyed",
          paragraphs: [
            "Pure silver can be too soft for many everyday pieces. An alloy makes it possible to create more practical jewelry.",
            "The exact composition and surface treatments can vary by maker and piece.",
          ],
        },
        {
          title: "Care",
          paragraphs: [
            "Silver can darken over time through contact with air, moisture, cosmetics or certain substances. This does not necessarily mean it is fake.",
            "Keeping pieces dry, separate and cleaning them with suitable products helps preserve their appearance.",
          ],
        },
        {
          title: "Before Buying",
          paragraphs: [
            "Check whether the piece is solid silver, silver plated or another finish. Maintenance and durability are not the same.",
          ],
        },
      ],
    },
    "guias:como-saber-talla-anillo": {
      intro: "Ring size is one of the most delicate details when giving a ring as a gift. An approximate measurement can help, but professional confirmation or resizing options still matter.",
      sections: [
        {
          title: "Measure an Existing Ring",
          paragraphs: [
            "If you have access to a ring that fits the same finger well, measure its inner diameter carefully or take it to a jeweler.",
            "It must be a ring for the correct finger: size changes between hands and fingers.",
          ],
        },
        {
          title: "Measure the Finger",
          paragraphs: [
            "Home measurements with paper or string can fail if they are pulled too tight. Temperature and time of day can also make a small difference.",
            "For an important purchase, try to confirm with a reliable ring sizer or ask about later resizing.",
          ],
        },
        {
          title: "Surprise Gift",
          paragraphs: [
            "If you do not know the size, consider necklaces, adjustable bracelets or earrings. If you choose a ring, check the exchange and resizing policy before buying.",
          ],
        },
      ],
    },
  },
};

const exactText: Record<LocalizedLocale, Record<string, string>> = {
  "pt-BR": {
    "Guías": "Guias",
    "Guias": "Guias",
    "Joyas": "Joias",
    "Ocasiones": "Ocasiões",
    "Guía de materiales": "Guia de materiais",
    "Oro y metales": "Ouro e metais",
    "También te puede interesar": "Você também pode gostar",
    "Joyero IA": "Joalheiro IA",
    "¿No sabes qué joya elegir?": "Nao sabe qual joia escolher?",
    "Cuéntale a nuestro joyero IA para quién es la joya, la ocasión y tu presupuesto, y te ayudará a encontrar una opción adecuada.": "Conte ao nosso joalheiro IA para quem e a joia, a ocasiao e seu orcamento, e ele ajudara a encontrar uma opcao adequada.",
    "Preguntar al joyero IA": "Perguntar ao joalheiro IA",
    "Probar el joyero IA": "Testar o joalheiro IA",
    "Cómo saber si una joya es de oro": "Como saber se uma joia e de ouro",
    "Oro blanco": "Ouro branco",
    "Oro rosa": "Ouro rose",
    "Platino en joyería": "Platina em joias",
    "Plata 925 o plata de ley": "Prata 925",
    "Cómo cuidar joyas sin dañarlas": "Como cuidar de joias",
    "Tipos de anillos": "Tipos de aneis",
    "Regalo sorpresa": "Presente surpresa",
    "Recomendador": "Recomendador",
    "Como funciona": "Como funciona",
    "Guías de joyería": "Guias de joalheria",
    "Guías sobre": "Guias sobre",
    "Todas las categorías": "Todas as categorias",
    "Guías disponibles": "Guias disponíveis",
    "Guía incluida en esta categoría": "Guia incluído nesta categoria",
    "Leer guía": "Ler guia",
    "Próximas guías previstas": "Próximos guias previstos",
  },
  en: {
    "Guías": "Guides",
    "Guias": "Guides",
    "Joyas": "Jewelry",
    "Ocasiones": "Occasions",
    "Guía de materiales": "Materials guide",
    "Oro y metales": "Gold and metals",
    "También te puede interesar": "You may also like",
    "Joyero IA": "AI Jeweler",
    "¿No sabes qué joya elegir?": "Not sure which jewelry to choose?",
    "Cuéntale a nuestro joyero IA para quién es la joya, la ocasión y tu presupuesto, y te ayudará a encontrar una opción adecuada.": "Tell the AI jeweler who the piece is for, the occasion and your budget, and it will help you find a suitable option.",
    "Preguntar al joyero IA": "Ask the AI jeweler",
    "Probar el joyero IA": "Try the AI jeweler",
    "Cómo saber si una joya es de oro": "How to tell if jewelry is gold",
    "Oro blanco": "White gold",
    "Oro rosa": "Rose gold",
    "Platino en joyería": "Platinum jewelry",
    "Plata 925 o plata de ley": "925 sterling silver",
    "Cómo cuidar joyas sin dañarlas": "How to care for jewelry",
    "Tipos de anillos": "Types of rings",
    "Regalo sorpresa": "Surprise gift",
    "Recomendador": "Advisor",
    "Como funciona": "How it works",
    "Guías de joyería": "Jewelry guides",
    "Guías sobre": "Guides to",
    "Todas las categorías": "All categories",
    "Guías disponibles": "Available guides",
    "Guía incluida en esta categoría": "Guide included in this category",
    "Leer guía": "Read guide",
    "Próximas guías previstas": "Upcoming planned guides",
  },
};

const phraseMap: Record<LocalizedLocale, Array<[RegExp, string]>> = {
  "pt-BR": [
    [/\by\b/g, "e"], [/\bY\b/g, "E"], [/\bsegún\b/gi, "conforme"], [/\bsegun\b/gi, "conforme"],
    [/\bconsejos\b/gi, "dicas"], [/\bconsejo\b/gi, "dica"], [/\btamaños\b/gi, "tamanhos"], [/\btamaño\b/gi, "tamanho"],
    [/\btallas\b/gi, "tamanhos"], [/\btalla\b/gi, "tamanho"], [/\bmateriales\b/gi, "materiais"], [/\bocasión\b/gi, "ocasião"],
    [/\bocasion\b/gi, "ocasião"], [/\bocasiones\b/gi, "ocasiões"], [/\buna pieza\b/gi, "uma peça"], [/\buna joya\b/gi, "uma joia"],
    [/\badecuada\b/gi, "adequada"], [/\badecuado\b/gi, "adequado"], [/\bsin\b/gi, "sem"], [/\bcon\b/gi, "com"],
    [/\belegir\b/gi, "escolher"], [/\belegida\b/gi, "escolhida"], [/\bqué\b/gi, "o que"], [/\bcuál\b/gi, "qual"],
    [/\bjoyas\b/gi, "joias"], [/\bjoya\b/gi, "joia"], [/\boro\b/gi, "ouro"], [/\bplata\b/gi, "prata"],
    [/\banillos\b/gi, "anéis"], [/\banillo\b/gi, "anel"], [/\bcollares\b/gi, "colares"], [/\bcollar\b/gi, "colar"],
    [/\bpendientes\b/gi, "brincos"], [/\bpendiente\b/gi, "brinco"], [/\bpulseras\b/gi, "pulseiras"], [/\bpulsera\b/gi, "pulseira"],
    [/\bregalo\b/gi, "presente"], [/\bregalar\b/gi, "presentear"], [/\bcompromiso\b/gi, "noivado"], [/\bboda\b/gi, "casamento"],
    [/\bnovia\b/gi, "noiva"], [/\bnovio\b/gi, "noivo"], [/\binvitadas\b/gi, "convidadas"], [/\bescote\b/gi, "decote"],
    [/\bperlas\b/gi, "pérolas"], [/\bperla\b/gi, "pérola"], [/\bpiedras preciosas\b/gi, "pedras preciosas"],
    [/\bguías\b/gi, "guias"], [/\bguia\b/gi, "guia"], [/\bpresupuesto\b/gi, "orçamento"], [/\buso diario\b/gi, "uso diário"],
    [/\bde uso frecuente\b/gi, "de uso frequente"], [/\baleación\b/gi, "liga"], [/\baleacion\b/gi, "liga"],
    [/\bbaño\b/gi, "banho"], [/\bchapado\b/gi, "folheado"], [/\boro blanco\b/gi, "ouro branco"], [/\boro rosa\b/gi, "ouro rosé"],
    [/\bInicio\b/g, "Início"], [/\bPreguntas frecuentes\b/g, "Perguntas frequentes"],
  ],
  en: [
    [/\by\b/g, "and"], [/\bY\b/g, "And"], [/\bsobre\b/gi, "about"], [/\bsegún\b/gi, "by"], [/\bsegun\b/gi, "by"],
    [/\bconsejos\b/gi, "advice"], [/\bconsejo\b/gi, "tip"], [/\bestilos\b/gi, "styles"], [/\bestilo\b/gi, "style"],
    [/\bmateriales\b/gi, "materials"], [/\bmaterial\b/gi, "material"], [/\bmedidas\b/gi, "measurements"], [/\bmedida\b/gi, "measurement"],
    [/\btallas\b/gi, "sizes"], [/\btalla\b/gi, "size"], [/\bocasiones\b/gi, "occasions"], [/\bocasión\b/gi, "occasion"], [/\bocasion\b/gi, "occasion"],
    [/\buna pieza\b/gi, "a piece"], [/\buna joya\b/gi, "a jewelry piece"], [/\badecuada\b/gi, "right"], [/\badecuado\b/gi, "right"],
    [/\bsin\b/gi, "without"], [/\bcomprar\b/gi, "buying"], [/\belegir\b/gi, "choose"], [/\belegida\b/gi, "chosen"],
    [/\bpara choose\b/gi, "to choose"], [/\bpara\b/gi, "for"], [/\bqué\b/gi, "what"], [/\bcuál\b/gi, "which"], [/\bcómo\b/gi, "how to"], [/\bcomo\b/gi, "how to"],
    [/\bjoyas\b/gi, "jewelry"], [/\bjoya\b/gi, "jewelry piece"], [/\boro\b/gi, "gold"], [/\bplata\b/gi, "silver"],
    [/\banillos\b/gi, "rings"], [/\banillo\b/gi, "ring"], [/\bcollares\b/gi, "necklaces"], [/\bcollar\b/gi, "necklace"],
    [/\bpendientes\b/gi, "earrings"], [/\bpendiente\b/gi, "earring"], [/\bpulseras\b/gi, "bracelets"], [/\bpulsera\b/gi, "bracelet"],
    [/\bregalo\b/gi, "gift"], [/\bregalar\b/gi, "give as a gift"], [/\bcompromiso\b/gi, "engagement"], [/\bboda\b/gi, "wedding"],
    [/\bnovia\b/gi, "bride"], [/\bnovio\b/gi, "groom"], [/\binvitadas\b/gi, "guests"], [/\bescote\b/gi, "neckline"],
    [/\bperlas\b/gi, "pearls"], [/\bperla\b/gi, "pearl"], [/\bpiedras preciosas\b/gi, "gemstones"], [/\bquilates\b/gi, "karats"],
    [/\bguías\b/gi, "guides"], [/\bguia\b/gi, "guide"], [/\bcuidados\b/gi, "care"], [/\bpresupuesto\b/gi, "budget"],
    [/\buso diario\b/gi, "everyday wear"], [/\bde uso frecuente\b/gi, "for frequent wear"], [/\baleación\b/gi, "alloy"], [/\baleacion\b/gi, "alloy"],
    [/\bbaño\b/gi, "plating"], [/\bchapado\b/gi, "gold plated"], [/\boro blanco\b/gi, "white gold"], [/\boro rosa\b/gi, "rose gold"],
    [/\bInicio\b/g, "Home"], [/\bPreguntas frecuentes\b/g, "FAQs"],
  ],
};

export function getLocalizedSection(kind: ContentKind, locale: Locale) {
  return locale === "es" ? kind : localizedSections[locale][kind];
}

export function getLocaleHomePath(locale: Locale) {
  if (locale === "pt-BR") {
    return "/pt-br";
  }

  if (locale === "en") {
    return "/en";
  }

  return "/";
}

export function getSectionLabel(kind: ContentKind, locale: Locale) {
  return sectionLabels[locale][kind];
}

export function getLocalizedPath(kind: ContentKind, esSlug: string, locale: Locale) {
  const slug = articleSlugs[kind][esSlug]?.[locale] ?? esSlug;
  if (locale === "es") {
    return `/${kind}/${slug}`;
  }
  return `/${localePrefixes[locale]}/${getLocalizedSection(kind, locale)}/${slug}`;
}

export function getLocalizedSlug(kind: ContentKind, esSlug: string, locale: Locale) {
  return articleSlugs[kind][esSlug]?.[locale] ?? esSlug;
}

export function getLocalizedIndexPath(kind: ContentKind, locale: Locale) {
  if (locale === "es") {
    return `/${kind}`;
  }
  return `/${localePrefixes[locale]}/${getLocalizedSection(kind, locale)}`;
}

export function getHomeAlternates() {
  return {
    es: getLocaleHomePath("es"),
    "pt-BR": getLocaleHomePath("pt-BR"),
    en: getLocaleHomePath("en"),
  };
}

export function getIndexAlternates(kind: ContentKind) {
  return {
    es: getLocalizedIndexPath(kind, "es"),
    "pt-BR": getLocalizedIndexPath(kind, "pt-BR"),
    en: getLocalizedIndexPath(kind, "en"),
  };
}

export function getLocalizedGuideCategoryPath(esSlug: string, locale: Locale) {
  const slug = guideCategorySlugs[esSlug]?.[locale] ?? esSlug;
  if (locale === "es") {
    return `/guias/${slug}`;
  }
  return `/${localePrefixes[locale]}/${getLocalizedSection("guias", locale)}/${slug}`;
}

export function getLocalizedGuideCategorySlug(esSlug: string, locale: Locale) {
  return guideCategorySlugs[esSlug]?.[locale] ?? esSlug;
}

export function getArticleAlternates(kind: ContentKind, esSlug: string) {
  return {
    es: getLocalizedPath(kind, esSlug, "es"),
    "pt-BR": getLocalizedPath(kind, esSlug, "pt-BR"),
    en: getLocalizedPath(kind, esSlug, "en"),
  };
}

export function getGuideCategoryAlternates(esSlug: string) {
  return {
    es: getLocalizedGuideCategoryPath(esSlug, "es"),
    "pt-BR": getLocalizedGuideCategoryPath(esSlug, "pt-BR"),
    en: getLocalizedGuideCategoryPath(esSlug, "en"),
  };
}

export function getLanguageLinks(kind: ContentKind, esSlug: string) {
  const alternates = getArticleAlternates(kind, esSlug);
  return locales.map((locale) => ({
    locale,
    href: alternates[locale],
    label: localeLabels[locale],
  }));
}

export function getMetadataAlternates(kind: ContentKind, esSlug: string, locale: Locale) {
  const languages = getArticleAlternates(kind, esSlug);
  return {
    canonical: languages[locale],
    languages: {
      es: languages.es,
      "pt-BR": languages["pt-BR"],
      en: languages.en,
      "x-default": languages.es,
    },
  };
}

export function getHomeMetadataAlternates(locale: Locale) {
  const languages = getHomeAlternates();
  return buildMetadataAlternates(languages, locale);
}

export function getIndexMetadataAlternates(kind: ContentKind, locale: Locale) {
  const languages = getIndexAlternates(kind);
  return buildMetadataAlternates(languages, locale);
}

export function getGuideCategoryMetadataAlternates(esSlug: string, locale: Locale) {
  const languages = getGuideCategoryAlternates(esSlug);
  return buildMetadataAlternates(languages, locale);
}

export function buildArticleMetadata(article: ArticleData, kind: ContentKind, locale: Locale): Metadata {
  const alternates = getMetadataAlternates(kind, article.originalSlug ?? article.slug, locale);

  return {
    title: `${article.title} | joyas.ai`,
    description: article.description,
    alternates,
    openGraph: {
      title: `${article.title} | joyas.ai`,
      description: article.description,
      url: alternates.canonical,
      siteName: "joyas.ai",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => openGraphLocales[item]),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | joyas.ai`,
      description: article.description,
    },
  };
}

export function buildMetadataAlternates(languages: Record<Locale, string>, locale: Locale) {
  return {
    canonical: languages[locale],
    languages: {
      es: languages.es,
      "pt-BR": languages["pt-BR"],
      en: languages.en,
      "x-default": languages.es,
    },
  };
}

export function localizeArticle(article: ArticleData, kind: ContentKind, locale: Locale): ArticleData {
  const originalSlug = article.originalSlug ?? article.slug;
  if (locale === "es") {
    return { ...article, originalSlug, locale };
  }

  const override = articleTitleOverrides[locale][`${kind}:${originalSlug}`];
  const contentOverride = articleContentOverrides[locale][`${kind}:${originalSlug}`];
  return {
    ...article,
    originalSlug,
    locale,
    slug: articleSlugs[kind][originalSlug]?.[locale] ?? article.slug,
    categorySlug: article.categorySlug ? guideCategorySlugs[article.categorySlug]?.[locale] ?? article.categorySlug : undefined,
    title: override?.title ?? localizeText(article.title, locale),
    description: override?.description ?? localizeText(article.description, locale),
    eyebrow: localizeText(article.eyebrow, locale),
    intro: contentOverride?.intro ?? override?.intro ?? localizeText(article.intro, locale),
    sections: contentOverride?.sections ?? article.sections.map((section) => localizeSection(section, locale)),
    related: article.related.map((link) => localizeLink(link, locale)),
    advisorCta: article.advisorCta
      ? {
          title: localizeText(article.advisorCta.title, locale),
          description: localizeText(article.advisorCta.description, locale),
        }
      : undefined,
  };
}

export function localizeGuideCategory(category: GuideCategory, locale: Locale): GuideCategory {
  if (locale === "es") {
    return category;
  }

  const slug = guideCategorySlugs[category.slug]?.[locale] ?? category.slug;
  const localized = guideCategoryLocalizations[locale][category.slug];
  return {
    ...category,
    slug,
    title: localized.title,
    description: localized.description,
    intro: localized.intro,
    href: getLocalizedGuideCategoryPath(category.slug, locale),
    seoTitle: localized.seoTitle,
    seoDescription: localized.seoDescription,
    guideSlugs: category.guideSlugs.map((slugItem) => articleSlugs.guias[slugItem]?.[locale] ?? slugItem),
    futureGuides: localized.futureGuides,
  };
}

export function getLocalizedGuideCategories(locale: Locale) {
  return guideCategories.map((category) => localizeGuideCategory(category, locale));
}

export function getLocalizedGuidesForCategory(category: GuideCategory, locale: Locale) {
  const sourceCategory = locale === "es"
    ? category
    : guideCategories.find((item) => guideCategorySlugs[item.slug]?.[locale] === category.slug);

  if (!sourceCategory) {
    return [];
  }

  return sourceCategory.guideSlugs
    .map((slug) => findArticle(guides, slug))
    .filter((guide): guide is ArticleData => Boolean(guide))
    .map((guide) => localizeArticle(guide, "guias", locale));
}

export function findLocalizedArticle(kind: ContentKind, localizedSlug: string, locale: Locale) {
  const items = getSourceItems(kind);
  const esSlug = locale === "es"
    ? localizedSlug
    : Object.entries(articleSlugs[kind]).find(([, slugs]) => slugs[locale] === localizedSlug)?.[0];
  const article = esSlug ? findArticle(items, esSlug) : undefined;
  return article ? localizeArticle(article, kind, locale) : undefined;
}

export function findLocalizedGuideCategory(localizedSlug: string, locale: Locale) {
  const esSlug = locale === "es"
    ? localizedSlug
    : Object.entries(guideCategorySlugs).find(([, slugs]) => slugs[locale] === localizedSlug)?.[0];
  const category = esSlug ? guideCategories.find((item) => item.slug === esSlug) : undefined;
  return category ? localizeGuideCategory(category, locale) : undefined;
}

export function getAllLocalizedArticleRoutes() {
  const all = [
    ...jewelryCategories.map((article) => ({ kind: "joyas" as const, slug: article.slug })),
    ...occasions.map((article) => ({ kind: "ocasiones" as const, slug: article.slug })),
    ...guides.map((article) => ({ kind: "guias" as const, slug: article.slug })),
  ];

  return all.flatMap(({ kind, slug }) =>
    locales.map((locale) => ({
      locale,
      kind,
      esSlug: slug,
      path: getLocalizedPath(kind, slug, locale),
      languages: getArticleAlternates(kind, slug),
    })),
  );
}

export function localizeLink(link: LinkItem, locale: Locale): LinkItem {
  if (locale === "es") {
    return link;
  }

  return {
    href: localizeHref(link.href, locale),
    label: localizeText(link.label, locale),
  };
}

export function localizeHref(href: string, locale: Locale) {
  if (locale === "es" || href.startsWith("http")) {
    return href;
  }

  if (href === "/#joyero-ia") {
    return `/${localePrefixes[locale]}#joyero-ia`;
  }

  const [path, hash = ""] = href.split("#");
  const parts = path.split("/").filter(Boolean);
  const kind = parts[0] as ContentKind | undefined;
  const slug = parts[1];

  if (parts[0] === "joyas" && parts[1] === "anillos" && parts[2] === "como-saber-talla-anillo") {
    return getLocalizedPath("guias", "como-saber-talla-anillo", locale);
  }

  if (kind && slug && articleSlugs[kind]?.[slug]) {
    return `${getLocalizedPath(kind, slug, locale)}${hash ? `#${hash}` : ""}`;
  }

  if (kind && !slug && ["joyas", "ocasiones", "guias"].includes(kind)) {
    return `${getLocalizedIndexPath(kind, locale)}${hash ? `#${hash}` : ""}`;
  }

  return getLocaleHomePath(locale);
}

export function localizeText(text: string, locale: Locale) {
  if (locale === "es") {
    return text;
  }

  const exact = exactText[locale][text];
  if (exact) {
    return exact;
  }

  const translated = phraseMap[locale].reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), text);
  return cleanupLocalizedText(translated, locale);
}

function cleanupLocalizedText(text: string, locale: LocalizedLocale) {
  const replacements: Array<[RegExp, string]> =
    locale === "pt-BR"
      ? [
          [/\bmateriais, estilos e dicas\b/gi, "materiais, estilos e dicas"],
          [/\bguias com\b/gi, "guias sobre"],
          [/\bcomforme\b/gi, "conforme"],
          [/\bdiametro\b/gi, "diâmetro"],
          [/\bcomposição\b/gi, "composição"],
          [/\s+/g, " "],
        ]
      : [
          [/\bguides about\b/gi, "guides about"],
          [/\bGuides about\b/g, "Guides to"],
          [/\bguide about\b/gi, "guide to"],
          [/\bfor choose\b/gi, "to choose"],
          [/\bto choose a piece right\b/gi, "to choose the right piece"],
          [/\bmaterials, styles and advice\b/gi, "materials, styles, and advice"],
          [/\bsizes, types, materials and advice\b/gi, "sizes, types, materials, and advice"],
          [/\bwhat jewelry piece\b/gi, "what jewelry"],
          [/\bhow to to\b/gi, "how to"],
          [/\s+/g, " "],
        ];

  return replacements.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), text).trim();
}

export function getArticleParent(kind: ContentKind, locale: Locale): LinkItem {
  return {
    href: getLocalizedIndexPath(kind, locale),
    label: getSectionLabel(kind, locale),
  };
}

export function getGuideBreadcrumbItems(article: ArticleData, locale: Locale): LinkItem[] {
  const originalSlug = article.originalSlug ?? article.slug;
  const sourceArticle = findArticle(guides, originalSlug);
  const sourceCategory = sourceArticle ? findGuideCategoryForArticle(sourceArticle) : undefined;
  const localizedCategory = sourceCategory ? localizeGuideCategory(sourceCategory, locale) : undefined;

  return [
    { href: getLocalizedIndexPath("guias", locale), label: getSectionLabel("guias", locale) },
    ...(localizedCategory ? [{ href: localizedCategory.href, label: localizedCategory.title }] : []),
    { href: getLocalizedPath("guias", originalSlug, locale), label: article.title },
  ];
}

function localizeSection(section: ArticleSection, locale: LocalizedLocale): ArticleSection {
  return {
    ...section,
    title: localizeText(section.title, locale),
    paragraphs: section.paragraphs.map((paragraph) => localizeParagraph(paragraph, locale)),
    bullets: section.bullets?.map((bullet) => localizeText(bullet, locale)),
    table: section.table
      ? {
          columns: section.table.columns.map((column) => localizeText(column, locale)),
          rows: section.table.rows.map((row) => row.map((cell) => localizeText(cell, locale))),
        }
      : undefined,
    subsections: section.subsections?.map((subsection) => ({
      ...subsection,
      title: localizeText(subsection.title, locale),
      paragraphs: subsection.paragraphs?.map((paragraph) => localizeParagraph(paragraph, locale)),
      bullets: subsection.bullets?.map((bullet) => localizeText(bullet, locale)),
    })),
  };
}

function localizeParagraph(paragraph: string | RichParagraph, locale: LocalizedLocale): string | RichParagraph {
  if (typeof paragraph === "string") {
    return localizeText(paragraph, locale);
  }

  return {
    parts: paragraph.parts.map((part) =>
      typeof part === "string" ? localizeText(part, locale) : localizeLink(part, locale),
    ),
  };
}

function getSourceItems(kind: ContentKind) {
  if (kind === "joyas") {
    return jewelryCategories;
  }
  if (kind === "ocasiones") {
    return occasions;
  }
  return guides;
}
