import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
> {
  href: string;
  children: ReactNode;
  /** Texto para lectores de pantalla que avisa de la pestaña nueva; si existe, el enlace es externo. */
  newTabHint?: string;
}

/** Enlace base: los externos se abren en otra pestaña de forma segura y lo anuncian. */
export function Link({ href, children, newTabHint, ...rest }: LinkProps) {
  if (!newTabHint) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> {newTabHint}</span>
    </a>
  );
}
