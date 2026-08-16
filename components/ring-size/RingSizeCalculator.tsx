"use client";

import { useMemo, useState } from "react";
import {
  calculateRingSize,
  calculateRingSizeFromDiameter,
  maxRingCircumference,
  minRingCircumference,
} from "@/lib/ring-size";

type CalculatorMode = "ring" | "finger";

export default function RingSizeCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("ring");
  const [value, setValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const parsedValue = Number(submittedValue.replace(",", "."));
  const result = useMemo(() => {
    if (!submittedValue.trim() || !Number.isFinite(parsedValue) || parsedValue <= 0) {
      return null;
    }

    return mode === "ring"
      ? calculateRingSizeFromDiameter(parsedValue)
      : calculateRingSize(parsedValue);
  }, [mode, parsedValue, submittedValue]);

  const inputIsInvalid =
    Boolean(submittedValue.trim()) && (!Number.isFinite(parsedValue) || parsedValue <= 0);
  const rangeError =
    Boolean(submittedValue.trim()) && !inputIsInvalid && !result
      ? `La medida queda fuera del rango orientativo de ${minRingCircumference} a ${maxRingCircumference} mm de circunferencia interior. Revisa si has confundido diametro con circunferencia.`
      : "";

  function changeMode(nextMode: CalculatorMode) {
    setMode(nextMode);
    setValue("");
    setSubmittedValue("");
  }

  return (
    <section className="rounded-[1.75rem] border border-[#d7a63c] bg-white p-5 shadow-2xl shadow-[#805400]/10 sm:p-7 lg:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
          Herramienta
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
          Calculadora de talla de anillo
        </h2>
        <p className="mt-3 leading-7 text-[#625746]">
          Calcula una talla aproximada a partir del diametro interior de un anillo o de la circunferencia del dedo. La equivalencia se muestra en EU/ISO y en talla española aproximada.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Metodo de medicion">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "ring"}
          onClick={() => changeMode("ring")}
          className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] ${
            mode === "ring"
              ? "border-[#17120b] bg-[#17120b] text-white"
              : "border-[#ead8b3] bg-[#fffdf8] text-[#2b241f] hover:bg-[#fff5df]"
          }`}
        >
          A) Medir un anillo que ya tengo
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "finger"}
          onClick={() => changeMode("finger")}
          className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] ${
            mode === "finger"
              ? "border-[#17120b] bg-[#17120b] text-white"
              : "border-[#ead8b3] bg-[#fffdf8] text-[#2b241f] hover:bg-[#fff5df]"
          }`}
        >
          B) Medir mi dedo
        </button>
      </div>

      <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,1fr)]">
        <form
          className="min-w-0 rounded-3xl border border-[#ead8b3] bg-[#fffdf8] p-4 sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedValue(value.trim());
          }}
        >
          <label htmlFor="ring-size-measurement" className="block text-sm font-semibold text-[#2b241f]">
            {mode === "ring" ? "Diametro interior del anillo" : "Circunferencia del dedo"}
          </label>
          <div className="mt-3 flex overflow-hidden rounded-2xl border border-[#ead8b3] bg-white focus-within:border-[#b97a05] focus-within:ring-2 focus-within:ring-[#d7a63c]/25">
            <input
              id="ring-size-measurement"
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={mode === "ring" ? "Ej. 16,5" : "Ej. 54"}
              className="min-h-14 min-w-0 flex-1 bg-white px-4 text-lg font-semibold text-[#17120b] outline-none placeholder:text-[#9a8d7b]"
              aria-describedby="ring-size-help ring-size-error"
            />
            <span className="flex min-h-14 items-center border-l border-[#ead8b3] px-4 text-sm font-semibold text-[#7a540f]">
              mm
            </span>
          </div>
          <p id="ring-size-help" className="mt-3 text-sm leading-6 text-[#625746]">
            {mode === "ring"
              ? "Mide solo el hueco interior del anillo, de borde interno a borde interno. No incluyas el grosor del metal."
              : "Rodea el dedo con una cinta flexible o tira de papel, marca el punto de cierre y mide esa longitud."}
          </p>
          <button
            type="submit"
            className="mt-5 min-h-12 w-full rounded-2xl border border-[#7a6a4b] bg-[#17120b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2b241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] sm:w-auto"
          >
            Calcular talla
          </button>
          <p id="ring-size-error" className="mt-3 text-sm font-semibold text-[#8f4a18]" aria-live="polite">
            {inputIsInvalid ? "Introduce una medida positiva en milimetros." : rangeError}
          </p>
        </form>

        <div className="min-w-0 rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm" aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7b3a]">
            Resultado
          </p>
          {result ? (
            <div className="mt-4 grid gap-4">
              <ResultItem
                label="Medida introducida"
                value={
                  mode === "ring"
                    ? `${parsedValue.toFixed(1)} mm de diametro interior`
                    : `${result.measuredCircumference.toFixed(1)} mm de circunferencia`
                }
              />
              {mode === "ring" ? (
                <ResultItem
                  label="Circunferencia calculada"
                  value={`${result.measuredCircumference.toFixed(1)} mm`}
                />
              ) : null}
              <ResultItem label="Talla aproximada" value={`EU/ISO ${result.row.isoSize}`} />
              <ResultItem label="Sistema de tallas utilizado" value="EU/ISO y España" />
              <div className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#806632]">
                  Equivalencias disponibles verificadas
                </p>
                <p className="mt-2 text-sm leading-6 text-[#625746]">
                  EU/ISO {result.row.isoSize}, basado en circunferencia interior en milimetros, y talla española aproximada {result.row.spanishSize}, calculada como circunferencia menos 40.
                </p>
              </div>
              {result.isBetweenSizes ? (
                <p className="rounded-2xl border border-[#d8b87d] bg-[#fff9ed] p-4 text-sm leading-6 text-[#68420c]">
                  Tu medida se encuentra entre dos tallas ({result.lowerSize} y {result.upperSize} EU/ISO). El ajuste puede depender tambien del ancho del anillo y de como te guste llevarlo.
                </p>
              ) : null}
              <p className="text-sm leading-6 text-[#625746]">
                Las equivalencias pueden variar ligeramente entre fabricantes. Comprueba la guia de tallas de la tienda antes de comprar.
              </p>
            </div>
          ) : (
            <p className="mt-4 leading-7 text-[#625746]">
              Introduce una medida valida y pulsa Calcular talla para ver la equivalencia aproximada.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#ead8b3] bg-[#fffdf8] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#806632]">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#17120b]">{value}</p>
    </div>
  );
}
