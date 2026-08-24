"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
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
  min?: number;
  max?: number;
};

type RequestState = "idle" | "loading" | "error" | "results" | "empty" | "refining";

type AdvisorErrorResponse = {
  error?: string;
  message?: string;
  retryable?: boolean;
};

const maxDescriptionLength = 900;
const maxTraits = 4;

const recipients = [
  "Pareja",
  "Madre",
  "Padre",
  "Hermano/a",
  "Hijo/a",
  "Amigo/a",
  "Compañero/a",
  "Otra persona",
];

const occasions = [
  "Cumpleaños",
  "Aniversario",
  "Navidad",
  "San Valentín",
  "Boda",
  "Agradecimiento",
  "Sin ocasión especial",
  "Otra",
];

const traits = [
  "Romántica",
  "Elegante",
  "Divertida",
  "Aventurera",
  "Creativa",
  "Curiosa",
  "Intelectual",
  "Práctica",
  "Tecnológica",
  "Deportista",
  "Sociable",
  "Tranquila",
  "Minimalista",
  "Clásica",
  "Original",
  "Sentimental",
];

const interests = [
  "Leer",
  "Viajar",
  "Moda",
  "Tecnología",
  "Música",
  "Cine y series",
  "Gastronomía",
  "Deporte",
  "Videojuegos",
  "Arte",
  "Naturaleza",
  "Belleza y cuidado personal",
  "Juegos de mesa",
  "Joyas y accesorios",
];

const budgets: Option[] = [
  { label: "Menos de 25 €", min: 0, max: 25 },
  { label: "25-50 €", min: 25, max: 50 },
  { label: "50-100 €", min: 50, max: 100 },
  { label: "100-200 €", min: 100, max: 200 },
  { label: "Más de 200 €", min: 200 },
];

const giftCategories = [
  { title: "Perfumes", text: "Aromas elegidos por estilo y ocasión." },
  { title: "Libros", text: "Lecturas que conectan con intereses reales." },
  { title: "Joyas", text: "También relojes. Preparado para joyas.ai." },
  { title: "Experiencias", text: "Planes memorables, no solo objetos." },
  { title: "Ropa", text: "Prendas y accesorios con criterio personal." },
  { title: "Tecnología", text: "Gadgets útiles si encajan con su perfil." },
  { title: "Juegos de mesa", text: "Ideas para compartir y sorprender." },
  { title: "Suscripciones", text: "Regalos que continúan después del día." },
];

const refinementPrompts = [
  "Más económico",
  "Más original",
  "Menos tecnológico",
  "Más sentimental",
  "Evitar joyas",
  "Ver otras ideas",
];

const initialPreferences: GuidedPreferences = {
  styles: [],
  materials: [],
};

const copy = {
  heroEyebrow: "Recomendador de regalos con IA",
  heroTitle: "Encuentra un regalo según cómo es esa persona",
  heroDescription:
    "Elige unas pocas pistas o descríbela con tus palabras. La IA prioriza entender su personalidad antes de proponer una idea.",
  modeTitle: "¿Cómo quieres buscar el regalo?",
  guidedTab: "✨ Guíame paso a paso",
  directTab: "💬 Prefiero describir a la persona",
  directTitle: "Cuéntanos cómo es esa persona",
  directHelp:
    "Puedes hablarnos de su personalidad, gustos, vuestra relación, la ocasión, presupuesto o cualquier detalle que consideres importante.",
  directPlaceholder:
    "Ej.: Busco un regalo para mi hermana. Es muy creativa, le encanta leer, viajar y la fotografía. No es muy tecnológica y quiero gastar unos 60 €.",
  submit: "✨ Encontrar su regalo ideal",
  loadingButton: "Analizando...",
  directValidation: "Cuéntanos algún detalle sobre la persona para poder recomendar un regalo.",
  guidedValidation: "Completa al menos una pista del formulario antes de buscar recomendaciones.",
  invalidResponse: "La respuesta de la IA no tiene el formato esperado.",
  connectionError: "No he podido conectar con la IA. Inténtalo de nuevo.",
  retryableError: "La IA está recibiendo muchas consultas. Espera unos segundos y vuelve a intentarlo.",
  rateLimitedError: "Has realizado demasiadas consultas. Inténtalo de nuevo en unos minutos.",
  genericRequestError: "No he podido generar recomendaciones.",
  step: "Paso",
  stepOf: "de 4",
  prev: "Anterior",
  next: "Siguiente",
  recipientTitle: "¿Para quién es?",
  occasionTitle: "¿Cuál es la ocasión?",
  personalityTitle: "¿Cómo es esa persona?",
  personalityHint: "Elige hasta 4 rasgos. Este es el corazón de la recomendación.",
  interestsTitle: "¿Qué le gusta?",
  interestsHint: "Selecciona solo lo que ayude. No hace falta marcar muchas opciones.",
  budgetTitle: "¿Cuánto quieres gastar?",
  detailsTitle: "¿Quieres contarnos algo más?",
  detailsPlaceholder:
    "Ej.: ya tiene muchos perfumes, no usa joyas o le encantan los regalos originales.",
  categoriesTitle: "Categorías principales",
  summaryTitle: "Resumen rápido",
  summaryFallback: "La IA usará las pistas seleccionadas para buscar un regalo con sentido.",
  trustTitle: "Cómo recomienda la IA",
  trustFirst:
    "Primero interpreta la personalidad, gustos, relación, ocasión y presupuesto. Después propone regalos y explica por qué encajan.",
  trustSecond:
    "Las recomendaciones son orientativas. No inventan stock, tiendas, reseñas ni precios exactos.",
  statusLoading: "La IA está pensando en la persona y cruzando pistas...",
  retry: "Reintentar",
  empty: "No se han encontrado recomendaciones claras. Añade algún detalle y vuelve a intentarlo.",
  resultsEyebrow: "Recomendaciones de regalos",
  resultsTitle: "Ideas personalizadas",
  resultsDisclaimer:
    "Recomendación orientativa: valida detalles, disponibilidad y precio antes de comprar.",
  recommendation: "Idea",
  whyFits: "Por qué encaja",
  recommendedMaterial: "Categoría sugerida",
  indicativePrice: "Presupuesto orientativo",
  jewelerTip: "Consejo para acertar",
  refinementTitle: "¿Quieres ajustar la recomendación?",
  refinementHelp:
    "Puedes pedir ideas más originales, descartar una categoría o añadir algo que la persona odia o ya tiene.",
  message: "Mensaje",
  refinementPlaceholder: "Ej.: No usa perfumes y prefiero algo que pueda disfrutar con amigos.",
  refining: "Refinando...",
  sendRefinement: "Enviar aclaración",
};

export default function JewelryChat({ locale = "es" }: { locale?: Locale }) {
  const [mode, setMode] = useState<AdvisorMode>("guided");
  const [step, setStep] = useState(1);
  const [directDescription, setDirectDescription] = useState("");
  const [preferences, setPreferences] = useState<GuidedPreferences>(initialPreferences);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [advisorResponse, setAdvisorResponse] = useState<AdvisorResponse | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [refinementInput, setRefinementInput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<RequestState>("idle");
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const isLoading = status === "loading" || status === "refining";

  const guidedSummary = useMemo(
    () => buildGuidedSummary(preferences, selectedBudget),
    [preferences, selectedBudget]
  );

  function switchMode(nextMode: AdvisorMode) {
    setMode(nextMode);
    setError("");
    setStatus((current) => (current === "error" ? "idle" : current));
  }

  function updateSinglePreference(key: keyof GuidedPreferences, value: string) {
    setPreferences((current) => ({
      ...current,
      [key]: current[key] === value ? undefined : value,
    }));
  }

  function toggleListPreference(key: "styles" | "materials", value: string, limit?: number) {
    setPreferences((current) => {
      const selected = current[key] ?? [];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : limit && selected.length >= limit
          ? selected
          : [...selected, value];

      return { ...current, [key]: next };
    });
  }

  function updateBudget(option: Option) {
    const nextBudget = selectedBudget === option.label ? "" : option.label;

    setSelectedBudget(nextBudget);
    setPreferences((current) => ({
      ...current,
      budgetMin: nextBudget ? option.min : undefined,
      budgetMax: nextBudget ? option.max : undefined,
      budgetLabel: nextBudget || undefined,
    }));
  }

  async function submitAdvisor(refinement?: string) {
    if (isLoading) {
      return;
    }

    const request = buildRequest(refinement);

    if (!request) {
      setError(mode === "direct" ? copy.directValidation : copy.guidedValidation);
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
      const data = (await response.json()) as Partial<AdvisorResponse> & AdvisorErrorResponse;

      if (!response.ok) {
        throw new Error(getAdvisorRequestErrorMessage(response.status, data));
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
                buildGuidedSummary(request.guidedPreferences, request.guidedPreferences?.budgetLabel),
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
      setError(requestError instanceof Error ? requestError.message : copy.connectionError);
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

      <AdvisorModeTabs mode={mode} onChange={switchMode} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.36fr)] lg:items-start">
        <div className="min-w-0 rounded-3xl border border-[#eadfca] bg-[#fffdf8] p-4 sm:p-5 lg:p-6">
          {mode === "direct" ? (
            <DirectAdvisorForm
              value={directDescription}
              isLoading={isLoading}
              onChange={setDirectDescription}
              onSubmit={(event) => {
                event.preventDefault();
                void submitAdvisor();
              }}
            />
          ) : (
            <GuidedAdvisorForm
              step={step}
              preferences={preferences}
              selectedBudget={selectedBudget}
              isLoading={isLoading}
              summary={guidedSummary}
              onStep={setStep}
              onSingleSelect={updateSinglePreference}
              onMultiSelect={toggleListPreference}
              onBudget={updateBudget}
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

        <TrustPanel />
      </div>

      <StatusPanel status={status} error={error} onRetry={() => void submitAdvisor()} />

      <div ref={resultsRef} className="scroll-mt-28">
        <RecommendationResults response={advisorResponse} status={status} />
      </div>

      {advisorResponse ? (
        <RefinementChat
          conversation={conversation}
          value={refinementInput}
          isLoading={isLoading}
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
  onChange,
}: {
  mode: AdvisorMode;
  onChange: (mode: AdvisorMode) => void;
}) {
  const tabs: { mode: AdvisorMode; label: string }[] = [
    { mode: "guided", label: copy.guidedTab },
    { mode: "direct", label: copy.directTab },
  ];

  return (
    <div className="mx-auto mt-7 max-w-2xl">
      <p className="mb-3 text-center text-sm font-semibold text-[#2b241f]">{copy.modeTitle}</p>
      <div
        role="tablist"
        aria-label={copy.modeTitle}
        className="grid gap-2 rounded-2xl border border-[#ead8b3] bg-[#fff9ed] p-2 sm:grid-cols-2"
      >
        {tabs.map((tab) => {
          const active = mode === tab.mode;

          return (
            <button
              key={tab.mode}
              type="button"
              role="tab"
              aria-selected={active}
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
    </div>
  );
}

function DirectAdvisorForm({
  value,
  isLoading,
  onChange,
  onSubmit,
}: {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#17120b]">
        {copy.directTitle}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#6f6255]">{copy.directHelp}</p>
      <textarea
        value={value}
        maxLength={maxDescriptionLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={copy.directPlaceholder}
        className="mt-5 min-h-56 w-full resize-y rounded-2xl border border-[#ead8b3] bg-white px-4 py-4 text-base leading-7 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
      />
      <div className="mt-2 text-right text-xs text-[#7c7064]" aria-live="polite">
        {value.length}/{maxDescriptionLength}
      </div>
      <SubmitButton isLoading={isLoading} disabled={!value.trim()} />
    </form>
  );
}

function GuidedAdvisorForm({
  step,
  preferences,
  selectedBudget,
  isLoading,
  summary,
  onStep,
  onSingleSelect,
  onMultiSelect,
  onBudget,
  onDetails,
  onSubmit,
}: {
  step: number;
  preferences: GuidedPreferences;
  selectedBudget: string;
  isLoading: boolean;
  summary: string;
  onStep: (step: number) => void;
  onSingleSelect: (key: keyof GuidedPreferences, value: string) => void;
  onMultiSelect: (key: "styles" | "materials", value: string, limit?: number) => void;
  onBudget: (option: Option) => void;
  onDetails: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b722b]">
          {copy.step} {step} {copy.stepOf}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f2e5ce]">
          <div
            className="h-full rounded-full bg-[#17120b] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[430px]">
        {step === 1 ? (
          <div className="space-y-6">
            <OptionGroup title={copy.recipientTitle}>
              {recipients.map((option) => (
                <SelectableChip
                  key={option}
                  label={option}
                  selected={preferences.recipient === option}
                  onClick={() => onSingleSelect("recipient", option)}
                />
              ))}
            </OptionGroup>
            <OptionGroup title={copy.occasionTitle}>
              {occasions.map((option) => (
                <SelectableChip
                  key={option}
                  label={option}
                  selected={preferences.occasion === option}
                  onClick={() => onSingleSelect("occasion", option)}
                />
              ))}
            </OptionGroup>
          </div>
        ) : null}

        {step === 2 ? (
          <OptionGroup title={copy.personalityTitle} hint={copy.personalityHint} featured>
            {traits.map((option) => (
              <SelectableChip
                key={option}
                label={option}
                selected={preferences.styles?.includes(option) ?? false}
                disabled={
                  !preferences.styles?.includes(option) &&
                  (preferences.styles?.length ?? 0) >= maxTraits
                }
                onClick={() => onMultiSelect("styles", option, maxTraits)}
              />
            ))}
          </OptionGroup>
        ) : null}

        {step === 3 ? (
          <OptionGroup title={copy.interestsTitle} hint={copy.interestsHint}>
            {interests.map((option) => (
              <SelectableChip
                key={option}
                label={option}
                selected={preferences.materials?.includes(option) ?? false}
                onClick={() => onMultiSelect("materials", option)}
              />
            ))}
          </OptionGroup>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <OptionGroup title={copy.budgetTitle}>
              {budgets.map((option) => (
                <SelectableChip
                  key={option.label}
                  label={option.label}
                  selected={selectedBudget === option.label}
                  onClick={() => onBudget(option)}
                />
              ))}
            </OptionGroup>
            <label htmlFor="guided-details" className="block text-sm font-semibold text-[#2b241f]">
              {copy.detailsTitle}
              <textarea
                id="guided-details"
                value={preferences.additionalDetails ?? ""}
                onChange={(event) => onDetails(event.target.value)}
                placeholder={copy.detailsPlaceholder}
                className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-[#ead8b3] bg-white px-4 py-3 text-sm leading-6 text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#b97a05] focus:ring-2 focus:ring-[#d7a63c]/25"
              />
            </label>
            <PreferenceSummary summary={summary} />
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => onStep(Math.max(1, step - 1))}
          disabled={step === 1 || isLoading}
          className="min-h-12 rounded-2xl border border-[#ead8b3] bg-white px-5 py-3 text-sm font-semibold text-[#5f4a24] transition hover:border-[#c89a43] hover:bg-[#fff9ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copy.prev}
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={() => onStep(Math.min(4, step + 1))}
            disabled={isLoading}
            className="min-h-12 rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copy.next}
          </button>
        ) : (
          <SubmitButton isLoading={isLoading} />
        )}
      </div>
    </form>
  );
}

function OptionGroup({
  title,
  hint,
  featured = false,
  children,
}: {
  title: string;
  hint?: string;
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      className={
        featured
          ? "rounded-3xl border border-[#ead8b3] bg-white p-4 shadow-sm sm:p-5"
          : undefined
      }
    >
      <legend className="text-xl font-semibold tracking-[-0.03em] text-[#17120b]">
        {title}
      </legend>
      {hint ? <p className="mt-2 text-sm leading-6 text-[#7c7064]">{hint}</p> : null}
      <div className="mt-4 flex min-w-0 flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function SelectableChip({
  label,
  selected,
  disabled = false,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`relative min-h-12 max-w-full rounded-2xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 ${
        selected
          ? "border-[#b97a05] bg-[#fff1d2] text-[#3a2a0d] shadow-sm"
          : "border-[#ead8b3] bg-white text-[#5f4a24] hover:border-[#c89a43] hover:bg-[#fff9ed]"
      }`}
    >
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className="min-w-0 break-words text-left leading-tight">{label}</span>
        {selected ? <CheckIcon /> : null}
      </span>
    </button>
  );
}

function SubmitButton({ isLoading, disabled = false }: { isLoading: boolean; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="min-h-12 w-full rounded-2xl bg-[#17120b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#805400]/10 transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {isLoading ? copy.loadingButton : copy.submit}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 text-[#8a610f]"
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

function PreferenceSummary({ summary }: { summary: string }) {
  return (
    <div className="rounded-2xl border border-[#ead8b3] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b722b]">
        {copy.summaryTitle}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#554a40]">{summary}</p>
    </div>
  );
}

function TrustPanel() {
  return (
    <aside className="min-w-0 rounded-3xl border border-[#eadfca] bg-[#fbf7ef] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b722b]">
        {copy.trustTitle}
      </p>
      <div className="mt-4 space-y-4 text-sm leading-6 text-[#625746]">
        <p>{copy.trustFirst}</p>
        <p>{copy.trustSecond}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b722b]">
          {copy.categoriesTitle}
        </p>
        <div className="mt-3 grid gap-2">
          {giftCategories.map((category, index) => (
            <div
              key={category.title}
              className="rounded-2xl border border-[#ead8b3] bg-white px-3 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#17120b] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-[#2b241f]">{category.title}</p>
              </div>
              <p className="mt-1 text-xs leading-5 text-[#7c7064]">{category.text}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function StatusPanel({
  status,
  error,
  onRetry,
}: {
  status: RequestState;
  error: string;
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
}: {
  response: AdvisorResponse | null;
  status: RequestState;
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
          />
        ))}
      </div>
    </section>
  );
}

function RecommendationCard({
  recommendation,
  index,
}: {
  recommendation: AdvisorRecommendation;
  index: number;
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
  onChange,
  onSubmit,
  onQuickPrompt,
}: {
  conversation: ConversationMessage[];
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onQuickPrompt: (value: string) => void;
}) {
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
        {refinementPrompts.map((prompt) => (
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

function buildGuidedSummary(preferences?: GuidedPreferences, selectedBudget?: string) {
  if (!preferences) {
    return copy.summaryFallback;
  }

  const parts = [
    preferences.recipient ? `Para: ${preferences.recipient}` : "",
    preferences.occasion ? `Ocasión: ${preferences.occasion}` : "",
    preferences.styles?.length ? `Personalidad: ${joinList(preferences.styles)}` : "",
    preferences.materials?.length ? `Gustos: ${joinList(preferences.materials)}` : "",
    selectedBudget ? `Presupuesto: ${selectedBudget}` : "",
  ].filter(Boolean);

  const details = preferences.additionalDetails?.trim();
  return `${parts.length ? parts.join(" · ") : copy.summaryFallback}${details ? ` · ${details}` : ""}`;
}

function joinList(values: string[]) {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  return `${values.slice(0, -1).join(", ")} y ${values[values.length - 1]}`;
}

function getAdvisorRequestErrorMessage(status: number, data: AdvisorErrorResponse) {
  if (status === 503 && data.retryable) {
    return copy.retryableError;
  }

  if (status === 429) {
    return copy.rateLimitedError;
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
