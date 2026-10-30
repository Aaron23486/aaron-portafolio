import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarón Gutiérrez Morales — Desarrollador de Software",
  description:
    "Portafolio de Aarón Gutiérrez Morales, desarrollador de software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
