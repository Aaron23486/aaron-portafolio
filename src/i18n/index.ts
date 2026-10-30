import type { Localized } from "@/types/content";
import type { Locale } from "./config";
import en from "./dictionaries/en";
import es, { type Dictionary } from "./dictionaries/es";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Sustituye `{clave}` en un texto del diccionario. */
export function format(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (match, key: string) => values[key] ?? match,
  );
}

/** Devuelve el texto en el idioma pedido; las cadenas simples son iguales en ambos idiomas. */
export function localize(value: string | Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
