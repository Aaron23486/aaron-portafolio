import type { Metadata } from "next";
import { localePath } from "@/i18n/config";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Aurora Digital",
  description: "Página no encontrada / Page not found",
};

/** 404 bilingüe para cualquier ruta inexistente. */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${fontVariables} h-full`}>
      <body className="grid min-h-full place-items-center px-6 text-center">
        <main className="flex flex-col items-center gap-6">
          <p className="text-gradient font-display text-7xl font-semibold">
            404
          </p>
          <h1 className="font-display text-2xl font-semibold">
            Página no encontrada
          </h1>
          <p lang="en" className="text-ink-secondary">
            Page not found
          </p>
          <div className="flex gap-3">
            <a
              href={localePath("es")}
              hrefLang="es"
              className="bg-aurora text-midnight-navy rounded-full px-6 py-3 font-semibold"
            >
              Ir al inicio
            </a>
            <a
              href={localePath("en")}
              hrefLang="en"
              lang="en"
              className="border-border-strong rounded-full border px-6 py-3 font-semibold"
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
