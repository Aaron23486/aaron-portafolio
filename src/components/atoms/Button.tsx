import { cn } from "@/lib/cn";
import { Link, type LinkProps } from "./Link";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const base =
  "group/button inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-(--ease-smooth) active:scale-[0.97] motion-safe:hover:-translate-y-0.5";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-obsidian shadow-[0_10px_30px_-10px_rgb(50_230_161/0.7)] hover:shadow-[0_14px_40px_-10px_rgb(31_185_128/0.85)]",
  outline:
    "border border-border-strong bg-obsidian/40 text-pearl-white backdrop-blur hover:border-neo-emerald/70 hover:shadow-glow",
  ghost: "text-sage-gray hover:text-pearl-white",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export interface ButtonProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Botón de acción. Todas las acciones del sitio navegan, así que siempre es un enlace. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  );
}
