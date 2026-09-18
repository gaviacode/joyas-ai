#!/usr/bin/env node

/**
 * Creates a keyword-map draft for Spanish Joyas.ai guides.
 * Credentials, tokens and CSV output deliberately live outside this repository.
 */
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import vm from "node:vm";
import ts from "typescript";

const ADS_SCOPE = "https://www.googleapis.com/auth/adwords";
const ADS_API_URL = "https://googleads.googleapis.com/v22";
const SPAIN_LOCATION_ID = "2724";
const SPANISH_LANGUAGE_ID = "1000";
const MIN_MONTHLY_VOLUME = 500;
const CSV_COLUMNS = [
  "url", "slug", "categoria", "titulo", "keyword_principal_sugerida", "volumen_mensual",
  "competencia_google_ads", "keywords_secundarias_sugeridas", "intencion", "prioridad",
  "riesgo_canibalizacion", "explicacion_breve", "fecha_consulta", "dificultad_seo_1_10",
  "evidencia_serp", "tipo_resultados_serp", "oportunidad_contenido",
];

function usage() {
  console.log(`Uso:
  npm run seo:keyword-map -- --config <ruta-config> [--output <ruta-csv>] [--limit N] [--dry-run]

Opciones:
  --config <ruta>       Fichero externo con GOOGLE_ADS_CUSTOMER_ID (obligatorio salvo --help).
  --oauth <ruta>        JSON OAuth externo. Por defecto: google-oauth.json junto a --config.
  --token <ruta>        Token externo. Por defecto: google-ads-token.json junto a --config.
  --output <ruta>       CSV externo. Por defecto: keyword-map.csv junto a --config.
  --limit N             Limita el número de guías procesadas.
  --dry-run             Solo lista las guías ES; no lee credenciales ni llama a Google.
`);
}

function parseArgs(args) {
  const options = { dryRun: false, limit: undefined, config: undefined, oauth: undefined, token: undefined, output: undefined };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--dry-run") { options.dryRun = true; continue; }
    const key = arg.replace(/^--/, "");
    if (!['config', 'oauth', 'token', 'output', 'limit'].includes(key)) throw new Error(`Opción no reconocida: ${arg}`);
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Falta un valor para ${arg}`);
    index += 1;
    if (key === "limit") {
      const parsed = Number(value);
      if (!Number.isInteger(parsed) || parsed < 1) throw new Error("--limit debe ser un entero positivo.");
      options.limit = parsed;
    } else options[key] = resolve(value);
  }
  return options;
}

async function loadSpanishGuides() {
  const file = resolve("lib/site-content.ts");
  const source = await readFile(file, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const sandboxModule = { exports: {} };
  vm.runInNewContext(compiled, { module: sandboxModule, exports: sandboxModule.exports }, { filename: file });
  const content = sandboxModule.exports;
  const categoryBySlug = new Map(content.guideCategories.map((category) => [category.slug, category.title]));
  return content.guides.map((guide) => ({
    url: `https://joyas.ai/guias/${guide.slug}`,
    slug: guide.slug,
    category: categoryBySlug.get(guide.categorySlug) ?? guide.categorySlug ?? "Sin categoría",
    title: guide.title,
    description: guide.description,
    intro: guide.intro,
  }));
}

async function readEnvFile(file) {
  const values = {};
  const input = await readFile(file, "utf8");
  for (const line of input.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !match[1].startsWith("#")) values[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
  return values;
}

async function readJson(file, label) {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch { throw new Error(`No se pudo leer ${label}. Revisa la ruta indicada sin copiar su contenido al repositorio.`); }
}

function getOauthClient(credentials) {
  const client = credentials.installed ?? credentials.web;
  if (!client?.client_id || !client?.client_secret) throw new Error("El JSON OAuth no contiene un cliente de escritorio válido.");
  return client;
}

function createCallbackServer() {
  let complete;
  const result = new Promise((resolveResult) => { complete = resolveResult; });
  const state = crypto.randomUUID();
  const server = createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname !== "/oauth2callback") { response.writeHead(404).end(); return; }
    if (url.searchParams.get("state") !== state) { response.writeHead(400).end("Estado OAuth no válido."); return; }
    const error = url.searchParams.get("error");
    if (error) { response.writeHead(400).end("La autorización no se completó."); complete({ error }); return; }
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<p>Autorización completada. Puedes volver a la terminal.</p>");
    complete({ code: url.searchParams.get("code") });
  });
  return { server, state, result };
}

async function getAccessToken({ oauthFile, tokenFile }) {
  const oauth = getOauthClient(await readJson(oauthFile, "el JSON OAuth"));
  let refreshToken;
  try { refreshToken = (await readJson(tokenFile, "el token guardado")).refresh_token; } catch { /* First authorization. */ }

  if (!refreshToken) {
    const callback = createCallbackServer();
    await new Promise((resolveListen) => callback.server.listen(0, "127.0.0.1", resolveListen));
    const port = callback.server.address().port;
    const redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
    const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authorizationUrl.search = new URLSearchParams({ client_id: oauth.client_id, redirect_uri: redirectUri, response_type: "code", scope: ADS_SCOPE, access_type: "offline", prompt: "consent", state: callback.state }).toString();
    console.log("Abre esta URL en un navegador para autorizar la consulta de solo lectura:");
    console.log(authorizationUrl.toString());
    const result = await callback.result;
    callback.server.close();
    if (!result.code) throw new Error(`La autorización OAuth no se completó (${result.error ?? "sin código"}).`);
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code: result.code, client_id: oauth.client_id, client_secret: oauth.client_secret, redirect_uri: redirectUri, grant_type: "authorization_code" }) });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.refresh_token) throw new Error(`Error OAuth: ${JSON.stringify(tokenData.error ?? tokenData.error_description ?? tokenResponse.status)}`);
    refreshToken = tokenData.refresh_token;
    await writeFile(tokenFile, JSON.stringify({ refresh_token: refreshToken }, null, 2), { encoding: "utf8", mode: 0o600 });
  }

  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: oauth.client_id, client_secret: oauth.client_secret, refresh_token: refreshToken, grant_type: "refresh_token" }) });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(`Error al renovar OAuth: ${JSON.stringify(data.error ?? data.error_description ?? response.status)}`);
  return data.access_token;
}

function normalized(value) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
function createSeeds(guide) {
  const candidates = [guide.title, guide.description, guide.slug.replace(/-/g, " "), ...guide.title.split(/[:—–]/).map((part) => part.trim())];
  return [...new Set(candidates.map((candidate) => candidate.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim()).filter((candidate) => candidate.split(" ").length > 1))].slice(0, 12);
}
function isRelevant(idea, guide) {
  const blocked = /\b(amazon|zara|pandora|swarovski|aliexpress|temu|shein)\b/i;
  if (blocked.test(idea.text)) return false;
  const guideTerms = new Set(normalized(`${guide.title} ${guide.description} ${guide.slug}`).split(/\W+/).filter((term) => term.length > 3));
  return normalized(idea.text).split(/\W+/).some((term) => guideTerms.has(term));
}
function intentionFor(guide) {
  const source = normalized(`${guide.title} ${guide.description}`);
  if (/regalar|regalo|comprar|elegir/.test(source)) return "comercial";
  return "informacional con intención comercial";
}
function csvEscape(value) { const string = String(value ?? ""); return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string; }
function writeCsv(rows) { return [CSV_COLUMNS.join(","), ...rows.map((row) => CSV_COLUMNS.map((column) => csvEscape(row[column])).join(","))].join("\n") + "\n"; }
function retryable(status) { return status === 429 || status >= 500; }
async function requestIdeas(accessToken, customerId, guide) {
  const body = { language: `languageConstants/${SPANISH_LANGUAGE_ID}`, geoTargetConstants: [`geoTargetConstants/${SPAIN_LOCATION_ID}`], keywordPlanNetwork: "GOOGLE_SEARCH", keywordAndUrlSeed: { url: guide.url, keywords: createSeeds(guide) } };
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(`${ADS_API_URL}/customers/${customerId}:generateKeywordIdeas`, { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await response.json();
    if (response.ok) return data.results ?? [];
    if (retryable(response.status) && attempt < 2) { await new Promise((resolveWait) => setTimeout(resolveWait, 800 * (attempt + 1))); continue; }
    throw new Error(`Google Ads API ${response.status}: ${JSON.stringify(data.error ?? data)}`);
  }
  return [];
}
function chooseKeywords(ideas, guide) {
  const eligible = ideas.filter((idea) => Number(idea.keywordIdeaMetrics?.avgMonthlySearches ?? 0) >= MIN_MONTHLY_VOLUME && isRelevant(idea, guide));
  const unique = [...new Map(eligible.map((idea) => [normalized(idea.text), idea])).values()];
  unique.sort((a, b) => Number(b.keywordIdeaMetrics?.avgMonthlySearches ?? 0) - Number(a.keywordIdeaMetrics?.avgMonthlySearches ?? 0));
  return unique;
}
function createRows(guides, resultBySlug) {
  const date = new Date().toISOString().slice(0, 10);
  const principalByKeyword = new Map();
  const rows = guides.map((guide) => {
    const ideas = chooseKeywords(resultBySlug.get(guide.slug) ?? [], guide);
    const primary = ideas[0];
    if (primary) principalByKeyword.set(normalized(primary.text), [...(principalByKeyword.get(normalized(primary.text)) ?? []), guide.slug]);
    const volume = primary?.keywordIdeaMetrics?.avgMonthlySearches;
    return {
      url: guide.url, slug: guide.slug, categoria: guide.category, titulo: guide.title,
      keyword_principal_sugerida: primary?.text ?? "", volumen_mensual: volume ?? "",
      competencia_google_ads: primary?.keywordIdeaMetrics?.competition ?? "",
      keywords_secundarias_sugeridas: ideas.slice(1, 6).map((idea) => idea.text).join(" | "),
      intencion: intentionFor(guide), prioridad: primary ? "media · pendiente de revisión SERP" : "sin oportunidad >=500",
      riesgo_canibalizacion: "", explicacion_breve: primary ? `Borrador heurístico: coincide con el tema de la guía y tiene volumen mensual >= ${MIN_MONTHLY_VOLUME}.` : `No se detectó una keyword relevante con volumen >= ${MIN_MONTHLY_VOLUME}.`,
      fecha_consulta: date, dificultad_seo_1_10: "", evidencia_serp: "pendiente de revisión manual con proveedor autorizado", tipo_resultados_serp: "", oportunidad_contenido: "pendiente de revisión SERP autorizada",
    };
  });
  for (const row of rows) {
    const duplicates = principalByKeyword.get(normalized(row.keyword_principal_sugerida)) ?? [];
    row.riesgo_canibalizacion = row.keyword_principal_sugerida && duplicates.length > 1 ? `posible: ${duplicates.join(", ")}` : "bajo";
    if (row.riesgo_canibalizacion.startsWith("posible")) row.prioridad = "revisar canibalización";
  }
  return rows;
}
function createSerpQueue(rows) {
  const headers = ["keyword_principal_sugerida", "url", "slug", "estado", "dificultad_seo_1_10", "evidencia_serp", "tipo_resultados_serp", "oportunidad_contenido"];
  const eligible = rows.filter((row) => row.keyword_principal_sugerida).map((row) => ({ ...row, estado: "revisión manual pendiente; no se ha raspado Google", dificultad_seo_1_10: "", evidencia_serp: "", tipo_resultados_serp: "", oportunidad_contenido: "pendiente de evidencia SERP autorizada" }));
  return [headers.join(","), ...eligible.map((row) => headers.map((header) => csvEscape(row[header])).join(","))].join("\n") + "\n";
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return usage();
  const guides = await loadSpanishGuides();
  const selectedGuides = options.limit ? guides.slice(0, options.limit) : guides;
  if (options.dryRun) {
    console.log(`Guías ES detectadas: ${guides.length}.`);
    for (const guide of selectedGuides) console.log(`${guide.slug}\t${guide.category}\t${guide.url}\t${guide.title}`);
    return;
  }
  if (!options.config) throw new Error("--config es obligatorio para llamar a Google Ads API.");
  const config = await readEnvFile(options.config);
  const customerId = config.GOOGLE_ADS_CUSTOMER_ID?.replace(/\D/g, "");
  if (!customerId) throw new Error("Falta GOOGLE_ADS_CUSTOMER_ID en el fichero de configuración externo.");
  const configDirectory = dirname(options.config);
  const oauthFile = options.oauth ?? resolve(configDirectory, "google-oauth.json");
  const tokenFile = options.token ?? resolve(configDirectory, "google-ads-token.json");
  const output = options.output ?? resolve(configDirectory, "keyword-map.csv");
  const accessToken = await getAccessToken({ oauthFile, tokenFile });
  const results = new Map();
  for (const [index, guide] of selectedGuides.entries()) {
    console.log(`[${index + 1}/${selectedGuides.length}] Consultando ${guide.slug}…`);
    results.set(guide.slug, await requestIdeas(accessToken, customerId, guide));
  }
  const rows = createRows(selectedGuides, results);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, writeCsv(rows), "utf8");
  const queuePath = `${output.slice(0, output.length - extname(output).length)}-serp-review.csv`;
  await writeFile(queuePath, createSerpQueue(rows), "utf8");
  console.log(`Borrador SEO guardado fuera del repositorio: ${output}`);
  console.log(`Cola de revisión SERP guardada fuera del repositorio: ${queuePath}`);
}

main().catch((error) => { console.error(error instanceof Error ? error.message : "Error inesperado."); process.exitCode = 1; });
