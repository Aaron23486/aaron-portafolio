import type { Project } from "@/types/content";

/**
 * Catálogo de proyectos. Lista cerrada: solo estos cuatro repositorios públicos.
 * Cada descripción y tecnología está verificada en el README y el package.json de su repo.
 * Para agregar o cambiar un proyecto basta con editar este archivo (ver README).
 */
export const projects: readonly Project[] = [
  {
    id: "dactivos",
    name: "DACTIVOS",
    repositoryUrl: "https://github.com/Aaron23486/dactivos",
    subtitle: {
      es: "Gestión de activos tecnológicos",
      en: "IT asset management",
    },
    summary: {
      es: "Controla el ciclo de vida de handhelds y computadoras: entregas, devoluciones con inspección física, mantenimiento con liberación verificada e historial de auditoría.",
      en: "Tracks the lifecycle of handhelds and computers: deliveries, returns with physical inspection, maintenance released only after a verified check, and an audit history.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
    ],
    cover: {
      src: "/projects/dactivos/dashboard",
      width: 1600,
      height: 908,
      alt: {
        es: "Dashboard de DACTIVOS con activos por estado y movimientos recientes (datos ficticios)",
        en: "DACTIVOS dashboard with assets by status and recent movements (fictitious data)",
      },
    },
    accent: "cyan",
    icon: "assets",
    order: 1,
    visible: true,
  },
  {
    id: "ddevoluciones",
    name: "DDEVOLUCIONES",
    repositoryUrl: "https://github.com/Aaron23486/ddevoluciones",
    subtitle: {
      es: "Trazabilidad de devoluciones",
      en: "Returns traceability",
    },
    summary: {
      es: "Sigue cada devolución de un centro de distribución, desde su registro con evidencia fotográfica hasta su cierre en inventario, con siete roles y un dashboard ejecutivo.",
      en: "Follows every return at a distribution center, from registration with photo evidence to its closure in inventory, with seven roles and an executive dashboard.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Recharts",
    ],
    cover: {
      src: "/projects/ddevoluciones/dashboard",
      width: 1600,
      height: 908,
      alt: {
        es: "Dashboard ejecutivo de DDEVOLUCIONES con indicadores, estado de la operación y tendencias (datos ficticios)",
        en: "DDEVOLUCIONES executive dashboard with KPIs, operation status and trends (fictitious data)",
      },
    },
    accent: "magenta",
    icon: "returns",
    order: 2,
    visible: true,
  },
  {
    id: "dfacturas",
    name: "DFACTURAS",
    repositoryUrl: "https://github.com/Aaron23486/dfacturas",
    subtitle: {
      es: "Control de despachos por factura",
      en: "Invoice dispatch control",
    },
    summary: {
      es: "Registra el despacho de cada factura con un flujo de doble escaneo, historial en tiempo real, cancelaciones con motivo y analítica con exportación a Excel.",
      en: "Records the dispatch of every invoice with a two-scan flow, a real-time history, cancellations with a reason, and analytics with Excel export.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Recharts",
    ],
    cover: {
      src: "/projects/dfacturas/despacho",
      width: 1600,
      height: 907,
      alt: {
        es: "Pantalla de despacho de DFACTURAS con formulario de escaneo e historial en tiempo real (datos ficticios)",
        en: "DFACTURAS dispatch screen with the scan form and real-time history (fictitious data)",
      },
    },
    accent: "violet",
    icon: "invoices",
    order: 3,
    visible: true,
  },
  {
    id: "dcontrol",
    name: "DCONTROL",
    repositoryUrl: "https://github.com/Aaron23486/dcontrol",
    subtitle: {
      es: "Control de ingreso y salida",
      en: "Entry and exit control",
    },
    summary: {
      es: "Registra en segundos la entrada y salida de personal externo por número de cédula, muestra quién está dentro y deja un historial auditable de cada visita.",
      en: "Records the entry and exit of external staff by ID number in seconds, shows who is inside, and keeps an auditable history of every visit.",
    },
    technologies: [
      "NestJS",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    cover: {
      src: "/projects/dcontrol/ingreso-y-salida",
      width: 1280,
      height: 800,
      alt: {
        es: "Pantalla de ingreso y salida de DCONTROL con las personas dentro y la actividad reciente (datos ficticios)",
        en: "DCONTROL entry and exit screen with people inside and recent activity (fictitious data)",
      },
    },
    accent: "teal",
    icon: "access",
    order: 4,
    visible: true,
  },
];

/** Proyectos visibles en el orden de presentación. */
export function getVisibleProjects(
  catalog: readonly Project[] = projects,
): Project[] {
  return catalog
    .filter((project) => project.visible)
    .toSorted((a, b) => a.order - b.order);
}
