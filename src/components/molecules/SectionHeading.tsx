import { Eyebrow, GradientHeading, Lead } from "@/components/atoms/Typography";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  lead: string;
  highlight: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  lead,
  highlight,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <header
      data-reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <GradientHeading id={id} lead={lead} highlight={highlight} />
      {description ? <Lead>{description}</Lead> : null}
    </header>
  );
}
