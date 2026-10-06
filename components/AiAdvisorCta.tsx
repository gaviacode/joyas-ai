import Link from "next/link";
import type { AdvisorContext } from "@/lib/advisor";
import { localizeText, type Locale } from "@/lib/i18n";

type AiAdvisorCtaProps = {
  title?: string;
  description?: string;
  locale?: Locale;
  context?: AdvisorContext;
  variant?: "default" | "compact";
};

export default function AiAdvisorCta({
  title = "¿No sabes qué joya elegir?",
  description = "Cuéntale a nuestro joyero IA para quién es la joya, la ocasión y tu presupuesto, y te ayudará a encontrar una opción adecuada.",
  locale = "es",
  context,
  variant = "default",
}: AiAdvisorCtaProps) {
  const homeHref = locale === "es" ? "/es" : locale === "pt-BR" ? "/pt-br" : "/en";
  const query = new URLSearchParams();
  if (context?.jewelryType) query.set("advisorType", context.jewelryType);
  if (context?.occasion) query.set("advisorOccasion", context.occasion);
  if (context?.topic) query.set("advisorTopic", context.topic);
  const advisorHref = `${homeHref}${query.size ? `?${query.toString()}` : ""}#joyero-ia`;

  if (variant === "compact") {
    return (
      <section className="rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            {localizeText("Joyero IA", locale)}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#17120b] sm:text-2xl">
            {localizeText("¿Quieres que te ayudemos a elegir una joya?", locale)}
          </h2>
          <p className="mt-2 leading-7 text-[#625746]">
            {localizeText("Cuéntanos para quién es, la ocasión y tu presupuesto, y el joyero IA te propondrá opciones.", locale)}
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:min-w-[13rem]">
          <Link href={`${homeHref}#joyero-ia`} className="inline-flex justify-center rounded-xl bg-[#17120b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2">
            {localizeText("Describir lo que busco", locale)}
          </Link>
          <Link href={advisorHref} className="inline-flex justify-center rounded-xl border border-[#d7a63c] bg-white px-5 py-3 text-sm font-semibold text-[#8a5d07] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2">
            {localizeText("Guiarme paso a paso", locale)}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#ead8b3] bg-[#17120b] p-6 text-white shadow-xl shadow-[#805400]/10 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f0c971]">
        {localizeText("Joyero IA", locale)}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        {localizeText(title, locale)}
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#f4e8d2]">
        {localizeText(description, locale)}
      </p>
      <Link
        href={advisorHref}
        className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#b97a05] to-[#d7a63c] px-6 py-3 font-semibold text-white transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c971]"
      >
        {localizeText("Preguntar al joyero IA", locale)}
      </Link>
    </section>
  );
}
