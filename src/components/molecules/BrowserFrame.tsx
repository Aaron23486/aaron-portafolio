import { screenshotSrc, screenshotSrcSet } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";
import type { Screenshot } from "@/types/content";

export interface BrowserFrameProps {
  shot: Screenshot;
  locale: Locale;
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/** Marco de navegador con una captura real. El texto de la barra es el nombre del proyecto. */
export function BrowserFrame({
  shot,
  locale,
  label,
  sizes,
  priority = false,
  className,
  imageClassName,
}: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        "border-border-strong bg-deep-space shadow-card overflow-hidden rounded-2xl border",
        className,
      )}
    >
      <div className="border-border-subtle bg-midnight-navy/80 flex items-center gap-2 border-b px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="bg-soft-magenta/70 size-2.5 rounded-full" />
          <span className="bg-electric-violet/70 size-2.5 rounded-full" />
          <span className="bg-aurora-cyan/70 size-2.5 rounded-full" />
        </span>
        <figcaption className="bg-deep-space text-ink-muted ml-2 truncate rounded-md px-2 py-0.5 font-mono text-[0.65rem] tracking-wide">
          {label}
        </figcaption>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- exportación estática con WebP pregenerado y srcset propio */}
      <img
        src={screenshotSrc(shot)}
        srcSet={screenshotSrcSet(shot)}
        sizes={sizes}
        width={shot.width}
        height={shot.height}
        alt={shot.alt[locale]}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("block h-auto w-full", imageClassName)}
      />
    </figure>
  );
}
