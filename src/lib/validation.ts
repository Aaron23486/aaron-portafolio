import { siteConfig } from "@/data/site";
import type { Project } from "@/types/content";

const repositoryPattern = new RegExp(
  `^https://github\\.com/${siteConfig.githubUsername}/[A-Za-z0-9._-]+$`,
);

/** Solo se aceptan repositorios públicos del perfil del responsable, por HTTPS. */
export function isOwnRepositoryUrl(url: string): boolean {
  return repositoryPattern.test(url);
}

export function isMailto(href: string): boolean {
  return /^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(href);
}

/** Errores de integridad del catálogo; vacío si todo está bien. */
export function validateProjects(catalog: readonly Project[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const orders = new Set<number>();
  for (const project of catalog) {
    if (ids.has(project.id)) errors.push(`id duplicado: ${project.id}`);
    if (orders.has(project.order))
      errors.push(`orden duplicado: ${project.order}`);
    ids.add(project.id);
    orders.add(project.order);
    if (!isOwnRepositoryUrl(project.repositoryUrl)) {
      errors.push(
        `URL de repositorio no válida en ${project.id}: ${project.repositoryUrl}`,
      );
    }
    if (!project.cover.src.startsWith(`/projects/${project.id}/`)) {
      errors.push(
        `la captura de ${project.id} debe estar en /projects/${project.id}/`,
      );
    }
    if (project.technologies.length === 0)
      errors.push(`${project.id} no tiene tecnologías`);
  }
  return errors;
}
