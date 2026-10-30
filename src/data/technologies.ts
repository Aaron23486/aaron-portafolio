import type { TechnologyGroup } from "@/types/content";

/**
 * Tecnologías aprobadas por el responsable (fuentes: CV y repositorios).
 * Sin herramientas de escaneo ni de hacking: se sustituyeron por prácticas de seguridad
 * aplicadas en los proyectos (decisión del 2026-10-30).
 */
export const technologyGroups: readonly TechnologyGroup[] = [
  {
    id: "frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
    ],
  },
  {
    id: "backend",
    items: [
      "Node.js",
      "NestJS",
      "C# / .NET / ASP.NET",
      "Python",
      { es: "APIs REST", en: "REST APIs" },
    ],
  },
  {
    id: "data",
    items: [
      "PostgreSQL",
      "Supabase",
      "SQL Server",
      "Prisma",
      "Power BI",
      "Excel",
    ],
  },
  {
    id: "ai",
    items: [
      { es: "Desarrollo asistido por IA", en: "AI-assisted development" },
      { es: "Programación agéntica", en: "Agentic programming" },
      "SDD — Spec-Driven Development",
      "TDD — Test-Driven Development",
      "MCP — Model Context Protocol",
      "n8n",
    ],
  },
  {
    id: "tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Linux",
      "PowerShell",
      "Bash",
      "VPS",
      "AppSheet",
    ],
  },
  {
    id: "practices",
    items: [
      { es: "Seguridad a nivel de fila (RLS)", en: "Row-level security (RLS)" },
      { es: "Control de acceso por roles", en: "Role-based access control" },
      "MFA / 2FA",
      "OWASP Top 10",
      {
        es: "Pruebas con Playwright y Vitest",
        en: "Testing with Playwright and Vitest",
      },
      "Scrum / Agile",
    ],
  },
];
