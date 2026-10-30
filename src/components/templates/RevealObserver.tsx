"use client";

import { useEffect } from "react";

/**
 * Revela los elementos `[data-reveal]` al entrar en pantalla. Un solo observador
 * para toda la página; sin JavaScript el CSS los deja visibles.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-revealed])",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
