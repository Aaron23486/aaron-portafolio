// Genera las imágenes Open Graph (1200×630) de cada idioma a partir de un SVG con la estética Aurora.
// Uso: npm run og
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const copy = {
  es: {
    role: "Desarrollador de Software",
    line: "Aplicaciones reales para necesidades reales.",
  },
  en: { role: "Software Developer", line: "Real applications for real needs." },
};

const svg = ({ role, line }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#4FD1FF"/><stop offset="0.52" stop-color="#8B6CFF"/><stop offset="1" stop-color="#D66BFF"/>
    </linearGradient>
    <radialGradient id="a1" cx="0.25" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#4FD1FF" stop-opacity="0.45"/><stop offset="1" stop-color="#08111F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a2" cx="0.85" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#D66BFF" stop-opacity="0.4"/><stop offset="1" stop-color="#08111F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a3" cx="0.6" cy="0.55" r="0.5">
      <stop offset="0" stop-color="#8B6CFF" stop-opacity="0.35"/><stop offset="1" stop-color="#08111F" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#08111F"/>
  <rect width="1200" height="630" fill="url(#a1)"/>
  <rect width="1200" height="630" fill="url(#a2)"/>
  <rect width="1200" height="630" fill="url(#a3)"/>
  <path d="M-20 470 C 300 330, 560 520, 820 400 S 1150 280, 1220 320" fill="none" stroke="url(#g)" stroke-width="2.5" opacity="0.8"/>
  <path d="M0 560 L140 500 L260 540 L380 470 L520 545 L640 500 L760 560 L900 480 L1030 545 L1150 500 L1200 520 L1200 630 L0 630 Z" fill="#0F1F33"/>
  <path d="M0 560 L140 500 L260 540 L380 470 L520 545 L640 500 L760 560 L900 480 L1030 545 L1150 500 L1200 520" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.7"/>
  <rect x="80" y="86" width="72" height="72" rx="20" fill="#0F1F33" stroke="url(#g)" stroke-width="3"/>
  <text x="116" y="133" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="url(#g)">AG</text>
  <text x="176" y="132" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6" fill="#4FD1FF">AURORA DIGITAL</text>
  <text x="80" y="268" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#EAF4FF">Aarón Gutiérrez Morales</text>
  <text x="80" y="336" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="url(#g)">${role}</text>
  <text x="80" y="404" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#B9CAE0">${line}</text>
</svg>`;

mkdirSync("public/og", { recursive: true });
for (const [locale, text] of Object.entries(copy)) {
  const file = `public/og/og-${locale}.png`;
  await sharp(Buffer.from(svg(text)))
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(`generado ${file}`);
}
