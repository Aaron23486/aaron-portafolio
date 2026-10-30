import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon } from "@/components/atoms/GithubIcon";
import { Link } from "@/components/atoms/Link";
import { cn } from "@/lib/cn";

/** Únicos canales de contacto autorizados por el responsable: GitHub y correo. */
export type SocialKind = "github" | "email";

export interface SocialLinkProps {
  kind: SocialKind;
  href: string;
  label: string;
  newTabHint?: string;
  showLabel?: boolean;
  className?: string;
}

const icons: Record<SocialKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  email: Mail,
};

export function SocialLink({
  kind,
  href,
  label,
  newTabHint,
  showLabel = false,
  className,
}: SocialLinkProps) {
  const Icon = icons[kind];
  return (
    <Link
      href={href}
      newTabHint={newTabHint}
      aria-label={showLabel ? undefined : label}
      className={cn(
        "text-ink-secondary hover:text-mist-white inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full transition-colors duration-300",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-5 shrink-0" />
      {showLabel ? <span>{label}</span> : null}
    </Link>
  );
}
