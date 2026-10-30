import { cn } from "@/lib/cn";

/** Logotipo tipográfico: monograma con borde Aurora + nombre. */
export function BrandMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="aurora-border bg-deep-space font-display grid size-9 place-items-center rounded-xl text-sm font-bold tracking-tight"
      >
        <span className="text-gradient">AG</span>
      </span>
      <span className="font-display text-mist-white text-base font-semibold tracking-tight">
        {name}
      </span>
    </span>
  );
}
