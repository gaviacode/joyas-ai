import { ringSizeRows } from "@/lib/ring-size";

export default function RingSizeTable() {
  return (
    <section className="rounded-3xl border border-[#ead8b3] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#17120b]">
        Tabla de tallas de anillos
      </h2>
      <p className="mt-3 leading-7 text-[#625746]">
        La tabla usa talla EU/ISO como circunferencia interior en milimetros. La talla española mostrada es la variante local habitual: circunferencia menos 40. Las equivalencias pueden variar ligeramente entre fabricantes.
      </p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ead8b3]">
        <table className="min-w-[640px] w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Tabla de diametro interior, circunferencia interior, talla EU ISO y talla española aproximada
          </caption>
          <thead className="bg-[#fff5df] text-[#5a4a38]">
            <tr>
              <th scope="col" className="p-3 font-semibold">Diametro interior</th>
              <th scope="col" className="p-3 font-semibold">Circunferencia interior</th>
              <th scope="col" className="p-3 font-semibold">Talla EU/ISO</th>
              <th scope="col" className="p-3 font-semibold">Talla española aprox.</th>
            </tr>
          </thead>
          <tbody>
            {ringSizeRows.map((row) => (
              <tr key={row.isoSize} className="border-t border-[#ead8b3] odd:bg-white even:bg-[#fffdf8]">
                <td className="p-3">{row.diameterMm.toFixed(1)} mm</td>
                <td className="p-3">{row.circumferenceMm} mm</td>
                <td className="p-3 font-semibold text-[#17120b]">{row.isoSize}</td>
                <td className="p-3">{row.spanishSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
