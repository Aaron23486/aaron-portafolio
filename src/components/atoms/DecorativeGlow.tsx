import { cn } from "@/lib/cn";

type GlowColor = "emerald" | "jade" | "mint";

const colors: Record<GlowColor, string> = {
  emerald:
    "bg-[radial-gradient(closest-side,rgb(50_230_161/0.45),transparent)]",
  jade: "bg-[radial-gradient(closest-side,rgb(31_185_128/0.45),transparent)]",
  mint: "bg-[radial-gradient(closest-side,rgb(124_255_198/0.38),transparent)]",
};

export interface DecorativeGlowProps {
  color?: GlowColor;
  className?: string;
  /** Movimiento ambiental lento; se desactiva con movimiento reducido. */
  drift?: boolean;
}

/** Halo de luz decorativo. Gradiente radial sin `filter: blur` para no penalizar el rendimiento. */
export function DecorativeGlow({
  color = "emerald",
  className,
  drift = false,
}: DecorativeGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        colors[color],
        drift && "animate-glow-drift",
        className,
      )}
    />
  );
}
