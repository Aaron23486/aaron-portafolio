import type { Dictionary } from "@/i18n";
import type { SectionId } from "@/types/content";

/** Secciones de la página en orden. Los `id` son iguales en ambos idiomas para conservar el ancla al cambiar de idioma. */
export const sections: readonly {
  id: SectionId;
  label: keyof Dictionary["nav"];
}[] = [
  { id: "home", label: "home" },
  { id: "projects", label: "projects" },
  { id: "about", label: "about" },
  { id: "technologies", label: "technologies" },
  { id: "contact", label: "contact" },
];
