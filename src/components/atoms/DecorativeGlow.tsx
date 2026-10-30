import { cn } from "@/lib/cn";

type GlowColor = "cyan" | "violet" | "magenta";

const colors: Record<GlowColor, string> = {
  cyan: "bg-[radial-gradient(closest-side,rgb(79_209_255/0.45),transparent)]",
  violet:
    "bg-[radial-gradient(closest-side,rgb(139_108_255/0.45),transparent)]",
  magenta:
    "bg-[radial-gradient(closest-side,rgb(214_107_255/0.38),transparent)]",
};

export interface DecorativeGlowProps {
  color?: GlowColor;
  className?: string;
  /** Movimiento ambiental lento; se desactiva con movimiento reducido. */
  drift?: boolean;
}

/** Halo de luz decorativo. Gradiente radial sin `filter: blur` para no penalizar el rendimiento. */
export function DecorativeGlow({
  color = "cyan",
  className,
  drift = false,
}: DecorativeGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        colors[color],
        drift && "animate-aurora-drift",
        className,
      )}
    />
  );
}
