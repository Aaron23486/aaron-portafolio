import { ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/atoms/BrandMark";
import { SocialLink } from "@/components/molecules/SocialLink";
import type { Dictionary } from "@/i18n";

export interface FooterProps {
  name: string;
  githubUrl: string;
  email: string;
  footer: Dictionary["footer"];
  a11y: Dictionary["a11y"];
  githubLabel: string;
}

export function Footer({
  name,
  githubUrl,
  email,
  footer,
  a11y,
  githubLabel,
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-border-subtle border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-2">
          <BrandMark name={name} />
          <p className="text-ink-muted text-sm">{footer.role}</p>
        </div>
        <div className="text-ink-muted flex flex-col gap-1 text-sm md:items-center">
          <p>
            © {year} {name}. {footer.rights}
          </p>
          <p>{footer.builtWith}</p>
        </div>
        <div className="flex items-center gap-1">
          <SocialLink
            kind="github"
            href={githubUrl}
            label={githubLabel}
            newTabHint={a11y.opensInNewTab}
          />
          <SocialLink kind="email" href={`mailto:${email}`} label={email} />
          <a
            href="#home"
            className="border-border-subtle text-ink-secondary hover:border-aurora-cyan/60 hover:text-mist-white ml-2 grid size-11 place-items-center rounded-full border transition-colors"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            <span className="sr-only">{a11y.backToTop}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
