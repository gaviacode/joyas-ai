"use client";

import {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ListChecks, MessageCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  AdvisorMode,
  AdvisorRecommendation,
  AdvisorRequest,
  AdvisorResponse,
  ConversationMessage,
  GuidedPreferences,
  GuidedJewelryType,
  RefinementPreferences,
} from "@/lib/advisor";
import { ADVISOR_RECOMMENDATION_COUNT, guidedJewelryTypes } from "@/lib/advisor";
import { amazonProvider } from "@/lib/affiliate";
import { resetAdvisorEvent } from "@/components/AdvisorResetLink";
import { trackGAEvent } from "@/lib/google-analytics-events";
import type { Locale } from "@/lib/i18n";

type Option = {
  label: string;
  icon?: React.ReactNode;
  accentClassName?: string;
  swatchKey?: string;
};

type VisualOption = {
  value: GuidedJewelryType;
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
const maxRefinementAvoidLength = 280;
const emptyRefinementPreferences: RefinementPreferences = {};

const recipients: Option[] = [
  { label: "Mujer", icon: <RecipientIcon type="woman" />, accentClassName: "text-[#7c7064]" },
  { label: "Hombre", icon: <RecipientIcon type="man" />, accentClassName: "text-[#7c7064]" },
  { label: "Unisex", icon: <RecipientIcon type="unisex" />, accentClassName: "text-[#7c7064]" },
  { label: "Para mí", icon: <RecipientIcon type="self" />, accentClassName: "text-[#7c7064]" },
  { label: "Prefiero no indicarlo", icon: <RecipientIcon type="unspecified" />, accentClassName: "text-[#7c7064]" },
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

const initialPreferences: GuidedPreferences = {
  styles: [],
  materials: [],
};

type PieceDetailOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const baseGuidedStepKeys = [
  "recipient",
  "jewelryType",
  "occasion",
  "styles",
  "materials",
  "budget",
  "details",
] as const;

const chatCopy = {
  es: {
    heroEyebrow: "Joyero personal con IA",
    heroTitle: "Encuentra la joya perfecta con inteligencia artificial",
    heroDescription:
      "Cuéntanos qué buscas o déjate guiar paso a paso. Nuestro joyero IA analizará la persona, la ocasión, el estilo y tu presupuesto para recomendarte la opción más adecuada.",
    tabsLabel: "Modos del recomendador",
    directTab: "Describe lo que buscas",
    guidedTab: "Déjate guiar por el joyero IA",
    modeSelectorTitle: "¿Cómo quieres encontrar tu joya?",
    modeSelectorSubtitle: "Elige una opción para empezar",
    directModeTitle: "Cuéntame qué buscas",
    directModeDescription: "Escribe libremente como si hablaras con un joyero.",
    directModeCta: "Describir lo que busco",
    guidedModeTitle: "Prefiero que me guíes",
    guidedModeDescription: "Responde unas preguntas sencillas sobre persona, ocasión, estilo y presupuesto.",
    guidedModeCta: "Empezar paso a paso",
    directTitle: "Describe lo que buscas",
    directHelp:
      "Escribe como hablarías con un joyero: persona, ocasión, estilo, materiales y presupuesto si lo tienes claro.",
    directLabel: "Tu búsqueda",
    directPlaceholder:
      "Ejemplo: Busco un collar para mi pareja por nuestro aniversario. Le gusta la plata, las piedras azules y los diseños elegantes, pero discretos. Mi presupuesto es de hasta 120 €.",
    directTip: "Consejo: cuanto más concreto sea el contexto, más precisa será la recomendación.",
    clear: "Limpiar",
    askButton: "Preguntar al joyero IA",
    loadingButton: "Analizando...",
    guidedSubmit: "Obtener recomendaciones del joyero IA",
    guidedFind: "Encontrar mi joya",
    modifyPreferences: "Ajustar preferencias",
    preferencesTitle: "Tus preferencias",
    changePreference: "Cambiar",
    updateRecommendations: "Actualizar recomendaciones",
    updatingRecommendations: "Actualizando recomendaciones...",
    cancel: "Cancelar",
    done: "Listo",
    notSpecified: "Sin especificar",
    continue: "Continuar",
    back: "Atrás",
    step: "Paso",
    of: "de",
    directValidation:
      "Describe brevemente la persona, ocasión o presupuesto para que el joyero IA pueda ayudarte.",
    guidedValidation:
      "Selecciona al menos una preferencia o añade algún detalle antes de pedir recomendaciones.",
    invalidResponse: "La respuesta del joyero IA no tiene el formato esperado.",
    connectionError: "No he podido conectar con el joyero IA. Inténtalo de nuevo.",
    retryableError:
      "El joyero IA está recibiendo muchas consultas. Espera unos segundos y vuelve a intentarlo.",
    rateLimitedError:
      "Has realizado demasiadas búsquedas en poco tiempo. Espera unos minutos antes de volver a intentarlo.",
    serviceBusyError: "El servicio está temporalmente ocupado. Inténtalo de nuevo más tarde.",
    genericRequestError: "No he podido generar recomendaciones.",
    forWhom: "¿Para quién es?",
    jewelryType: "¿Qué tipo de joya buscas?",
    pieceDetails: "Detalles de la pieza",
    pieceDetailsHint: "Puedes elegir hasta 2 opciones o seleccionar “No tengo preferencia”.",
    occasion: "¿Cuál es la ocasión?",
    style: "¿Qué estilo prefieres?",
    styleHint: "Puedes elegir varias opciones.",
    material: "Material",
    materialHint: "Puedes elegir varias opciones o seleccionar “Sin preferencia”.",
    budget: "Presupuesto",
    min: "Mínimo",
    max: "Máximo",
    details: "Detalles adicionales",
    age: "Edad aproximada",
    optional: "Opcional",
    detailsPlaceholder:
      "Cuéntanos cualquier detalle que pueda ayudarnos a acertar mejor...",
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
      "Podemos mostrar enlaces a opciones de compra. La disponibilidad, el precio final y los detalles del producto se verifican siempre en la tienda.",
    statusLoading: "El joyero IA está analizando tus preferencias...",
    retry: "Reintentar",
    empty:
      "No se han encontrado recomendaciones claras. Añade algún detalle más sobre estilo, ocasión o presupuesto y vuelve a intentarlo.",
    resultsEyebrow: "Recomendaciones del joyero IA",
    resultsTitle: "Seis ideas personalizadas",
    resultsDisclaimer:
      "Recomendación orientativa: representa un tipo de joya, no un producto concreto disponible en una tienda.",
    recommendation: "Recomendación",
    whyFits: "Por qué encaja",
    recommendedMaterial: "Material recomendado",
    indicativePrice: "Precio orientativo",
    jewelerTip: "Consejo del joyero",
    viewOnAmazon: "Ver opciones en Amazon →",
    refineButton: "✨ Afinar recomendaciones",
    refinementTitle: "Afina tus recomendaciones",
    refinementHelp: "Estas preferencias son opcionales y no sustituyen tus criterios originales.",
    improvementGoal: "¿Qué quieres mejorar de estas recomendaciones?",
    prominence: "¿Qué nivel de protagonismo prefieres?",
    usage: "¿La quieres para uso diario o para ocasiones especiales?",
    meaningful: "¿Quieres que tenga un significado especial?",
    personalizable: "¿Quieres que pueda personalizarse?",
    additionalAvoid: "¿Quieres evitar algo más?",
    additionalAvoidPlaceholder: "Por ejemplo: nada demasiado grande, sin corazones, no quiero algo muy clásico...",
    optionalRefinement: "Opcional",
    skip: "Saltar",
    noRefinementSelected: "Selecciona alguna opción para afinar tus recomendaciones.",
    moreOriginal: "Más original", moreDiscreet: "Más discreto", moreElegant: "Más elegante", moreSpecial: "Más especial", moreAffordable: "Más económico",
    discreet: "Discreto", balanced: "Equilibrado", statement: "Llamativo",
    daily: "Diario", occasionsUse: "Ocasiones especiales", both: "Ambos",
    yes: "Sí", no: "No", neutral: "Me da igual",
    refining: "Refinando...",
    sendRefinement: "✨ Afinar mis recomendaciones",
  },
  "pt-BR": {
    heroEyebrow: "Joalheiro pessoal com IA",
    heroTitle: "Encontre a joia perfeita com inteligência artificial",
    heroDescription:
      "Conte o que procura ou deixe-se guiar passo a passo. Nosso joalheiro IA analisará a pessoa, a ocasião, o estilo e seu orçamento para recomendar uma opção adequada.",
    tabsLabel: "Modos do recomendador",
    directTab: "Descreva o que procura",
    guidedTab: "Deixe o joalheiro IA guiar você",
    modeSelectorTitle: "Como você quer encontrar sua joia?",
    modeSelectorSubtitle: "Escolha uma opção para começar",
    directModeTitle: "Conte o que você procura",
    directModeDescription: "Escreva livremente como se falasse com um joalheiro.",
    directModeCta: "Descrever o que procuro",
    guidedModeTitle: "Prefiro que você me guie",
    guidedModeDescription: "Responda perguntas simples sobre pessoa, ocasião, estilo e orçamento.",
    guidedModeCta: "Começar passo a passo",
    directTitle: "Descreva o que procura",
    directHelp:
      "Escreva como falaria com um joalheiro: pessoa, ocasião, estilo, materiais e orçamento, se já tiver isso claro.",
    directLabel: "Sua busca",
    directPlaceholder:
      "Exemplo: Procuro um colar para meu par pelo nosso aniversário de relacionamento. Ela gosta de prata, pedras azuis e designs elegantes, mas discretos. Meu orçamento é de até 120 €.",
    directTip: "Dica: quanto mais concreto for o contexto, mais precisa será a recomendação.",
    clear: "Limpar",
    askButton: "Perguntar ao joalheiro IA",
    loadingButton: "Analisando...",
    guidedSubmit: "Obter recomendações do joalheiro IA",
    guidedFind: "Encontrar minha joia",
    modifyPreferences: "Ajustar preferências",
    preferencesTitle: "Suas preferências",
    changePreference: "Mudar",
    updateRecommendations: "Atualizar recomendações",
    updatingRecommendations: "Atualizando recomendações...",
    cancel: "Cancelar",
    done: "Concluído",
    notSpecified: "Não especificado",
    continue: "Continuar",
    back: "Voltar",
    step: "Passo",
    of: "de",
    directValidation:
      "Descreva brevemente a pessoa, a ocasião ou o orçamento para que o joalheiro IA possa ajudar.",
    guidedValidation:
      "Selecione pelo menos uma preferência ou adicione algum detalhe antes de pedir recomendações.",
    invalidResponse: "A resposta do joalheiro IA não tem o formato esperado.",
    connectionError: "Não consegui conectar com o joalheiro IA. Tente novamente.",
    retryableError:
      "O joalheiro IA está recebendo muitas consultas. Aguarde alguns segundos e tente novamente.",
    rateLimitedError:
      "Você fez muitas buscas em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
    serviceBusyError: "O serviço está temporariamente ocupado. Tente novamente mais tarde.",
    genericRequestError: "Não consegui gerar recomendações.",
    forWhom: "Para quem é?",
    jewelryType: "Que tipo de joia você procura?",
    pieceDetails: "Detalhes da peça",
    pieceDetailsHint: "Você pode escolher até 2 opções ou selecionar “Sem preferência”.",
    occasion: "Qual é a ocasião?",
    style: "Que estilo você prefere?",
    styleHint: "Você pode escolher várias opções.",
    material: "Material",
    materialHint: "Você pode escolher várias opções ou selecionar “Sem preferência”.",
    budget: "Orçamento",
    min: "Mínimo",
    max: "Máximo",
    details: "Detalhes adicionais",
    age: "Faixa etária aproximada",
    optional: "Opcional",
    detailsPlaceholder:
      "Conte qualquer detalhe que possa nos ajudar a acertar melhor...",
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
      "Podemos mostrar links para opções de compra. A disponibilidade, o preço final e os detalhes do produto devem ser sempre verificados na loja.",
    statusLoading: "O joalheiro IA está analisando suas preferências...",
    retry: "Tentar novamente",
    empty:
      "Não foram encontradas recomendações claras. Adicione mais algum detalhe sobre estilo, ocasião ou orçamento e tente novamente.",
    resultsEyebrow: "Recomendações do joalheiro IA",
    resultsTitle: "Seis ideias personalizadas",
    resultsDisclaimer:
      "Recomendação orientativa: representa um tipo de joia, não um produto concreto disponível em uma loja.",
    recommendation: "Recomendação",
    whyFits: "Por que combina",
    recommendedMaterial: "Material recomendado",
    indicativePrice: "Preço orientativo",
    jewelerTip: "Dica do joalheiro",
    viewOnAmazon: "Ver opções na Amazon →",
    refineButton: "✨ Refinar recomendações",
    refinementTitle: "Refine suas recomendações",
    refinementHelp: "Estas preferências são opcionais e não substituem seus critérios originais.",
    improvementGoal: "O que você gostaria de melhorar?", prominence: "Nível de destaque", usage: "Uso principal",
    meaningful: "Você busca algo com significado?", personalizable: "Deve poder ser personalizada?",
    additionalAvoid: "Algo que você prefere evitar", additionalAvoidPlaceholder: "Ex.: designs muito chamativos ou pedras grandes", optionalRefinement: "Opcional",
    skip: "Pular",
    noRefinementSelected: "Selecione ao menos uma opção para refinar as recomendações.",
    moreOriginal: "Mais original", moreDiscreet: "Mais discreto", moreElegant: "Mais elegante", moreSpecial: "Mais especial", moreAffordable: "Mais econômico",
    discreet: "Discreto", balanced: "Equilibrado", statement: "Marcante", daily: "Diário", occasionsUse: "Ocasiões especiais", both: "Ambos", yes: "Sim", no: "Não", neutral: "Tanto faz",
    refining: "Refinando...",
    sendRefinement: "✨ Refinar minhas recomendações",
  },
  en: {
    heroEyebrow: "Personal AI jeweler",
    heroTitle: "Find the perfect jewelry with artificial intelligence",
    heroDescription:
      "Tell us what you need or follow the guided flow. Our AI jeweler will analyze the person, occasion, style and budget to recommend a suitable option.",
    tabsLabel: "Advisor modes",
    directTab: "Describe what you need",
    guidedTab: "Let the AI jeweler guide you",
    modeSelectorTitle: "How would you like to find your jewelry?",
    modeSelectorSubtitle: "Choose an option to get started",
    directModeTitle: "Tell me what you need",
    directModeDescription: "Write freely, as if you were speaking to a jeweler.",
    directModeCta: "Describe what I need",
    guidedModeTitle: "I would like guidance",
    guidedModeDescription: "Answer a few simple questions about the person, occasion, style and budget.",
    guidedModeCta: "Start step by step",
    directTitle: "Describe what you need",
    directHelp:
      "Write as you would to a jeweler: person, occasion, style, materials and budget if you already know them.",
    directLabel: "Your search",
    directPlaceholder:
      "Example: I am looking for a necklace for my partner for our anniversary. She likes silver, blue stones and elegant but understated designs. My budget is up to €120.",
    directTip: "Tip: the more specific the context, the more precise the recommendation.",
    clear: "Clear",
    askButton: "Ask the AI jeweler",
    loadingButton: "Analyzing...",
    guidedSubmit: "Get AI jeweler recommendations",
    guidedFind: "Find my jewelry",
    modifyPreferences: "Adjust preferences",
    preferencesTitle: "Your preferences",
    changePreference: "Change",
    updateRecommendations: "Update recommendations",
    updatingRecommendations: "Updating recommendations...",
    cancel: "Cancel",
    done: "Done",
    notSpecified: "Not specified",
    continue: "Continue",
    back: "Back",
    step: "Step",
    of: "of",
    directValidation:
      "Briefly describe the person, occasion or budget so the AI jeweler can help.",
    guidedValidation:
      "Select at least one preference or add a detail before requesting recommendations.",
    invalidResponse: "The AI jeweler response does not have the expected format.",
    connectionError: "I could not connect to the AI jeweler. Please try again.",
    retryableError:
      "The AI jeweler is receiving many requests. Wait a few seconds and try again.",
    rateLimitedError:
      "You've made too many searches in a short time. Please wait a few minutes before trying again.",
    serviceBusyError: "The service is temporarily busy. Please try again later.",
    genericRequestError: "I could not generate recommendations.",
    forWhom: "Who is it for?",
    jewelryType: "What type of jewelry are you looking for?",
    pieceDetails: "Piece details",
    pieceDetailsHint: "You can choose up to 2 options or select “No preference”.",
    occasion: "What is the occasion?",
    style: "What style do you prefer?",
    styleHint: "You can choose multiple options.",
    material: "Material",
    materialHint: "You can choose multiple options or select “No preference”.",
    budget: "Budget",
    min: "Minimum",
    max: "Maximum",
    details: "Additional details",
    age: "Approximate age",
    optional: "Optional",
    detailsPlaceholder:
      "Tell us any detail that can help us make a better recommendation...",
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
      "We may show links to purchase options. Availability, final price and product details should always be verified with the store.",
    statusLoading: "The AI jeweler is analyzing your preferences...",
    retry: "Try again",
    empty:
      "No clear recommendations were found. Add another detail about style, occasion or budget and try again.",
    resultsEyebrow: "AI jeweler recommendations",
    resultsTitle: "Six personalized ideas",
    resultsDisclaimer:
      "Indicative recommendation: this represents a jewelry type, not a specific product available in a store.",
    recommendation: "Recommendation",
    whyFits: "Why it fits",
    recommendedMaterial: "Recommended material",
    indicativePrice: "Indicative price",
    jewelerTip: "Jeweler tip",
    viewOnAmazon: "View options on Amazon →",
    refineButton: "✨ Refine recommendations",
    refinementTitle: "Refine your recommendations",
    refinementHelp: "These preferences are optional and do not replace your original criteria.",
    improvementGoal: "What would you like to improve?", prominence: "Level of presence", usage: "Primary use",
    meaningful: "Would you like it to be meaningful?", personalizable: "Should it be personalizable?",
    additionalAvoid: "Anything you would rather avoid", additionalAvoidPlaceholder: "E.g. very ornate designs or large stones", optionalRefinement: "Optional",
    skip: "Skip",
    noRefinementSelected: "Select at least one option to refine the recommendations.",
    moreOriginal: "More original", moreDiscreet: "More understated", moreElegant: "More elegant", moreSpecial: "More special", moreAffordable: "More affordable",
    discreet: "Understated", balanced: "Balanced", statement: "Statement", daily: "Everyday", occasionsUse: "Special occasions", both: "Both", yes: "Yes", no: "No", neutral: "No preference",
    refining: "Refining...",
    sendRefinement: "✨ Refine my recommendations",
  },
} satisfies Record<Locale, Record<string, string>>;

type ChatCopy = (typeof chatCopy)[Locale];

function getRecipients(locale: Locale): Option[] {
  if (locale === "pt-BR") {
    return [
      { label: "Mulher", icon: <RecipientIcon type="woman" />, accentClassName: "text-[#7c7064]" },
      { label: "Homem", icon: <RecipientIcon type="man" />, accentClassName: "text-[#7c7064]" },
      { label: "Unissex", icon: <RecipientIcon type="unisex" />, accentClassName: "text-[#7c7064]" },
      { label: "Para mim", icon: <RecipientIcon type="self" />, accentClassName: "text-[#7c7064]" },
      { label: "Prefiro não indicar", icon: <RecipientIcon type="unspecified" />, accentClassName: "text-[#7c7064]" },
    ];
  }

  if (locale === "en") {
    return [
      { label: "Woman", icon: <RecipientIcon type="woman" />, accentClassName: "text-[#7c7064]" },
      { label: "Man", icon: <RecipientIcon type="man" />, accentClassName: "text-[#7c7064]" },
      { label: "Unisex", icon: <RecipientIcon type="unisex" />, accentClassName: "text-[#7c7064]" },
      { label: "For myself", icon: <RecipientIcon type="self" />, accentClassName: "text-[#7c7064]" },
      { label: "Prefer not to say", icon: <RecipientIcon type="unspecified" />, accentClassName: "text-[#7c7064]" },
    ];
  }

  return recipients;
}

function getJewelryTypes(locale: Locale): VisualOption[] {
  const labels =
    locale === "pt-BR"
      ? ["Anel", "Colar", "Pingente", "Pulseira", "Brincos", "Abotoaduras", "Relógio", "Charms", "Conjuntos de joias", "Não tenho certeza"]
      : locale === "en"
        ? ["Ring", "Necklace", "Pendant", "Bracelet", "Earrings", "Cufflinks", "Watch", "Charms", "Jewelry sets", "Not sure"]
        : ["Anillo", "Collar", "Colgante", "Pulsera", "Pendientes", "Gemelos", "Reloj", "Charms / abalorios", "Conjuntos", "No estoy seguro"];
  const icons: JewelryIconType[] = ["ring", "necklace", "pendant", "bracelet", "earrings", "cufflinks", "watch", "charm", "set", "unsure"];

  return guidedJewelryTypes.map((value, index) => ({
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

function getPrefilledOccasion(value: string, locale: Locale) {
  const indexes: Record<string, number> = {
    aniversario: 0,
    cumpleanos: 1,
    compromiso: 2,
    boda: 3,
    "san-valentin": 4,
    navidad: 5,
    "regalo-sorpresa": 6,
  };
  const index = indexes[value];
  return index === undefined ? undefined : getOccasions(locale)[index]?.label;
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

export default function JewelryChat({ locale = "es" }: { locale?: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = chatCopy[locale];
  const localizedRecipients = getRecipients(locale);
  const localizedJewelryTypes = getJewelryTypes(locale);
  const localizedOccasions = getOccasions(locale);
  const localizedStyles = getStyles(locale);
  const localizedMaterials = getMaterials(locale, copy.noPreference);
  const localizedBudgetOptions = getBudgetOptions(locale, copy.customBudget);
  const [mode, setMode] = useState<AdvisorMode>("direct");
  const [directDescription, setDirectDescription] = useState("");
  const [preferences, setPreferences] = useState<GuidedPreferences>(initialPreferences);
  const localizedPieceDetails = getPieceDetails(preferences.jewelryType, locale);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [customBudgetMin, setCustomBudgetMin] = useState("");
  const [customBudgetMax, setCustomBudgetMax] = useState("");
  const [isPreferencesEditorOpen, setIsPreferencesEditorOpen] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<GuidedPreferences>(initialPreferences);
  const [draftSelectedBudget, setDraftSelectedBudget] = useState("");
  const [draftCustomBudgetMin, setDraftCustomBudgetMin] = useState("");
  const [draftCustomBudgetMax, setDraftCustomBudgetMax] = useState("");
  const [editingPreference, setEditingPreference] = useState<string | null>(null);
  const [guidedStep, setGuidedStep] = useState(0);
  const [advisorResponse, setAdvisorResponse] = useState<AdvisorResponse | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [refinementPreferences, setRefinementPreferences] = useState<RefinementPreferences>(emptyRefinementPreferences);
  const [isRefinementOpen, setIsRefinementOpen] = useState(false);
  const [refinementStep, setRefinementStep] = useState(0);
  const [refinementError, setRefinementError] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<RequestState>("idle");
  const [resultsGeneration, setResultsGeneration] = useState(0);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const preservedScrollYRef = useRef<number | null>(null);
  const preferencesEditorRef = useRef<HTMLDivElement | null>(null);
  const recommenderRef = useRef<HTMLElement | null>(null);
  const modeContentRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);
  const refinementRef = useRef<HTMLElement | null>(null);
  const [shouldScrollToGuided, setShouldScrollToGuided] = useState(false);
  const [shouldScrollToModeContent, setShouldScrollToModeContent] = useState(false);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appliedContextRef = useRef("");

  const isLoading = status === "loading" || status === "refining";
  const isSubmissionBlocked = isLoading || isCooldownActive;

  useEffect(() => () => {
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const advisorType = searchParams.get("advisorType");
    const advisorOccasion = searchParams.get("advisorOccasion");
    const advisorTopic = searchParams.get("advisorTopic")?.trim();
    const jewelryType = guidedJewelryTypes.includes(advisorType as GuidedJewelryType)
      ? (advisorType as GuidedJewelryType)
      : undefined;
    const occasion = advisorOccasion ? getPrefilledOccasion(advisorOccasion, locale) : undefined;
    const signature = [jewelryType, occasion, advisorTopic].filter(Boolean).join("|");

    if (!signature || appliedContextRef.current === signature) {
      return;
    }

    appliedContextRef.current = signature;
    const nextPreferences: GuidedPreferences = {
      ...initialPreferences,
      jewelryType,
      occasion,
      additionalDetails: advisorTopic || undefined,
    };
    setMode("guided");
    setPreferences(nextPreferences);
    setDraftPreferences(nextPreferences);
    setGuidedStep(0);
    setSelectedBudget("");
    setCustomBudgetMin("");
    setCustomBudgetMax("");
    setDraftSelectedBudget("");
    setDraftCustomBudgetMin("");
    setDraftCustomBudgetMax("");
    setAdvisorResponse(null);
    setConversation([]);
    setRefinementPreferences(emptyRefinementPreferences);
    setIsRefinementOpen(false);
    setRefinementStep(0);
    setRefinementError("");
    setError("");
    setStatus("idle");
    setShouldScrollToGuided(true);
    router.replace(`${pathname}#joyero-ia`, { scroll: false });
  }, [locale, pathname, router, searchParams]);

  function startCooldown() {
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
    }

    setIsCooldownActive(true);
    cooldownTimeoutRef.current = setTimeout(() => {
      setIsCooldownActive(false);
      cooldownTimeoutRef.current = null;
    }, 5_000);
  }
  function switchMode(nextMode: AdvisorMode) {
    if (nextMode === mode) {
      setShouldScrollToModeContent(true);
      return;
    }

    preservedScrollYRef.current = nextMode === "guided" ? null : window.scrollY;
    setMode(nextMode);
    setShouldScrollToModeContent(true);
    setError("");
  }

  function changeGuidedStep(nextStep: number) {
    setGuidedStep(nextStep);
  }

  useLayoutEffect(() => {
    const scrollY = preservedScrollYRef.current;
    if (scrollY === null) {
      return;
    }

    preservedScrollYRef.current = null;
    window.scrollTo({ top: scrollY, behavior: "auto" });

    const frameId = requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: "auto" });
    });

    return () => cancelAnimationFrame(frameId);
  }, [mode, guidedStep]);

  useEffect(() => {
    if (mode !== "guided" || !shouldScrollToGuided) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      recommenderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setShouldScrollToGuided(false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [mode, shouldScrollToGuided]);

  useEffect(() => {
    if (!shouldScrollToModeContent) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      scrollToSectionBelowHeader(modeContentRef.current);
      setShouldScrollToModeContent(false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [mode, shouldScrollToModeContent]);

  useEffect(() => {
    if (resultsGeneration === 0) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      scrollToSectionBelowHeader(resultsRef.current);
    });

    return () => cancelAnimationFrame(frameId);
  }, [resultsGeneration]);

  useEffect(() => {
    if (!isPreferencesEditorOpen) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      scrollToSectionBelowHeader(preferencesEditorRef.current);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isPreferencesEditorOpen]);

  useEffect(() => {
    function resetAdvisor(event: Event) {
      if (status !== "results") {
        return;
      }

      event.preventDefault();
      setMode("direct");
      setDirectDescription("");
      setPreferences(initialPreferences);
      setSelectedBudget("");
      setCustomBudgetMin("");
      setCustomBudgetMax("");
      setIsPreferencesEditorOpen(false);
      setDraftPreferences(initialPreferences);
      setDraftSelectedBudget("");
      setDraftCustomBudgetMin("");
      setDraftCustomBudgetMax("");
      setEditingPreference(null);
      setGuidedStep(0);
      setAdvisorResponse(null);
      setConversation([]);
      setRefinementPreferences(emptyRefinementPreferences);
      setIsRefinementOpen(false);
      setRefinementStep(0);
      setRefinementError("");
      setError("");
      setStatus("idle");
    }

    window.addEventListener(resetAdvisorEvent, resetAdvisor);
    return () => window.removeEventListener(resetAdvisorEvent, resetAdvisor);
  }, [status]);

  function updateSinglePreference(key: keyof GuidedPreferences, value: string) {
    setPreferences((current) => ({
      ...current,
      [key]: current[key] === value ? undefined : value,
      ...(key === "jewelryType" ? { pieceDetails: [] } : {}),
    }));
  }

  function togglePieceDetails(value: string) {
    setPreferences((current) => ({
      ...current,
      pieceDetails: getNextPieceDetails(current.pieceDetails ?? [], value, current.jewelryType),
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

  async function submitAdvisor(refinement?: RefinementPreferences) {
    if (isSubmissionBlocked) {
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
    setRefinementError("");
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
        ? [...conversation, { role: "assistant" as const, content: data.followUpMessage }]
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
      if (refinement) {
        setIsRefinementOpen(false);
        setRefinementStep(0);
      }
      if (data.recommendations.length) {
        setResultsGeneration((generation) => generation + 1);
      }
      startCooldown();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : copy.connectionError;
      if (refinement) {
        setRefinementError(message);
        setStatus("results");
      } else {
        setError(message);
        setStatus("error");
      }
    }
  }

  function buildRequest(refinement?: RefinementPreferences): AdvisorRequest | null {
    const requestConversation = refinement ? undefined : conversation;

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
        refinementPreferences: refinement,
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
      refinementPreferences: refinement,
    };
  }

  function openRefinement() {
    setIsRefinementOpen(true);
    setRefinementStep(0);
    setRefinementError("");
    trackGAEvent("refinement_open", { locale });
    requestAnimationFrame(() => scrollToSectionBelowHeader(refinementRef.current));
  }

  function submitRefinement() {
    trackGAEvent("refinement_submit", {
      locale,
      improvementGoal: refinementPreferences.improvementGoal,
      prominence: refinementPreferences.prominence,
      usage: refinementPreferences.usage,
      meaningful: refinementPreferences.meaningful,
      personalizable: refinementPreferences.personalizable,
    });
    void submitAdvisor(refinementPreferences);
  }

  function modifyGuidedPreferences() {
    setDraftPreferences({
      ...preferences,
      styles: [...(preferences.styles ?? [])],
      materials: [...(preferences.materials ?? [])],
    });
    setDraftSelectedBudget(selectedBudget);
    setDraftCustomBudgetMin(customBudgetMin);
    setDraftCustomBudgetMax(customBudgetMax);
    setEditingPreference(null);
    setIsPreferencesEditorOpen(true);
    setError("");
  }

  function cancelGuidedPreferenceChanges() {
    setIsPreferencesEditorOpen(false);
    setEditingPreference(null);
    setError("");
  }

  async function updateGuidedRecommendations() {
    if (isSubmissionBlocked) return;

    const hasGuidedInput = Object.values(draftPreferences).some((value) =>
      Array.isArray(value) ? value.length > 0 : Boolean(typeof value === "string" ? value.trim() : value)
    );
    if (!hasGuidedInput) {
      setError(copy.guidedValidation);
      setStatus("error");
      return;
    }

    setError("");
    setStatus("loading");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "guided", locale, guidedPreferences: draftPreferences, conversation: [] } satisfies AdvisorRequest),
      });
      const data = (await response.json()) as Partial<AdvisorResponse> & AdvisorErrorResponse;
      if (!response.ok) throw new Error(getAdvisorRequestErrorMessage(response.status, data, copy));
      if (!isAdvisorResponse(data)) throw new Error(copy.invalidResponse);

      setPreferences(draftPreferences);
      setSelectedBudget(draftSelectedBudget);
      setCustomBudgetMin(draftCustomBudgetMin);
      setCustomBudgetMax(draftCustomBudgetMax);
      setAdvisorResponse(data);
      setConversation([{ role: "user", content: buildGuidedSummary(draftPreferences, draftPreferences.budgetLabel, copy, locale) }, { role: "assistant", content: data.followUpMessage }]);
      setStatus(data.recommendations.length ? "results" : "empty");
      if (data.recommendations.length) {
        setResultsGeneration((generation) => generation + 1);
      }
      setIsPreferencesEditorOpen(false);
      setEditingPreference(null);
      startCooldown();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : copy.connectionError);
      setStatus("error");
    }
  }

  const isGuidedResultState = mode === "guided" && Boolean(advisorResponse);
  const hasVisibleResults = Boolean(advisorResponse?.recommendations.length);

  return (
    <section
      ref={recommenderRef}
      id="joyero-ia"
      className="w-full max-w-full scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-[#ead8b3] bg-white p-4 shadow-2xl shadow-[#805400]/10 sm:p-6 lg:p-8"
      style={{ overflowAnchor: "none" }}
    >
      {!hasVisibleResults ? <><div className="mx-auto max-w-4xl text-center">
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

      <AdvisorModeSelector mode={mode} copy={copy} onChange={switchMode} />

      {!isGuidedResultState ? <div ref={modeContentRef} className="mt-6 grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.38fr)] lg:items-start">
        <div className="min-w-0 rounded-3xl border border-[#eadfca] bg-[#fffdf8] p-4 sm:p-5 lg:p-6">
          {mode === "direct" ? (
            <DirectAdvisorForm
              value={directDescription}
              isLoading={isLoading}
              isRequestBlocked={isCooldownActive}
              copy={copy}
              onChange={setDirectDescription}
              onSubmit={(event) => {
                event.preventDefault();
                void submitAdvisor();
              }}
            />
          ) : isLoading ? (
            <GuidedAdvisorLoading copy={copy} />
          ) : (
            <div>
              <GuidedAdvisorForm
                preferences={preferences}
                selectedBudget={selectedBudget}
                customBudgetMin={customBudgetMin}
                customBudgetMax={customBudgetMax}
                isLoading={isLoading}
                isRequestBlocked={isCooldownActive}
                copy={copy}
                recipients={localizedRecipients}
                jewelryTypes={localizedJewelryTypes}
                pieceDetails={localizedPieceDetails}
                occasions={localizedOccasions}
                styles={localizedStyles}
                materials={localizedMaterials}
                budgetOptions={localizedBudgetOptions}
                currentStep={guidedStep}
                onStepChange={changeGuidedStep}
                onSingleSelect={updateSinglePreference}
                onMultiSelect={toggleListPreference}
                onPieceDetails={togglePieceDetails}
                onBudget={updateBudget}
                onCustomBudget={updateCustomBudget}
                onDetails={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    additionalDetails: value,
                  }))
                }
                onAge={(age) =>
                  setPreferences((current) => ({ ...current, age }))
                }
                onSubmit={(event) => {
                  event.preventDefault();
                  void submitAdvisor();
                }}
              />
            </div>
          )}
        </div>

        <TrustPanel copy={copy} />
      </div> : null}</> : null}

      {!(mode === "guided" && isLoading) ? <StatusPanel
        status={status}
        error={error}
        copy={copy}
        onRetry={() => void submitAdvisor()}
      /> : null}

      {isGuidedResultState && isPreferencesEditorOpen ? <div ref={preferencesEditorRef} className="scroll-mt-28">
        <CompactPreferencesEditor
        preferences={draftPreferences}
        selectedBudget={draftSelectedBudget}
        customBudgetMin={draftCustomBudgetMin}
        customBudgetMax={draftCustomBudgetMax}
        activeField={editingPreference}
        isLoading={isLoading}
        isRequestBlocked={isCooldownActive}
        copy={copy}
        recipients={localizedRecipients}
        jewelryTypes={localizedJewelryTypes}
        occasions={localizedOccasions}
        styles={localizedStyles}
        materials={localizedMaterials}
        budgetOptions={localizedBudgetOptions}
        onActiveFieldChange={setEditingPreference}
        onPreferencesChange={setDraftPreferences}
        onBudgetChange={setDraftSelectedBudget}
        onCustomBudgetMinChange={setDraftCustomBudgetMin}
        onCustomBudgetMaxChange={setDraftCustomBudgetMax}
        onUpdate={() => void updateGuidedRecommendations()}
        onCancel={cancelGuidedPreferenceChanges}
        />
      </div> : null}

      <RecommendationResults
        response={advisorResponse}
        status={status}
        copy={copy}
        locale={locale}
        preferences={mode === "guided" ? preferences : undefined}
        selectedBudget={mode === "guided" ? selectedBudget : undefined}
        resultsRef={resultsRef}
        onModifyPreferences={isGuidedResultState && !isPreferencesEditorOpen ? modifyGuidedPreferences : undefined}
        onOpenRefinement={openRefinement}
      />

      {advisorResponse ? (
        <RefinementPanel
          panelRef={refinementRef}
          isOpen={isRefinementOpen}
          currentStep={refinementStep}
          preferences={refinementPreferences}
          isLoading={isLoading}
          isRequestBlocked={isCooldownActive}
          copy={copy}
          error={refinementError}
          onChange={setRefinementPreferences}
          onStepChange={setRefinementStep}
          onSubmit={submitRefinement}
        />
      ) : null}
    </section>
  );
}

function scrollToSectionBelowHeader(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  const headerHeight = document.querySelector<HTMLElement>("header.sticky")
    ?.getBoundingClientRect().height ?? 0;
  const targetPosition = window.scrollY + element.getBoundingClientRect().top - headerHeight - 24;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: "smooth",
  });
}

function AdvisorModeSelector({
  mode,
  copy,
  onChange,
}: {
  mode: AdvisorMode;
  copy: ChatCopy;
  onChange: (mode: AdvisorMode) => void;
}) {
  const options: Array<{
    mode: AdvisorMode;
    title: string;
    description: string;
    cta: string;
    icon: React.ReactNode;
  }> = [
    {
      mode: "direct",
      title: copy.directModeTitle,
      description: copy.directModeDescription,
      cta: copy.directModeCta,
      icon: <MessageCircle className="h-5 w-5" strokeWidth={1.8} />,
    },
    {
      mode: "guided",
      title: copy.guidedModeTitle,
      description: copy.guidedModeDescription,
      cta: copy.guidedModeCta,
      icon: <ListChecks className="h-5 w-5" strokeWidth={1.8} />,
    },
  ];

  return (
    <section className="mx-auto mt-7 w-full max-w-4xl" aria-labelledby="advisor-mode-selector-title">
      <div className="text-center">
        <h3 id="advisor-mode-selector-title" className="text-balance text-xl font-semibold tracking-[-0.03em] text-[#17120b] sm:text-2xl">
          {copy.modeSelectorTitle}
        </h3>
        <p className="mt-1 text-sm text-[#6f6255]">{copy.modeSelectorSubtitle}</p>
      </div>
      <div role="group" aria-label={copy.tabsLabel} className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
      {options.map((option) => {
        const active = mode === option.mode;

        return (
          <button
            key={option.mode}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.mode)}
            className={`group flex min-h-52 w-full flex-col items-start rounded-2xl border border-[#ead8b3] bg-white p-5 text-left outline-none transition duration-200 hover:border-[#c89a43] hover:bg-[#fffdf8] active:bg-[#fff9ed] focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 sm:p-6 ${
              active
                ? "border-[#c89a43] bg-[#fff9ed] shadow-sm"
                : ""
            }`}
          >
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8cc91] bg-white text-[#8f610d]">
              {option.icon}
            </span>
            <span className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[#17120b]">{option.title}</span>
            <span className="mt-2 max-w-md text-sm leading-6 text-[#63584c]">{option.description}</span>
            <span className="mt-auto inline-flex min-h-11 items-center rounded-xl border border-[#c89a43] bg-white px-4 py-2 pt-2 text-sm font-semibold text-[#7a540f] transition group-hover:bg-[#fff5df] group-active:bg-[#fff1d2]">
              {option.cta} <span aria-hidden="true" className="ml-2">→</span>
            </span>
          </button>
        );
      })}
      </div>
    </section>
  );
}

function DirectAdvisorForm({
  value,
  isLoading,
  isRequestBlocked,
  copy,
  onChange,
  onSubmit,
}: {
  value: string;
  isLoading: boolean;
  isRequestBlocked: boolean;
  copy: ChatCopy;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function clearDescription() {
    onChange("");
    textareaRef.current?.focus({ preventScroll: true });
  }

  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#17120b]">
        {copy.directTitle}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#6f6255]">
        {copy.directHelp}
      </p>

      <div className="mt-5 flex min-h-6 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label htmlFor="direct-description" className="text-sm font-semibold text-[#2b241f]">
          {copy.directLabel}
        </label>
        {value ? (
          <button
            type="button"
            onClick={clearDescription}
            className="min-h-9 rounded-lg px-2 text-sm font-semibold text-[#8a5d07] transition hover:bg-[#fff4dd] hover:text-[#6f4800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]"
          >
            {copy.clear}
          </button>
        ) : null}
      </div>
      <textarea
        id="direct-description"
        ref={textareaRef}
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

      <button
        type="submit"
        disabled={isLoading || isRequestBlocked || !value.trim()}
        className="mt-5 min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
  isRequestBlocked,
  copy,
  recipients,
  jewelryTypes,
  pieceDetails,
  occasions,
  styles,
  materials,
  budgetOptions,
  currentStep,
  onStepChange,
  onSingleSelect,
  onMultiSelect,
  onPieceDetails,
  onBudget,
  onCustomBudget,
  onDetails,
  onAge,
  onSubmit,
}: {
  preferences: GuidedPreferences;
  selectedBudget: string;
  customBudgetMin: string;
  customBudgetMax: string;
  isLoading: boolean;
  isRequestBlocked: boolean;
  copy: ChatCopy;
  recipients: Option[];
  jewelryTypes: VisualOption[];
  pieceDetails: PieceDetailOption[];
  occasions: Option[];
  styles: Option[];
  materials: Option[];
  budgetOptions: BudgetOption[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onSingleSelect: (key: keyof GuidedPreferences, value: string) => void;
  onMultiSelect: (key: "styles" | "materials", value: string) => void;
  onPieceDetails: (value: string) => void;
  onBudget: (option: BudgetOption) => void;
  onCustomBudget: (min: string, max: string) => void;
  onDetails: (value: string) => void;
  onAge: (age: number | undefined) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeStepRef = useRef<HTMLFormElement | null>(null);
  const previousStepRef = useRef<string | null>(null);
  const [ageInput, setAgeInput] = useState(preferences.age?.toString() ?? "");
  const guidedStepKeys = preferences.jewelryType && preferences.jewelryType !== "no estoy seguro"
    ? [...baseGuidedStepKeys.slice(0, 2), "pieceDetails", ...baseGuidedStepKeys.slice(2)]
    : baseGuidedStepKeys;
  const totalSteps = guidedStepKeys.length;
  const lastStep = totalSteps - 1;
  const safeStep = Math.min(Math.max(currentStep, 0), lastStep);

  useEffect(() => () => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }
  }, []);

  function goToStep(nextStep: number) {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    onStepChange(Math.min(Math.max(nextStep, 0), lastStep));
  }

  function selectAndAdvance(
    key: "recipient" | "jewelryType" | "occasion",
    value: string,
    selected: boolean,
  ) {
    onSingleSelect(key, value);
    if (!selected) {
      advanceTimeoutRef.current = setTimeout(() => goToStep(safeStep + 1), 180);
    }
  }

  const stepTitleByKey = {
    recipient: copy.forWhom,
    jewelryType: copy.jewelryType,
    pieceDetails: copy.pieceDetails,
    occasion: copy.occasion,
    styles: copy.style,
    materials: copy.material,
    budget: copy.budget,
    details: copy.details,
  };
  const stepKey = guidedStepKeys[safeStep] as keyof typeof stepTitleByKey;
  const stepTitle = stepTitleByKey[stepKey];

  useLayoutEffect(() => {
    const stepIdentifier = `${stepKey}:${totalSteps}`;
    if (previousStepRef.current === null) {
      previousStepRef.current = stepIdentifier;
      return;
    }

    if (previousStepRef.current === stepIdentifier) {
      return;
    }

    previousStepRef.current = stepIdentifier;
    const frameId = requestAnimationFrame(() => {
      const activeStep = activeStepRef.current;
      if (!activeStep) {
        return;
      }

      const stickyHeaderHeight = document.querySelector<HTMLElement>("header.sticky")
        ?.getBoundingClientRect().height ?? 0;
      const targetPosition = window.scrollY + activeStep.getBoundingClientRect().top - stickyHeaderHeight - 24;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [stepKey, totalSteps]);

  return (
    <form ref={activeStepRef} onSubmit={onSubmit} className="min-w-0">
      <div className="mb-7">
        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#6f5530]">{copy.step} {safeStep + 1} {copy.of} {totalSteps}{safeStep === lastStep ? <span className="rounded-full border border-[#e8cc91] bg-[#fff3d8] px-2.5 py-0.5 text-xs font-semibold text-[#795417]">{copy.optional}</span> : null}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eee2cb]" role="progressbar" aria-label={`${copy.step} ${safeStep + 1} ${copy.of} ${totalSteps}`} aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={safeStep + 1}>
          <div className="h-full rounded-full bg-[#b97a05] transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${((safeStep + 1) / totalSteps) * 100}%` }} />
        </div>
      </div>

      <div key={safeStep} className={`guided-step ${safeStep === lastStep ? "rounded-2xl border border-[#e8cc91] bg-[#fff8e8] p-4 sm:p-5" : ""}`}>
        {stepKey === "recipient" ? <OptionGroup title={stepTitle}>{recipients.map((option) => <SelectableOption key={option.label} label={option.label} icon={option.icon} accentClassName={option.accentClassName} selectedIconClassName="text-[#9a6b08]" selected={preferences.recipient === option.label} onClick={() => selectAndAdvance("recipient", option.label, preferences.recipient === option.label)} />)}</OptionGroup> : null}
        {stepKey === "jewelryType" ? <OptionGroup title={stepTitle} layout="jewelry-grid">{jewelryTypes.map((option) => <VisualOptionCard key={option.value} label={option.label} icon={option.icon} selected={preferences.jewelryType === option.value} onClick={() => selectAndAdvance("jewelryType", option.value, preferences.jewelryType === option.value)} />)}</OptionGroup> : null}
        {stepKey === "pieceDetails" ? <OptionGroup title={stepTitle} hint={copy.pieceDetailsHint} layout="jewelry-grid">{pieceDetails.map((option) => <VisualOptionCard key={option.value} label={option.label} icon={option.icon} selected={preferences.pieceDetails?.includes(option.value) ?? false} onClick={() => onPieceDetails(option.value)} />)}</OptionGroup> : null}
        {stepKey === "occasion" ? <OptionGroup title={stepTitle}>{occasions.map((option) => <SelectableOption key={option.label} label={option.label} icon={option.icon} accentClassName={option.accentClassName} selected={preferences.occasion === option.label} onClick={() => selectAndAdvance("occasion", option.label, preferences.occasion === option.label)} />)}</OptionGroup> : null}
        {stepKey === "styles" ? <OptionGroup title={stepTitle} hint={copy.styleHint}>{styles.map((option) => <SelectableOption key={option.label} label={option.label} icon={option.icon} accentClassName={option.accentClassName} selected={preferences.styles?.includes(option.label) ?? false} onClick={() => onMultiSelect("styles", option.label)} />)}</OptionGroup> : null}
        {stepKey === "materials" ? <OptionGroup title={stepTitle} hint={copy.materialHint}>{materials.map((option) => <SelectableOption key={option.label} label={option.label} icon={<MaterialSwatch material={option.swatchKey ?? option.label} />} selected={preferences.materials?.includes(option.label) ?? false} onClick={() => onMultiSelect("materials", option.label)} />)}</OptionGroup> : null}
        {stepKey === "budget" ? <><OptionGroup title={stepTitle}>{budgetOptions.map((option) => <SelectableOption key={option.label} label={option.label} selected={selectedBudget === option.label} onClick={() => onBudget(option)} />)}</OptionGroup>{selectedBudget === copy.customBudget ? <div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-[#2b241f]">{copy.min}<input type="number" min="0" inputMode="numeric" value={customBudgetMin} onChange={(event) => onCustomBudget(event.target.value, customBudgetMax)} className="mt-2 h-12 w-full rounded-2xl border border-[#ead8b3] bg-white px-4 text-sm outline-none focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25" placeholder="Ej. 80" /></label><label className="text-sm font-semibold text-[#2b241f]">{copy.max}<input type="number" min="0" inputMode="numeric" value={customBudgetMax} onChange={(event) => onCustomBudget(customBudgetMin, event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-[#ead8b3] bg-white px-4 text-sm outline-none focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25" placeholder="Ej. 180" /></label></div> : null}</> : null}
        {stepKey === "details" ? <div className="space-y-4"><label htmlFor="guided-age" className="block text-sm font-semibold text-[#2b241f]">{copy.age} <span className="ml-1 rounded-full bg-[#f2ede4] px-2 py-0.5 text-xs font-medium text-[#7c7064]">{copy.optional}</span><input id="guided-age" type="number" min="1" max="120" inputMode="numeric" value={ageInput} onChange={(event) => { const value = event.target.value; setAgeInput(value); const age = Number(value); onAge(value && Number.isInteger(age) && age >= 1 && age <= 120 ? age : undefined); }} placeholder="Ej. 10" className="mt-2 h-12 w-full max-w-xs rounded-2xl border border-[#eadfca] bg-white px-4 text-sm text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25" /></label><label htmlFor="guided-details" className="block text-sm font-semibold text-[#2b241f]">{stepTitle} <span className="ml-1 rounded-full bg-[#f2ede4] px-2 py-0.5 text-xs font-medium text-[#7c7064]">{copy.optional}</span><textarea id="guided-details" value={preferences.additionalDetails ?? ""} onChange={(event) => onDetails(event.target.value)} placeholder={copy.detailsPlaceholder} className="mt-2 min-h-24 w-full resize-y rounded-2xl border border-[#eadfca] bg-white px-4 py-3 text-sm leading-6 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25" /></label></div> : null}
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {safeStep > 0 ? <button type="button" onClick={() => goToStep(safeStep - 1)} className="min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold text-[#5f4a24] outline-none transition hover:bg-[#fff4dd] focus-visible:ring-2 focus-visible:ring-[#b97a05]">← {copy.back}</button> : <span />}
        {safeStep === lastStep ? <button type="submit" disabled={isLoading || isRequestBlocked} className="min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{isLoading ? copy.loadingButton : copy.guidedFind}</button> : safeStep >= 3 || stepKey === "pieceDetails" ? <button type="button" onClick={(event) => { event.preventDefault(); goToStep(safeStep + 1); }} className="min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 sm:w-auto">{copy.continue}</button> : null}
      </div>
    </form>
  );
}

const pieceDetailIdsByType: Record<string, string[]> = {
  anillo: ["fine", "medium_band", "wide", "open", "gemstone", "no_gemstone", "signet", "no_preference"],
  collar: ["short", "medium_length", "long", "v_drop", "fine_chain", "bold_chain", "layers", "no_preference"],
  colgante: ["small", "geometric", "initial", "meaningful_symbol", "gemstone", "medallion", "vertical_drop", "no_preference"],
  pulsera: ["fine_chain", "bold_chain", "bangle", "adjustable", "charms", "gemstone", "minimal", "no_preference"],
  pendientes: ["stud", "small_hoops", "large_hoops", "drop", "climbers", "gemstone", "geometric", "no_preference"],
  gemelos: ["classic", "minimal", "geometric", "original", "formal", "personalizable", "gemstone", "no_preference"],
  reloj: ["case_small", "case_medium", "case_large", "dress", "minimal", "sport", "metal_bracelet", "leather_strap", "no_preference"],
  "charms / abalorios": ["heart_charm", "meaningful_symbol", "initial", "gemstone", "fine_chain", "gold_tone", "silver_tone", "no_preference"],
  conjuntos: ["necklace_earrings", "necklace_bracelet", "three_piece_set", "minimal", "gemstone", "gold_tone", "silver_tone", "no_preference"],
};

const pieceDetailLabels: Record<Locale, Record<string, string>> = {
  es: { fine: "Fino y discreto", medium_band: "Banda media", wide: "Ancho / con presencia", open: "Abierto", gemstone: "Con piedra", no_gemstone: "Sin piedra", signet: "Tipo sello", short: "Corto / cerca del cuello", medium_length: "Longitud media", long: "Largo", v_drop: "Caída en V", fine_chain: "Cadena fina", bold_chain: "Cadena con presencia", layers: "Capas / varias cadenas", small: "Pequeño y discreto", geometric: "Geométrico", initial: "Inicial / letra", meaningful_symbol: "Símbolo con significado", medallion: "Medallón", vertical_drop: "Alargado / caída vertical", bangle: "Rígida / brazalete", adjustable: "Ajustable", charms: "Con charms", heart_charm: "Charm de corazón", gold_tone: "Tono oro", silver_tone: "Tono plata", necklace_earrings: "Collar y pendientes", necklace_bracelet: "Collar y pulsera", three_piece_set: "Collar, pulsera y pendientes", minimal: "Minimalista", stud: "Botón / pequeños", small_hoops: "Aros pequeños", large_hoops: "Aros grandes", drop: "Largos / colgantes", climbers: "Trepadores", classic: "Clásicos", original: "Originales", formal: "Elegantes / formales", personalizable: "Personalizables", case_small: "Caja pequeña", case_medium: "Caja mediana", case_large: "Caja grande", dress: "Clásico / vestir", sport: "Deportivo", metal_bracelet: "Correa metálica", leather_strap: "Correa de piel", no_preference: "No tengo preferencia" },
  en: { fine: "Slim and understated", medium_band: "Medium band", wide: "Wide / statement", open: "Open", gemstone: "With gemstone", no_gemstone: "Without gemstone", signet: "Signet style", short: "Short / close to the neck", medium_length: "Medium length", long: "Long", v_drop: "V drop", fine_chain: "Fine chain", bold_chain: "Statement chain", layers: "Layered chains", small: "Small and understated", geometric: "Geometric", initial: "Initial / letter", meaningful_symbol: "Meaningful symbol", medallion: "Medallion", vertical_drop: "Long / vertical drop", bangle: "Rigid / bangle", adjustable: "Adjustable", charms: "With charms", heart_charm: "Heart charm", gold_tone: "Gold tone", silver_tone: "Silver tone", necklace_earrings: "Necklace and earrings", necklace_bracelet: "Necklace and bracelet", three_piece_set: "Necklace, bracelet and earrings", minimal: "Minimal", stud: "Stud / small", small_hoops: "Small hoops", large_hoops: "Large hoops", drop: "Long / drop", climbers: "Climbers", classic: "Classic", original: "Original", formal: "Elegant / formal", personalizable: "Personalizable", case_small: "Small case", case_medium: "Medium case", case_large: "Large case", dress: "Classic / dress", sport: "Sport", metal_bracelet: "Metal bracelet", leather_strap: "Leather strap", no_preference: "No preference" },
  "pt-BR": { fine: "Fino e discreto", medium_band: "Aro médio", wide: "Largo / marcante", open: "Aberto", gemstone: "Com pedra", no_gemstone: "Sem pedra", signet: "Tipo sinete", short: "Curto / junto ao pescoço", medium_length: "Comprimento médio", long: "Longo", v_drop: "Caída em V", fine_chain: "Corrente fina", bold_chain: "Corrente marcante", layers: "Camadas / várias correntes", small: "Pequeno e discreto", geometric: "Geométrico", initial: "Inicial / letra", meaningful_symbol: "Símbolo com significado", medallion: "Medalhão", vertical_drop: "Alongado / queda vertical", bangle: "Rígida / bracelete", adjustable: "Ajustável", charms: "Com charms", heart_charm: "Charm de coração", gold_tone: "Tom dourado", silver_tone: "Tom prateado", necklace_earrings: "Colar e brincos", necklace_bracelet: "Colar e pulseira", three_piece_set: "Colar, pulseira e brincos", minimal: "Minimalista", stud: "Botão / pequenos", small_hoops: "Argolas pequenas", large_hoops: "Argolas grandes", drop: "Longos / pendentes", climbers: "Trepadores", classic: "Clássicos", original: "Originais", formal: "Elegantes / formais", personalizable: "Personalizáveis", case_small: "Caixa pequena", case_medium: "Caixa média", case_large: "Caixa grande", dress: "Clássico / social", sport: "Esportivo", metal_bracelet: "Pulseira metálica", leather_strap: "Pulseira de couro", no_preference: "Sem preferência" },
};

function getPieceDetails(jewelryType: string | undefined, locale: Locale): PieceDetailOption[] {
  return (jewelryType ? pieceDetailIdsByType[jewelryType] : undefined)?.map((value) => ({
    value,
    label: pieceDetailLabels[locale][value],
    icon: <PieceDetailIcon type={value} />,
  })) ?? [];
}

function getNextPieceDetails(current: string[], value: string, jewelryType?: string) {
  if (value === "no_preference") return ["no_preference"];

  const withoutNoPreference = current.filter((detail) => detail !== "no_preference");
  if (withoutNoPreference.includes(value)) return withoutNoPreference.filter((detail) => detail !== value);

  if (jewelryType === "reloj") {
    if (value.startsWith("case_")) return [...withoutNoPreference.filter((detail) => !detail.startsWith("case_")), value];
    const additionalDetails = withoutNoPreference.filter((detail) => !detail.startsWith("case_"));
    return additionalDetails.length >= 2 ? withoutNoPreference : [...withoutNoPreference, value];
  }

  return withoutNoPreference.length >= 2 ? withoutNoPreference : [...withoutNoPreference, value];
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
  selectedIconClassName,
  selected,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  accentClassName?: string;
  selectedIconClassName?: string;
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
            className={`flex h-6 w-6 shrink-0 items-center justify-center ${selected ? (selectedIconClassName ?? accentClassName ?? "text-[#9a6b08]") : (accentClassName ?? "text-[#9a6b08]")}`}
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

function PieceDetailIcon({ type }: { type: string }) {
  const shared = { viewBox: "0 0 24 24", className: "h-7 w-7", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (type === "fine_chain" || type === "metal_bracelet") return <svg {...shared}><path d="M8.5 8.5l-2 2a3 3 0 0 0 4.2 4.2l2-2M15.5 15.5l2-2a3 3 0 0 0-4.2-4.2l-2 2M9.5 14.5l5-5" /></svg>;
  if (type === "bold_chain") return <svg {...shared}><path d="M7 7l2-2 3 3-2 2zM12 12l2-2 3 3-2 2zM5 12l2-2 3 3-2 2z" /></svg>;
  if (type === "bangle") return <svg {...shared}><circle cx="12" cy="12" r="7.5" /><path d="M8.5 5.4c2.2-1.2 4.8-1.2 7 0" /></svg>;
  if (type === "adjustable") return <svg {...shared}><path d="M5 7h14M5 12h14M5 17h14" /><circle cx="9" cy="7" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="11" cy="17" r="1.5" /></svg>;
  if (type === "charms") return <svg {...shared}><path d="M12 4l1.2 3.3L16.5 8.5l-3.3 1.2L12 13l-1.2-3.3-3.3-1.2 3.3-1.2zM18 14l.7 1.8 1.8.7-1.8.7L18 19l-.7-1.8-1.8-.7 1.8-.7zM6 15l.7 1.8 1.8.7-1.8.7L6 20l-.7-1.8-1.8-.7 1.8-.7z" /></svg>;
  if (type === "gemstone") return <svg {...shared}><path d="M12 4l6 6-6 10-6-10zM6 10h12M9 4l3 6 3-6" /></svg>;
  if (type === "minimal") return <svg {...shared}><path d="M6 12h12" /></svg>;
  if (type === "no_preference") return <svg {...shared}><circle cx="12" cy="12" r="8" /><path d="M9.8 9.5a2.5 2.5 0 1 1 3.8 2.1c-.9.6-1.6 1.1-1.6 2.4M12 17h.01" /></svg>;
  if (type === "fine") return <svg {...shared}><circle cx="12" cy="12" r="5" /></svg>;
  if (type === "medium_band") return <svg {...shared}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="4" /></svg>;
  if (type === "wide") return <svg {...shared}><circle cx="12" cy="12" r="6" strokeWidth="3" /></svg>;
  if (type === "open") return <svg {...shared}><path d="M8 6.5a7 7 0 1 0 8 0M8 6.5h2M14 6.5h2" /></svg>;
  if (type === "no_gemstone") return <svg {...shared}><circle cx="12" cy="12" r="6" /><path d="M7 7l10 10" /></svg>;
  if (type === "signet") return <svg {...shared}><path d="M7 8l5-3 5 3v7l-5 4-5-4zM9.5 10h5v3h-5z" /></svg>;
  if (type === "short") return <svg {...shared}><path d="M5 12h14" /></svg>;
  if (type === "medium_length") return <svg {...shared}><path d="M12 5v14M9 8l3-3 3 3M9 16l3 3 3-3" /></svg>;
  if (type === "long" || type === "vertical_drop" || type === "drop") return <svg {...shared}><path d="M12 4v14M8 14l4 4 4-4M7 20h10" /></svg>;
  if (type === "v_drop") return <svg {...shared}><path d="M5 7l7 9 7-9" /></svg>;
  if (type === "layers") return <svg {...shared}><path d="M6 8h12M8 12h8M10 16h4" /></svg>;
  if (type === "small") return <svg {...shared}><circle cx="12" cy="12" r="2" /></svg>;
  if (type === "geometric") return <svg {...shared}><path d="M8 5h8l4 7-4 7H8l-4-7z" /></svg>;
  if (type === "initial") return <svg {...shared}><path d="M7 18l5-12 5 12M9 14h6" /></svg>;
  if (type === "meaningful_symbol") return <svg {...shared}><path d="M12 19s-7-4.3-7-9.1C5 7.7 6.6 6 8.8 6c1.4 0 2.6.8 3.2 1.9C12.6 6.8 13.8 6 15.2 6 17.4 6 19 7.7 19 9.9 19 14.7 12 19 12 19z" /></svg>;
  if (type === "medallion") return <svg {...shared}><circle cx="12" cy="13" r="6" /><path d="M12 4v3M10 11h4M10 14h4" /></svg>;
  if (type === "stud") return <svg {...shared}><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></svg>;
  if (type === "small_hoops") return <svg {...shared}><circle cx="12" cy="12" r="5" /><path d="M12 7v2" /></svg>;
  if (type === "large_hoops") return <svg {...shared}><circle cx="12" cy="12" r="8" /><path d="M12 4v2" /></svg>;
  if (type === "climbers") return <svg {...shared}><path d="M7 17l3-4 2 2 5-7M15 8h2v2" /></svg>;
  if (type === "classic") return <svg {...shared}><rect x="7" y="7" width="10" height="10" rx="1" /></svg>;
  if (type === "original") return <svg {...shared}><path d="M12 4l1.2 3.8L17 9l-3.8 1.2L12 14l-1.2-3.8L7 9l3.8-1.2zM18 15l.6 1.6 1.6.6-1.6.6L18 19l-.6-1.6-1.6-.6 1.6-.6z" /></svg>;
  if (type === "formal" || type === "dress") return <svg {...shared}><path d="M6 10h12v8H6zM9 10V7h6v3M8 18v2M16 18v2" /></svg>;
  if (type === "personalizable") return <svg {...shared}><path d="M6 18l2.5-.6L18 8l-2-2-9.5 9.4zM14.5 7.5l2 2" /></svg>;
  if (type === "case_small" || type === "case_medium" || type === "case_large") {
    const size = type === "case_small" ? 8 : type === "case_medium" ? 11 : 14;
    const offset = (24 - size) / 2;
    return <svg {...shared}><rect x={offset} y={offset} width={size} height={size} rx="2" /><path d={`M12 ${offset + 2}v${Math.max(2, size / 3)}l${Math.max(1, size / 4)} ${Math.max(1, size / 5)}`} /></svg>;
  }
  if (type === "sport") return <svg {...shared}><path d="M5 14l4-4 3 3 7-8M15 5h4v4" /></svg>;
  if (type === "leather_strap") return <svg {...shared}><path d="M8 4h8l-1 5h-6zM8 20h8l-1-5H9zM9 9h6v6H9z" /></svg>;

  return <svg {...shared}><path d="M6 12h12" /></svg>;
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

type RecipientIconType = "woman" | "man" | "unisex" | "self" | "unspecified";

function RecipientIcon({ type }: { type: RecipientIconType }) {
  const shared = {
    viewBox: "0 0 24 24",
    className: "h-[18px] w-[18px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "woman") {
    return <svg {...shared}><circle cx="12" cy="8" r="4" /><path d="M12 12v8M8.5 16h7" /></svg>;
  }
  if (type === "man") {
    return <svg {...shared}><circle cx="9" cy="15" r="4" /><path d="M12 12l7-7M14 5h5v5" /></svg>;
  }
  if (type === "unisex") {
    return <svg {...shared}><circle cx="9" cy="15" r="4" /><circle cx="15" cy="9" r="4" /><path d="M12 12l7-7M14 5h5v5M9 19v2M6.5 19h5" /></svg>;
  }
  if (type === "self") {
    return <svg {...shared}><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.8-3.2 3.1-5 6.5-5s5.7 1.8 6.5 5" /></svg>;
  }
  return <svg {...shared}><circle cx="12" cy="12" r="8" /><path d="M9.8 9.5a2.4 2.4 0 1 1 3.7 2c-.9.6-1.5 1.1-1.5 2.3M12 16.8h.01" /></svg>;
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
  | "charm"
  | "set"
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
      {type === "charm" ? (
        <>
          <path d="M18 16c2 14 7 23 14 23s12-9 14-23" {...common} />
          <path d="M32 39v5" {...common} />
          <path d="M32 44c-5-6-12-1-8 5l8 8 8-8c4-6-3-11-8-5z" {...common} />
          <circle cx="20" cy="24" r="2" fill="currentColor" opacity="0.25" />
          <circle cx="44" cy="24" r="2" fill="currentColor" opacity="0.25" />
        </>
      ) : null}
      {type === "set" ? (
        <>
          <path d="M13 16c2 13 7 21 14 21s12-8 14-21" {...common} />
          <path d="M27 37v6" {...common} />
          <path d="M27 43l-4 5 4 5 4-5-4-5z" {...common} />
          <path d="M45 20v8M52 20v8" {...common} />
          <circle cx="45" cy="34" r="4" {...common} />
          <circle cx="52" cy="34" r="4" {...common} />
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

function GuidedAdvisorLoading({ copy }: { copy: ChatCopy }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl bg-white px-5 py-10 text-center" role="status">
      <span aria-hidden="true" className="h-8 w-8 animate-spin rounded-full border-2 border-[#ead8b3] border-t-[#b97a05] motion-reduce:animate-none" />
      <p className="mt-4 text-base font-semibold text-[#2b241f]">{copy.statusLoading}</p>
    </div>
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

function CompactPreferencesEditor({
  preferences, selectedBudget, customBudgetMin, customBudgetMax, activeField, isLoading, isRequestBlocked, copy,
  recipients, jewelryTypes, occasions, styles, materials, budgetOptions,
  onActiveFieldChange, onPreferencesChange, onBudgetChange, onCustomBudgetMinChange,
  onCustomBudgetMaxChange, onUpdate, onCancel,
}: {
  preferences: GuidedPreferences;
  selectedBudget: string;
  customBudgetMin: string;
  customBudgetMax: string;
  activeField: string | null;
  isLoading: boolean;
  isRequestBlocked: boolean;
  copy: ChatCopy;
  recipients: Option[];
  jewelryTypes: VisualOption[];
  occasions: Option[];
  styles: Option[];
  materials: Option[];
  budgetOptions: BudgetOption[];
  onActiveFieldChange: (field: string | null) => void;
  onPreferencesChange: (preferences: GuidedPreferences) => void;
  onBudgetChange: (budget: string) => void;
  onCustomBudgetMinChange: (value: string) => void;
  onCustomBudgetMaxChange: (value: string) => void;
  onUpdate: () => void;
  onCancel: () => void;
}) {
  const setSingle = (key: "recipient" | "jewelryType" | "occasion", value: string) => {
    onPreferencesChange({ ...preferences, [key]: preferences[key] === value ? undefined : value, ...(key === "jewelryType" ? { pieceDetails: [] } : {}) });
    onActiveFieldChange(null);
  };
  const toggle = (key: "styles" | "materials", value: string) => {
    const current = preferences[key] ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : key === "materials" && value === copy.noPreference
        ? [copy.noPreference]
        : [...current.filter((item) => item !== copy.noPreference), value];
    onPreferencesChange({ ...preferences, [key]: next });
  };
  const setBudget = (option: BudgetOption) => {
    const next = selectedBudget === option.label ? "" : option.label;
    onBudgetChange(next);
    onPreferencesChange({
      ...preferences,
      budgetMin: next ? (option.custom ? parseNumber(customBudgetMin) : option.min) : undefined,
      budgetMax: next ? (option.custom ? parseNumber(customBudgetMax) : option.max) : undefined,
      budgetLabel: next || undefined,
    });
    if (!option.custom) onActiveFieldChange(null);
  };
  const setCustomBudget = (min: string, max: string) => {
    onCustomBudgetMinChange(min);
    onCustomBudgetMaxChange(max);
    onPreferencesChange({ ...preferences, budgetMin: parseNumber(min), budgetMax: parseNumber(max), budgetLabel: copy.customBudget });
  };
  const display = (value?: string | string[]) => Array.isArray(value) ? value.join(" · ") || copy.notSpecified : value || copy.notSpecified;
  const fields = [
    { key: "jewelryType", label: copy.jewelryType, value: display(preferences.jewelryType) },
    { key: "recipient", label: copy.forWhom, value: display(preferences.recipient) },
    { key: "age", label: copy.age, value: preferences.age?.toString() ?? copy.notSpecified },
    { key: "occasion", label: copy.occasion, value: display(preferences.occasion) },
    { key: "styles", label: copy.style, value: display(preferences.styles) },
    { key: "materials", label: copy.material, value: display(preferences.materials) },
    { key: "budget", label: copy.budget, value: display(preferences.budgetLabel) },
    { key: "details", label: copy.details, value: display(preferences.additionalDetails) },
  ];

  return <section className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-4 sm:p-5" aria-label={copy.preferencesTitle}>
    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#17120b]">{copy.preferencesTitle}</h3>
    <div className="mt-3 divide-y divide-[#eadfca]">
      {fields.map((field) => <div key={field.key} className="py-3 first:pt-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#806632]">{field.label}</p><p className="mt-1 break-words text-sm text-[#3c342d]">{field.value}</p></div>
          <button type="button" onClick={() => onActiveFieldChange(activeField === field.key ? null : field.key)} className="min-h-11 shrink-0 self-start rounded-xl border border-[#c89a43] bg-white px-4 py-2 text-sm font-semibold text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] sm:self-auto">{copy.changePreference}</button>
        </div>
        {activeField === field.key ? <div className="mt-3 rounded-2xl border border-[#ead8b3] bg-white p-3">
          {field.key === "recipient" ? <div className="flex flex-wrap gap-2">{recipients.map((option) => <SelectableOption key={option.label} label={option.label} selected={preferences.recipient === option.label} onClick={() => setSingle("recipient", option.label)} />)}</div> : null}
          {field.key === "jewelryType" ? <div className="flex flex-wrap gap-2">{jewelryTypes.map((option) => <SelectableOption key={option.value} label={option.label} selected={preferences.jewelryType === option.value} onClick={() => setSingle("jewelryType", option.value)} />)}</div> : null}
          {field.key === "occasion" ? <div className="flex flex-wrap gap-2">{occasions.map((option) => <SelectableOption key={option.label} label={option.label} selected={preferences.occasion === option.label} onClick={() => setSingle("occasion", option.label)} />)}</div> : null}
          {field.key === "styles" ? <div className="flex flex-wrap gap-2">{styles.map((option) => <SelectableOption key={option.label} label={option.label} selected={preferences.styles?.includes(option.label) ?? false} onClick={() => toggle("styles", option.label)} />)}</div> : null}
          {field.key === "materials" ? <div className="flex flex-wrap gap-2">{materials.map((option) => <SelectableOption key={option.label} label={option.label} selected={preferences.materials?.includes(option.label) ?? false} onClick={() => toggle("materials", option.label)} />)}</div> : null}
          {field.key === "budget" ? <><div className="flex flex-wrap gap-2">{budgetOptions.map((option) => <SelectableOption key={option.label} label={option.label} selected={selectedBudget === option.label} onClick={() => setBudget(option)} />)}</div>{selectedBudget === copy.customBudget ? <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-[#2b241f]">{copy.min}<input type="number" min="0" inputMode="numeric" value={customBudgetMin} onChange={(event) => setCustomBudget(event.target.value, customBudgetMax)} className="mt-2 h-11 w-full rounded-xl border border-[#ead8b3] px-3 outline-none focus:border-[#b97a05]" /></label><label className="text-sm font-semibold text-[#2b241f]">{copy.max}<input type="number" min="0" inputMode="numeric" value={customBudgetMax} onChange={(event) => setCustomBudget(customBudgetMin, event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ead8b3] px-3 outline-none focus:border-[#b97a05]" /></label></div> : null}</> : null}
          {field.key === "age" ? <input type="number" min="1" max="120" inputMode="numeric" value={preferences.age ?? ""} onChange={(event) => { const age = Number(event.target.value); onPreferencesChange({ ...preferences, age: event.target.value && Number.isInteger(age) && age >= 1 && age <= 120 ? age : undefined }); }} placeholder="Ej. 10" className="h-11 w-full max-w-xs rounded-xl border border-[#ead8b3] px-3 text-sm outline-none focus:border-[#b97a05]" /> : null}
          {field.key === "details" ? <textarea value={preferences.additionalDetails ?? ""} onChange={(event) => onPreferencesChange({ ...preferences, additionalDetails: event.target.value })} placeholder={copy.detailsPlaceholder} className="min-h-24 w-full resize-y rounded-xl border border-[#ead8b3] px-3 py-2 text-sm outline-none focus:border-[#b97a05]" /> : null}
          {field.key === "styles" || field.key === "materials" || field.key === "budget" || field.key === "age" || field.key === "details" ? <button type="button" onClick={() => onActiveFieldChange(null)} className="mt-3 min-h-10 rounded-xl px-3 text-sm font-semibold text-[#7a540f] hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">{copy.done}</button> : null}
        </div> : null}
      </div>)}
    </div>
    <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button type="button" disabled={isLoading} onClick={onCancel} className="min-h-12 rounded-2xl px-5 py-3 text-sm font-semibold text-[#5f4a24] hover:bg-[#fff4dd] disabled:opacity-60">{copy.cancel}</button>
      <button type="button" disabled={isLoading || isRequestBlocked} onClick={onUpdate} className="min-h-12 rounded-2xl bg-[#17120b] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? copy.updatingRecommendations : copy.updateRecommendations}</button>
    </div>
  </section>;
}

function RecommendationResults({
  response,
  status,
  copy,
  locale,
  preferences,
  selectedBudget,
  resultsRef,
  onModifyPreferences,
  onOpenRefinement,
}: {
  response: AdvisorResponse | null;
  status: RequestState;
  copy: ChatCopy;
  locale: Locale;
  preferences?: GuidedPreferences;
  selectedBudget?: string;
  resultsRef: React.RefObject<HTMLElement | null>;
  onModifyPreferences?: () => void;
  onOpenRefinement: () => void;
}) {
  if (status === "empty") {
    return (
      <div className="mt-7 rounded-3xl border border-[#ead8b3] bg-white p-5 text-sm leading-6 text-[#625746]">
        <p>{copy.empty}</p>
        {onModifyPreferences ? <button type="button" onClick={onModifyPreferences} className="mt-4 min-h-11 rounded-xl border border-[#c89a43] bg-white px-4 py-2 font-semibold text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">{copy.modifyPreferences}</button> : null}
      </div>
    );
  }

  if (!response) {
    return null;
  }

  const preferenceChips = buildPreferenceChips(preferences, selectedBudget, locale);

  return (
    <section ref={resultsRef} className="mt-8 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b722b]">
            {copy.resultsEyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#17120b]">
            {copy.resultsTitle}
          </h3>
          {preferenceChips.length ? <div className="mt-3 flex max-w-3xl flex-wrap gap-2">
            {preferenceChips.map((chip) => <span key={chip} className="rounded-full border border-[#ead8b3] bg-[#fff9ed] px-3 py-1.5 text-xs font-semibold leading-4 text-[#68420c]">
              {chip}
            </span>)}
          </div> : null}
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">
            <button type="button" onClick={onOpenRefinement} className="min-h-11 w-full rounded-xl bg-[#17120b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 sm:w-auto">{copy.refineButton}</button>
            {onModifyPreferences ? <button type="button" onClick={onModifyPreferences} className="min-h-11 w-full rounded-xl border border-[#c89a43] bg-white px-4 py-2 text-sm font-semibold text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] sm:w-auto">{copy.modifyPreferences}</button> : null}
          </div>
        </div>
        <p className="max-w-xl rounded-2xl border border-[#ead8b3] bg-[#fff9ed] px-4 py-3 text-xs leading-5 text-[#6d6256]">
          {copy.resultsDisclaimer}
        </p>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#75695d]">{response.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {response.recommendations.slice(0, ADVISOR_RECOMMENDATION_COUNT).map((recommendation, index) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            index={index}
            copy={copy}
            locale={locale}
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
  locale,
}: {
  recommendation: AdvisorRecommendation;
  index: number;
  copy: ChatCopy;
  locale: Locale;
}) {
  const tags = [
    ...recommendation.styles,
    ...recommendation.recommendedMaterials.slice(0, 1),
    ...recommendation.suitableOccasions.slice(0, 1),
  ].slice(0, 4);
  // Gemini supplies a validated, text-only search query. Never substitute a
  // product name here: the affiliate URL must be built only from searchQuery.
  const searchQuery = recommendation.searchQuery?.trim() || "";
  const amazonUrl = amazonProvider.buildSearchUrl?.(searchQuery, locale);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b722b]">
        {copy.recommendation} {index + 1}
      </p>
      <h4 className="mt-3 line-clamp-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-[#17120b]">
        {recommendation.genericName}
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#fff1d2] px-3 py-1 text-xs font-semibold leading-4 text-[#68420c]">
            {tag}
          </span>
        ))}
      </div>
      <InfoBlock title={copy.whyFits} text={recommendation.reason} />
      <div className="mt-5 rounded-2xl border border-[#eadfca] bg-[#fff9ed] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#806632]">
          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full border border-[#e8cc91] bg-white text-[#8f610d]"><JewelerTipIcon /></span>
          {copy.jewelerTip}
        </div>
        <p className="mt-2 text-sm leading-6 text-[#5d5148]">{recommendation.jewelerTip}</p>
      </div>
      {amazonUrl ? <div className="mt-auto pt-5">
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => {
            try {
              trackGAEvent("affiliate_click", { provider: amazonProvider.id, searchQuery, recommendationTitle: recommendation.genericName, locale });
            } catch {
              // Analytics must not interfere with the affiliate link.
            }
          }}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#e68a00] bg-[#FF9900] px-4 py-3 text-sm font-semibold text-[#17120b] transition-colors duration-200 hover:bg-[#e68a00] active:bg-[#cc7a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 sm:w-auto"
        >
          {copy.viewOnAmazon}
        </a>
      </div> : null}
    </article>
  );
}

function buildPreferenceChips(
  preferences: GuidedPreferences | undefined,
  selectedBudget: string | undefined,
  locale: Locale,
) {
  if (!preferences) return [];

  const jewelryType = preferences.jewelryType
    ? getJewelryTypes(locale).find((option) => option.value === preferences.jewelryType)?.label
    : undefined;

  return [
    preferences.occasion,
    preferences.recipient,
    jewelryType,
    preferences.styles?.filter((style) => style !== chatCopy[locale].noPreference).slice(0, 2).join(" + "),
    preferences.materials?.filter((material) => material !== chatCopy[locale].noPreference).slice(0, 1).join(" + "),
    selectedBudget,
  ].filter((value): value is string => Boolean(value));
}

function JewelerTipIcon() {
  return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M8.3 14.5A6.5 6.5 0 1 1 15.7 14.5c-1 .8-1.7 1.7-1.7 2.5h-4c0-.8-.7-1.7-1.7-2.5z" /></svg>;
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

function RefinementPanel({
  panelRef,
  isOpen,
  currentStep,
  preferences,
  isLoading,
  isRequestBlocked,
  copy,
  error,
  onChange,
  onStepChange,
  onSubmit,
}: {
  panelRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  currentStep: number;
  preferences: RefinementPreferences;
  isLoading: boolean;
  isRequestBlocked: boolean;
  copy: ChatCopy;
  error: string;
  onChange: (value: RefinementPreferences) => void;
  onStepChange: (step: number) => void;
  onSubmit: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  const choices = [
    { key: "improvementGoal" as const, label: copy.improvementGoal, options: [["original", copy.moreOriginal], ["discreet", copy.moreDiscreet], ["elegant", copy.moreElegant], ["special", copy.moreSpecial], ["cheaper", copy.moreAffordable]] },
    { key: "prominence" as const, label: copy.prominence, options: [["discreet", copy.discreet], ["balanced", copy.balanced], ["statement", copy.statement]] },
    { key: "usage" as const, label: copy.usage, options: [["daily", copy.daily], ["occasions", copy.occasionsUse], ["both", copy.both]] },
    { key: "meaningful" as const, label: copy.meaningful, options: [["yes", copy.yes], ["no", copy.no], ["neutral", copy.neutral]] },
    { key: "personalizable" as const, label: copy.personalizable, options: [["yes", copy.yes], ["no", copy.no], ["neutral", copy.neutral]] },
  ];
  const lastStep = choices.length;
  const safeStep = Math.min(Math.max(currentStep, 0), lastStep);
  const currentChoice = choices[safeStep];

  return (
    <section ref={panelRef} className="mt-8 scroll-mt-24 rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-4 sm:p-5">
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#17120b]">
        {copy.refinementTitle}
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#625746]">
        {copy.refinementHelp}
      </p>
      <p className="mt-5 text-sm font-semibold text-[#806632]" aria-live="polite">{copy.step} {safeStep + 1} {copy.of} {lastStep + 1}</p>
      <div className="mt-3">
        {currentChoice ? <fieldset>
          <legend className="text-base font-semibold text-[#2b241f]">{currentChoice.label} <span className="font-normal text-[#75695d]">{copy.optionalRefinement}</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentChoice.options.map(([value, optionLabel]) => {
              const selected = preferences[currentChoice.key] === value;
              return <button key={value} type="button" aria-pressed={selected} onClick={() => { onChange({ ...preferences, [currentChoice.key]: value }); onStepChange(safeStep + 1); }} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] ${selected ? "border-[#b97a05] bg-[#fff1d2] text-[#68420c]" : "border-[#ead8b3] bg-white text-[#5f4a24] hover:bg-[#fff9ed]"}`}>{optionLabel}</button>;
            })}
          </div>
        </fieldset> : <label htmlFor="refinement-avoid" className="block text-base font-semibold text-[#2b241f]">
          {copy.additionalAvoid} <span className="font-normal text-[#75695d]">{copy.optionalRefinement}</span>
          <textarea
            id="refinement-avoid"
            value={preferences.additionalAvoid ?? ""}
            maxLength={maxRefinementAvoidLength}
            onChange={(event) => onChange({ ...preferences, additionalAvoid: event.target.value })}
            placeholder={copy.additionalAvoidPlaceholder}
            className="mt-2 min-h-[4.75rem] w-full resize-y rounded-2xl border border-[#ead8b3] bg-white px-4 py-3 text-sm leading-6 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
          />
        </label>}
      </div>
      {error ? <p className="mt-4 text-sm text-[#9a3f2a]" role="alert">{error}</p> : null}
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {safeStep > 0 ? <button type="button" onClick={() => onStepChange(safeStep - 1)} className="min-h-11 rounded-xl px-4 py-2 text-sm font-semibold text-[#5f4a24] transition hover:bg-[#fff4dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">← {copy.back}</button> : null}
          {currentChoice ? <button type="button" onClick={() => onStepChange(safeStep + 1)} className="min-h-11 rounded-xl px-4 py-2 text-sm font-semibold text-[#7a540f] transition hover:bg-[#fff4dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05]">{copy.skip}</button> : null}
        </div>
        {safeStep === lastStep ? <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || isRequestBlocked}
          className="min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isLoading ? copy.refining : copy.updateRecommendations}
        </button>
        : null}
      </div>
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

  const selectedPieceDetails = (preferences.pieceDetails ?? [])
    .filter((detail) => detail !== "no_preference")
    .map((detail) => pieceDetailLabels[locale][detail])
    .filter(Boolean);

  const parts = [
    preferences.jewelryType
      ? `${copy.summarySearchPrefix} ${withArticle(preferences.jewelryType, locale)}`
      : copy.summarySearch,
    selectedPieceDetails.length ? joinList(selectedPieceDetails, copy.listAnd) : "",
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

  if (status === 429) {
    return data.error === "TEMPORARILY_UNAVAILABLE"
      ? copy.serviceBusyError
      : copy.rateLimitedError;
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
