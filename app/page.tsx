const categories = [
  "Anillos de compromiso",
  "Regalos de aniversario",
  "Joyas para boda",
  "Collares elegantes",
  "Pulseras",
  "Pendientes",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f1] text-[#17120b]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 md:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">
            joyas<span className="text-[#b8872f]">.ai</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#5f5547] md:flex">
            <a href="#recomendador" className="hover:text-[#17120b]">
              Recomendador
            </a>
            <a href="#categorias" className="hover:text-[#17120b]">
              Categorías
            </a>
            <a href="#como-funciona" className="hover:text-[#17120b]">
              Cómo funciona
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#d9c59a] bg-white/70 px-4 py-2 text-sm text-[#7a5a1d] shadow-sm">
              Recomendador de joyas con inteligencia artificial
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#17120b] md:text-6xl lg:text-7xl">
              Encuentra la joya perfecta para cada persona y ocasión.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5547]">
              joyas.ai te ayudará a elegir anillos, collares, pulseras y regalos
              especiales con la guía de una IA pensada como un joyero experto.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#recomendador"
                className="rounded-full bg-[#17120b] px-7 py-4 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-[#2a2116]"
              >
                Probar recomendador
              </a>

              <a
                href="#categorias"
                className="rounded-full border border-[#d9c59a] bg-white px-7 py-4 text-center text-sm font-semibold text-[#17120b] transition hover:border-[#b8872f]"
              >
                Ver ideas de joyas
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#eadfca] bg-white p-5 shadow-2xl shadow-[#b8872f]/10">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-[#fff8ea] via-white to-[#f0dfbd] p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-[#7a5a1d]">
                  Asistente joyero
                </span>
                <span className="rounded-full bg-[#17120b] px-3 py-1 text-xs text-white">
                  IA
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-[#5f5547] shadow-sm">
                  ¿Para quién es la joya?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl bg-[#17120b] p-4 text-sm leading-6 text-white shadow-sm">
                  Para mi pareja. Quiero algo elegante para nuestro aniversario.
                </div>
                <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-[#5f5547] shadow-sm">
                  Te recomendaría una joya discreta pero especial: oro amarillo,
                  piedra pequeña o diseño minimalista. ¿Prefieres anillo, collar
                  o pulsera?
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#eadfca] bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9b7b3a]">
                  Recomendación futura
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Collar de oro minimalista
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f5547]">
                  Ideal para regalo elegante, aniversario o detalle especial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="categorias"
        className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 lg:px-16"
      >
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Ideas para empezar
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-3xl border border-[#eadfca] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-lg font-semibold">{category}</p>
              <p className="mt-3 text-sm leading-6 text-[#5f5547]">
                Guías y recomendaciones para elegir mejor sin perder tiempo.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}