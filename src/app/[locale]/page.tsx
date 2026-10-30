import { notFound } from "next/navigation";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { getVisibleProjects, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { technologyGroups } from "@/data/technologies";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { getAvailableCvFiles } from "@/lib/cv";
import { validateProjects } from "@/lib/validation";

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Un catálogo inválido (URL ajena, id duplicado…) detiene el build en lugar de publicarse.
  const errors = validateProjects(projects);
  if (errors.length > 0)
    throw new Error(`Catálogo de proyectos inválido:\n${errors.join("\n")}`);

  return (
    <PortfolioTemplate
      locale={locale}
      dictionary={getDictionary(locale)}
      site={siteConfig}
      projects={getVisibleProjects()}
      technologyGroups={technologyGroups}
      cvFiles={getAvailableCvFiles(locale)}
    />
  );
}
