import type { TechnologyGroup } from "@/types/content";

/** Tecnologías aprobadas por el responsable (fuente: CV y repos). Sin herramientas de pentesting. */
export const technologyGroups: readonly TechnologyGroup[] = [
  {
    id: "frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    id: "backend",
    items: [
      "Node.js",
      "NestJS",
      "C# / .NET / ASP.NET",
      { es: "APIs REST", en: "REST APIs" },
    ],
  },
  {
    id: "data",
    items: ["PostgreSQL", "Supabase", "SQL Server", "Prisma", "Power BI"],
  },
  {
    id: "tools",
    items: ["Git", "GitHub", "Docker", "Linux", "n8n"],
  },
  {
    id: "practices",
    items: [
      { es: "Seguridad a nivel de fila (RLS)", en: "Row-level security (RLS)" },
      {
        es: "Pruebas con Playwright y Vitest",
        en: "Testing with Playwright and Vitest",
      },
      "Scrum",
    ],
  },
];
