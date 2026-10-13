import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const files = {
  types: await readFile(resolve(root, "lib/advisor.ts"), "utf8"),
  route: await readFile(resolve(root, "app/api/chat/route.ts"), "utf8"),
  ui: await readFile(resolve(root, "components/JewelryChat.tsx"), "utf8"),
  i18n: await readFile(resolve(root, "lib/i18n.ts"), "utf8"),
};

const assertions = [
  ["allows between one and six recommendations", /MAX_ADVISOR_RECOMMENDATION_COUNT = 6/.test(files.types) && /minItems: "1"/.test(files.route) && /maxItems: "6"/.test(files.route)],
  ["requires comparison and purchase-check fields", /comparisonNote: string/.test(files.types) && /beforeBuying: string/.test(files.types) && /"comparisonNote", "beforeBuying"/.test(files.route)],
  ["preserves original restrictions during refinement", /Estos ajustes complementan las preferencias originales y no las sustituyen/.test(files.route) && /No cambies silenciosamente el material, presupuesto, tipo o una exclusión original/.test(files.route)],
  ["offers only direct quick refinements", /necklaces_only.*no_gemstones.*more_discreet.*more_affordable/s.test(files.types) && /quickFilters/.test(files.ui) && /additionalRequest/.test(files.ui)],
  ["keeps prior results after a failed refinement", /if \(refinement\) \{\s*setRefinementError\(message\);\s*setStatus\("results"\);/s.test(files.ui)],
  ["protects the material wording in Amazon searches", /Conserva literalmente "plata 925"/.test(files.route)],
  ["uses the localized Amazon search calls to action", /Buscar este tipo de joya en Amazon/.test(files.ui) && /Buscar este tipo de joia na Amazon/.test(files.ui) && /Search for this type of jewelry on Amazon/.test(files.ui)],
  ["localizes the compact mode separator", /orLabel: "o"/.test(files.ui) && /orLabel: "ou"/.test(files.ui) && /orLabel: "or"/.test(files.ui)],
  ["capitalizes the English footer brand", /"Sobre Joyas\.ai": "About Joyas\.ai"/.test(files.i18n)],
];

const failed = assertions.filter(([, passed]) => !passed).map(([name]) => name);

if (failed.length) {
  console.error(`Advisor contract validation failed: ${failed.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Advisor contract validation passed (${assertions.length} static checks).`);
}
