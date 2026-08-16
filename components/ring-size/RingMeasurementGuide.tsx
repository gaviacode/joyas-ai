export default function RingMeasurementGuide() {
  return (
    <section className="rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
        Como saber la talla midiendo un anillo
      </h2>
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
        <ol className="grid gap-3 leading-7 text-[#625746]">
          {[
            "Utiliza un anillo que ajuste correctamente al dedo donde vas a llevar la nueva pieza.",
            "Colocalo sobre una superficie plana.",
            "Mide el diametro interior de un extremo interno al otro.",
            "No incluyas el grosor del metal.",
            "Introduce el resultado en la calculadora.",
          ].map((step, index) => (
            <li key={step} className="flex gap-3 rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff1d2] text-sm font-semibold text-[#9a6b08]">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-5">
          <svg viewBox="0 0 220 220" role="img" aria-labelledby="ring-measurement-title" className="mx-auto h-auto w-full max-w-[240px]">
            <title id="ring-measurement-title">Ilustracion del diametro interior de un anillo</title>
            <circle cx="110" cy="110" r="78" fill="#fff8eb" stroke="#b97a05" strokeWidth="16" />
            <circle cx="110" cy="110" r="58" fill="#ffffff" stroke="#ead8b3" strokeWidth="2" />
            <line x1="52" y1="110" x2="168" y2="110" stroke="#17120b" strokeWidth="4" strokeLinecap="round" />
            <path d="M58 100l-12 10 12 10M162 100l12 10-12 10" fill="none" stroke="#17120b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="110" y="145" textAnchor="middle" fill="#7a540f" fontSize="14" fontWeight="700">
              diametro interior
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
