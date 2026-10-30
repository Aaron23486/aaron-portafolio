"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Luz que sigue al cursor dentro de una tarjeta (solo puntero fino; en táctil no hace nada). */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`,
    );
  }

  return (
    <div onPointerMove={onPointerMove} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] group-hover/card:opacity-100"
      />
      {children}
    </div>
  );
}
