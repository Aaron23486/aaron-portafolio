import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { localePath, locales } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [
      locale,
      new URL(localePath(locale), siteConfig.url).href,
    ]),
  );
  return locales.map((locale) => ({
    url: new URL(localePath(locale), siteConfig.url).href,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
