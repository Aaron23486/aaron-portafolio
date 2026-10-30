// Convierte las capturas reales de los cuatro repositorios a WebP optimizado.
// Solo cambia formato y tamaño: nunca recorta ni altera el contenido.
// Uso: npm run images  (requiere las copias locales de los repos; ver README).
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import sharp from "sharp";

const reposRoot = resolve(process.env.REPOS_ROOT ?? "..");
const outRoot = resolve("public/projects");
const widths = [800, 1600];

/** Capturas usadas por el portafolio: [repo, carpeta local, archivo de origen, nombre de salida]. */
const sources = [
  [
    "dactivos",
    "dactivos",
    "docs/screenshots/dactivos-dashboard.png",
    "dashboard",
  ],
  ["dactivos", "dactivos", "docs/screenshots/dactivos-activos.png", "activos"],
  ["ddevoluciones", "ddevoluciones", "docs/images/dashboard.png", "dashboard"],
  [
    "ddevoluciones",
    "ddevoluciones",
    "docs/images/devoluciones.png",
    "devoluciones",
  ],
  ["dfacturas", "dfacturas", "docs/images/dfacturas-dispatch.png", "despacho"],
  [
    "dfacturas",
    "dfacturas",
    "docs/images/dfacturas-dashboard.png",
    "dashboard",
  ],
  [
    "dcontrol",
    "cedi-control",
    "docs/screenshots/02-ingreso-y-salida.png",
    "ingreso-y-salida",
  ],
];

for (const [repo, folder, file, name] of sources) {
  const input = join(reposRoot, folder, file);
  const meta = await sharp(input).metadata();
  for (const width of widths) {
    const output = join(outRoot, repo, `${name}-${width}.webp`);
    mkdirSync(dirname(output), { recursive: true });
    const info = await sharp(input)
      .resize({
        width: Math.min(width, meta.width ?? width),
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(output);
    console.log(
      `${repo}/${name}-${width}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`,
    );
  }
}
