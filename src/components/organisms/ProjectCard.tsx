import {
  MonitorSmartphone,
  ReceiptText,
  ScanLine,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { ProjectActions } from "@/components/molecules/ProjectActions";
import { Spotlight } from "@/components/molecules/Spotlight";
import { TechnologyBadgeList } from "@/components/molecules/TechnologyBadgeList";
import { format, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { screenshotSrc, screenshotSrcSet } from "@/lib/images";
import type { AccentToken, Project, ProjectIcon } from "@/types/content";

const accents: Record<AccentToken, string> = {
  emerald: "var(--color-neo-emerald)",
  jade: "var(--color-jade)",
  mint: "var(--color-mint-glow)",
  seafoam: "var(--color-seafoam)",
};

const icons: Record<ProjectIcon, LucideIcon> = {
  assets: MonitorSmartphone,
  returns: Undo2,
  invoices: ReceiptText,
  access: ScanLine,
};

export interface ProjectCardProps {
  project: Project;
  locale: Locale;
  labels: Dictionary["projects"];
  newTabHint: string;
  revealDelay?: number;
}

export function ProjectCard({
  project,
  locale,
  labels,
  newTabHint,
  revealDelay = 0,
}: ProjectCardProps) {
  const Icon = icons[project.icon];
  const titleId = `project-${project.id}`;
  const style = {
    "--accent": accents[project.accent],
    "--reveal-delay": `${revealDelay}ms`,
  } as CSSProperties;

  return (
    <article
      aria-labelledby={titleId}
      data-reveal
      style={style}
      className="group/card border-border-subtle bg-emerald-surface/70 shadow-card relative h-full rounded-(--radius-card) border transition-[transform,border-color,box-shadow] duration-500 ease-(--ease-smooth) hover:border-(--accent)/55 hover:shadow-[0_30px_80px_-30px_var(--accent)] motion-safe:hover:-translate-y-1.5"
    >
      <Spotlight className="flex h-full flex-col gap-5 rounded-(--radius-card) p-5 sm:p-6">
        <header className="relative flex items-center gap-4">
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-2xl border border-(--accent)/40 bg-(--accent)/12 text-(--accent) shadow-[0_0_24px_-6px_var(--accent)]"
          >
            <Icon className="size-6" />
          </span>
          <div className="min-w-0">
            <h3
              id={titleId}
              className="font-display text-pearl-white text-xl font-semibold tracking-wide"
            >
              {project.name}
            </h3>
            <p className="text-sage-gray text-sm">{project.subtitle[locale]}</p>
          </div>
        </header>

        <div className="border-border-subtle bg-obsidian relative overflow-hidden rounded-2xl border">
          {/* eslint-disable-next-line @next/next/no-img-element -- exportación estática con WebP pregenerado y srcset propio */}
          <img
            src={screenshotSrc(project.cover)}
            srcSet={screenshotSrcSet(project.cover)}
            sizes="(min-width: 1536px) 360px, (min-width: 768px) 46vw, 92vw"
            width={project.cover.width}
            height={project.cover.height}
            alt={project.cover.alt[locale]}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover object-top transition-transform duration-700 ease-(--ease-smooth) motion-safe:group-hover/card:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="from-obsidian/50 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>

        <p className="text-sage-gray relative text-[0.95rem] leading-relaxed text-pretty">
          {project.summary[locale]}
        </p>

        <div className="relative mt-auto flex flex-col gap-5">
          <TechnologyBadgeList
            label={format(labels.technologiesLabel, { name: project.name })}
            items={project.technologies}
          />
          <div className="border-border-subtle flex flex-col items-stretch gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-ink-muted text-xs font-semibold tracking-[0.2em] uppercase">
              {labels.webApp}
            </span>
            <ProjectActions
              repositoryUrl={project.repositoryUrl}
              label={labels.viewRepository}
              accessibleLabel={format(labels.repositoryOf, {
                name: project.name,
              })}
              newTabHint={newTabHint}
            />
          </div>
        </div>
      </Spotlight>
    </article>
  );
}
