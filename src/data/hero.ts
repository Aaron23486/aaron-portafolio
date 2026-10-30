import type { Screenshot } from "@/types/content";

/** Capturas reales que forman la composición del Hero (fondo, centro y frente). */
export const heroShots: { label: string; shot: Screenshot }[] = [
  {
    label: "ddevoluciones",
    shot: {
      src: "/projects/ddevoluciones/devoluciones",
      width: 1600,
      height: 908,
      alt: {
        es: "Lista de devoluciones de DDEVOLUCIONES con resumen por estado (datos ficticios)",
        en: "DDEVOLUCIONES returns list with a summary by status (fictitious data)",
      },
    },
  },
  {
    label: "dactivos",
    shot: {
      src: "/projects/dactivos/activos",
      width: 1600,
      height: 907,
      alt: {
        es: "Inventario de activos de DACTIVOS por estado y categoría (datos ficticios)",
        en: "DACTIVOS asset inventory by status and category (fictitious data)",
      },
    },
  },
  {
    label: "dfacturas",
    shot: {
      src: "/projects/dfacturas/dashboard",
      width: 1600,
      height: 907,
      alt: {
        es: "Dashboard de DFACTURAS con indicadores y gráficos de despachos (datos ficticios)",
        en: "DFACTURAS dashboard with dispatch KPIs and charts (fictitious data)",
      },
    },
  },
];
