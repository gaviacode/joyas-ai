import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteFooter from "@/components/SiteFooter";
import { GA_MEASUREMENT_ID } from "@/lib/google-analytics-config";
import { LANGUAGE_HEADER_NAME, isSupportedLocale } from "@/lib/language-preference";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "joyas.ai | Recomendador de joyas con IA",
  description:
    "Asistente de inteligencia artificial para elegir joyas según ocasión, presupuesto, estilo y destinatario.",
  openGraph: {
    title: "joyas.ai | Recomendador de joyas con IA",
    description:
      "Asistente de inteligencia artificial para elegir joyas según ocasión, presupuesto, estilo y destinatario.",
    url: "/",
    siteName: "joyas.ai",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "joyas.ai - Tu joyero IA" }],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "joyas.ai | Recomendador de joyas con IA",
    description:
      "Asistente de inteligencia artificial para elegir joyas según ocasión, presupuesto, estilo y destinatario.",
    images: ["/opengraph-image"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeHeader = (await headers()).get(LANGUAGE_HEADER_NAME) ?? "es";
  const locale = isSupportedLocale(localeHeader) ? localeHeader : "es";

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        <Script
          id="google-consent-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#fbf7ef]">
        {children}
        <SiteFooter />
        <Suspense fallback={null}>
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        </Suspense>
        <CookieConsent measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
