import type { CvFile } from "@/types/content";

/**
 * Datos personales y enlaces del sitio. Es el único lugar donde se cambian.
 * Solo datos autorizados por el responsable. Contacto: únicamente el correo (el teléfono y
 * el domicilio completo van solo dentro de los PDF del CV). Ubicación pública: solo provincia y país.
 */
export const siteConfig = {
  name: "Aarón Gutiérrez Morales",
  shortName: "Aarón Gutiérrez",
  githubUsername: "Aaron23486",
  githubUrl: "https://github.com/Aaron23486",
  email: "aaron20770@gmail.com",
  location: "Alajuela, Costa Rica",
  /**
   * URL pública del sitio. Prioridad: `SITE_URL` (dominio propio), luego el dominio de
   * producción que Vercel expone en el build y, en local, el servidor de vista previa.
   */
  url:
    process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:4173"),
} as const;

export const cvFiles: readonly CvFile[] = [
  {
    locale: "es",
    href: "/cv/aaron-gutierrez-es.pdf",
    publicPath: "cv/aaron-gutierrez-es.pdf",
  },
  {
    locale: "en",
    href: "/cv/aaron-gutierrez-en.pdf",
    publicPath: "cv/aaron-gutierrez-en.pdf",
  },
];
