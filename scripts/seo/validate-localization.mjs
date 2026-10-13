const baseUrl = process.env.JOYAS_BASE_URL ?? "http://127.0.0.1:3000";
const canonicalBaseUrl = process.env.JOYAS_CANONICAL_BASE_URL ?? "https://joyas.ai";

const spanishOnlyGuide = "/guias/pulseras-de-la-amistad";
const silverGuides = {
  es: "/guias/plata-925",
  "pt-br": "/pt-br/guias/prata-925",
  en: "/en/guides/925-sterling-silver",
};

const silverAlternates = {
  ...silverGuides,
  "x-default": silverGuides.es,
};

let failures = 0;

await assertPageMetadata("Spanish-only guide", spanishOnlyGuide, {
  canonical: spanishOnlyGuide,
  alternates: {
    es: spanishOnlyGuide,
    "x-default": spanishOnlyGuide,
  },
});

for (const [locale, path] of Object.entries(silverGuides)) {
  await assertPageMetadata("925 silver guide (" + locale + ")", path, {
    canonical: path,
    alternates: silverAlternates,
  });
}

await assertRelatedLinks();
await assertStatus("root redirects for a Spanish visitor", "/", 307, { "accept-language": "es-ES,es;q=0.9" }, "/es");
await assertStatus("root stays crawlable for OAI-SearchBot", "/", 200, { "user-agent": "OAI-SearchBot" });
await assertStatus(
  "localized English guide stays directly accessible to OAI-SearchBot",
  silverGuides.en,
  200,
  { "user-agent": "OAI-SearchBot" },
);
await assertSitemap();

if (failures) {
  process.exitCode = 1;
}

async function assertPageMetadata(name, path, expected) {
  const response = await fetchPage(path);
  const document = parseHtml(await response.text());
  const canonicalLinks = document.links.filter((link) => hasRel(link, "canonical"));
  const alternateLinks = document.links.filter((link) => hasRel(link, "alternate") && link.attributes.hreflang);
  const alternates = {};

  for (const link of alternateLinks) {
    const language = link.attributes.hreflang.toLowerCase();
    if (alternates[language]) {
      alternates[language] = null;
      continue;
    }

    alternates[language] = absoluteUrl(link.attributes.href);
  }

  const expectedAlternates = Object.fromEntries(
    Object.entries(expected.alternates).map(([language, alternatePath]) => [language, absoluteUrl(alternatePath)]),
  );
  const canonical = canonicalLinks.length === 1 ? absoluteUrl(canonicalLinks[0].attributes.href) : null;
  const metadataFailures = [
    ...(response.status !== 200 ? ["expected HTTP 200, received " + response.status] : []),
    ...(canonicalLinks.length !== 1 ? ["expected exactly one canonical link, found " + canonicalLinks.length] : []),
    ...(canonical !== absoluteUrl(expected.canonical)
      ? ["expected canonical " + absoluteUrl(expected.canonical) + ", received " + (canonical ?? "none")]
      : []),
    ...(alternateLinks.length !== Object.keys(alternates).length
      ? ["duplicate hreflang values found"]
      : []),
    ...compareAlternates(alternates, expectedAlternates),
  ];

  report(name, metadataFailures);
}

async function assertRelatedLinks() {
  const response = await fetchPage(silverGuides.en);
  const document = parseHtml(await response.text());
  const unavailableSpanishGuide = absoluteUrl("/guias/como-saber-si-es-plata");

  for (const [locale, path] of Object.entries({ en: silverGuides.en, "pt-br": silverGuides["pt-br"] })) {
    const localizedResponse = locale === "en" ? response : await fetchPage(path);
    const localizedDocument = locale === "en" ? document : parseHtml(await localizedResponse.text());
    const linkedUrls = localizedDocument.anchors
      .map((anchor) => anchor.attributes.href)
      .filter(Boolean)
      .map((href) => absoluteUrl(href));

    report(`${locale} 925 related links`, [
      ...(localizedResponse.status !== 200 ? ["expected HTTP 200, received " + localizedResponse.status] : []),
      ...(linkedUrls.includes(unavailableSpanishGuide)
        ? ["links to unavailable localized destination " + unavailableSpanishGuide]
        : []),
    ]);
  }
}

async function assertStatus(name, path, expectedStatus, headers = {}, expectedLocation) {
  const response = await fetchPage(path, headers);
  report(name, [
    ...(response.status !== expectedStatus
      ? ["expected HTTP " + expectedStatus + ", received " + response.status]
      : []),
    ...(expectedLocation && response.headers.get("location") !== expectedLocation
      ? ["expected redirect to " + expectedLocation + ", received " + (response.headers.get("location") ?? "none")]
      : []),
  ]);
}

async function assertSitemap() {
  const response = await fetchPage("/sitemap.xml");
  const sitemap = await response.text();
  const spanishOnlyEntry = getSitemapEntry(sitemap, absoluteUrl(spanishOnlyGuide));
  const translatedEntry = getSitemapEntry(sitemap, absoluteUrl(silverGuides.es));

  report("sitemap Spanish-only guide", [
    ...(response.status !== 200 ? ["expected HTTP 200, received " + response.status] : []),
    ...(spanishOnlyEntry ? [] : ["entry not found"]),
    ...["hreflang=\"es\"", "hreflang=\"x-default\""]
      .filter((value) => !spanishOnlyEntry.includes(value))
      .map((value) => "missing: " + value),
    ...["hreflang=\"en\"", "hreflang=\"pt-BR\""]
      .filter((value) => spanishOnlyEntry.includes(value))
      .map((value) => "unexpected: " + value),
  ]);

  report("sitemap three-language guide", [
    ...(translatedEntry ? [] : ["entry not found"]),
    ...["hreflang=\"es\"", "hreflang=\"pt-BR\"", "hreflang=\"en\"", "hreflang=\"x-default\""]
      .filter((value) => !translatedEntry.includes(value))
      .map((value) => "missing: " + value),
  ]);
}

async function fetchPage(path, headers = {}) {
  return fetch(new URL(path, baseUrl), { headers, redirect: "manual" });
}

function parseHtml(html) {
  const links = [];
  const anchors = [];

  for (const match of html.matchAll(/<(link|a)\b[^>]*>/gi)) {
    const element = {
      tagName: match[1].toLowerCase(),
      attributes: parseAttributes(match[0]),
    };

    if (element.tagName === "link") {
      links.push(element);
    } else {
      anchors.push(element);
    }
  }

  return { links, anchors };
}

function parseAttributes(tag) {
  const attributes = {};
  const content = tag.replace(/^<\s*[a-z]+\b/i, "").replace(/>$/, "");
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>\x60]+)))?/g;

  for (const match of content.matchAll(attributePattern)) {
    const name = match[1].toLowerCase();
    attributes[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attributes;
}

function compareAlternates(actual, expected) {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();
  const failures = [];

  if (actualKeys.join(",") !== expectedKeys.join(",")) {
    failures.push("expected hreflang keys [" + expectedKeys.join(", ") + "], received [" + actualKeys.join(", ") + "]");
  }

  for (const language of expectedKeys) {
    if (actual[language] !== expected[language]) {
      failures.push(
        "expected hreflang " + language + " to be " + expected[language] + ", received " + (actual[language] ?? "none"),
      );
    }
  }

  return failures;
}

function getSitemapEntry(sitemap, url) {
  const location = "<loc>" + url + "</loc>";
  const start = sitemap.indexOf(location);
  const end = sitemap.indexOf("</url>", start);
  return start === -1 || end === -1 ? "" : sitemap.slice(sitemap.lastIndexOf("<url>", start), end + 6);
}

function absoluteUrl(path) {
  return new URL(path, canonicalBaseUrl).toString().replace(/\/$/, "");
}

function hasRel(element, value) {
  return element.attributes.rel?.split(/\s+/).includes(value);
}

function report(name, errors) {
  if (errors.length) {
    failures += 1;
    console.error("FAIL " + name + "\n  " + errors.join("\n  "));
  } else {
    console.log("PASS " + name);
  }
}
