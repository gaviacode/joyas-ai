"use client";

import {
  FormEvent,
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AdvisorMode,
  AdvisorRecommendation,
  AdvisorRequest,
  AdvisorResponse,
  ConversationMessage,
  GuidedPreferences,
} from "@/lib/advisor";
import type { Locale } from "@/lib/i18n";

type Option = {
  label: string;
  icon?: React.ReactNode;
  accentClassName?: string;
  swatchKey?: string;
};

type VisualOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

type BudgetOption = {
  label: string;
  min?: number;
  max?: number;
  custom?: boolean;
};

type RequestState = "idle" | "loading" | "error" | "results" | "empty" | "refining";

type AdvisorErrorResponse = {
  error?: string;
  message?: string;
  retryable?: boolean;
};

const maxDescriptionLength = 650;

const quickExamples = [
  {
    label: "Regalo de aniversario",
    text: "Busco una joya para mi pareja por nuestro aniversario. Le gustan los diseños elegantes, discretos y con algún detalle especial. Mi presupuesto aproximado es de 100 a 200 €.",
  },
  {
    label: "Joya para hombre",
    text: "Quiero una joya para hombre, sobria y fácil de llevar a diario. Prefiero materiales resistentes y un estilo elegante sin ser llamativo.",
  },
  {
    label: "Pendientes elegantes",
    text: "Busco pendientes elegantes para una ocasión especial. Me gustaría algo luminoso, discreto y que combine bien con vestidos sencillos.",
  },
  {
    label: "Pulsera minimalista",
    text: "Quiero una pulsera minimalista para uso diario. Busco algo fino, cómodo y con aspecto premium sin resultar demasiado formal.",
  },
  {
    label: "Regalo por menos de 100 €",
    text: "Necesito una idea de joya para regalar por menos de 100 €. Quiero que parezca cuidada, elegante y fácil de acertar aunque no conozco todos sus gustos.",
  },
];

const recipients: Option[] = [
  { label: "Mujer" },
  { label: "Hombre" },
  { label: "Unisex" },
  { label: "Para mí" },
  { label: "Prefiero no indicarlo" },
];

const jewelryTypes: VisualOption[] = [
  { value: "anillo", label: "Anillo", icon: <JewelryTypeIcon type="ring" /> },
  { value: "collar", label: "Collar", icon: <JewelryTypeIcon type="necklace" /> },
  { value: "colgante", label: "Colgante", icon: <JewelryTypeIcon type="pendant" /> },
  { value: "pulsera", label: "Pulsera", icon: <JewelryTypeIcon type="bracelet" /> },
  { value: "pendientes", label: "Pendientes", icon: <JewelryTypeIcon type="earrings" /> },
  { value: "gemelos", label: "Gemelos", icon: <JewelryTypeIcon type="cufflinks" /> },
  { value: "reloj", label: "Reloj", icon: <JewelryTypeIcon type="watch" /> },
  { value: "no estoy seguro", label: "No estoy seguro", icon: <JewelryTypeIcon type="unsure" /> },
];

const occasions: Option[] = [
  { label: "Aniversario", icon: <OccasionIcon type="anniversary" />, accentClassName: "text-[#a87314]" },
  { label: "Cumpleaños", icon: <OccasionIcon type="birthday" />, accentClassName: "text-[#b96b55]" },
  { label: "Compromiso", icon: <OccasionIcon type="engagement" />, accentClassName: "text-[#b98a2b]" },
  { label: "Boda", icon: <OccasionIcon type="wedding" />, accentClassName: "text-[#b98a2b]" },
  { label: "San Valentín", icon: <OccasionIcon type="valentine" />, accentClassName: "text-[#8f4056]" },
  { label: "Navidad", icon: <OccasionIcon type="christmas" />, accentClassName: "text-[#476747]" },
  { label: "Regalo espontáneo", icon: <OccasionIcon type="gift" />, accentClassName: "text-[#9a5f2e]" },
  { label: "Para uso personal", icon: <OccasionIcon type="personal" />, accentClassName: "text-[#607383]" },
  { label: "Otra ocasión", icon: <OccasionIcon type="other" />, accentClassName: "text-[#6f6a63]" },
];

const styles: Option[] = [
  { label: "Minimalista", icon: <StyleIcon type="minimal" />, accentClassName: "text-[#7b7469]" },
  { label: "Elegante", icon: <StyleIcon type="elegant" />, accentClassName: "text-[#a87314]" },
  { label: "Clásico", icon: <StyleIcon type="classic" />, accentClassName: "text-[#7d6541]" },
  { label: "Moderno", icon: <StyleIcon type="modern" />, accentClassName: "text-[#4f6671]" },
  { label: "Romántico", icon: <StyleIcon type="romantic" />, accentClassName: "text-[#8f4056]" },
  { label: "Original", icon: <StyleIcon type="original" />, accentClassName: "text-[#775b8b]" },
  { label: "Discreto", icon: <StyleIcon type="subtle" />, accentClassName: "text-[#6f746d]" },
  { label: "Llamativo", icon: <StyleIcon type="bold" />, accentClassName: "text-[#9a641e]" },
  { label: "Vintage", icon: <StyleIcon type="vintage" />, accentClassName: "text-[#836035]" },
  { label: "Lujo discreto", icon: <StyleIcon type="quietLuxury" />, accentClassName: "text-[#9a722b]" },
];

const materials: Option[] = [
  { label: "Oro amarillo" },
  { label: "Oro blanco" },
  { label: "Oro rosa" },
  { label: "Plata" },
  { label: "Acero" },
  { label: "Piedras naturales" },
  { label: "Perlas" },
  { label: "Sin preferencia" },
];

const budgetOptions: BudgetOption[] = [
  { label: "Menos de 50 €", min: 0, max: 50 },
  { label: "50-100 €", min: 50, max: 100 },
  { label: "100-200 €", min: 100, max: 200 },
  { label: "200-500 €", min: 200, max: 500 },
  { label: "Más de 500 €", min: 500 },
  { label: "Presupuesto personalizado", custom: true },
];

const refinementPrompts = [
  "Más económico",
  "Más original",
  "Más discreto",
  "Cambiar material",
  "Evitar piedras",
  "Ver otras ideas",
];

const initialPreferences: GuidedPreferences = {
  styles: [],
  materials: [],
};

const chatCopy = {
  es: {
    heroEyebrow: "Joyero personal con IA",
    heroTitle: "Encuentra la joya perfecta con inteligencia artificial",
    heroDescription:
      "Cuéntanos qué buscas o déjate guiar paso a paso. Nuestro joyero IA analizará la persona, la ocasión, el estilo y tu presupuesto para recomendarte la opción más adecuada.",
    tabsLabel: "Modos del recomendador",
    directTab: "Describe lo que buscas",
    guidedTab: "Déjate guiar por el joyero IA",
    directTitle: "Describe lo que buscas",
    directHelp:
      "Escribe como hablarías con un joyero: persona, ocasión, estilo, materiales y presupuesto si lo tienes claro.",
    directLabel: "Tu búsqueda",
    directPlaceholder:
      "Ejemplo: Busco un collar para mi pareja por nuestro aniversario. Le gusta la plata, las piedras azules y los diseños elegantes, pero discretos. Mi presupuesto es de hasta 120 €.",
    directTip: "Consejo: cuanto más concreto sea el contexto, más precisa será la recomendación.",
    askButton: "Preguntar al joyero IA",
    loadingButton: "Analizando...",
    guidedSubmit: "Obtener recomendaciones del joyero IA",
    directValidation:
      "Describe brevemente la persona, ocasión o presupuesto para que el joyero IA pueda ayudarte.",
    guidedValidation:
      "Selecciona al menos una preferencia o añade algún detalle antes de pedir recomendaciones.",
    invalidResponse: "La respuesta del joyero IA no tiene el formato esperado.",
    connectionError: "No he podido conectar con el joyero IA. Inténtalo de nuevo.",
    retryableError:
      "El joyero IA está recibiendo muchas consultas. Espera unos segundos y vuelve a intentarlo.",
    genericRequestError: "No he podido generar recomendaciones.",
    forWhom: "¿Para quién es?",
    jewelryType: "¿Qué tipo de joya buscas?",
    occasion: "¿Cuál es la ocasión?",
    style: "¿Qué estilo prefieres?",
    styleHint: "Puedes elegir más de uno.",
    material: "Material",
    materialHint: "Puedes elegir más de uno o marcar sin preferencia.",
    budget: "Presupuesto",
    min: "Mínimo",
    max: "Máximo",
    details: "Detalles adicionales",
    detailsPlaceholder:
      "Puedes añadir algo más: colores favoritos, si tiene alergias, si prefiere joyas discretas, si ya tiene algo parecido...",
    customBudget: "Presupuesto personalizado",
    noPreference: "Sin preferencia",
    summaryTitle: "Resumen para revisar",
    summaryFallback: "El joyero IA preparará una recomendación con las preferencias seleccionadas.",
    summarySearch: "Busco una joya",
    summarySearchPrefix: "Busco",
    summaryFor: "para",
    summaryStyle: "de estilo",
    summaryMaterials: "preferiblemente en",
    summaryBudget: "con presupuesto",
    listAnd: "y",
    trustTitle: "Recomendación prudente",
    trustFirst:
      "El joyero IA propone tipos de joya personalizados. En esta fase no muestra productos concretos, tiendas, marcas, stock ni precios exactos.",
    trustSecond:
      "Los rangos son orientativos y conviene verificarlos antes de comprar según material, acabado y proveedor.",
    statusLoading: "El joyero IA está analizando tus preferencias...",
    retry: "Reintentar",
    empty:
      "No se han encontrado recomendaciones claras. Añade algún detalle más sobre estilo, ocasión o presupuesto y vuelve a intentarlo.",
    resultsEyebrow: "Recomendaciones del joyero IA",
    resultsTitle: "Tres ideas personalizadas",
    resultsDisclaimer:
      "Recomendación orientativa: representa un tipo de joya, no un producto concreto disponible en una tienda.",
    recommendation: "Recomendación",
    whyFits: "Por qué encaja",
    recommendedMaterial: "Material recomendado",
    indicativePrice: "Precio orientativo",
    jewelerTip: "Consejo del joyero",
    refinementTitle: "¿Quieres aclarar o cambiar algo?",
    refinementHelp:
      "El joyero IA recuerda tus preferencias. Puedes pedirle que descarte una opción, cambie el material, reduzca el presupuesto o busque algo más original.",
    message: "Mensaje",
    refinementPlaceholder:
      "Ejemplo: No le gustan los collares muy cortos y prefiero una piedra más oscura.",
    refining: "Refinando...",
    sendRefinement: "Enviar aclaración",
  },
  "pt-BR": {
    heroEyebrow: "Joalheiro pessoal com IA",
    heroTitle: "Encontre a joia perfeita com inteligência artificial",
    heroDescription:
      "Conte o que procura ou deixe-se guiar passo a passo. Nosso joalheiro IA analisará a pessoa, a ocasião, o estilo e seu orçamento para recomendar uma opção adequada.",
    tabsLabel: "Modos do recomendador",
    directTab: "Descreva o que procura",
    guidedTab: "Deixe o joalheiro IA guiar você",
    directTitle: "Descreva o que procura",
    directHelp:
      "Escreva como falaria com um joalheiro: pessoa, ocasião, estilo, materiais e orçamento, se já tiver isso claro.",
    directLabel: "Sua busca",
    directPlaceholder:
      "Exemplo: Procuro um colar para meu par pelo nosso aniversário de relacionamento. Ela gosta de prata, pedras azuis e designs elegantes, mas discretos. Meu orçamento é de até 120 €.",
    directTip: "Dica: quanto mais concreto for o contexto, mais precisa será a recomendação.",
    askButton: "Perguntar ao joalheiro IA",
    loadingButton: "Analisando...",
    guidedSubmit: "Obter recomendações do joalheiro IA",
    directValidation:
      "Descreva brevemente a pessoa, a ocasião ou o orçamento para que o joalheiro IA possa ajudar.",
    guidedValidation:
      "Selecione pelo menos uma preferência ou adicione algum detalhe antes de pedir recomendações.",
    invalidResponse: "A resposta do joalheiro IA não tem o formato esperado.",
    connectionError: "Não consegui conectar com o joalheiro IA. Tente novamente.",
    retryableError:
      "O joalheiro IA está recebendo muitas consultas. Aguarde alguns segundos e tente novamente.",
    genericRequestError: "Não consegui gerar recomendações.",
    forWhom: "Para quem é?",
    jewelryType: "Que tipo de joia você procura?",
    occasion: "Qual é a ocasião?",
    style: "Que estilo você prefere?",
    styleHint: "Você pode escolher mais de um.",
    material: "Material",
    materialHint: "Você pode escolher mais de um ou marcar sem preferência.",
    budget: "Orçamento",
    min: "Mínimo",
    max: "Máximo",
    details: "Detalhes adicionais",
    detailsPlaceholder:
      "Você pode adicionar algo mais: cores favoritas, alergias, preferência por joias discretas, se já tem algo parecido...",
    customBudget: "Orçamento personalizado",
    noPreference: "Sem preferência",
    summaryTitle: "Resumo para revisar",
    summaryFallback: "O joalheiro IA preparará uma recomendação com as preferências selecionadas.",
    summarySearch: "Procuro uma joia",
    summarySearchPrefix: "Procuro",
    summaryFor: "para",
    summaryStyle: "de estilo",
    summaryMaterials: "preferencialmente em",
    summaryBudget: "com orçamento",
    listAnd: "e",
    trustTitle: "Recomendação prudente",
    trustFirst:
      "O joalheiro IA propõe tipos de joia personalizados. Nesta fase, não mostra produtos concretos, lojas, marcas, estoque nem preços exatos.",
    trustSecond:
      "As faixas são orientativas e convém verificá-las antes de comprar conforme material, acabamento e fornecedor.",
    statusLoading: "O joalheiro IA está analisando suas preferências...",
    retry: "Tentar novamente",
    empty:
      "Não foram encontradas recomendações claras. Adicione mais algum detalhe sobre estilo, ocasião ou orçamento e tente novamente.",
    resultsEyebrow: "Recomendações do joalheiro IA",
    resultsTitle: "Três ideias personalizadas",
    resultsDisclaimer:
      "Recomendação orientativa: representa um tipo de joia, não um produto concreto disponível em uma loja.",
    recommendation: "Recomendação",
    whyFits: "Por que combina",
    recommendedMaterial: "Material recomendado",
    indicativePrice: "Preço orientativo",
    jewelerTip: "Dica do joalheiro",
    refinementTitle: "Quer esclarecer ou mudar algo?",
    refinementHelp:
      "O joalheiro IA lembra suas preferências. Você pode pedir para descartar uma opção, mudar o material, reduzir o orçamento ou buscar algo mais original.",
    message: "Mensagem",
    refinementPlaceholder:
      "Exemplo: Ela não gosta de colares muito curtos e prefiro uma pedra mais escura.",
    refining: "Refinando...",
    sendRefinement: "Enviar esclarecimento",
  },
  en: {
    heroEyebrow: "Personal AI jeweler",
    heroTitle: "Find the perfect jewelry with artificial intelligence",
    heroDescription:
      "Tell us what you need or follow the guided flow. Our AI jeweler will analyze the person, occasion, style and budget to recommend a suitable option.",
    tabsLabel: "Advisor modes",
    directTab: "Describe what you need",
    guidedTab: "Let the AI jeweler guide you",
    directTitle: "Describe what you need",
    directHelp:
      "Write as you would to a jeweler: person, occasion, style, materials and budget if you already know them.",
    directLabel: "Your search",
    directPlaceholder:
      "Example: I am looking for a necklace for my partner for our anniversary. She likes silver, blue stones and elegant but understated designs. My budget is up to €120.",
    directTip: "Tip: the more specific the context, the more precise the recommendation.",
    askButton: "Ask the AI jeweler",
    loadingButton: "Analyzing...",
    guidedSubmit: "Get AI jeweler recommendations",
    directValidation:
      "Briefly describe the person, occasion or budget so the AI jeweler can help.",
    guidedValidation:
      "Select at least one preference or add a detail before requesting recommendations.",
    invalidResponse: "The AI jeweler response does not have the expected format.",
    connectionError: "I could not connect to the AI jeweler. Please try again.",
    retryableError:
      "The AI jeweler is receiving many requests. Wait a few seconds and try again.",
    genericRequestError: "I could not generate recommendations.",
    forWhom: "Who is it for?",
    jewelryType: "What type of jewelry are you looking for?",
    occasion: "What is the occasion?",
    style: "What style do you prefer?",
    styleHint: "You can choose more than one.",
    material: "Material",
    materialHint: "You can choose more than one or select no preference.",
    budget: "Budget",
    min: "Minimum",
    max: "Maximum",
    details: "Additional details",
    detailsPlaceholder:
      "You can add more context: favorite colors, allergies, whether they prefer understated jewelry, whether they already own something similar...",
    customBudget: "Custom budget",
    noPreference: "No preference",
    summaryTitle: "Review summary",
    summaryFallback: "The AI jeweler will prepare a recommendation using the selected preferences.",
    summarySearch: "I am looking for a jewelry piece",
    summarySearchPrefix: "I am looking for",
    summaryFor: "for",
    summaryStyle: "in a",
    summaryMaterials: "preferably in",
    summaryBudget: "with a budget of",
    listAnd: "and",
    trustTitle: "Careful recommendation",
    trustFirst:
      "The AI jeweler suggests personalized jewelry types. At this stage it does not show specific products, stores, brands, stock or exact prices.",
    trustSecond:
      "Price ranges are indicative and should be checked before buying according to material, finish and supplier.",
    statusLoading: "The AI jeweler is analyzing your preferences...",
    retry: "Try again",
    empty:
      "No clear recommendations were found. Add another detail about style, occasion or budget and try again.",
    resultsEyebrow: "AI jeweler recommendations",
    resultsTitle: "Three personalized ideas",
    resultsDisclaimer:
      "Indicative recommendation: this represents a jewelry type, not a specific product available in a store.",
    recommendation: "Recommendation",
    whyFits: "Why it fits",
    recommendedMaterial: "Recommended material",
    indicativePrice: "Indicative price",
    jewelerTip: "Jeweler tip",
    refinementTitle: "Want to clarify or change something?",
    refinementHelp:
      "The AI jeweler remembers your preferences. You can ask it to discard an option, change the material, lower the budget or look for something more original.",
    message: "Message",
    refinementPlaceholder:
      "Example: She does not like very short necklaces and I would prefer a darker stone.",
    refining: "Refining...",
    sendRefinement: "Send clarification",
  },
} satisfies Record<Locale, Record<string, string>>;

type ChatCopy = (typeof chatCopy)[Locale];

function getQuickExamples(locale: Locale) {
  if (locale === "pt-BR") {
    return [
      {
        label: "Presente de aniversário",
        text: "Procuro uma joia para meu par pelo nosso aniversário de relacionamento. Ela gosta de designs elegantes, discretos e com algum detalhe especial. Meu orçamento aproximado é de 100 a 200 €.",
      },
      {
        label: "Joia masculina",
        text: "Quero uma joia masculina, sóbria e fácil de usar no dia a dia. Prefiro materiais resistentes e um estilo elegante sem ser chamativo.",
      },
      {
        label: "Brincos elegantes",
        text: "Procuro brincos elegantes para uma ocasião especial. Gostaria de algo luminoso, discreto e que combine bem com vestidos simples.",
      },
      {
        label: "Pulseira minimalista",
        text: "Quero uma pulseira minimalista para uso diário. Procuro algo fino, confortável e com aparência premium sem ficar formal demais.",
      },
      {
        label: "Presente até 100 €",
        text: "Preciso de uma ideia de joia para presentear por menos de 100 €. Quero que pareça cuidadosa, elegante e fácil de acertar, mesmo sem conhecer todos os gostos da pessoa.",
      },
    ];
  }

  if (locale === "en") {
    return [
      {
        label: "Anniversary gift",
        text: "I am looking for a piece of jewelry for my partner for our anniversary. She likes elegant, understated designs with a special detail. My approximate budget is €100 to €200.",
      },
      {
        label: "Men's jewelry",
        text: "I want a men's jewelry piece that is sober and easy to wear every day. I prefer durable materials and an elegant style that is not flashy.",
      },
      {
        label: "Elegant earrings",
        text: "I am looking for elegant earrings for a special occasion. I would like something luminous, understated and easy to pair with simple dresses.",
      },
      {
        label: "Minimal bracelet",
        text: "I want a minimal bracelet for everyday wear. I am looking for something slim, comfortable and premium-looking without feeling too formal.",
      },
      {
        label: "Gift under €100",
        text: "I need a jewelry gift idea under €100. I want it to feel thoughtful, elegant and easy to get right even though I do not know all their tastes.",
      },
    ];
  }

  return quickExamples;
}

function getRecipients(locale: Locale): Option[] {
  if (locale === "pt-BR") {
    return [
      { label: "Mulher" },
      { label: "Homem" },
      { label: "Unissex" },
      { label: "Para mim" },
      { label: "Prefiro não indicar" },
    ];
  }

  if (locale === "en") {
    return [
      { label: "Woman" },
      { label: "Man" },
      { label: "Unisex" },
      { label: "For myself" },
      { label: "Prefer not to say" },
    ];
  }

  return recipients;
}

function getJewelryTypes(locale: Locale): VisualOption[] {
  const labels =
    locale === "pt-BR"
      ? ["Anel", "Colar", "Pingente", "Pulseira", "Brincos", "Abotoaduras", "Relógio", "Não tenho certeza"]
      : locale === "en"
        ? ["Ring", "Necklace", "Pendant", "Bracelet", "Earrings", "Cufflinks", "Watch", "Not sure"]
        : ["Anillo", "Collar", "Colgante", "Pulsera", "Pendientes", "Gemelos", "Reloj", "No estoy seguro"];
  const values = ["anillo", "collar", "colgante", "pulsera", "pendientes", "gemelos", "reloj", "no estoy seguro"];
  const icons: JewelryIconType[] = ["ring", "necklace", "pendant", "bracelet", "earrings", "cufflinks", "watch", "unsure"];

  return values.map((value, index) => ({
    value,
    label: labels[index],
    icon: <JewelryTypeIcon type={icons[index]} />,
  }));
}

function getOccasions(locale: Locale): Option[] {
  const labels =
    locale === "pt-BR"
      ? ["Aniversário de relacionamento", "Aniversário", "Noivado", "Casamento", "Dia dos Namorados", "Natal", "Presente espontâneo", "Uso pessoal", "Outra ocasião"]
      : locale === "en"
        ? ["Anniversary", "Birthday", "Engagement", "Wedding", "Valentine's Day", "Christmas", "Spontaneous gift", "Personal use", "Other occasion"]
        : ["Aniversario", "Cumpleaños", "Compromiso", "Boda", "San Valentín", "Navidad", "Regalo espontáneo", "Para uso personal", "Otra ocasión"];

  return occasions.map((option, index) => ({ ...option, label: labels[index] }));
}

function getStyles(locale: Locale): Option[] {
  const labels =
    locale === "pt-BR"
      ? ["Minimalista", "Elegante", "Clássico", "Moderno", "Romântico", "Original", "Discreto", "Chamativo", "Vintage", "Luxo discreto"]
      : locale === "en"
        ? ["Minimal", "Elegant", "Classic", "Modern", "Romantic", "Original", "Understated", "Bold", "Vintage", "Quiet luxury"]
        : ["Minimalista", "Elegante", "Clásico", "Moderno", "Romántico", "Original", "Discreto", "Llamativo", "Vintage", "Lujo discreto"];

  return styles.map((option, index) => ({ ...option, label: labels[index] }));
}

function getMaterials(locale: Locale, noPreference: string): Option[] {
  const labels =
    locale === "pt-BR"
      ? ["Ouro amarelo", "Ouro branco", "Ouro rosé", "Prata", "Aço", "Pedras naturais", "Pérolas", noPreference]
      : locale === "en"
        ? ["Yellow gold", "White gold", "Rose gold", "Silver", "Steel", "Natural gemstones", "Pearls", noPreference]
        : ["Oro amarillo", "Oro blanco", "Oro rosa", "Plata", "Acero", "Piedras naturales", "Perlas", noPreference];
  const swatchKeys = ["Oro amarillo", "Oro blanco", "Oro rosa", "Plata", "Acero", "Piedras naturales", "Perlas", "Sin preferencia"];

  return labels.map((label, index) => ({ label, swatchKey: swatchKeys[index] }));
}

function getBudgetOptions(locale: Locale, customBudget: string): BudgetOption[] {
  const firstLabel = locale === "pt-BR" ? "Menos de 50 €" : locale === "en" ? "Under €50" : "Menos de 50 €";
  const overLabel = locale === "pt-BR" ? "Mais de 500 €" : locale === "en" ? "Over €500" : "Más de 500 €";

  return [
    { label: firstLabel, min: 0, max: 50 },
    { label: "50-100 €", min: 50, max: 100 },
    { label: "100-200 €", min: 100, max: 200 },
    { label: "200-500 €", min: 200, max: 500 },
    { label: overLabel, min: 500 },
    { label: customBudget, custom: true },
  ];
}

function getRefinementPrompts(locale: Locale) {
  if (locale === "pt-BR") {
    return ["Mais econômico", "Mais original", "Mais discreto", "Mudar material", "Evitar pedras", "Ver outras ideias"];
  }

  if (locale === "en") {
    return ["More affordable", "More original", "More understated", "Change material", "Avoid stones", "See other ideas"];
  }

  return refinementPrompts;
}

export default function JewelryChat({ locale = "es" }: { locale?: Locale }) {
  const copy = chatCopy[locale];
  const localizedQuickExamples = getQuickExamples(locale);
  const localizedRecipients = getRecipients(locale);
  const localizedJewelryTypes = getJewelryTypes(locale);
  const localizedOccasions = getOccasions(locale);
  const localizedStyles = getStyles(locale);
  const localizedMaterials = getMaterials(locale, copy.noPreference);
  const localizedBudgetOptions = getBudgetOptions(locale, copy.customBudget);
  const localizedRefinementPrompts = getRefinementPrompts(locale);
  const [mode, setMode] = useState<AdvisorMode>("direct");
  const [directDescription, setDirectDescription] = useState("");
  const [preferences, setPreferences] = useState<GuidedPreferences>(initialPreferences);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [customBudgetMin, setCustomBudgetMin] = useState("");
  const [customBudgetMax, setCustomBudgetMax] = useState("");
  const [advisorResponse, setAdvisorResponse] = useState<AdvisorResponse | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [refinementInput, setRefinementInput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<RequestState>("idle");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const isLoading = status === "loading" || status === "refining";
  const guidedSummary = useMemo(
    () => buildGuidedSummary(preferences, selectedBudget, copy, locale),
    [preferences, selectedBudget, copy, locale]
  );

  function switchMode(nextMode: AdvisorMode) {
    setMode(nextMode);
    setError("");
  }

  function fillExample(text: string) {
    setDirectDescription((current) => {
      const separator = current.trim() ? "\n\n" : "";
      return `${current.trim()}${separator}${text}`.slice(0, maxDescriptionLength);
    });
  }

  function updateSinglePreference(key: keyof GuidedPreferences, value: string) {
    setPreferences((current) => ({
      ...current,
      [key]: current[key] === value ? undefined : value,
    }));
  }

  function toggleListPreference(key: "styles" | "materials", value: string) {
    setPreferences((current) => {
      const selected = current[key] ?? [];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : key === "materials" && value === copy.noPreference
          ? [copy.noPreference]
          : [...selected.filter((item) => item !== copy.noPreference), value];

      return { ...current, [key]: next };
    });
  }

  function updateBudget(option: BudgetOption) {
    const nextBudget = selectedBudget === option.label ? "" : option.label;

    setSelectedBudget(nextBudget);
    setPreferences((current) => ({
      ...current,
      budgetMin: nextBudget ? (option.custom ? parseNumber(customBudgetMin) : option.min) : undefined,
      budgetMax: nextBudget ? (option.custom ? parseNumber(customBudgetMax) : option.max) : undefined,
      budgetLabel: nextBudget || undefined,
    }));
  }

  function updateCustomBudget(min: string, max: string) {
    setCustomBudgetMin(min);
    setCustomBudgetMax(max);
    setPreferences((current) => ({
      ...current,
      budgetMin: parseNumber(min),
      budgetMax: parseNumber(max),
      budgetLabel: copy.customBudget,
    }));
  }

  async function submitAdvisor(refinement?: string) {
    if (isLoading) {
      return;
    }

    const request = buildRequest(refinement);

    if (!request) {
      setError(
        mode === "direct"
          ? copy.directValidation
          : copy.guidedValidation
      );
      setStatus("error");
      return;
    }

    setError("");
    setStatus(refinement ? "refining" : "loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = (await response.json()) as Partial<AdvisorResponse> & {
        error?: string;
        message?: string;
        retryable?: boolean;
      };

      if (!response.ok) {
        throw new Error(getAdvisorRequestErrorMessage(response.status, data, copy));
      }

      if (!isAdvisorResponse(data)) {
        throw new Error(copy.invalidResponse);
      }

      const nextConversation = refinement
        ? [
            ...conversation,
            { role: "user" as const, content: refinement },
            { role: "assistant" as const, content: data.followUpMessage },
          ]
        : [
            {
              role: "user" as const,
              content:
                request.directDescription ||
                buildGuidedSummary(
                  request.guidedPreferences,
                  request.guidedPreferences?.budgetLabel,
                  copy,
                  locale
                ),
            },
            { role: "assistant" as const, content: data.followUpMessage },
          ];

      setAdvisorResponse(data);
      setConversation(nextConversation);
      setStatus(data.recommendations.length ? "results" : "empty");
      setRefinementInput("");
      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : copy.connectionError
      );
      setStatus("error");
    }
  }

  function buildRequest(refinement?: string): AdvisorRequest | null {
    const trimmedRefinement = refinement?.trim();
    const requestConversation = trimmedRefinement
      ? [
          ...conversation,
          ...(advisorResponse
            ? [{ role: "assistant" as const, content: JSON.stringify(advisorResponse) }]
            : []),
          { role: "user" as const, content: trimmedRefinement },
        ]
      : conversation;

    if (mode === "direct") {
      const description = directDescription.trim();

      if (!description) {
        return null;
      }

      return {
        mode,
        directDescription: description,
        locale,
        conversation: requestConversation,
      };
    }

    const hasGuidedInput =
      Boolean(preferences.recipient) ||
      Boolean(preferences.jewelryType) ||
      Boolean(preferences.occasion) ||
      Boolean(preferences.styles?.length) ||
      Boolean(preferences.materials?.length) ||
      Boolean(preferences.budgetLabel) ||
      Boolean(preferences.additionalDetails?.trim());

    if (!hasGuidedInput) {
      return null;
    }

    return {
      mode,
      locale,
      guidedPreferences: preferences,
      conversation: requestConversation,
    };
  }

  return (
    <section
      id="joyero-ia"
      className="w-full max-w-full scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-[#ead8b3] bg-white p-4 shadow-2xl shadow-[#805400]/10 sm:p-6 lg:p-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b722b]">
          {copy.heroEyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] sm:text-4xl lg:text-5xl">
          {copy.heroTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#63584c] sm:text-base">
          {copy.heroDescription}
        </p>
      </div>

      <AdvisorModeTabs mode={mode} copy={copy} onChange={switchMode} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.38fr)] lg:items-start">
        <div className="min-w-0 rounded-3xl border border-[#eadfca] bg-[#fffdf8] p-4 sm:p-5 lg:p-6">
          {mode === "direct" ? (
            <DirectAdvisorForm
              value={directDescription}
              isLoading={isLoading}
              copy={copy}
              examples={localizedQuickExamples}
              onChange={setDirectDescription}
              onExample={fillExample}
              onSubmit={(event) => {
                event.preventDefault();
                void submitAdvisor();
              }}
            />
          ) : (
            <GuidedAdvisorForm
              preferences={preferences}
              selectedBudget={selectedBudget}
              customBudgetMin={customBudgetMin}
              customBudgetMax={customBudgetMax}
              isLoading={isLoading}
              copy={copy}
              recipients={localizedRecipients}
              jewelryTypes={localizedJewelryTypes}
              occasions={localizedOccasions}
              styles={localizedStyles}
              materials={localizedMaterials}
              budgetOptions={localizedBudgetOptions}
              summary={guidedSummary}
              onSingleSelect={updateSinglePreference}
              onMultiSelect={toggleListPreference}
              onBudget={updateBudget}
              onCustomBudget={updateCustomBudget}
              onDetails={(value) =>
                setPreferences((current) => ({
                  ...current,
                  additionalDetails: value,
                }))
              }
              onSubmit={(event) => {
                event.preventDefault();
                void submitAdvisor();
              }}
            />
          )}
        </div>

        <TrustPanel copy={copy} />
      </div>

      <StatusPanel
        status={status}
        error={error}
        copy={copy}
        onRetry={() => void submitAdvisor()}
      />

      <div ref={resultsRef} className="scroll-mt-28">
        <RecommendationResults response={advisorResponse} status={status} copy={copy} />
      </div>

      {advisorResponse ? (
        <RefinementChat
          conversation={conversation}
          value={refinementInput}
          isLoading={isLoading}
          copy={copy}
          prompts={localizedRefinementPrompts}
          onChange={setRefinementInput}
          onSubmit={(event) => {
            event.preventDefault();
            void submitAdvisor(refinementInput);
          }}
          onQuickPrompt={(prompt) => {
            setRefinementInput(prompt);
            void submitAdvisor(prompt);
          }}
        />
      ) : null}
    </section>
  );
}

function AdvisorModeTabs({
  mode,
  copy,
  onChange,
}: {
  mode: AdvisorMode;
  copy: ChatCopy;
  onChange: (mode: AdvisorMode) => void;
}) {
  const tabs: { mode: AdvisorMode; label: string }[] = [
    { mode: "direct", label: copy.directTab },
    { mode: "guided", label: copy.guidedTab },
  ];

  return (
    <div
      role="tablist"
      aria-label={copy.tabsLabel}
      className="mx-auto mt-7 grid max-w-2xl gap-2 rounded-2xl border border-[#ead8b3] bg-[#fff9ed] p-2 sm:grid-cols-2"
    >
      {tabs.map((tab) => {
        const active = mode === tab.mode;

        return (
          <button
            key={tab.mode}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.mode)}
            className={`min-h-12 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 ${
              active
                ? "bg-[#17120b] text-white shadow-sm"
                : "bg-white text-[#5f4a24] hover:bg-[#fffdf8]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function DirectAdvisorForm({
  value,
  isLoading,
  copy,
  examples,
  onChange,
  onExample,
  onSubmit,
}: {
  value: string;
  isLoading: boolean;
  copy: ChatCopy;
  examples: Array<{ label: string; text: string }>;
  onChange: (value: string) => void;
  onExample: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#17120b]">
        {copy.directTitle}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#6f6255]">
        {copy.directHelp}
      </p>

      <label htmlFor="direct-description" className="mt-5 block text-sm font-semibold text-[#2b241f]">
        {copy.directLabel}
      </label>
      <textarea
        id="direct-description"
        value={value}
        maxLength={maxDescriptionLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={copy.directPlaceholder}
        className="mt-2 min-h-44 w-full resize-y rounded-2xl border border-[#ead8b3] bg-white px-4 py-4 text-sm leading-6 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
      />
      <div className="mt-2 flex flex-col gap-2 text-xs text-[#7c7064] sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.directTip}</p>
        <p aria-live="polite">{value.length}/{maxDescriptionLength}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() => onExample(example.text)}
            className="min-h-11 rounded-full border border-[#ead8b3] bg-white px-4 py-2 text-left text-xs font-semibold text-[#5f4a24] transition hover:border-[#b97a05] hover:bg-[#fff4dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
          >
            {example.label}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="mt-6 min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isLoading ? copy.loadingButton : copy.askButton}
      </button>
    </form>
  );
}

function GuidedAdvisorForm({
  preferences,
  selectedBudget,
  customBudgetMin,
  customBudgetMax,
  isLoading,
  copy,
  recipients,
  jewelryTypes,
  occasions,
  styles,
  materials,
  budgetOptions,
  summary,
  onSingleSelect,
  onMultiSelect,
  onBudget,
  onCustomBudget,
  onDetails,
  onSubmit,
}: {
  preferences: GuidedPreferences;
  selectedBudget: string;
  customBudgetMin: string;
  customBudgetMax: string;
  isLoading: boolean;
  copy: ChatCopy;
  recipients: Option[];
  jewelryTypes: VisualOption[];
  occasions: Option[];
  styles: Option[];
  materials: Option[];
  budgetOptions: BudgetOption[];
  summary: string;
  onSingleSelect: (key: keyof GuidedPreferences, value: string) => void;
  onMultiSelect: (key: "styles" | "materials", value: string) => void;
  onBudget: (option: BudgetOption) => void;
  onCustomBudget: (min: string, max: string) => void;
  onDetails: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <OptionGroup title={copy.forWhom}>
        {recipients.map((option) => (
          <SelectableOption
            key={option.label}
            label={option.label}
            selected={preferences.recipient === option.label}
            onClick={() => onSingleSelect("recipient", option.label)}
          />
        ))}
      </OptionGroup>

      <OptionGroup title={copy.jewelryType} layout="jewelry-grid">
        {jewelryTypes.map((option) => (
          <VisualOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={preferences.jewelryType === option.value}
            onClick={() => onSingleSelect("jewelryType", option.value)}
          />
        ))}
      </OptionGroup>

      <OptionGroup title={copy.occasion}>
        {occasions.map((option) => (
          <SelectableOption
            key={option.label}
            label={option.label}
            icon={option.icon}
            accentClassName={option.accentClassName}
            selected={preferences.occasion === option.label}
            onClick={() => onSingleSelect("occasion", option.label)}
          />
        ))}
      </OptionGroup>

      <OptionGroup title={copy.style} hint={copy.styleHint}>
        {styles.map((option) => (
          <SelectableOption
            key={option.label}
            label={option.label}
            icon={option.icon}
            accentClassName={option.accentClassName}
            selected={preferences.styles?.includes(option.label) ?? false}
            onClick={() => onMultiSelect("styles", option.label)}
          />
        ))}
      </OptionGroup>

      <OptionGroup title={copy.material} hint={copy.materialHint}>
        {materials.map((option) => (
          <SelectableOption
            key={option.label}
            label={option.label}
            icon={<MaterialSwatch material={option.swatchKey ?? option.label} />}
            selected={preferences.materials?.includes(option.label) ?? false}
            onClick={() => onMultiSelect("materials", option.label)}
          />
        ))}
      </OptionGroup>

      <OptionGroup title={copy.budget}>
        {budgetOptions.map((option) => (
          <SelectableOption
            key={option.label}
            label={option.label}
            selected={selectedBudget === option.label}
            onClick={() => onBudget(option)}
          />
        ))}
      </OptionGroup>

      {selectedBudget === copy.customBudget ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold text-[#2b241f]">
            {copy.min}
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={customBudgetMin}
              onChange={(event) => onCustomBudget(event.target.value, customBudgetMax)}
              className="mt-2 h-12 w-full rounded-2xl border border-[#ead8b3] bg-white px-4 text-sm outline-none focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
              placeholder="Ej. 80"
            />
          </label>
          <label className="text-sm font-semibold text-[#2b241f]">
            {copy.max}
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={customBudgetMax}
              onChange={(event) => onCustomBudget(customBudgetMin, event.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-[#ead8b3] bg-white px-4 text-sm outline-none focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
              placeholder="Ej. 180"
            />
          </label>
        </div>
      ) : null}

      <label htmlFor="guided-details" className="block text-sm font-semibold text-[#2b241f]">
        {copy.details}
        <textarea
          id="guided-details"
          value={preferences.additionalDetails ?? ""}
          onChange={(event) => onDetails(event.target.value)}
          placeholder={copy.detailsPlaceholder}
          className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-[#ead8b3] bg-white px-4 py-3 text-sm leading-6 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
        />
      </label>

      <PreferenceSummary summary={summary} copy={copy} />

      <button
        type="submit"
        disabled={isLoading}
        className="min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isLoading ? copy.loadingButton : copy.guidedSubmit}
      </button>
    </form>
  );
}

function OptionGroup({
  title,
  hint,
  layout = "wrap",
  children,
}: {
  title: string;
  hint?: string;
  layout?: "wrap" | "jewelry-grid";
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold tracking-[-0.02em] text-[#17120b]">
        {title}
      </legend>
      {hint ? <p className="mt-1 text-xs text-[#7c7064]">{hint}</p> : null}
      <div
        className={
          layout === "jewelry-grid"
            ? "mt-3 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
            : "mt-3 flex min-w-0 flex-wrap gap-2"
        }
      >
        {children}
      </div>
    </fieldset>
  );
}

function VisualOptionCard({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative flex min-h-32 min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border p-3 text-center text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 motion-reduce:transition-none ${
        selected
          ? "border-[#b97a05] bg-[#fff1d2] text-[#2d220f] shadow-sm"
          : "border-[#ead8b3] bg-white text-[#4f3f24] shadow-[0_8px_24px_rgba(128,84,0,0.04)] hover:-translate-y-0.5 hover:border-[#c89a43] hover:bg-[#fffaf1] hover:shadow-[0_12px_28px_rgba(128,84,0,0.08)] motion-reduce:hover:translate-y-0"
      }`}
    >
      <SelectionCheck selected={selected} />
      <span
        aria-hidden="true"
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border transition motion-reduce:transition-none ${
          selected
            ? "border-[#d7a63c]/60 bg-white/75 text-[#8f610d]"
            : "border-[#ead8b3] bg-[#fffdf8] text-[#2f2922] group-hover:text-[#8f610d]"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 break-words leading-tight">{label}</span>
    </button>
  );
}

function SelectableOption({
  label,
  icon,
  accentClassName,
  selected,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  accentClassName?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`relative min-h-11 max-w-full rounded-2xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 motion-reduce:transition-none ${
        selected
          ? "border-[#b97a05] bg-[#fff1d2] text-[#3a2a0d] shadow-sm"
          : "border-[#ead8b3] bg-white text-[#5f4a24] hover:border-[#c89a43] hover:bg-[#fff9ed]"
      }`}
    >
      <span className="inline-flex min-w-0 items-center gap-2">
        {icon ? (
          <span
            aria-hidden="true"
            className={`flex h-6 w-6 shrink-0 items-center justify-center ${accentClassName ?? "text-[#9a6b08]"}`}
          >
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 break-words text-left leading-tight">{label}</span>
        {selected ? (
          <span aria-hidden="true" className="shrink-0 text-[#8a610f]">
            <CheckIcon className="h-4 w-4" />
          </span>
        ) : null}
      </span>
    </button>
  );
}

function SelectionCheck({ selected }: { selected: boolean }) {
  if (!selected) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#d7a63c] bg-white text-xs font-bold text-[#7a540f] shadow-sm"
    >
      <CheckIcon className="h-3.5 w-3.5" />
    </span>
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.2l3 3L12.8 4.8" />
    </svg>
  );
}

function MaterialSwatch({ material }: { material: string }) {
  const baseClass =
    "relative h-6 w-6 overflow-hidden rounded-full border border-white shadow-[inset_0_0_0_1px_rgba(80,62,32,0.18),0_1px_4px_rgba(80,62,32,0.16)]";

  if (material === "Piedras naturales") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#e3d3b2] bg-[#fffdf8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#4f7592]" />
        <span className="-ml-1 h-2.5 w-2.5 rounded-full bg-[#8f4056]" />
        <span className="-ml-1 h-2.5 w-2.5 rounded-full bg-[#8b7a3f]" />
      </span>
    );
  }

  if (material === "Perlas") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#e3d3b2] bg-[#fffdf8]">
        <span className="h-4 w-4 rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffffff_0,#fff8eb_34%,#d8d1c5_100%)] shadow-sm" />
      </span>
    );
  }

  const swatches: Record<string, string> = {
    "Oro amarillo": "bg-[linear-gradient(135deg,#fff2b7_0%,#d6a43a_45%,#8f610d_100%)]",
    "Oro blanco": "bg-[linear-gradient(135deg,#ffffff_0%,#d9d6ce_48%,#a9a397_100%)]",
    "Oro rosa": "bg-[linear-gradient(135deg,#ffe2d7_0%,#d59a83_48%,#9a604d_100%)]",
    Plata: "bg-[linear-gradient(135deg,#ffffff_0%,#cfd3d5_46%,#8d969b_100%)]",
    Acero: "bg-[linear-gradient(135deg,#d7dde0_0%,#8f9aa0_48%,#4f5b61_100%)]",
    "Sin preferencia": "bg-[conic-gradient(from_45deg,#d6a43a,#d7d3ca,#b98b7a,#737d82,#d6a43a)]",
  };

  return <span className={`${baseClass} ${swatches[material] ?? "bg-[#e6ded0]"}`} />;
}

type JewelryIconType =
  | "ring"
  | "necklace"
  | "pendant"
  | "bracelet"
  | "earrings"
  | "cufflinks"
  | "watch"
  | "unsure";

function JewelryTypeIcon({ type }: { type: JewelryIconType }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      {type === "ring" ? (
        <>
          <circle cx="32" cy="35" r="16" {...common} />
          <path d="M25 20l7-8 7 8" {...common} />
          <path d="M27.5 20h9" {...common} />
          <path d="M32 12l-3.5 8h7L32 12z" fill="currentColor" opacity="0.16" />
        </>
      ) : null}
      {type === "necklace" ? (
        <>
          <path d="M12 16c2 20 10 32 20 32s18-12 20-32" {...common} />
          <path d="M17 17c2.5 15 8 25 15 25s12.5-10 15-25" {...common} opacity="0.55" />
          <path d="M18 21h3M24 30h3M31 35h2M37 30h3M43 21h3" {...common} opacity="0.5" />
        </>
      ) : null}
      {type === "pendant" ? (
        <>
          <path d="M14 15c2 16 8 27 18 27s16-11 18-27" {...common} />
          <path d="M32 42v5" {...common} />
          <path d="M32 48l-7 6 7 6 7-6-7-6z" {...common} />
          <path d="M32 50.5l-4 3.5 4 3.5 4-3.5-4-3.5z" fill="currentColor" opacity="0.16" />
        </>
      ) : null}
      {type === "bracelet" ? (
        <>
          <ellipse cx="32" cy="33" rx="22" ry="15" {...common} />
          <path d="M12 33c5 4 11 6 20 6s15-2 20-6" {...common} opacity="0.45" />
          <circle cx="19" cy="27" r="2" fill="currentColor" opacity="0.28" />
          <circle cx="45" cy="27" r="2" fill="currentColor" opacity="0.28" />
        </>
      ) : null}
      {type === "earrings" ? (
        <>
          <path d="M23 14v9" {...common} />
          <path d="M41 14v9" {...common} />
          <circle cx="23" cy="30" r="7" {...common} />
          <circle cx="41" cy="30" r="7" {...common} />
          <path d="M23 37v10" {...common} />
          <path d="M41 37v10" {...common} />
          <path d="M19 49h8" {...common} />
          <path d="M37 49h8" {...common} />
        </>
      ) : null}
      {type === "cufflinks" ? (
        <>
          <rect x="15" y="22" width="15" height="15" rx="4" {...common} />
          <rect x="34" y="27" width="15" height="15" rx="4" {...common} />
          <path d="M30 31h4" {...common} />
          <path d="M20 29h5" {...common} opacity="0.55" />
          <path d="M39 34h5" {...common} opacity="0.55" />
        </>
      ) : null}
      {type === "watch" ? (
        <>
          <path d="M25 6h14l-2 13H27L25 6z" {...common} />
          <circle cx="32" cy="32" r="13" {...common} />
          <path d="M32 32V24" {...common} />
          <path d="M32 32l6 4" {...common} />
          <path d="M27 45h10l2 13H25l2-13z" {...common} />
          <path d="M28 19h8" {...common} opacity="0.55" />
          <path d="M28 45h8" {...common} opacity="0.55" />
        </>
      ) : null}
      {type === "unsure" ? (
        <>
          <circle cx="23" cy="35" r="8" {...common} opacity="0.75" />
          <path d="M35 18c1 10 5 16 11 17" {...common} />
          <path d="M43 39l-5 5 5 5 5-5-5-5z" {...common} />
          <path d="M29 21c2-4 8-4 10 0 2 5-5 6-5 11" {...common} />
          <path d="M34 39h.1" {...common} />
        </>
      ) : null}
    </svg>
  );
}

type OccasionIconType =
  | "anniversary"
  | "birthday"
  | "engagement"
  | "wedding"
  | "valentine"
  | "christmas"
  | "gift"
  | "personal"
  | "other";

function OccasionIcon({ type }: { type: OccasionIconType }) {
  return (
    <SmallLineIcon>
      {type === "anniversary" ? (
        <>
          <circle cx="10" cy="14" r="4.2" />
          <circle cx="15" cy="14" r="4.2" />
          <path d="M12.5 6v2" />
        </>
      ) : null}
      {type === "birthday" ? (
        <>
          <path d="M5 11h14v8H5z" />
          <path d="M5 11c4-2 10-2 14 0" />
          <path d="M12 7v4" />
          <path d="M10 7c.8-2 3.2-2 4 0" />
        </>
      ) : null}
      {type === "engagement" ? (
        <>
          <circle cx="12" cy="14" r="5" />
          <path d="M9.5 8l2.5-3 2.5 3" />
          <path d="M10 8h4" />
        </>
      ) : null}
      {type === "wedding" ? (
        <>
          <circle cx="10" cy="14" r="4.5" />
          <circle cx="15" cy="14" r="4.5" />
        </>
      ) : null}
      {type === "valentine" ? (
        <path d="M12 19s-7-4.3-7-9a4 4 0 017-2.5A4 4 0 0119 10c0 4.7-7 9-7 9z" />
      ) : null}
      {type === "christmas" ? (
        <>
          <path d="M12 4l1.8 5.2H19l-4.2 3 1.7 5.2L12 14.3l-4.5 3.1 1.7-5.2L5 9.2h5.2L12 4z" />
          <path d="M7 20h10" />
        </>
      ) : null}
      {type === "gift" ? (
        <>
          <path d="M5 10h14v10H5z" />
          <path d="M12 10v10" />
          <path d="M5 14h14" />
          <path d="M9 10c-2-2-1-4 1-4s2 4 2 4" />
          <path d="M15 10c2-2 1-4-1-4s-2 4-2 4" />
        </>
      ) : null}
      {type === "personal" ? (
        <>
          <path d="M8 20h8" />
          <path d="M12 4c3 0 6 3 6 7s-3 7-6 7-6-3-6-7 3-7 6-7z" />
          <path d="M9 11h6" />
        </>
      ) : null}
      {type === "other" ? (
        <>
          <rect x="5" y="6" width="14" height="14" rx="3" />
          <path d="M8 4v4" />
          <path d="M16 4v4" />
          <path d="M8 13h.1M12 13h.1M16 13h.1" />
        </>
      ) : null}
    </SmallLineIcon>
  );
}

type StyleIconType =
  | "minimal"
  | "elegant"
  | "classic"
  | "modern"
  | "romantic"
  | "original"
  | "subtle"
  | "bold"
  | "vintage"
  | "quietLuxury";

function StyleIcon({ type }: { type: StyleIconType }) {
  return (
    <SmallLineIcon>
      {type === "minimal" ? <path d="M5 12h14" /> : null}
      {type === "elegant" ? (
        <>
          <path d="M12 4v16" />
          <path d="M4 12h16" />
          <path d="M7 7l10 10" />
          <path d="M17 7L7 17" />
        </>
      ) : null}
      {type === "classic" ? (
        <>
          <path d="M8 19h8" />
          <path d="M9 8h6" />
          <path d="M10 8v11" />
          <path d="M14 8v11" />
          <path d="M7 6h10l-2 2H9L7 6z" />
        </>
      ) : null}
      {type === "modern" ? (
        <>
          <rect x="5" y="6" width="7" height="7" rx="1.5" />
          <path d="M13 11l6 6" />
          <rect x="12" y="13" width="7" height="7" rx="1.5" />
        </>
      ) : null}
      {type === "romantic" ? (
        <path d="M12 19s-6-3.8-6-8a3.5 3.5 0 016-2.2A3.5 3.5 0 0118 11c0 4.2-6 8-6 8z" />
      ) : null}
      {type === "original" ? (
        <path d="M6 15c3-8 8 4 12-4M7 19c4-1 7-3 10-8" />
      ) : null}
      {type === "subtle" ? (
        <>
          <circle cx="12" cy="12" r="2.3" />
          <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
        </>
      ) : null}
      {type === "bold" ? (
        <>
          <path d="M12 3l2.5 6.5H21l-5.2 4 2 6.5L12 16l-5.8 4 2-6.5L3 9.5h6.5L12 3z" />
        </>
      ) : null}
      {type === "vintage" ? (
        <>
          <path d="M12 4l6 6-6 10-6-10 6-6z" />
          <path d="M8 10h8" />
          <path d="M10 14h4" />
        </>
      ) : null}
      {type === "quietLuxury" ? (
        <>
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <path d="M12 8l4 4-4 4-4-4 4-4z" />
        </>
      ) : null}
    </SmallLineIcon>
  );
}

function SmallLineIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function PreferenceSummary({ summary, copy }: { summary: string; copy: ChatCopy }) {
  return (
    <div className="rounded-2xl border border-[#ead8b3] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b722b]">
        {copy.summaryTitle}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#554a40]">{summary}</p>
    </div>
  );
}

function TrustPanel({ copy }: { copy: ChatCopy }) {
  return (
    <aside className="min-w-0 rounded-3xl border border-[#eadfca] bg-[#fbf7ef] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b722b]">
        {copy.trustTitle}
      </p>
      <div className="mt-4 space-y-4 text-sm leading-6 text-[#625746]">
        <p>{copy.trustFirst}</p>
        <p>{copy.trustSecond}</p>
      </div>
    </aside>
  );
}

function StatusPanel({
  status,
  error,
  copy,
  onRetry,
}: {
  status: RequestState;
  error: string;
  copy: ChatCopy;
  onRetry: () => void;
}) {
  if (status === "loading" || status === "refining") {
    return (
      <div className="mt-6 rounded-2xl border border-[#ead8b3] bg-[#fff9ed] px-4 py-3 text-sm font-semibold text-[#6b4b13]" role="status">
        {copy.statusLoading}
      </div>
    );
  }

  if (status === "error" && error) {
    return (
      <div className="mt-6 rounded-2xl border border-[#d8b87d] bg-[#fff9ed] p-4 text-sm text-[#68420c]" role="alert">
        <p>{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 min-h-11 rounded-xl border border-[#c89a43] bg-white px-4 py-2 font-semibold text-[#7a540f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
        >
          {copy.retry}
        </button>
      </div>
    );
  }

  return null;
}

function RecommendationResults({
  response,
  status,
  copy,
}: {
  response: AdvisorResponse | null;
  status: RequestState;
  copy: ChatCopy;
}) {
  if (status === "empty") {
    return (
      <div className="mt-7 rounded-3xl border border-[#ead8b3] bg-white p-5 text-sm leading-6 text-[#625746]">
        {copy.empty}
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b722b]">
            {copy.resultsEyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#17120b]">
            {copy.resultsTitle}
          </h3>
        </div>
        <p className="max-w-xl rounded-2xl border border-[#ead8b3] bg-[#fff9ed] px-4 py-3 text-xs leading-5 text-[#6d6256]">
          {copy.resultsDisclaimer}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#625746]">{response.summary}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {response.recommendations.slice(0, 3).map((recommendation, index) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            index={index}
            copy={copy}
          />
        ))}
      </div>
    </section>
  );
}

function RecommendationCard({
  recommendation,
  index,
  copy,
}: {
  recommendation: AdvisorRecommendation;
  index: number;
  copy: ChatCopy;
}) {
  const tags = [
    ...recommendation.styles,
    ...recommendation.recommendedMaterials.slice(0, 1),
    ...recommendation.suitableOccasions.slice(0, 1),
  ].slice(0, 4);

  return (
    <article className="rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b722b]">
        {copy.recommendation} {index + 1}
      </p>
      <h4 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-[#17120b]">
        {recommendation.genericName}
      </h4>
      <InfoBlock title={copy.whyFits} text={recommendation.reason} />
      <InfoBlock title={copy.recommendedMaterial} text={recommendation.recommendedMaterials.join(", ")} />
      <InfoBlock title={copy.indicativePrice} text={recommendation.estimatedPriceRange} />
      <InfoBlock title={copy.jewelerTip} text={recommendation.jewelerTip} />
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#fff1d2] px-3 py-1 text-xs font-semibold text-[#68420c]">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#806632]">
        {title}
      </p>
      <p className="mt-1 text-sm leading-6 text-[#5d5148]">{text}</p>
    </div>
  );
}

function RefinementChat({
  conversation,
  value,
  isLoading,
  copy,
  prompts,
  onChange,
  onSubmit,
  onQuickPrompt,
}: {
  conversation: ConversationMessage[];
  value: string;
  isLoading: boolean;
  copy: ChatCopy;
  prompts: string[];
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onQuickPrompt: (value: string) => void;
}) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <section className="mt-8 rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-4 sm:p-5">
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#17120b]">
        {copy.refinementTitle}
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#625746]">
        {copy.refinementHelp}
      </p>

      <div className="mt-4 max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-[#eadfca] bg-white p-3">
        {conversation.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[92%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "user"
                ? "ml-auto bg-[#17120b] text-white"
                : "bg-[#fff9ed] text-[#554a40]"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={isLoading}
            onClick={() => onQuickPrompt(prompt)}
            className="min-h-11 rounded-full border border-[#ead8b3] bg-white px-4 py-2 text-xs font-semibold text-[#5f4a24] transition hover:border-[#b97a05] hover:bg-[#fff4dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label htmlFor="refinement-message" className="flex-1 text-sm font-semibold text-[#2b241f]">
          {copy.message}
          <textarea
            id="refinement-message"
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(event) => onChange(event.target.value)}
            placeholder={copy.refinementPlaceholder}
            className="mt-2 min-h-24 w-full resize-y rounded-2xl border border-[#ead8b3] bg-white px-4 py-3 text-sm leading-6 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isLoading ? copy.refining : copy.sendRefinement}
        </button>
      </form>
    </section>
  );
}

function buildGuidedSummary(
  preferences?: GuidedPreferences,
  selectedBudget?: string,
  copy: ChatCopy = chatCopy.es,
  locale: Locale = "es"
) {
  if (!preferences) {
    return copy.summaryFallback;
  }

  const parts = [
    preferences.jewelryType
      ? `${copy.summarySearchPrefix} ${withArticle(preferences.jewelryType, locale)}`
      : copy.summarySearch,
    preferences.recipient ? `${copy.summaryFor} ${preferences.recipient.toLowerCase()}` : "",
    preferences.occasion ? `${copy.summaryFor} ${preferences.occasion.toLowerCase()}` : "",
    preferences.styles?.length ? `${copy.summaryStyle} ${joinList(preferences.styles, copy.listAnd)}${locale === "en" ? " style" : ""}` : "",
    preferences.materials?.length ? `${copy.summaryMaterials} ${joinList(preferences.materials, copy.listAnd)}` : "",
    selectedBudget ? `${copy.summaryBudget} ${selectedBudget.toLowerCase()}` : "",
  ].filter(Boolean);

  const details = preferences.additionalDetails?.trim();
  return `${parts.join(", ")}.${details ? ` ${details}` : ""}`;
}

function withArticle(value: string, locale: Locale) {
  const lower = value.toLowerCase();
  if (locale === "en") {
    return lower;
  }
  if (locale === "pt-BR") {
    if (lower === "anel" || lower === "colar" || lower === "pingente" || lower === "relógio") {
      return `um ${lower}`;
    }
    return `uma ${lower}`;
  }
  if (lower === "anillo" || lower === "collar" || lower === "colgante" || lower === "reloj") {
    return `un ${lower}`;
  }
  if (lower === "pendientes" || lower === "gemelos") {
    return lower;
  }
  return `una ${lower}`;
}

function joinList(values: string[], conjunction: string) {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  return `${values.slice(0, -1).join(", ")} ${conjunction} ${values[values.length - 1]}`;
}

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function getAdvisorRequestErrorMessage(
  status: number,
  data: AdvisorErrorResponse,
  copy: ChatCopy
) {
  if (status === 503 && data.retryable) {
    return copy.retryableError;
  }

  return copy.genericRequestError;
}

function isAdvisorResponse(data: Partial<AdvisorResponse>): data is AdvisorResponse {
  return (
    typeof data.summary === "string" &&
    typeof data.followUpMessage === "string" &&
    Array.isArray(data.recommendations)
  );
}
