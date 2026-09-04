type ExternalGiftIdeasCtaProps = {
  title: string;
  description: string;
  ctaLabel: string;
};

export default function ExternalGiftIdeasCta({
  title,
  description,
  ctaLabel,
}: ExternalGiftIdeasCtaProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-8 lg:px-10">
      <div className="max-w-3xl rounded-3xl border border-[#ead8b3] bg-white/75 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b722b]">
          regalos.ai
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#17120b] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#63584c] sm:text-base">
          {description}
        </p>
        <a
          href="https://regalos.ai/"
          className="mt-5 inline-flex min-h-11 items-center rounded-xl border border-[#d7a63c] bg-white px-4 py-2 text-sm font-semibold text-[#7a540f] transition hover:bg-[#fff5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-2"
        >
          {ctaLabel} <span aria-hidden="true" className="ml-1">→</span>
        </a>
      </div>
    </section>
  );
}
