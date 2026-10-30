import type { Locale } from "@/i18n/config";

/** Texto con una versión obligatoria por idioma: si falta una, no compila. */
export type Localized<T = string> = Record<Locale, T>;

export type SectionId =
  "home" | "projects" | "about" | "technologies" | "contact";

export type AccentToken = "emerald" | "jade" | "mint" | "seafoam";

export interface Screenshot {
  /** Ruta base en `public/` sin sufijo de ancho ni extensión, p. ej. `/projects/dactivos/dashboard`. */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export type ProjectIcon = "assets" | "returns" | "invoices" | "access";

export interface Project {
  id: string;
  name: string;
  repositoryUrl: string;
  subtitle: Localized;
  summary: Localized;
  technologies: readonly string[];
  cover: Screenshot;
  accent: AccentToken;
  icon: ProjectIcon;
  order: number;
  visible: boolean;
}

export type TechnologyGroupId =
  "frontend" | "backend" | "data" | "tools" | "practices";

export interface TechnologyGroup {
  id: TechnologyGroupId;
  items: readonly (string | Localized)[];
}

export interface CvFile {
  locale: Locale;
  href: string;
  /** Ruta del archivo dentro de `public/`, para comprobar en el build que existe. */
  publicPath: string;
}
