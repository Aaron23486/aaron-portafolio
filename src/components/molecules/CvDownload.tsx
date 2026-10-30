import { Download, FileText } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import type { CvFile } from "@/types/content";

export interface CvDownloadProps {
  /** CV disponibles, el del idioma activo primero. Si está vacío no se muestra nada. */
  files: readonly CvFile[];
  primaryLabel: string;
  alternateLabel: string;
  format: string;
}

export function CvDownload({
  files,
  primaryLabel,
  alternateLabel,
  format,
}: CvDownloadProps) {
  const [primary, alternate] = files;
  if (!primary) return null;
  return (
    <div className="flex flex-col items-start gap-3">
      <Button href={primary.href} download hrefLang={primary.locale} size="lg">
        <Download aria-hidden="true" className="size-5" />
        {primaryLabel}
        <span className="sr-only">({format})</span>
      </Button>
      {alternate ? (
        <Link
          href={alternate.href}
          download
          hrefLang={alternate.locale}
          lang={alternate.locale}
          className="text-sage-gray hover:text-pearl-white inline-flex min-h-11 items-center gap-2 px-1 text-sm underline-offset-4 transition-colors hover:underline"
        >
          <FileText aria-hidden="true" className="size-4" />
          {alternateLabel}
          <span className="sr-only">({format})</span>
        </Link>
      ) : null}
    </div>
  );
}
