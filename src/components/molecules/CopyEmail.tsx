"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export interface CopyEmailProps {
  email: string;
  label: string;
  copiedLabel: string;
}

/** Copia el correo al portapapeles, para quien no use Gmail en el navegador. */
export function CopyEmail({ email, label, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Sin permiso de portapapeles: el correo sigue visible para copiarlo a mano.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-ink-secondary hover:text-mist-white inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs transition-colors"
    >
      {copied ? (
        <Check aria-hidden="true" className="text-aurora-teal size-4" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
