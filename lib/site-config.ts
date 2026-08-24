export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://joyas.ai");
export const SITE_NAME = "Regalos.ai";
export const PUBLIC_CONTACT_EMAIL = "gaviacode@gmail.com";

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}
