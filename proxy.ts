import { NextResponse, type NextRequest } from "next/server";
import {
  LANGUAGE_HEADER_NAME,
  LANGUAGE_COOKIE_NAME,
  detectLocaleFromAcceptLanguage,
  isSupportedLocale,
  localeFromPath,
  localePath,
} from "@/lib/language-preference";

export function proxy(request: NextRequest) {
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

  if (destinationPath === "/") {
    return nextResponse;
  }

  const url = request.nextUrl.clone();
  url.pathname = destinationPath;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

function isCrawler(userAgent: string | null) {
  return /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot/i.test(
    userAgent ?? "",
  );
}
