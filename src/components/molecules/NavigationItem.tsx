import { cn } from "@/lib/cn";

export interface NavigationItemProps {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  variant?: "bar" | "menu";
}

/** Enlace de navegación con indicador de sección activa (subrayado Aurora). */
export function NavigationItem({
  href,
  label,
  active,
  onNavigate,
  variant = "bar",
}: NavigationItemProps) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      aria-current={active ? "location" : undefined}
      className={cn(
        "relative inline-flex items-center transition-colors duration-300",
        variant === "bar" &&
          "after:bg-aurora min-h-11 px-3 text-sm font-medium after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-500 after:ease-(--ease-aurora)",
        variant === "bar" &&
          (active
            ? "text-mist-white after:scale-x-100"
            : "text-ink-secondary hover:text-mist-white after:scale-x-0"),
        variant === "menu" &&
          "font-display min-h-12 w-full rounded-xl px-4 text-lg font-medium",
        variant === "menu" &&
          (active
            ? "bg-surface-elevated text-mist-white"
            : "text-ink-secondary hover:bg-surface-elevated/60 hover:text-mist-white"),
      )}
    >
      {label}
    </a>
  );
}
