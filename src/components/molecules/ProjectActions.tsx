import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { GithubIcon } from "@/components/atoms/GithubIcon";

export interface ProjectActionsProps {
  repositoryUrl: string;
  label: string;
  accessibleLabel: string;
  newTabHint: string;
}

/** Única acción de un proyecto: abrir su repositorio público. Sin demos ni ejecución. */
export function ProjectActions({
  repositoryUrl,
  label,
  accessibleLabel,
  newTabHint,
}: ProjectActionsProps) {
  return (
    <Button
      href={repositoryUrl}
      newTabHint={newTabHint}
      variant="outline"
      aria-label={`${accessibleLabel} ${newTabHint}`}
      className="w-full justify-between border-(--accent)/40 group-hover/card:border-(--accent)/80 group-hover/card:bg-(--accent)/10 sm:w-auto"
    >
      <span className="inline-flex items-center gap-2">
        <GithubIcon className="size-4" />
        {label}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
      />
    </Button>
  );
}
