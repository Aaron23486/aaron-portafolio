"use client";

import { useEffect, useState } from "react";

/** Devuelve el `id` de la sección que ocupa la franja central de la pantalla. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        const top = visible.toSorted(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0];
        if (top) setActive(top.target.id);
      },
      // Franja horizontal en el 40 % superior de la ventana.
      { rootMargin: "-35% 0px -60% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
