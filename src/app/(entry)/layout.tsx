import type { Metadata } from "next";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Aarón Gutiérrez Morales — Portafolio / Portfolio",
  robots: { index: false, follow: true },
};

/** Layout mínimo de la raíz `/`, que solo redirige al idioma del visitante. */
export default function EntryLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fontVariables} h-full`}>
      <body className="grid min-h-full place-items-center">{children}</body>
    </html>
  );
}
