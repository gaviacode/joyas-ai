import Link from "next/link";

type InfoSection = {
  title: string;
  paragraphs: string[];
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
};

export default function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: InfoPageProps) {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#17120b]">
      <header className="border-b border-[#eadfca] bg-[#fbf7ef]/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            joyas<span className="text-[#b8872f]">.ai</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#d9c59a] bg-white px-4 py-2 text-sm font-semibold text-[#17120b] transition hover:border-[#b8872f]"
          >
            Volver
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-[#625746] md:text-lg">
            {intro}
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-[#eadfca] bg-white/80 p-6 shadow-sm md:p-8"
            >
              <h2 className="text-xl font-semibold text-[#17120b]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#625746] md:text-base md:leading-8">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
