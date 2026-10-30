import type { CvFile } from "@/types/content";

/**
 * Datos personales y enlaces del sitio. Es el único lugar donde se cambian.
 * Solo datos autorizados por el responsable: no agregar teléfono, dirección ni otras redes.
 */
export const siteConfig = {
  name: "Aarón Gutiérrez Morales",
  shortName: "Aarón Gutiérrez",
  githubUsername: "Aaron23486",
  githubUrl: "https://github.com/Aaron23486",
  email: "aaron20770@gmail.com",
  /** URL pública del sitio; se define en Vercel con `SITE_URL` al publicar. */
  url: process.env.SITE_URL ?? "http://localhost:4173",
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
