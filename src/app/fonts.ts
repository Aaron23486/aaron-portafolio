import { Inter, Sora } from "next/font/google";

// next/font descarga las fuentes en el build y las sirve desde el propio sitio (sin peticiones a Google).
export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${sora.variable} ${inter.variable}`;
