import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { heroShots } from "@/data/hero";
import { getVisibleProjects, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { technologyGroups } from "@/data/technologies";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import es from "@/i18n/dictionaries/es";
import { screenshotWidths } from "@/lib/images";
import {
  isMailto,
  isOwnRepositoryUrl,
  validateProjects,
} from "@/lib/validation";

/** Rutas de claves de un objeto, incluidos los índices de arreglos. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value))
    return value.flatMap((item, index) =>
      keyPaths(item, `${prefix}[${index}]`),
    );
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function stringValues(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringValues);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(stringValues);
  return [];
}

describe("diccionarios", () => {
  it("español e inglés tienen exactamente las mismas claves", () => {
    expect(keyPaths(en).toSorted()).toEqual(keyPaths(es).toSorted());
  });

  it("ningún texto está vacío", () => {
    for (const locale of locales) {
      for (const text of stringValues(getDictionary(locale)))
        expect(text.trim()).not.toBe("");
    }
  });

  it("los textos traducidos no se quedaron iguales por descuido", () => {
    expect(en.hero.titleLead).not.toBe(es.hero.titleLead);
    expect(en.projects.viewRepository).toBe("View repository");
    expect(es.projects.viewRepository).toBe("Ver repositorio");
  });
});

describe("catálogo de proyectos", () => {
  it("muestra exactamente los cuatro proyectos autorizados, en orden", () => {
    expect(getVisibleProjects().map((project) => project.id)).toEqual([
      "dactivos",
      "ddevoluciones",
      "dfacturas",
      "dcontrol",
    ]);
  });

  it("cada repositorio es una URL pública del perfil del responsable", () => {
    for (const project of projects) {
      expect(project.repositoryUrl).toBe(
        `https://github.com/Aaron23486/${project.id}`,
      );
    }
    expect(validateProjects(projects)).toEqual([]);
  });

  it("la validación rechaza URL ajenas, duplicados y capturas fuera de su carpeta", () => {
    const first = projects[0]!;
    const broken = [
      { ...first, repositoryUrl: "http://github.com/Aaron23486/dactivos" },
      { ...first, repositoryUrl: "https://github.com/otro/dactivos" },
      { ...first, cover: { ...first.cover, src: "/projects/otro/x" } },
    ];
    expect(validateProjects(broken).length).toBeGreaterThanOrEqual(5);
    expect(
      isOwnRepositoryUrl("https://github.com/Aaron23486/dactivos/../x"),
    ).toBe(false);
  });

  it("todas las capturas usadas existen en public/ en cada ancho", () => {
    const shots = [
      ...projects.map((project) => project.cover),
      ...heroShots.map((item) => item.shot),
    ];
    for (const shot of shots) {
      for (const width of screenshotWidths) {
        expect(
          existsSync(join("public", `${shot.src}-${width}.webp`)),
          `${shot.src}-${width}`,
        ).toBe(true);
      }
      for (const locale of locales)
        expect(shot.alt[locale].length).toBeGreaterThan(10);
    }
  });

  it("el nombre «CEDI Control» no aparece en el contenido", () => {
    const content = JSON.stringify({ projects, es, en, heroShots });
    expect(content).not.toMatch(/cedi\s*control/i);
  });
});

describe("contacto y datos sensibles", () => {
  it("el correo es un mailto válido", () => {
    expect(isMailto(`mailto:${siteConfig.email}`)).toBe(true);
    expect(siteConfig.email).toBe("aaron20770@gmail.com");
  });

  it("no hay LinkedIn, teléfonos ni empresas reales en el código fuente", () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path);
        else files.push(path);
      }
    };
    walk("src");
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toMatch(/linkedin/i);
      expect(text, file).not.toMatch(/\+506|\d{4}-\d{4}/);
    }
  });

  it("no hay herramientas de pentesting en Tecnologías", () => {
    const items = JSON.stringify(technologyGroups);
    expect(items).not.toMatch(/nmap|metasploit|burp|nessus|wireshark/i);
  });
});
