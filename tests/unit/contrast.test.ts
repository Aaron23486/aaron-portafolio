import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Lee los tokens directamente del CSS para que la prueba siga al sistema de diseño real.
const css = readFileSync("src/app/globals.css", "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match?.[1]) throw new Error(`token no encontrado: ${name}`);
  return match[1];
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map(
    (start) => parseInt(hex.slice(start, start + 2), 16) / 255,
  );
  const [r, g, b] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  ) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

describe("contraste WCAG 2.2 AA de los tokens", () => {
  const backgrounds = ["midnight-navy", "deep-space", "surface-elevated"];
  const bodyText = ["mist-white", "ink-secondary", "ink-muted"];

  for (const background of backgrounds) {
    for (const text of bodyText) {
      it(`${text} sobre ${background} ≥ 4,5:1`, () => {
        expect(contrast(token(text), token(background))).toBeGreaterThanOrEqual(
          4.5,
        );
      });
    }
  }

  it("los acentos usados como texto pasan 4,5:1 sobre el fondo principal", () => {
    for (const accent of [
      "aurora-cyan",
      "aurora-teal",
      "soft-magenta",
      "violet-text",
    ]) {
      expect(
        contrast(token(accent), token("midnight-navy")),
        accent,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("el texto oscuro sobre el gradiente de los botones pasa 4,5:1 en sus tres paradas", () => {
    for (const stop of ["aurora-cyan", "electric-violet", "soft-magenta"]) {
      expect(
        contrast(token("midnight-navy"), token(stop)),
        stop,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
