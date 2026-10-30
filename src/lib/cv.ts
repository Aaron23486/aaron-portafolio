import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { cvFiles } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { CvFile } from "@/types/content";

/**
 * CV disponibles, comprobados en el build: si un PDF no está en `public/`,
 * su botón no se muestra (nunca hay enlaces rotos).
 */
export function getAvailableCvFiles(locale: Locale): CvFile[] {
  const available = cvFiles.filter((file) =>
    existsSync(join(process.cwd(), "public", file.publicPath)),
  );
  // El CV del idioma activo va primero.
  return available.toSorted(
    (a, b) => Number(b.locale === locale) - Number(a.locale === locale),
  );
}
