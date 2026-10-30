import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Etiqueta pequeña sobre los títulos: punto luminoso + mayúsculas espaciadas. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-neo-emerald inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.28em] uppercase",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-neo-emerald size-1.5 rounded-full shadow-[0_0_12px_2px_rgb(50_230_161/0.8)]"
      />
      {children}
    </p>
  );
}

export interface GradientHeadingProps {
  as?: "h1" | "h2";
  lead: string;
  highlight: string;
  id?: string;
  className?: string;
}

/** Título con la parte destacada en el gradiente principal. */
export function GradientHeading({
  as: Tag = "h2",
  lead,
  highlight,
  id,
  className,
}: GradientHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-display text-pearl-white font-semibold tracking-tight text-balance",
        Tag === "h1"
          ? "text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[1.04]"
          : "text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08]",
        className,
      )}
    >
      {lead} <span className="text-gradient">{highlight}</span>
    </Tag>
  );
}

export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sage-gray text-base leading-relaxed text-pretty sm:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}
