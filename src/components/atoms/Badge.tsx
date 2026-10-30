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
          "border-border-subtle bg-obsidian/50 text-sage-gray",
        tone === "accent" &&
          "text-pearl-white border-(--accent)/40 bg-(--accent)/10",
        className,
      )}
    >
      {children}
    </span>
  );
}
