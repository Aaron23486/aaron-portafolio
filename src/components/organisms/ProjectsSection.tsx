import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types/content";
import { ProjectCard } from "./ProjectCard";

export interface ProjectsSectionProps {
  locale: Locale;
  projects: readonly Project[];
  labels: Dictionary["projects"];
  newTabHint: string;
}

export function ProjectsSection({
  locale,
  projects,
  labels,
  newTabHint,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1500px]">
        <SectionHeading
          id="projects-title"
          eyebrow={labels.eyebrow}
          lead={labels.titleLead}
          highlight={labels.titleHighlight}
          description={labels.description}
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8 2xl:grid-cols-4 2xl:gap-6">
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectCard
                project={project}
                locale={locale}
                labels={labels}
                newTabHint={newTabHint}
                revealDelay={(index % 2) * 120}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
