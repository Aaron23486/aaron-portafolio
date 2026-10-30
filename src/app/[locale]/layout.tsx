import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import { getDictionary } from "@/i18n";
import { isLocale, localePath, locales, ogLocales } from "@/i18n/config";
import { fontVariables } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#08111f",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  const ogImage = {
    url: `/og/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: meta.ogImageAlt,
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title: meta.title,
    description: meta.description,
    applicationName: "Aurora Digital",
    authors: [{ name: siteConfig.name, url: siteConfig.githubUrl }],
    creator: siteConfig.name,
    alternates: {
      canonical: localePath(locale),
      languages: {
        es: localePath("es"),
        en: localePath("en"),
        "x-default": localePath("es"),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Aurora Digital",
      title: meta.title,
      description: meta.description,
      url: localePath(locale),
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => ogLocales[other]),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca que hay JavaScript: solo entonces se ocultan los elementos que se revelan al hacer scroll. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
