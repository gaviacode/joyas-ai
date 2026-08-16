import Link from "next/link";
import { localizeText, type Locale } from "@/lib/i18n";

type AiAdvisorCtaProps = {
  title?: string;
  description?: string;
  locale?: Locale;
};

export default function AiAdvisorCta({
  title = "¿No sabes qué joya elegir?",
  description = "Cuéntale a nuestro joyero IA para quién es la joya, la ocasión y tu presupuesto, y te ayudará a encontrar una opción adecuada.",
  locale = "es",
}: AiAdvisorCtaProps) {
  const homeHref = locale === "es" ? "/" : locale === "pt-BR" ? "/pt-br" : "/en";

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
        href={`${homeHref}#joyero-ia`}
        className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#b97a05] to-[#d7a63c] px-6 py-3 font-semibold text-white transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c971]"
      >
        {localizeText("Preguntar al joyero IA", locale)}
      </Link>
    </section>
  );
}
