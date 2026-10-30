"use client";

import type { MouseEvent } from "react";
import { format } from "@/i18n";
import {
  type Locale,
  localeLabels,
  localePath,
  locales,
  localeStorageKey,
} from "@/i18n/config";
import { cn } from "@/lib/cn";
import { currentSectionId } from "@/lib/sections";

export interface LanguageSwitcherProps {
  current: Locale;
  label: string;
  switchTemplate: string;
  currentTemplate: string;
  className?: string;
}

/** Selector ES | EN: cambia de ruta conservando la sección visible y recuerda la elección. */
export function LanguageSwitcher({
  current,
  label,
  switchTemplate,
  currentTemplate,
  className,
}: LanguageSwitcherProps) {
  function rememberChoice(
    event: MouseEvent<HTMLAnchorElement>,
    locale: Locale,
  ) {
    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // Sin almacenamiento disponible (modo privado): el cambio funciona igual.
    }
    // Conserva la sección visible en este momento, llegues a ella con el menú o con el scroll.
    event.currentTarget.href = localePath(locale, `#${currentSectionId()}`);
  }

  return (
    <nav
      aria-label={label}
      className={cn(
        "border-border-subtle bg-midnight-navy/60 flex items-center rounded-full border p-1",
        className,
      )}
    >
      <ul className="flex items-center gap-1">
        {locales.map((locale) => {
          const isCurrent = locale === current;
          const { short, name } = localeLabels[locale];
          return (
            <li key={locale}>
              <a
                href={localePath(locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? "true" : undefined}
                onClick={
                  isCurrent
                    ? undefined
                    : (event) => rememberChoice(event, locale)
                }
                className={cn(
                  "grid min-h-9 min-w-11 place-items-center rounded-full px-3 text-xs font-bold tracking-widest transition-colors duration-300",
                  isCurrent
                    ? "bg-aurora text-midnight-navy"
                    : "text-ink-secondary hover:bg-surface-elevated hover:text-mist-white",
                )}
              >
                {short}
                <span className="sr-only">
                  {" "}
                  (
                  {format(isCurrent ? currentTemplate : switchTemplate, {
                    language: name,
                  })}
                  )
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
