import { cn } from "@/lib/cn";

export interface NavigationItemProps {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  variant?: "bar" | "menu";
}

/** Enlace de navegación con indicador de sección activa (subrayado con el gradiente). */
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
          "after:bg-brand-gradient min-h-11 px-3 text-sm font-medium after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-500 after:ease-(--ease-smooth)",
        variant === "bar" &&
          (active
            ? "text-pearl-white after:scale-x-100"
            : "text-sage-gray hover:text-pearl-white after:scale-x-0"),
        variant === "menu" &&
          "font-display min-h-12 w-full rounded-xl px-4 text-lg font-medium",
        variant === "menu" &&
          (active
            ? "bg-surface-elevated text-pearl-white"
            : "text-sage-gray hover:bg-surface-elevated/60 hover:text-pearl-white"),
      )}
    >
      {label}
    </a>
  );
}
