import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors duration-300",
        tone === "default" &&
          "border-border-subtle bg-midnight-navy/50 text-ink-secondary",
        tone === "accent" &&
          "text-mist-white border-(--accent)/40 bg-(--accent)/10",
        className,
      )}
    >
      {children}
    </span>
  );
}
