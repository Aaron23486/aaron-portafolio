export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Clave de `localStorage` donde se recuerda el idioma elegido por el visitante. */
export const localeStorageKey = "aurora-locale";

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  es: { short: "ES", name: "Español" },
  en: { short: "EN", name: "English" },
};

/** Etiqueta BCP 47 usada en Open Graph. */
export const ogLocales: Record<Locale, string> = {
  es: "es_CR",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, hash = ""): string {
  return `/${locale}/${hash}`;
}
