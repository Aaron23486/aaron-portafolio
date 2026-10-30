import type { Screenshot } from "@/types/content";

/** Anchos generados por `npm run images`. */
export const screenshotWidths = [800, 1600] as const;

export function screenshotSrcSet(shot: Screenshot): string {
  // El archivo «-1600» nunca se amplía: si el original es más pequeño, su ancho real es `shot.width`.
  return screenshotWidths
    .map((width) => `${shot.src}-${width}.webp ${Math.min(width, shot.width)}w`)
    .join(", ");
}

export function screenshotSrc(
  shot: Screenshot,
  width: (typeof screenshotWidths)[number] = 1600,
) {
  return `${shot.src}-${width}.webp`;
}
