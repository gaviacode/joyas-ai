import { getLocalizedPath, type Locale } from "@/lib/i18n";

export type HubKind = "joyas" | "ocasiones";

export type HubCard = {
  href: string;
  title: string;
  description: string;
  cta: string;
  image?: string;
};

type HubContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: HubCard[];
};

const jewelryImages: Record<string, string> = {
  anillos: "/images/categories/categoria-anillos.png",
  collares: "/images/categories/categoria-collares.png",
  pulseras: "/images/categories/categoria-pulseras.png",
  pendientes: "/images/categories/categoria-pendientes.png",
  boda: "/images/categories/categoria-joyas-boda.png",
};

const jewelryCopy = {
  es: [
    ["anillos", "Anillos", "Estilos, materiales, tallas y consejos para elegir el anillo adecuado."],
    ["collares", "Collares", "Longitud, colgantes, escotes y materiales para cada estilo."],
    ["pulseras", "Pulseras", "Cierres, talla, grabados y comodidad para llevarlas a diario."],
    ["pendientes", "Pendientes", "Tamaño, cierre, material y estilo según el uso y la ocasión."],
    ["boda", "Joyas para boda", "Alianzas y accesorios para novia, novio, madrina e invitadas."],
  ],
  "pt-BR": [
    ["anillos", "Anéis", "Estilos, materiais, tamanhos e dicas para escolher o anel ideal."],
    ["collares", "Colares", "Comprimento, pingentes, decotes e materiais para cada estilo."],
    ["pulseras", "Pulseiras", "Fechos, tamanho, gravações e conforto para o uso diário."],
    ["pendientes", "Brincos", "Tamanho, fecho, material e estilo conforme o uso e a ocasião."],
    ["boda", "Joias para casamento", "Alianças e acessórios para noiva, noivo, madrinha e convidadas."],
  ],
  en: [
    ["anillos", "Rings", "Styles, materials, sizing and advice for choosing the right ring."],
    ["collares", "Necklaces", "Length, pendants, necklines and materials for every style."],
    ["pulseras", "Bracelets", "Clasps, sizing, engraving and comfort for everyday wear."],
    ["pendientes", "Earrings", "Size, fastening, material and style for the occasion."],
    ["boda", "Wedding jewelry", "Wedding bands and accessories for the couple and their guests."],
  ],
} as const;

const occasionCopy = {
  es: [
    ["aniversario", "Aniversario", "Ideas con significado para celebrar vuestra historia y el estilo de la persona."],
    ["compromiso", "Compromiso", "Anillos, piedras, metales, talla y presupuesto para decidir con criterio."],
    ["boda", "Boda", "Alianzas y joyas para la pareja, la celebración y quienes la acompañan."],
    ["cumpleanos", "Cumpleaños", "Piezas para regalar según edad, relación, estilo y uso diario."],
    ["san-valentin", "San Valentín", "Detalles personales y fáciles de llevar, sin recurrir a clichés."],
    ["dia-de-la-madre", "Día de la madre", "Joyas con iniciales, nombres o detalles personales para regalar con sentido."],
    ["graduacion", "Graduación", "Recuerdos duraderos para acompañar el inicio de una nueva etapa."],
    ["regalo-sorpresa", "Regalo sorpresa", "Pistas para acertar con una joya cuando quieres mantener la sorpresa."],
  ],
  "pt-BR": [
    ["aniversario", "Aniversário", "Ideias com significado para celebrar a história e o estilo da pessoa."],
    ["compromiso", "Noivado", "Anéis, pedras, metais, tamanho e orçamento para decidir com critério."],
    ["boda", "Casamento", "Alianças e joias para o casal, a celebração e os convidados."],
    ["cumpleanos", "Aniversário", "Peças para presentear conforme idade, relação, estilo e uso diário."],
    ["san-valentin", "Dia dos Namorados", "Detalhes pessoais e fáceis de usar, sem cair em clichês."],
    ["dia-de-la-madre", "Dia das Mães", "Joias com iniciais, nomes ou detalhes pessoais para presentear com sentido."],
    ["graduacion", "Formatura", "Lembranças duradouras para acompanhar o começo de uma nova etapa."],
    ["regalo-sorpresa", "Presente surpresa", "Pistas para acertar em uma joia quando você quer manter a surpresa."],
  ],
  en: [
    ["aniversario", "Anniversary", "Meaningful ideas to celebrate your story and the recipient's style."],
    ["compromiso", "Engagement", "Rings, gemstones, metals, sizing and budget to choose with care."],
    ["boda", "Wedding", "Wedding bands and jewelry for the couple, celebration and guests."],
    ["cumpleanos", "Birthday", "Gift ideas shaped by age, relationship, personal style and daily wear."],
    ["san-valentin", "Valentine's Day", "Personal, easy-to-wear pieces without relying on clichés."],
    ["dia-de-la-madre", "Mother's Day", "Jewelry with initials, names or personal details that feel meaningful."],
    ["graduacion", "Graduation", "Lasting keepsakes for the beginning of a new chapter."],
    ["regalo-sorpresa", "Surprise gift", "Clues for choosing jewelry when you want to keep the gift a surprise."],
  ],
} as const;

export function getHubContent(kind: HubKind, locale: Locale): HubContent {
  const isJewelry = kind === "joyas";
  const copy = isJewelry ? jewelryCopy[locale] : occasionCopy[locale];
  const labels = locale === "es"
    ? isJewelry
      ? { eyebrow: "Joyas", title: "Explora por tipo de joya", description: "Encuentra guías, consejos y recomendaciones según el tipo de pieza que buscas.", cta: "Ver" }
      : { eyebrow: "Ocasiones", title: "Encuentra una joya según la ocasión", description: "Ideas y consejos para elegir una joya adecuada según el momento, la persona y el significado que quieras transmitir.", cta: "Ver" }
    : locale === "pt-BR"
      ? isJewelry
        ? { eyebrow: "Joias", title: "Explore por tipo de joia", description: "Encontre guias, dicas e recomendações conforme o tipo de peça que você procura.", cta: "Ver" }
        : { eyebrow: "Ocasiões", title: "Encontre uma joia conforme a ocasião", description: "Ideias e dicas para escolher uma joia adequada conforme o momento, a pessoa e o significado que deseja transmitir.", cta: "Ver" }
      : isJewelry
        ? { eyebrow: "Jewelry", title: "Explore by jewelry type", description: "Find guides, advice and recommendations for the type of piece you are looking for.", cta: "View" }
        : { eyebrow: "Occasions", title: "Find jewelry for the occasion", description: "Ideas and advice for choosing jewelry based on the moment, the person and the meaning you want to convey.", cta: "View" };

  return {
    ...labels,
    cards: copy.map(([slug, title, description]) => ({
      href: getLocalizedPath(kind, slug, locale),
      title,
      description,
      cta: `${labels.cta} ${title.toLowerCase()} →`,
      image: isJewelry ? jewelryImages[slug] : undefined,
    })),
  };
}

export function getHubSeo(kind: HubKind, locale: Locale) {
  if (locale === "es") {
    return kind === "joyas"
      ? { title: "Tipos de joyas: anillos, collares, pulseras y más | joyas.ai", description: "Explora tipos de joyas, desde anillos y collares hasta pulseras, pendientes y joyas para boda." }
      : { title: "Joyas por ocasión: aniversario, boda, cumpleaños y más | joyas.ai", description: "Encuentra ideas y consejos para elegir joyas en aniversarios, compromisos, bodas, cumpleaños y otras ocasiones." };
  }
  if (locale === "pt-BR") {
    return kind === "joyas"
      ? { title: "Tipos de joias: anéis, colares, pulseiras e mais | joyas.ai", description: "Explore tipos de joias, de anéis e colares a pulseiras, brincos e joias para casamento." }
      : { title: "Joias por ocasião: aniversário, casamento e mais | joyas.ai", description: "Encontre ideias e dicas para escolher joias para aniversários, noivados, casamentos e outras ocasiões." };
  }
  return kind === "joyas"
    ? { title: "Jewelry types: rings, necklaces, bracelets and more | joyas.ai", description: "Explore jewelry types, from rings and necklaces to bracelets, earrings and wedding jewelry." }
    : { title: "Jewelry by occasion: anniversary, wedding, birthday and more | joyas.ai", description: "Find ideas and advice for choosing jewelry for anniversaries, engagements, weddings and more occasions." };
}
