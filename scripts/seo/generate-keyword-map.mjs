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
const DISCOVERY_MIN_MONTHLY_VOLUME = 200;
const MAX_DISCOVERY_SEEDS_PER_REQUEST = 20;
const DISCOVERY_REQUEST_INTERVAL_MS = 1000;
const HISTORICAL_METRICS_BATCH_SIZE = 100;
const CSV_COLUMNS = [
  "url", "slug", "categoria", "titulo", "keyword_principal_sugerida", "volumen_mensual",
  "competencia_google_ads", "keywords_secundarias_sugeridas", "intencion", "prioridad",
  "riesgo_canibalizacion", "explicacion_breve", "fecha_consulta", "dificultad_seo_1_10",
  "evidencia_serp", "tipo_resultados_serp", "oportunidad_contenido",
];
const DISCOVERY_CSV_COLUMNS = [
  "keyword", "grupo", "seed", "busquedas_mes", "tendencia_3_meses", "competencia_ads", "indice_competencia_ads", "puja_baja", "puja_alta", "fuente_metricas", "keyword_google", "close_variants", "estado", "motivo",
  "keyword_sugerida", "volumen_mensual", "competencia_google_ads", "categoria_sugerida", "intencion",
  "titulo_h1_sugerido", "slug_sugerido", "guias_existentes_relacionadas", "riesgo_canibalizacion",
  "explicacion_breve", "fecha_consulta", "dificultad_seo_1_10", "evidencia_serp", "tipo_resultados_serp",
  "oportunidad_contenido",
];
const DISCOVERY_RAW_CSV_COLUMNS = [...DISCOVERY_CSV_COLUMNS, "volumenes_mensuales"];

function usage() {
  console.log(`Uso:
  npm run seo:keyword-map -- [--discover] --config <ruta-config> [--output <ruta-csv>] [--raw-output <ruta-csv>] [--limit N] [--min-volume N] [--dry-run]

Opciones:
  --config <ruta>       Fichero externo con GOOGLE_ADS_CUSTOMER_ID (obligatorio salvo --help).
  --oauth <ruta>        JSON OAuth externo. Por defecto: google-oauth.json junto a --config.
  --token <ruta>        Token externo. Por defecto: google-ads-token.json junto a --config.
  --output <ruta>       CSV externo. Por defecto: keyword-map.csv junto a --config.
  --raw-output <ruta>   Con --discover, CSV RAW alternativo. Por defecto: deriva <output>-raw.csv.
  --limit N             En modo normal limita guías; con --discover limita grupos de semillas/categorías.
  --min-volume N        Con --discover, mínimo de búsquedas mensuales aceptado. Por defecto: 200.
  --discover             Descubre oportunidades de guías nuevas; no genera el mapa por guía.
  --dry-run             Solo lista las guías ES; no lee credenciales ni llama a Google.
  --self-test           Ejecuta validaciones locales de relevancia; no lee credenciales ni llama a Google.
`);
}

function parseArgs(args) {
  const options = { dryRun: false, selfTest: false, discover: false, limit: undefined, minVolume: undefined, config: undefined, oauth: undefined, token: undefined, output: undefined, rawOutput: undefined };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--dry-run") { options.dryRun = true; continue; }
    if (arg === "--self-test") { options.selfTest = true; continue; }
    if (arg === "--discover") { options.discover = true; continue; }
    const key = arg.replace(/^--/, "");
    if (!['config', 'oauth', 'token', 'output', 'raw-output', 'limit', 'min-volume'].includes(key)) throw new Error(`Opción no reconocida: ${arg}`);
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Falta un valor para ${arg}`);
    index += 1;
    if (key === "limit") {
      const parsed = Number(value);
      if (!Number.isInteger(parsed) || parsed < 1) throw new Error("--limit debe ser un entero positivo.");
      options.limit = parsed;
    } else if (key === "min-volume") {
      const parsed = Number(value);
      if (!Number.isInteger(parsed) || parsed < 1) throw new Error("--min-volume debe ser un entero positivo.");
      options.minVolume = parsed;
    } else if (key === "raw-output") options.rawOutput = resolve(value);
    else options[key] = resolve(value);
  }
  if (options.discover && options.selfTest) throw new Error("--discover y --self-test no se pueden combinar: elige un solo modo.");
  if (options.minVolume !== undefined && !options.discover) throw new Error("--min-volume solo se puede usar con --discover.");
  if (options.rawOutput !== undefined && !options.discover) throw new Error("--raw-output solo se puede usar con --discover.");
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
function normalizeKeywordMatch(value) { return normalized(String(value ?? "")).trim().replace(/\s+/g, " "); }
const STOP_WORDS = new Set(["a", "al", "ante", "bajo", "como", "con", "contra", "cual", "cuales", "de", "del", "el", "en", "entre", "es", "esta", "este", "la", "las", "lo", "los", "mas", "mi", "no", "o", "para", "por", "que", "se", "segun", "si", "sin", "su", "sus", "un", "una", "unos", "unas", "como", "limpiar", "regalar", "regalo", "elegir", "saber", "guia", "ideas", "tipos", "mejor", "mejores"]);
const TOPIC_GROUPS = {
  material: ["oro", "plata", "platino", "acero", "titanio", "perla", "diamante", "moissanita"],
  product: ["anillo", "collar", "colgante", "pulsera", "pendiente", "cadena", "joya", "reloj", "gemelo"],
  recipient: ["hijo", "madre", "mama", "mujer", "hombre", "novia", "pareja", "amiga", "amigo", "nino", "bebe"],
  occasion: ["amistad", "boda", "aniversario", "cumpleano", "navidad", "graduacion", "compromiso", "sanvalentin", "madre"],
};

function singularize(token) {
  if (token.endsWith("es") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 3) return token.slice(0, -1);
  return token;
}
function tokenize(value) {
  return normalized(value).match(/[\p{L}\p{N}]+/gu)?.map(singularize).filter((token) => token.length > 2 && !STOP_WORDS.has(token)) ?? [];
}
function collectTopics(tokens) {
  return Object.fromEntries(Object.entries(TOPIC_GROUPS).map(([group, terms]) => [group, new Set(tokens.filter((token) => terms.includes(token)))]));
}
function guideProfile(guide) {
  const primaryTokens = tokenize(`${guide.slug.replace(/-/g, " ")} ${guide.title} ${guide.category}`);
  const contextualTokens = tokenize(guide.description);
  return {
    primary: new Set(primaryTokens),
    contextual: new Set(contextualTokens),
    primaryTopics: collectTopics(primaryTokens),
  };
}
function sharesAny(left, right) { return [...left].some((item) => right.has(item)); }
function hasConflictingTopic(candidateTopics, profile) {
  return Object.entries(candidateTopics).some(([group, candidateValues]) => {
    if (!candidateValues.size) return false;
    const guideValues = profile.primaryTopics[group];
    return guideValues.size > 0 && !sharesAny(candidateValues, guideValues);
  });
}
function scoreKeywordRelevance(idea, guide) {
  const blocked = /\b(amazon|zara|pandora|swarovski|aliexpress|temu|shein)\b/i;
  if (!idea?.text || blocked.test(idea.text)) return null;
  const profile = guideProfile(guide);
  const candidateTokens = new Set(tokenize(idea.text));
  if (!candidateTokens.size || hasConflictingTopic(collectTopics([...candidateTokens]), profile)) return null;
  const primaryMatches = [...candidateTokens].filter((token) => profile.primary.has(token));
  const contextualMatches = [...candidateTokens].filter((token) => profile.contextual.has(token));
  // A keyword must match an explicit thematic anchor from title, slug or category.
  // Generic verbs are excluded above, so volume alone cannot change the topic.
  if (!primaryMatches.length) return null;
  const exactSlug = normalized(idea.text) === normalized(guide.slug.replace(/-/g, " "));
  const score = primaryMatches.length * 12 + contextualMatches.length * 3 + (exactSlug ? 20 : 0) + Math.min(candidateTokens.size, 5);
  return { idea, score };
}
function createSeeds(guide) {
  const candidates = [guide.title, guide.description, guide.slug.replace(/-/g, " "), ...guide.title.split(/[:—–]/).map((part) => part.trim())];
  return [...new Set(candidates.map((candidate) => candidate.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim()).filter((candidate) => candidate.split(" ").length > 1))].slice(0, 12);
}
function cleanSeed(value) {
  return value.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}
const COMMERCIAL_DISCOVERY_SEED_GROUPS = [
  { id: "pulseras-oro-plata-mujer", category: "Pulseras de oro y plata para mujer", seeds: ["pulseras de oro para mujer", "pulseras de plata para mujer", "pulsera oro mujer", "pulsera plata mujer", "pulseras finas de oro", "pulseras de oro 18k mujer"] },
  { id: "pendientes-oro-plata-aros", category: "Pendientes de oro, plata y aros", seeds: ["pendientes de oro para mujer", "pendientes de plata para mujer", "aros de oro mujer", "aros de plata mujer", "pendientes oro 18k", "pendientes pequeños de oro"] },
  { id: "collares-gargantillas-cadenas", category: "Collares, gargantillas y cadenas", seeds: ["collares de oro para mujer", "gargantillas de oro", "cadenas de oro para mujer", "cadena de plata mujer", "collar de plata mujer", "cadena de oro para colgante"] },
  { id: "anillos-oro-plata-piedras", category: "Anillos de oro, plata y piedras", seeds: ["anillos de oro para mujer", "anillos de plata mujer", "anillo de oro con piedra", "anillos con piedras", "anillo de plata con piedra", "anillos de oro 18k"] },
  { id: "regalos-destinatario-ocasion", category: "Joyas para regalar", seeds: ["joyas para regalar mujer", "joyas para regalar hombre", "joya para regalar a una madre", "joya para regalar a mi novia", "regalo de joyeria", "joyas para cumpleaños"] },
  { id: "eventos-celebraciones", category: "Joyas para celebraciones", seeds: ["joyas para boda", "joyas para bautizo", "joyas para comunion", "joyas para aniversario", "joyas para cumpleaños", "regalo bautizo bebe"] },
  { id: "medallas-cruces", category: "Medallas y cruces", seeds: ["medallas de oro", "medalla de oro para mujer", "cruz de oro", "cruces de oro para mujer", "medalla de bautizo", "cadena con cruz de oro"] },
  { id: "joyas-personalizadas", category: "Joyas personalizadas", seeds: ["joyas personalizadas", "joyas con iniciales", "joyas con nombre", "pulsera con nombre", "collar con inicial", "joyas grabadas"] },
  { id: "joyas-ropa-vestidos-escotes", category: "Joyas según ropa y vestidos", seeds: ["joyas para vestido", "pendientes para vestido", "collar segun escote", "joyas para vestido de boda", "pendientes para vestido rojo", "pendientes para vestido azul marino"] },
  { id: "eleccion-estilo-personal", category: "Cómo elegir joyas", seeds: ["que joya elegir", "que pendientes me favorecen", "como elegir joyas", "como elegir pendientes", "que collar me favorece", "joyas segun estilo"] },
  { id: "joyas-con-perlas", category: "Joyas con perlas", seeds: ["collar de perlas", "collar perlas mujer", "pendientes de perlas", "pendientes perlas mujer", "pulsera de perlas", "anillo de perlas", "anillo con perla", "perlas cultivadas", "joyas con perlas"] },
  { id: "tipos-especificos-pendientes", category: "Tipos específicos de pendientes", seeds: ["pendientes pequeños mujer", "pendientes largos mujer", "pendientes de botón", "pendientes trepadores", "pendientes sueltos", "ear cuff mujer", "pendientes elegantes mujer", "pendientes para diario"] },
  { id: "collares-colgantes-por-formato", category: "Collares y colgantes por formato", seeds: ["collar corto mujer", "collar largo mujer", "collar fino mujer", "collar corazón", "colgante corazón", "collar estrella", "collar luna", "collar infinito", "collar árbol de la vida"] },
  { id: "tipos-especificos-anillos", category: "Tipos específicos de anillos", seeds: ["anillo solitario mujer", "anillo solitario oro", "anillo fino mujer", "anillos finos mujer", "anillo ajustable mujer", "anillos apilables", "sello mujer", "anillo sello mujer"] },
  { id: "tipos-especificos-pulseras", category: "Tipos específicos de pulseras", seeds: ["pulsera tenis", "pulsera tenis mujer", "brazalete mujer", "brazalete oro mujer", "brazalete plata mujer", "pulsera rígida mujer", "pulsera fina mujer", "pulseras finas mujer"] },
  { id: "joyas-con-piedras-y-gemas", category: "Joyas con piedras y gemas", seeds: ["joyas con circonitas", "pendientes circonitas", "anillo circonitas", "joyas con zafiro", "anillo zafiro", "joyas con rubí", "anillo rubí", "joyas con esmeralda", "anillo esmeralda", "joyas piedra nacimiento", "collar piedra nacimiento"] },
  { id: "joyas-con-motivos", category: "Joyas con motivos", seeds: ["joyas corazón", "joyas infinito", "joyas estrella", "joyas luna", "joyas árbol de la vida", "pulsera infinito", "pendientes estrella"] },
  { id: "regalos-por-destinatario", category: "Joyas para regalar por destinatario", seeds: ["joya para madre", "joyas para regalar a una madre", "joya para hija", "joya para hermana", "joya para novia", "joya para esposa", "joya para amiga", "collar para regalar mujer", "pulsera para regalar mujer"] },
  { id: "pendientes-rostro-y-estilo", category: "Pendientes según rostro o estilo", seeds: ["pendientes para cara redonda", "pendientes para cara alargada", "pendientes para cara ovalada", "pendientes según rostro", "pendientes según peinado", "pendientes pelo corto", "pendientes pelo largo"] },
  { id: "joyas-vestido-y-ocasion", category: "Joyas según vestido y ocasión", seeds: ["joyas vestido negro", "joyas vestido rojo", "joyas vestido azul", "joyas para palabra de honor", "pendientes para vestido de fiesta", "joyas para invitada de boda", "pendientes invitada boda", "collar vestido de fiesta"] },
  { id: "joyas-personalizadas-detalle", category: "Joyas personalizadas de detalle", seeds: ["collar con nombre", "collar nombre plata", "collar nombre oro", "pulsera grabada", "pulsera con fecha", "joya con coordenadas", "colgante con inicial"] },
  { id: "joyas-simbolos-motivos", category: "Joyas con símbolos y motivos", seeds: ["collar sol", "collar trébol", "colgante estrella", "pulsera trébol", "joya infinito", "joyas con corazón"] },
  { id: "joyas-novia-invitada-boda", category: "Joyas para novia e invitada de boda", seeds: ["pendientes novia", "collar novia"] },
  { id: "joyas-bautizo-comunion", category: "Joyas para bautizo y comunión", seeds: ["medalla bautizo", "pulsera comunión niña", "pendientes comunión niña", "cruz comunión", "joya para bautizo", "regalo madrina bautizo"] },
  { id: "joyas-regalo-destinatario", category: "Joyas regalo por destinatario", seeds: ["joya regalo madre", "joya regalo hija", "joya regalo novia", "joya aniversario pareja", "joya cumpleaños mujer", "joya para abuela"] },
  { id: "pendientes-segun-rasgos", category: "Pendientes según rasgos", seeds: ["pendientes cara redonda", "pendientes cara alargada", "pendientes para pelo corto", "pendientes para cuello corto"] },
  { id: "joyas-segun-vestido", category: "Joyas según vestido", seeds: ["joyas para vestido negro", "pendientes vestido rojo", "joyas para vestido azul", "joyas para vestido de fiesta", "collar para escote palabra de honor", "pendientes para escote barco"] },
  { id: "joyas-piedras-especificas", category: "Joyas con piedras específicas", seeds: ["anillo aguamarina", "anillo amatista", "anillo turquesa", "pendientes esmeralda", "collar zafiro", "joyas con piedra luna"] },
  { id: "joyas-perlas-ocasiones", category: "Joyas con perlas para ocasiones", seeds: ["pendientes perlas novia", "pulsera perlas mujer", "anillo perla mujer", "joyas perlas boda"] },
  { id: "joyas-religiosas-especificas", category: "Joyas religiosas específicas", seeds: ["medalla virgen niña", "medalla virgen oro", "cruz oro bebé", "cruz de bautizo", "colgante ángel oro"] },
  { id: "tallas-y-medidas-joyas", category: "Tallas y medidas de joyas", seeds: ["como saber talla anillo", "medir dedo para anillo", "como medir muñeca para pulsera", "medida pulsera mujer", "que largo de collar elegir", "medidas cadenas mujer"] },
  { id: "tipos-de-cierres-joyas", category: "Tipos de cierres de joyas", seeds: ["tipos de cierres pendientes", "tipos de cierre collar", "tipos de cierre pulsera", "cierre catalan pendientes", "cierre omega pendientes", "cierre ingles pendientes"] },
  { id: "como-elegir-pendientes-long-tail", category: "Cómo elegir pendientes", seeds: ["pendientes pequeños para diario", "que tamaño de pendientes elegir", "pendientes comodos mujer", "pendientes para trabajar"] },
  { id: "como-elegir-collares-long-tail", category: "Cómo elegir collares", seeds: ["collar para diario", "que longitud de collar elegir", "como elegir collar"] },
  { id: "combinar-varias-joyas", category: "Cómo combinar varias joyas", seeds: ["como combinar collares", "como llevar varios collares", "como combinar anillos", "como combinar pulseras", "pulseras con reloj", "combinar pendientes y collar"] },
  { id: "oro-plata-y-color-joyas", category: "Oro, plata y color de joyas", seeds: ["oro o plata que me queda mejor", "como saber si me queda mejor oro o plata", "joyas oro o plata", "plata o dorado", "que color de joyas me favorece"] },
  { id: "joyas-uso-diario-y-trabajo", category: "Joyas para uso diario y trabajo", seeds: ["joyas para diario", "joyas para trabajar", "joyas discretas mujer", "joyas minimalistas mujer", "joyas elegantes sencillas"] },
  { id: "problemas-uso-y-almacenamiento", category: "Uso y almacenamiento de joyas", seeds: ["como evitar que se enreden los collares", "como guardar collares", "como guardar pendientes", "como guardar joyas", "como cuidar joyas"] },
  { id: "layering-de-collares", category: "Layering de collares", seeds: ["layering collares", "collares en capas", "como combinar dos collares", "como combinar tres collares", "como llevar varios collares sin que se enreden"] },
  { id: "joyas-segun-estilo-personal", category: "Joyas según estilo personal", seeds: ["joyas segun tono de piel", "joyas para piel clara", "joyas para piel morena", "como elegir joyas segun estilo"] },
  { id: "joyas-personalizadas-long-tail", category: "Joyas personalizadas long-tail", seeds: ["collar inicial oro", "collar inicial plata", "collar con inicial oro", "collar con inicial plata", "colgante inicial oro", "colgante inicial plata", "collar con nombre oro", "collar con nombre plata", "pulsera con nombre oro", "pulsera con nombre plata", "pulsera personalizada oro", "pulsera personalizada plata", "pulsera grabada mujer", "pulsera inicial mujer", "collar personalizado mujer", "colgante personalizado mujer", "pulsera coordenadas", "pulsera coordenadas mujer", "collar coordenadas", "joyas con coordenadas"] },
  { id: "joyas-minimalistas-comerciales", category: "Joyas minimalistas comerciales", seeds: ["collar minimalista mujer", "collar minimalista oro", "collar minimalista plata", "pendientes minimalistas mujer", "pendientes minimalistas oro", "pendientes minimalistas plata", "pulsera minimalista mujer", "pulsera minimalista oro", "pulsera minimalista plata", "anillo minimalista mujer", "anillo minimalista oro", "anillo minimalista plata", "joyas minimalistas oro", "joyas minimalistas plata"] },
  { id: "joyas-finas-y-discretas", category: "Joyas finas y discretas", seeds: ["collar fino oro", "collar fino plata", "cadena fina oro mujer", "cadena fina plata mujer", "pulsera fina oro mujer", "pulsera fina plata mujer", "anillo fino oro mujer", "anillo fino plata mujer", "pendientes pequeños oro", "pendientes pequeños oro 18k", "pendientes pequeños plata", "pendientes pequeños plata 925", "pendientes discretos mujer"] },
  { id: "producto-material-y-pureza", category: "Producto, material y pureza", seeds: ["pendientes oro 18k mujer", "pendientes plata 925 mujer", "aros oro 18k mujer", "aros plata 925 mujer", "collar oro 18k mujer", "collar plata 925 mujer", "pulsera oro 18k mujer", "pulsera plata 925 mujer", "anillo oro 18k mujer", "anillo plata 925 mujer", "cadena oro 18k mujer", "cadena plata 925 mujer", "colgante oro 18k mujer", "colgante plata 925 mujer"] },
  { id: "joyas-regalo-producto-concreto", category: "Joyas para regalar por producto", seeds: ["collar para regalar novia", "collar para regalar madre", "collar para regalar hija", "collar para regalar amiga", "pulsera para regalar novia", "pulsera para regalar madre", "pulsera para regalar hija", "pulsera para regalar amiga", "pendientes para regalar mujer", "pendientes para regalar novia", "pendientes para regalar madre", "anillo para regalar mujer", "joya para regalar novia", "joya para regalar madre", "joya para regalar hija", "joya para regalar amiga"] },
  { id: "joyas-motivo-y-material", category: "Joyas por motivo y material", seeds: ["collar sol oro", "collar sol plata", "collar luna oro", "collar luna plata", "collar estrella oro", "collar estrella plata", "pulsera estrella", "pulsera estrella oro", "pulsera estrella plata", "pulsera luna", "pulsera luna oro", "pulsera luna plata", "pendientes estrella oro", "pendientes estrella plata", "pendientes luna", "pendientes luna oro", "pendientes luna plata", "colgante sol oro", "colgante sol plata", "colgante luna oro", "colgante luna plata"] },
  { id: "joyas-iniciales-especificas", category: "Joyas con iniciales específicas", seeds: ["pulsera inicial oro", "pulsera inicial plata", "anillo inicial mujer", "anillo inicial oro", "anillo inicial plata", "pendientes inicial", "pendientes inicial oro", "pendientes inicial plata", "colgante letra oro", "colgante letra plata", "collar letra oro", "collar letra plata"] },
  { id: "cadenas-y-colgantes-comerciales", category: "Cadenas y colgantes comerciales", seeds: ["cadena fina oro", "cadena fina plata", "cadena fina para colgante", "cadena oro para colgante", "cadena plata para colgante", "cadena corta oro mujer", "cadena corta plata mujer", "cadena larga oro mujer", "cadena larga plata mujer", "colgante pequeño oro", "colgante pequeño plata", "colgante minimalista oro", "colgante minimalista plata"] },
  { id: "charms-personalizados", category: "Charms personalizados", seeds: ["charm personalizado", "charms personalizados", "charm con inicial", "charm inicial", "charm inicial plata", "charm letra", "charm con letra", "charm grabado", "charm con nombre", "charm personalizado plata", "charm personalizado oro", "charm coordenadas", "charm foto", "charm huella mascota", "charm mascota personalizado"] },
  { id: "charms-regalo-destinatario", category: "Charms para regalar", seeds: ["charm para mama", "charm para madre", "charm para hija", "charm para hermana", "charm para amiga", "charm para novia", "charm para esposa", "charm cumpleaños", "charm aniversario", "charm nacimiento", "charm bebe", "charm graduacion", "charm boda"] },
  { id: "charms-por-motivo", category: "Charms por motivo", seeds: ["charm estrella", "charm luna", "charm sol", "charm corazon", "charm infinito", "charm trebol", "charm mariposa", "charm arbol de la vida", "charm huella", "charm mascota", "charm flor", "charm angel", "charm ojo", "charm herradura"] },
  { id: "charms-por-material", category: "Charms por material", seeds: ["charm plata", "charm plata 925", "charm oro", "charm oro 18k", "charm dorado", "charm oro mujer", "charm plata mujer", "charm acero", "charm bicolor"] },
  { id: "abalorios-comerciales", category: "Abalorios comerciales", seeds: ["abalorios pulsera", "abalorios para pulsera", "abalorios plata", "abalorios plata 925", "abalorios oro", "abalorios personalizados", "abalorio personalizado", "abalorio inicial", "abalorio letra", "abalorio estrella", "abalorio luna", "abalorio sol", "abalorio corazon", "abalorio infinito", "abalorio trebol", "abalorio mariposa", "abalorio huella", "abalorios para pulsera mujer"] },
  { id: "pulseras-con-charms-abalorios", category: "Pulseras con charms y abalorios", seeds: ["pulsera con charms", "pulsera charms", "pulsera charms mujer", "pulsera charms plata", "pulsera charms oro", "pulsera con abalorios", "pulsera abalorios", "pulsera abalorios plata", "pulsera abalorios oro", "pulsera personalizada con charms", "pulsera personalizada con abalorios", "pulsera de charms personalizada"] },
  { id: "charms-abalorios-conceptos-y-eleccion", category: "Charms y abalorios: tipos, significado y elección", seeds: ["tipos de charms", "tipos de charm", "qué son los charms", "qué es un charm", "qué significa charm", "diferencia entre charm y abalorio", "charm o abalorio", "cómo elegir charms", "cómo elegir charms para pulsera", "cómo combinar charms", "combinar charms pulsera", "cómo combinar charms en una pulsera", "cuántos charms poner en una pulsera", "cuantos charms caben en una pulsera", "significado de los charms", "charms con significado"] },
  { id: "charms-regalo-y-personalizacion", category: "Charms para regalar y personalizar", seeds: ["charms para regalar", "charms regalo", "charms para mamá", "charms para madre", "charms para amigas", "charms para mejor amiga", "charms para pareja", "charms para novia", "charms con inicial", "charms con nombre", "charms con foto", "charms de familia", "charms hijos", "charms nacimiento", "charms cumpleaños", "charms aniversario", "charms viaje", "charms mascotas", "charms perro", "charms gato"] },
  { id: "charms-abalorios-motivos-y-materiales", category: "Charms y abalorios por motivo y material", seeds: ["charms corazón", "charms estrella", "charms infinito", "charms árbol de la vida", "charms letra", "charms letras", "charms piedra nacimiento", "charms zodiacales", "charms signos del zodiaco", "charms plata", "charms oro", "charms plata 925", "charms para pulsera", "tipos de abalorios", "abalorios con significado", "abalorios para regalar"] },
  { id: "charms-compatibilidad-y-montaje", category: "Compatibilidad y montaje de charms", seeds: ["cómo saber si un charm es compatible", "charms compatibles con pulseras", "charms compatibles", "cómo saber qué charms sirven para una pulsera", "tamaño charms pulsera", "medidas charms pulsera", "diámetro agujero charm", "separadores charms", "clips para charms", "cadena de seguridad charms", "topes para charms", "cómo colocar charms en una pulsera", "cómo poner charms en pulsera", "cómo quitar charms de una pulsera", "cómo evitar que los charms se muevan", "cómo distribuir charms en una pulsera", "cómo ordenar charms en pulsera"] },
  { id: "charms-abalorios-cuidado-e-ideas", category: "Cuidado e ideas para charms y abalorios", seeds: ["cómo limpiar charms", "cómo limpiar charms de plata", "cómo limpiar abalorios de plata", "cómo cuidar charms", "cómo guardar charms", "pulsera charms significado", "pulsera de charms significado", "ideas pulsera charms", "ideas para pulsera de charms"] },
  { id: "pendientes-ligeros-y-comodos", category: "Pendientes ligeros y cómodos", seeds: ["pendientes ligeros", "pendientes ultraligeros", "pendientes que no pesen", "pendientes que no pesan", "pendientes grandes ligeros", "pendientes largos ligeros", "aros ligeros", "pendientes para llevar todo el día"] },
  { id: "collares-sin-enredos", category: "Collares sin enredos", seeds: ["collares que no se enredan", "separador de collares", "separador collares", "cierre para varios collares", "cierre multiple collares", "como desenredar una cadena", "como desenredar un collar"] },
  { id: "cadena-colgante-compatibilidad", category: "Compatibilidad entre cadena y colgante", seeds: ["cadena para colgante pesado", "cadena para medalla", "cadena para colgante grande", "que cadena elegir para colgante", "grosor cadena para colgante", "cadena resistente para colgante", "mejor cadena para colgante", "que longitud de cadena para colgante"] },
  { id: "cierres-collares-pulseras-seguros", category: "Cierres seguros de collares y pulseras", seeds: ["cierre mosqueton collar", "cierre reasa collar", "cierre magnetico collar", "cierre magnetico pulsera", "cierre collar seguro", "cierre pulsera seguro", "como funciona cierre mosqueton"] },
  { id: "problemas-ajuste-anillos", category: "Problemas de ajuste de anillos", seeds: ["anillo me queda grande", "que hacer si un anillo queda grande", "anillo me queda pequeño", "como ajustar un anillo", "anillo gira en el dedo", "evitar que anillo gire", "reductor talla anillo"] },
  { id: "collares-comodidad-y-ajuste", category: "Collares: comodidad y ajuste", seeds: ["collar ligero mujer", "collar comodo mujer", "collar que no pese", "cadena que no se enganche", "collar que no se mueva", "evitar que collar se gire", "como evitar que el colgante se mueva", "collar que no se enrede"] },
  { id: "collar-que-se-gira-o-se-mueve", category: "Problemas de giro y movimiento del collar", seeds: ["como evitar que un collar se gire", "por que se gira el collar", "collar se gira", "collar se da la vuelta", "colgante se da la vuelta", "colgante se gira", "como evitar que un colgante se gire", "como hacer que un collar no se mueva", "como hacer que un colgante no se mueva", "cierre collar se va hacia delante", "cierre del collar se va hacia delante", "como evitar que el cierre del collar se vaya hacia delante"] },
  { id: "anillo-grande-o-que-gira", category: "Problemas de talla y giro del anillo", seeds: ["que hacer si un anillo me queda grande", "como ajustar un anillo grande", "como hacer un anillo mas pequeño", "anillo se gira", "como evitar que un anillo gire", "como hacer que un anillo no gire"] },
  { id: "pendientes-varios-agujeros", category: "Pendientes para varios agujeros", seeds: ["pendientes varios agujeros", "pendientes para varios agujeros", "combinacion pendientes varios agujeros", "como combinar pendientes varios agujeros", "pendientes segundo agujero", "pendientes primer y segundo agujero", "pendientes pequeños segundo agujero", "combinar aros y pendientes", "ear stack pendientes"] },
];

function createDiscoveryGroups(guides) {
  const byCategory = new Map();
  for (const guide of guides) {
    const group = byCategory.get(guide.category) ?? { category: guide.category, guides: [] };
    group.guides.push(guide);
    byCategory.set(guide.category, group);
  }
  const categoryGroups = [...byCategory.values()].map((group) => {
    const categoryGuideTokens = group.guides.flatMap((guide) => tokenize(`${guide.title} ${guide.slug.replace(/-/g, " ")}`));
    const frequentTerms = [...new Set(categoryGuideTokens.filter((token) =>
      [...TOPIC_GROUPS.material, ...TOPIC_GROUPS.product, ...TOPIC_GROUPS.recipient, ...TOPIC_GROUPS.occasion, "joya"].includes(token),
    ))].slice(0, 6);
    const seeds = [...new Set([
      cleanSeed(`joyas ${group.category}`),
      cleanSeed(group.category),
      ...frequentTerms.map((term) => cleanSeed(`${term} joyas`)),
    ].filter((seed) => seed.split(" ").length > 1))].slice(0, 12);
    const profile = {
      primary: new Set(tokenize(`${group.category} ${group.guides.map((guide) => `${guide.title} ${guide.slug.replace(/-/g, " ")}`).join(" ")}`)),
      contextual: new Set(group.guides.flatMap((guide) => tokenize(guide.description))),
    };
    profile.primaryTopics = collectTopics([...profile.primary]);
    return { ...group, id: `categoria-${normalized(group.category).replace(/[^a-z0-9]+/g, "-")}`, seeds, profile };
  });
  const commercialGroups = COMMERCIAL_DISCOVERY_SEED_GROUPS.map((group) => {
    const primary = new Set(tokenize(`${group.category} ${group.seeds.join(" ")}`));
    return { ...group, guides: [], seeds: group.seeds.map(cleanSeed), profile: { primary, contextual: new Set(), primaryTopics: collectTopics([...primary]) } };
  });
  return [...categoryGroups, ...commercialGroups];
}
function intentionFor(guide) {
  const source = normalized(`${guide.title} ${guide.description}`);
  if (/regalar|regalo|comprar|elegir/.test(source)) return "comercial";
  return "informacional con intención comercial";
}
function csvEscape(value) { const string = String(value ?? ""); return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string; }
function withUtf8Bom(csvContent) { return `\uFEFF${csvContent}`; }
function writeCsv(rows) { return withUtf8Bom([CSV_COLUMNS.join(","), ...rows.map((row) => CSV_COLUMNS.map((column) => csvEscape(row[column])).join(","))].join("\n") + "\n"); }
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
function chunkDiscoverySeeds(seeds, size = MAX_DISCOVERY_SEEDS_PER_REQUEST) {
  return Array.from({ length: Math.ceil(seeds.length / size) }, (_, index) => seeds.slice(index * size, (index + 1) * size));
}
function createDiscoveryRequestPacer(intervalMs = DISCOVERY_REQUEST_INTERVAL_MS) {
  let lastRequestAt = 0;
  return async () => {
    const waitMs = Math.max(0, lastRequestAt + intervalMs - Date.now());
    if (waitMs) await new Promise((resolveWait) => setTimeout(resolveWait, waitMs));
    lastRequestAt = Date.now();
  };
}
function deduplicateDiscoveryIdeas(ideas) {
  const byKeyword = new Map();
  for (const idea of ideas.filter((item) => item?.text)) {
    const key = normalizeKeywordMatch(idea.text);
    const current = byKeyword.get(key);
    if (!current) {
      byKeyword.set(key, { ...idea, _discoverySeeds: [...(idea._discoverySeeds ?? []), ...(idea._historicalSeeds ?? [])], _metricSources: [...new Set(idea._metricSources ?? [idea._metricSource].filter(Boolean))], _closeVariants: [...new Set(idea._closeVariants ?? closeVariantsFor(idea))] });
      continue;
    }
    current._discoverySeeds = [...new Set([...current._discoverySeeds, ...(idea._discoverySeeds ?? []), ...(idea._historicalSeeds ?? [])])];
    current._metricSources = [...new Set([...current._metricSources, ...(idea._metricSources ?? [idea._metricSource].filter(Boolean))])];
    current._closeVariants = [...new Set([...current._closeVariants, ...(idea._closeVariants ?? closeVariantsFor(idea))])];
  }
  return [...byKeyword.values()];
}
async function requestDiscoveryIdeas(accessToken, customerId, group, waitForRequest) {
  const ideas = [];
  for (const seeds of chunkDiscoverySeeds(group.seeds)) {
    const body = {
      language: `languageConstants/${SPANISH_LANGUAGE_ID}`,
      geoTargetConstants: [`geoTargetConstants/${SPAIN_LOCATION_ID}`],
      keywordPlanNetwork: "GOOGLE_SEARCH",
      keywordSeed: { keywords: seeds },
    };
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await waitForRequest();
      const response = await fetch(`${ADS_API_URL}/customers/${customerId}:generateKeywordIdeas`, { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (response.ok) { ideas.push(...(data.results ?? []).map((idea) => ({ ...idea, _discoverySeeds: seeds, _metricSource: "keyword_ideas" }))); break; }
      if (retryable(response.status) && attempt < 2) { await new Promise((resolveWait) => setTimeout(resolveWait, 800 * (attempt + 1))); continue; }
      throw new Error(`Google Ads API ${response.status}: ${JSON.stringify(data.error ?? data)}`);
    }
  }
  return deduplicateDiscoveryIdeas(ideas);
}
function collectSeedsWithoutDirectMetrics(groups, results) {
  const missing = [];
  for (const group of groups) {
    const directKeywords = new Set((results.get(group.id) ?? []).map((idea) => normalizeKeywordMatch(idea?.text)).filter(Boolean));
    for (const seed of group.seeds) {
      if (!directKeywords.has(normalizeKeywordMatch(seed))) missing.push({ group, seed });
    }
  }
  return missing;
}
function closeVariantsFor(result) {
  return (result?.closeVariants ?? result?.close_variants ?? []).map((value) => typeof value === "string" ? value : value.text).filter(Boolean);
}
async function requestHistoricalMetrics(accessToken, customerId, keywords, waitForRequest) {
  const results = [];
  for (const batch of chunkDiscoverySeeds(keywords, HISTORICAL_METRICS_BATCH_SIZE)) {
    const body = {
      language: `languageConstants/${SPANISH_LANGUAGE_ID}`,
      geoTargetConstants: [`geoTargetConstants/${SPAIN_LOCATION_ID}`],
      keywordPlanNetwork: "GOOGLE_SEARCH",
      keywords: batch,
    };
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await waitForRequest();
      const response = await fetch(`${ADS_API_URL}/customers/${customerId}:generateKeywordHistoricalMetrics`, { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (response.ok) { results.push(...(data.results ?? [])); break; }
      if (retryable(response.status) && attempt < 2) { await new Promise((resolveWait) => setTimeout(resolveWait, 800 * (attempt + 1))); continue; }
      throw new Error(`Google Ads Historical Metrics ${response.status}: ${JSON.stringify(data.error ?? data)}`);
    }
  }
  return results;
}
function matchHistoricalMetrics(missingSeeds, historicalResults) {
  const requested = new Map();
  for (const item of missingSeeds) requested.set(normalizeKeywordMatch(item.seed), item.seed);
  const matches = new Map();
  for (const result of historicalResults) {
    const direct = normalizeKeywordMatch(result?.text);
    if (requested.has(direct)) matches.set(direct, { result, matchedBy: "text" });
  }
  for (const result of historicalResults) {
    for (const variant of closeVariantsFor(result)) {
      const key = normalizeKeywordMatch(variant);
      if (!matches.has(key) && requested.has(key)) matches.set(key, { result, matchedBy: "close_variant" });
    }
  }
  return matches;
}
function mergeHistoricalMetricsIntoResults(results, missingSeeds, matches) {
  const seedsByGroup = new Map();
  for (const { group, seed } of missingSeeds) {
    const match = matches.get(normalizeKeywordMatch(seed));
    if (!match) continue;
    const ideas = seedsByGroup.get(group.id) ?? [];
    ideas.push({ ...match.result, text: match.result.text ?? seed, _historicalSeeds: [seed], _metricSource: "historical_metrics", _googleKeyword: match.result.text ?? "", _closeVariants: closeVariantsFor(match.result), _historicalMatch: match.matchedBy });
    seedsByGroup.set(group.id, ideas);
  }
  for (const [groupId, ideas] of seedsByGroup) results.set(groupId, deduplicateDiscoveryIdeas([...(results.get(groupId) ?? []), ...ideas]));
}
function chooseKeywords(ideas, guide) {
  const eligible = ideas
    .filter((idea) => Number(idea.keywordIdeaMetrics?.avgMonthlySearches ?? 0) >= MIN_MONTHLY_VOLUME)
    .map((idea) => scoreKeywordRelevance(idea, guide))
    .filter(Boolean);
  const unique = [...new Map(eligible.map((candidate) => [normalized(candidate.idea.text), candidate])).values()];
  unique.sort((a, b) => b.score - a.score || Number(b.idea.keywordIdeaMetrics?.avgMonthlySearches ?? 0) - Number(a.idea.keywordIdeaMetrics?.avgMonthlySearches ?? 0));
  return unique.map((candidate) => candidate.idea);
}
function createRows(guides, resultBySlug) {
  const date = new Date().toISOString().slice(0, 10);
  const assignedPrimaryKeywords = new Set();
  const candidatesByGuide = guides.map((guide) => chooseKeywords(resultBySlug.get(guide.slug) ?? [], guide));
  const rows = guides.map((guide, index) => {
    const ideas = candidatesByGuide[index];
    const primary = ideas.find((idea) => !assignedPrimaryKeywords.has(normalized(idea.text)));
    if (primary) assignedPrimaryKeywords.add(normalized(primary.text));
    const volume = primary?.keywordIdeaMetrics?.avgMonthlySearches;
    return {
      url: guide.url, slug: guide.slug, categoria: guide.category, titulo: guide.title,
      keyword_principal_sugerida: primary?.text ?? "", volumen_mensual: volume ?? "",
      competencia_google_ads: primary?.keywordIdeaMetrics?.competition ?? "",
      keywords_secundarias_sugeridas: ideas.filter((idea) => normalized(idea.text) !== normalized(primary?.text ?? "")).slice(0, 5).map((idea) => idea.text).join(" | "),
      intencion: intentionFor(guide), prioridad: primary ? "media · pendiente de revisión SERP" : "sin oportunidad >=500",
      riesgo_canibalizacion: "", explicacion_breve: primary ? `Borrador heurístico: coincide con el tema de la guía y tiene volumen mensual >= ${MIN_MONTHLY_VOLUME}.` : `No se detectó una keyword relevante con volumen >= ${MIN_MONTHLY_VOLUME}.`,
      fecha_consulta: date, dificultad_seo_1_10: "", evidencia_serp: "pendiente de revisión manual con proveedor autorizado", tipo_resultados_serp: "", oportunidad_contenido: "pendiente de revisión SERP autorizada",
    };
  });
  for (const row of rows) {
    const guide = guides.find((item) => item.slug === row.slug);
    const comparable = guides.filter((item) => item.slug !== row.slug && guide && sharesAny(guideProfile(item).primary, guideProfile(guide).primary));
    row.riesgo_canibalizacion = comparable.length ? `revisar intención parecida: ${comparable.map((item) => item.slug).join(", ")}` : "bajo";
  }
  return rows;
}

const DISCOVERY_BLOCKED = /\b(amazon|zara|pandora|swarovski|aliexpress|temu|shein|cartier|tiffany|tous|singularu|bvlgari)\b/i;
const DISCOVERY_MALFORMED = /(?:\b(?:asdf|qwerty|xxx)\b|(\p{L})\1{4,}|\b(?:de|del|para|con|y|o)\s*$)/iu;
function similarity(left, right) {
  const leftTokens = new Set(tokenize(left));
  const rightTokens = new Set(tokenize(right));
  const shared = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return leftTokens.size && rightTokens.size ? shared / new Set([...leftTokens, ...rightTokens]).size : 0;
}
function existingKeywordPhrases(guides) {
  return new Set(guides.flatMap((guide) => [normalized(guide.slug.replace(/-/g, " ")), normalized(guide.title)]));
}
function classifyDiscoveryIntention(keyword) {
  return /\b(comprar|precio|mejor|mejores|regalo|regalar|elegir|para)\b/i.test(keyword) ? "comercial" : "informacional con intención comercial";
}
function suggestedTitle(keyword) {
  const text = keyword.trim();
  if (/^(como|que|cual|cuanto|donde|por que)\b/i.test(text)) return text.charAt(0).toUpperCase() + text.slice(1);
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}: guía para elegir joyas`;
}
function suggestedSlug(keyword) {
  return normalized(keyword).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
function discoveryCandidate(idea, group, guides, existingPhrases, minVolume) {
  const keyword = idea?.text?.trim();
  const volume = discoveryMetrics(idea).volume ?? 0;
  if (!keyword || volume < minVolume || DISCOVERY_BLOCKED.test(keyword) || DISCOVERY_MALFORMED.test(keyword)) return null;
  const candidateTokens = new Set(tokenize(keyword));
  const candidateTopics = collectTopics([...candidateTokens]);
  const jewelleryTerms = new Set([...TOPIC_GROUPS.material, ...TOPIC_GROUPS.product, "joya"]);
  if (!candidateTokens.size || !sharesAny(candidateTokens, jewelleryTerms)) return null;
  // Keep the category's material/product/recipient/occasion anchors intact; a new topic belongs elsewhere.
  if (hasConflictingTopic(candidateTopics, group.profile)) return null;
  const exactExisting = existingPhrases.has(normalized(keyword));
  const related = guides.map((guide) => ({ guide, score: Math.max(similarity(keyword, guide.slug.replace(/-/g, " ")), similarity(keyword, guide.title)) }))
    .filter(({ score }) => score >= 0.25).sort((a, b) => b.score - a.score);
  if (exactExisting || related.some(({ score }) => score >= 0.6)) return null;
  const categoryMatches = [...candidateTokens].filter((token) => group.profile.primary.has(token)).length;
  if (!categoryMatches) return null;
  return { idea, keyword, volume, group, related, relevance: categoryMatches * 10 + Math.min(candidateTokens.size, 5) };
}
const MONTH_NUMBERS = { JANUARY: 1, FEBRUARY: 2, MARCH: 3, APRIL: 4, MAY: 5, JUNE: 6, JULY: 7, AUGUST: 8, SEPTEMBER: 9, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12 };
function discoveryMetrics(idea) {
  const metrics = idea?.keywordIdeaMetrics ?? idea?.keywordMetrics ?? idea?.keyword_metrics ?? {};
  const volume = metrics.avgMonthlySearches;
  const monthly = (metrics.monthlySearchVolumes ?? metrics.monthly_search_volumes ?? [])
    .map((entry) => ({ year: Number(entry.year), month: typeof entry.month === "number" ? entry.month : MONTH_NUMBERS[entry.month], searches: entry.monthlySearches ?? entry.monthly_searches }))
    .filter((entry) => Number.isInteger(entry.year) && Number.isInteger(entry.month) && entry.month >= 1 && entry.month <= 12 && Number.isFinite(Number(entry.searches)))
    .sort((left, right) => left.year - right.year || left.month - right.month);
  const trend = monthly.length < 6 ? "N/D" : (() => {
    const recent = monthly.slice(-3).reduce((sum, entry) => sum + Number(entry.searches), 0) / 3;
    const previous = monthly.slice(-6, -3).reduce((sum, entry) => sum + Number(entry.searches), 0) / 3;
    if (previous === 0) return "N/D";
    const percent = Math.round(((recent - previous) / previous) * 100);
    return `${percent > 0 ? "+" : ""}${percent}%`;
  })();
  return {
    volume: Number.isFinite(Number(volume)) ? Number(volume) : undefined,
    trend,
    monthly: monthly.map((entry) => `${entry.year}-${String(entry.month).padStart(2, "0")}: ${entry.searches}`).join(" | "),
    competition: metrics.competition ?? "",
    competitionIndex: metrics.competitionIndex ?? metrics.competition_index ?? "",
    lowBid: metrics.lowTopOfPageBidMicros ?? metrics.low_top_of_page_bid_micros ?? "",
    highBid: metrics.highTopOfPageBidMicros ?? metrics.high_top_of_page_bid_micros ?? "",
  };
}
function discoverySeedSource(idea) { return [...new Set(idea?._discoverySeeds ?? [])].join(" | "); }
function discoveryMetricSource(idea) { return idea?._metricSources?.includes("keyword_ideas") ? "keyword_ideas" : idea?._metricSource === "historical_metrics" ? "historical_metrics" : "sin_metricas"; }
function discoveryGoogleKeyword(idea) { return idea?._googleKeyword ?? idea?.text ?? ""; }
function discoveryCloseVariants(idea) { return [...new Set(idea?._closeVariants ?? closeVariantsFor(idea))].join(" | "); }
function selectDiscoveryCandidates(groups, guides, results, minVolume) {
  const existingPhrases = existingKeywordPhrases(guides);
  const selected = new Map();
  for (const group of groups) {
    for (const idea of results.get(group.id) ?? []) {
      const candidate = discoveryCandidate(idea, group, guides, existingPhrases, minVolume);
      if (!candidate) continue;
      const key = normalized(candidate.keyword);
      const current = selected.get(key);
      if (!current || candidate.relevance > current.relevance || (candidate.relevance === current.relevance && candidate.volume > current.volume)) selected.set(key, candidate);
    }
  }
  return selected;
}
function createDiscoveryRows(groups, guides, results, minVolume = DISCOVERY_MIN_MONTHLY_VOLUME, selected = selectDiscoveryCandidates(groups, guides, results, minVolume)) {
  const date = new Date().toISOString().slice(0, 10);
  const rows = [...selected.values()].map((candidate) => {
    const risk = candidate.related.some(({ score }) => score >= 0.45) ? "medio" : "bajo";
    const related = candidate.related.slice(0, 4).map(({ guide }) => guide.slug).join(" | ");
    const metrics = discoveryMetrics(candidate.idea);
    return {
      keyword: candidate.keyword, grupo: candidate.group.category, seed: discoverySeedSource(candidate.idea), busquedas_mes: metrics.volume ?? "", tendencia_3_meses: metrics.trend,
      competencia_ads: metrics.competition, indice_competencia_ads: metrics.competitionIndex, puja_baja: metrics.lowBid, puja_alta: metrics.highBid,
      fuente_metricas: discoveryMetricSource(candidate.idea), keyword_google: discoveryGoogleKeyword(candidate.idea), close_variants: discoveryCloseVariants(candidate.idea),
      estado: "oportunidad", motivo: `Supera el mínimo de discovery (${minVolume}) y pasa los filtros de relevancia.`,
      keyword_sugerida: candidate.keyword, volumen_mensual: candidate.volume,
      competencia_google_ads: metrics.competition,
      categoria_sugerida: candidate.group.category, intencion: classifyDiscoveryIntention(candidate.keyword),
      titulo_h1_sugerido: suggestedTitle(candidate.keyword), slug_sugerido: suggestedSlug(candidate.keyword),
      guias_existentes_relacionadas: related, riesgo_canibalizacion: risk,
      explicacion_breve: `Oportunidad nueva filtrada por relevancia temática y volumen mensual >= ${minVolume}.`,
      fecha_consulta: date, dificultad_seo_1_10: "", evidencia_serp: "revisión manual pendiente",
      tipo_resultados_serp: "", oportunidad_contenido: "Requiere revisión SERP manual antes de priorizar.",
      _score: candidate.relevance * 100000 + candidate.volume + (classifyDiscoveryIntention(candidate.keyword) === "comercial" ? 10000 : 0) - (risk === "medio" ? 5000 : 0),
    };
  });
  rows.sort((a, b) => b._score - a._score || b.volumen_mensual - a.volumen_mensual);
  for (const row of rows) delete row._score;
  return rows;
}
function discoveryRawStatus(idea, group, guides, existingPhrases, minVolume, selected) {
  const keyword = idea?.text?.trim() ?? "";
  const metrics = discoveryMetrics(idea);
  if (!keyword) return { estado: "descartada", motivo: "Idea sin keyword devuelta por Google Ads.", metrics };
  if (metrics.volume === undefined) return { estado: "sin_metricas", motivo: "Sin métricas devueltas por Google Ads.", metrics };
  if (metrics.volume === 0) return { estado: "sin_busquedas", motivo: "Google Ads devuelve 0 búsquedas mensuales.", metrics };
  if (metrics.volume < minVolume) return { estado: "bajo_volumen", motivo: `Volumen mensual < ${minVolume}.`, metrics };
  if (DISCOVERY_BLOCKED.test(keyword)) return { estado: "descartada", motivo: "Consulta de marca ajena o excluida.", metrics };
  if (DISCOVERY_MALFORMED.test(keyword)) return { estado: "descartada", motivo: "Consulta truncada o con formato inservible.", metrics };
  const related = guides.map((guide) => ({ guide, score: Math.max(similarity(keyword, guide.slug.replace(/-/g, " ")), similarity(keyword, guide.title)) }))
    .filter(({ score }) => score >= 0.25).sort((left, right) => right.score - left.score);
  if (existingPhrases.has(normalized(keyword)) || related.some(({ score }) => score >= 0.6)) return { estado: "cubierta", motivo: "Keyword ya cubierta por guía existente.", metrics, related };
  const candidate = discoveryCandidate(idea, group, guides, existingPhrases, minVolume);
  if (!candidate) return { estado: "descartada", motivo: "No pasa los filtros actuales de relevancia temática.", metrics, related };
  if (!selected.has(normalized(keyword))) return { estado: "duplicada", motivo: "Duplicada de otra idea con mayor relevancia o volumen.", metrics, related };
  return { estado: "oportunidad", motivo: `Supera el mínimo de discovery (${minVolume}) y pasa los filtros de relevancia.`, metrics, related };
}
function createDiscoveryRawRows(groups, guides, results, minVolume, selected, historicalMatches = new Map()) {
  const existingPhrases = existingKeywordPhrases(guides);
  const date = new Date().toISOString().slice(0, 10);
  const rows = [];
  for (const group of groups) {
    const ideas = results.get(group.id) ?? [];
    const returnedKeywords = new Set(ideas.filter((idea) => discoveryMetricSource(idea) === "keyword_ideas").map((idea) => normalizeKeywordMatch(idea?.text)).filter(Boolean));
    const historicalSeedKeys = new Set();
    for (const idea of ideas) {
      if (idea?._metricSources?.includes("historical_metrics") || idea?._metricSource === "historical_metrics") {
        for (const seed of idea._discoverySeeds ?? []) historicalSeedKeys.add(normalizeKeywordMatch(seed));
      }
      const keyword = idea?.text?.trim() ?? "";
      const classification = discoveryRawStatus(idea, group, guides, existingPhrases, minVolume, selected);
      const related = classification.related?.slice(0, 4).map(({ guide }) => guide.slug).join(" | ") ?? "";
      rows.push({
        keyword, grupo: group.category, seed: discoverySeedSource(idea), busquedas_mes: classification.metrics.volume ?? "", tendencia_3_meses: classification.metrics.trend,
        competencia_ads: classification.metrics.competition, indice_competencia_ads: classification.metrics.competitionIndex, puja_baja: classification.metrics.lowBid, puja_alta: classification.metrics.highBid,
        fuente_metricas: discoveryMetricSource(idea), keyword_google: discoveryGoogleKeyword(idea), close_variants: discoveryCloseVariants(idea),
        estado: classification.estado, motivo: classification.motivo,
        keyword_sugerida: classification.estado === "oportunidad" ? keyword : "", volumen_mensual: classification.metrics.volume ?? "", competencia_google_ads: classification.metrics.competition,
        categoria_sugerida: group.category, intencion: keyword ? classifyDiscoveryIntention(keyword) : "", titulo_h1_sugerido: classification.estado === "oportunidad" ? suggestedTitle(keyword) : "", slug_sugerido: classification.estado === "oportunidad" ? suggestedSlug(keyword) : "",
        guias_existentes_relacionadas: related, riesgo_canibalizacion: classification.related?.some(({ score }) => score >= 0.45) ? "medio" : "", explicacion_breve: classification.motivo,
        fecha_consulta: date, dificultad_seo_1_10: "", evidencia_serp: "revisión manual pendiente", tipo_resultados_serp: "", oportunidad_contenido: "Requiere revisión SERP manual antes de priorizar.", volumenes_mensuales: classification.metrics.monthly,
      });
    }
    for (const seed of group.seeds) {
      if (returnedKeywords.has(normalizeKeywordMatch(seed))) continue;
      const historical = historicalMatches.get(normalizeKeywordMatch(seed));
      if (historical && historicalSeedKeys.has(normalizeKeywordMatch(seed))) continue;
      rows.push({ keyword: seed, grupo: group.category, seed, busquedas_mes: "", tendencia_3_meses: "N/D", competencia_ads: "", indice_competencia_ads: "", puja_baja: "", puja_alta: "", fuente_metricas: "sin_metricas", keyword_google: "", close_variants: "", estado: "sin_metricas", motivo: "Sin métricas devueltas por Google Ads.", keyword_sugerida: "", volumen_mensual: "", competencia_google_ads: "", categoria_sugerida: group.category, intencion: classifyDiscoveryIntention(seed), titulo_h1_sugerido: "", slug_sugerido: "", guias_existentes_relacionadas: "", riesgo_canibalizacion: "", explicacion_breve: "Sin métricas devueltas por Google Ads.", fecha_consulta: date, dificultad_seo_1_10: "", evidencia_serp: "", tipo_resultados_serp: "", oportunidad_contenido: "", volumenes_mensuales: "" });
    }
  }
  return rows;
}
function writeDiscoveryCsv(rows, columns = DISCOVERY_CSV_COLUMNS) { return withUtf8Bom([columns.join(","), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(","))].join("\n") + "\n"); }
function writeDiscoveryRawCsv(rows) { return writeDiscoveryCsv(rows, DISCOVERY_RAW_CSV_COLUMNS); }

function runLocalRelevanceTests() {
  const idea = (text, volume = 1000) => ({ text, keywordIdeaMetrics: { avgMonthlySearches: volume, competition: "LOW" } });
  const goldGuide = { slug: "como-limpiar-oro", category: "Oro y metales", title: "Cómo limpiar joyas de oro", description: "Guía para limpiar oro sin dañarlo." };
  const childrenGuide = { slug: "pulseras-nombres-hijos", category: "Regalar joyas", title: "Pulseras con nombres de hijos", description: "Ideas de pulseras personalizadas con nombres de hijos." };
  const friendshipGuide = { slug: "pulseras-de-la-amistad", category: "Regalar joyas", title: "Pulseras de la amistad", description: "Significado e ideas de pulseras de la amistad." };
  const giftBraceletGuide = { slug: "pulseras-para-regalar", category: "Regalar joyas", title: "Pulseras para regalar", description: "Cómo elegir una pulsera según la persona y la ocasión." };
  if (scoreKeywordRelevance(idea("como limpiar la plata"), goldGuide) !== null) throw new Error("Validación fallida: oro no debe aceptar una keyword de plata.");
  if (scoreKeywordRelevance(idea("regalar dia de la madre"), childrenGuide) !== null) throw new Error("Validación fallida: nombres de hijos no debe aceptar Día de la Madre.");
  const rows = createRows([friendshipGuide, giftBraceletGuide], new Map([
    [friendshipGuide.slug, [idea("pulseras de la amistad")]],
    [giftBraceletGuide.slug, [idea("pulseras de la amistad"), idea("pulseras para regalar")]],
  ]));
  if (rows[0].keyword_principal_sugerida !== "pulseras de la amistad" || rows[1].keyword_principal_sugerida !== "pulseras para regalar") throw new Error("Validación fallida: una keyword principal no debe duplicarse entre guías.");
  const mapCsv = writeCsv([{ intencion: "intención comercial", titulo: "guía con acentos" }]);
  const serpCsv = createSerpQueue([{ keyword_principal_sugerida: "guía", url: "https://joyas.ai/guias/prueba", slug: "prueba" }]);
  const discoveryCsv = writeDiscoveryCsv([{ keyword_sugerida: "guía de joyería", intencion: "intención comercial" }]);
  const rawCsv = writeDiscoveryRawCsv([{ keyword: "guía de joyería", estado: "sin_metricas", motivo: "Sin métricas devueltas por Google Ads" }]);
  if (![mapCsv, serpCsv, discoveryCsv, rawCsv].every((csv) => csv.startsWith("\uFEFF")) || !mapCsv.includes("intención comercial") || !discoveryCsv.includes("guía de joyería") || !rawCsv.includes("sin_metricas")) throw new Error("Validación fallida: los CSV deben conservar acentos y empezar con BOM UTF-8.");
  const trendIdea = { keywordIdeaMetrics: { avgMonthlySearches: 120, monthlySearchVolumes: [
    { year: 2025, month: "JANUARY", monthlySearches: 100 }, { year: 2025, month: "FEBRUARY", monthlySearches: 100 }, { year: 2025, month: "MARCH", monthlySearches: 100 },
    { year: 2025, month: "APRIL", monthlySearches: 120 }, { year: 2025, month: "MAY", monthlySearches: 120 }, { year: 2025, month: "JUNE", monthlySearches: 120 },
  ] } };
  if (discoveryMetrics(trendIdea).trend !== "+20%" || discoveryMetrics({ keywordIdeaMetrics: {} }).trend !== "N/D" || deriveDiscoveryRawOutput("C:/tmp/opportunities.csv") !== "C:/tmp/opportunities-raw.csv") throw new Error("Validación fallida: tendencia o ruta RAW incorrecta.");
  const chunkCount = (count) => chunkDiscoverySeeds(Array.from({ length: count }, (_, index) => `semilla-${index}`)).length;
  if (chunkCount(20) !== 1 || chunkCount(21) !== 2 || chunkCount(40) !== 2 || chunkCount(41) !== 3) throw new Error("Validación fallida: los bloques de discovery deben tener un máximo de 20 semillas.");
  const fallbackGroup = { id: "fallback", category: "Prueba de fallback", seeds: ["pulsera charm"], profile: { primary: new Set(["pulsera", "charm"]), contextual: new Set(), primaryTopics: collectTopics(["pulsera", "charm"]) } };
  const fallbackSelected = new Map([[normalizeKeywordMatch("pulsera charm"), {}]]);
  const fallbackIdea = (volume) => ({ text: "pulsera charm", keywordMetrics: volume === undefined ? {} : { avgMonthlySearches: volume }, _metricSource: "historical_metrics" });
  const fallbackStatus = (volume) => discoveryRawStatus(fallbackIdea(volume), fallbackGroup, [], new Set(), DISCOVERY_MIN_MONTHLY_VOLUME, fallbackSelected).estado;
  if (fallbackStatus(320) !== "oportunidad" || fallbackStatus(90) !== "bajo_volumen" || fallbackStatus(0) !== "sin_busquedas" || fallbackStatus(undefined) !== "sin_metricas") throw new Error("Validación fallida: estados de Historical Metrics incorrectos.");
  const closeVariantMatches = matchHistoricalMetrics([{ group: fallbackGroup, seed: "pulsera charm para mamá" }], [{ text: "pulsera charm madre", closeVariants: ["pulsera charm para mamá"], keywordMetrics: { avgMonthlySearches: 320 } }]);
  if (closeVariantMatches.size !== 1 || closeVariantMatches.get(normalizeKeywordMatch("pulsera charm para mamá"))?.matchedBy !== "close_variant") throw new Error("Validación fallida: close_variants no se conserva correctamente.");
  const variantGroup = { ...fallbackGroup, id: "fallback-close-variant", seeds: ["pulsera charm para mamá"] };
  const variantSeeds = [{ group: variantGroup, seed: "pulsera charm para mamá" }];
  const variantResults = new Map([[variantGroup.id, []]]);
  mergeHistoricalMetricsIntoResults(variantResults, variantSeeds, closeVariantMatches);
  const variantSelected = selectDiscoveryCandidates([variantGroup], [], variantResults, DISCOVERY_MIN_MONTHLY_VOLUME);
  const variantRawRows = createDiscoveryRawRows([variantGroup], [], variantResults, DISCOVERY_MIN_MONTHLY_VOLUME, variantSelected, closeVariantMatches);
  if (variantRawRows.length !== 1 || variantRawRows[0].keyword_google !== "pulsera charm madre" || !variantRawRows[0].close_variants.includes("pulsera charm para mamá")) throw new Error("Validación fallida: close_variant no debe duplicar métricas en RAW.");
  const fallbackResults = new Map([[fallbackGroup.id, []]]);
  const fallbackSeeds = [{ group: fallbackGroup, seed: "pulsera charm" }];
  const fallbackMatches = matchHistoricalMetrics(fallbackSeeds, [{ text: "pulsera charm", keywordMetrics: { avgMonthlySearches: 320 } }]);
  mergeHistoricalMetricsIntoResults(fallbackResults, fallbackSeeds, fallbackMatches);
  const fallbackRows = createDiscoveryRows([fallbackGroup], [], fallbackResults, DISCOVERY_MIN_MONTHLY_VOLUME);
  if (fallbackRows.length !== 1 || fallbackRows[0].fuente_metricas !== "historical_metrics") throw new Error("Validación fallida: el CSV filtrado debe incluir oportunidades después del fallback.");
  console.log("Validaciones locales de relevancia superadas.");
}
function createSerpQueue(rows) {
  const headers = ["keyword_principal_sugerida", "url", "slug", "estado", "dificultad_seo_1_10", "evidencia_serp", "tipo_resultados_serp", "oportunidad_contenido"];
  const eligible = rows.filter((row) => row.keyword_principal_sugerida).map((row) => ({ ...row, estado: "revisión manual pendiente; no se ha raspado Google", dificultad_seo_1_10: "", evidencia_serp: "", tipo_resultados_serp: "", oportunidad_contenido: "pendiente de evidencia SERP autorizada" }));
  return withUtf8Bom([headers.join(","), ...eligible.map((row) => headers.map((header) => csvEscape(row[header])).join(","))].join("\n") + "\n");
}
function deriveDiscoveryRawOutput(output) {
  const extension = extname(output);
  const base = extension ? output.slice(0, -extension.length) : output;
  return `${base}-raw${extension || ".csv"}`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return usage();
  if (options.selfTest) return runLocalRelevanceTests();
  const guides = await loadSpanishGuides();
  const discoveryGroups = options.discover ? createDiscoveryGroups(guides) : [];
  const discoveryMinVolume = options.minVolume ?? DISCOVERY_MIN_MONTHLY_VOLUME;
  const selectedGuides = options.limit ? guides.slice(0, options.limit) : guides;
  if (options.dryRun) {
    if (options.discover) {
      const selectedGroups = options.limit ? discoveryGroups.slice(0, options.limit) : discoveryGroups;
      console.log(`Guías ES detectadas: ${guides.length}. Grupos de descubrimiento: ${discoveryGroups.length}. Mínimo discovery: ${discoveryMinVolume} búsquedas/mes.`);
      console.log("Historical Metrics fallback: activado para semillas sin métricas.");
      if (options.output) {
        const rawOutput = options.rawOutput ?? deriveDiscoveryRawOutput(options.output);
        console.log(`CSV de oportunidades previsto: ${options.output}`);
        console.log(`CSV RAW previsto: ${rawOutput}`);
      }
      for (const group of selectedGroups) console.log(`${group.category}\t${group.seeds.join(" | ")}`);
      return;
    }
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
  const output = options.output ?? resolve(configDirectory, options.discover ? "keyword-opportunities.csv" : "keyword-map.csv");
  const rawOutput = options.discover ? (options.rawOutput ?? deriveDiscoveryRawOutput(output)) : undefined;
  if (options.discover && rawOutput === output) throw new Error("--raw-output debe ser distinto de --output.");
  const accessToken = await getAccessToken({ oauthFile, tokenFile });
  if (options.discover) {
    const selectedGroups = options.limit ? discoveryGroups.slice(0, options.limit) : discoveryGroups;
    const results = new Map();
    const waitForDiscoveryRequest = createDiscoveryRequestPacer();
    for (const [index, group] of selectedGroups.entries()) {
      console.log(`[${index + 1}/${selectedGroups.length}] Consultando descubrimiento: ${group.category}…`);
      results.set(group.id, await requestDiscoveryIdeas(accessToken, customerId, group, waitForDiscoveryRequest));
    }
    const missingSeeds = collectSeedsWithoutDirectMetrics(selectedGroups, results);
    let historicalMatches = new Map();
    if (missingSeeds.length) {
      const uniqueSeeds = [...new Map(missingSeeds.map((item) => [normalizeKeywordMatch(item.seed), item.seed])).values()];
      try {
        console.log(`Historical Metrics fallback: consultando ${uniqueSeeds.length} semillas sin métricas directas…`);
        const historicalResults = await requestHistoricalMetrics(accessToken, customerId, uniqueSeeds, waitForDiscoveryRequest);
        historicalMatches = matchHistoricalMetrics(missingSeeds, historicalResults);
        mergeHistoricalMetricsIntoResults(results, missingSeeds, historicalMatches);
        console.log(`Historical Metrics fallback: ${historicalMatches.size} semillas asociadas a métricas devueltas.`);
      } catch (error) {
        console.warn(`Advertencia: Historical Metrics fallback falló; se conservarán las semillas sin métricas. ${error instanceof Error ? error.message : "Error inesperado."}`);
      }
    }
    const selected = selectDiscoveryCandidates(selectedGroups, guides, results, discoveryMinVolume);
    const rows = createDiscoveryRows(selectedGroups, guides, results, discoveryMinVolume, selected);
    const rawRows = createDiscoveryRawRows(selectedGroups, guides, results, discoveryMinVolume, selected, historicalMatches);
    await mkdir(dirname(output), { recursive: true });
    await mkdir(dirname(rawOutput), { recursive: true });
    await writeFile(output, writeDiscoveryCsv(rows), "utf8");
    await writeFile(rawOutput, writeDiscoveryRawCsv(rawRows), "utf8");
    console.log(`Oportunidades de nuevas guías guardadas fuera del repositorio: ${output}`);
    console.log(`Datos RAW de discovery guardados fuera del repositorio: ${rawOutput}`);
    return;
  }
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
