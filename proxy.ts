import { NextResponse, type NextRequest } from "next/server";
import {
  LANGUAGE_HEADER_NAME,
  LANGUAGE_COOKIE_NAME,
  detectLocaleFromAcceptLanguage,
  isSupportedLocale,
  localeFromPath,
  localePath,
} from "@/lib/language-preference";
import { checkLegalPageRateLimit } from "@/lib/legal-page-rate-limit";

const LEGAL_PAGE_PATHS = new Set([
  "/aviso-legal",
  "/politica-privacidad",
  "/pt-br/aviso-legal",
  "/pt-br/politica-de-privacidade",
  "/en/legal-notice",
  "/en/privacy-policy",
]);

export async function proxy(request: NextRequest) {
  if (LEGAL_PAGE_PATHS.has(request.nextUrl.pathname)) {
    const rateLimit = await checkLegalPageRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
      return new NextResponse("Too many requests. Please try again later.", {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      });
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANGUAGE_HEADER_NAME, localeFromPath(request.nextUrl.pathname));
  const nextResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isCrawler(request.headers.get("user-agent"))) {
    return nextResponse;
  }

  if (request.nextUrl.pathname !== "/") {
    return nextResponse;
  }

  const cookieLocale = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  const preferredLocale = isSupportedLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(request.headers.get("accept-language"));
  const destinationPath = localePath(preferredLocale);

  const url = request.nextUrl.clone();
  url.pathname = destinationPath;
  return NextResponse.redirect(url, 307);
}

function getClientIp(request: NextRequest) {
  const railwayIp = request.headers.get("x-real-ip")?.trim();
  if (railwayIp) {
    return railwayIp;
  }

  const cloudflareIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cloudflareIp) {
    return cloudflareIp;
  }

  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

function isCrawler(userAgent: string | null) {
  return /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot/i.test(
    userAgent ?? "",
  );
}
