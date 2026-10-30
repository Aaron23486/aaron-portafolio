// Sirve la exportación estática (`out/`) en local, sin dependencias externas.
// Uso: npm run build && npm start  →  http://localhost:4173
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { pipeline } from "node:stream";
import { createBrotliCompress, createGzip } from "node:zlib";

const root = resolve("out");
const port = Number(process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  } catch {
    return null; // URL mal formada: se responde 404 en lugar de caer.
  }
  const candidate = normalize(join(root, decoded));
  // Nunca servir fuera de `out/`.
  if (!candidate.startsWith(root)) return null;
  for (const path of [
    candidate,
    join(candidate, "index.html"),
    `${candidate}.html`,
  ]) {
    try {
      if (statSync(path).isFile()) return path;
    } catch {
      // Probar la siguiente forma de la ruta.
    }
  }
  return null;
}

createServer((req, res) => {
  const file = resolveFile(req.url ?? "/");
  if (!file) {
    const notFound = resolveFile("/404.html");
    res.writeHead(404, { "content-type": types[".html"] });
    if (notFound) pipeline(createReadStream(notFound), res, () => {});
    else res.end("404");
    return;
  }
  const type = types[extname(file)] ?? "application/octet-stream";
  // Comprime el texto como lo hace Vercel, para que las mediciones locales sean representativas.
  const accepts = String(req.headers["accept-encoding"] ?? "");
  const compressible = /^(text|application\/(json|xml)|image\/svg)/.test(type);
  let encoding = null;
  if (compressible && accepts.includes("br")) encoding = "br";
  else if (compressible && accepts.includes("gzip")) encoding = "gzip";
  res.writeHead(200, {
    "content-type": type,
    ...(encoding
      ? { "content-encoding": encoding, vary: "accept-encoding" }
      : {}),
  });
  const steps = [createReadStream(file)];
  if (encoding === "br") steps.push(createBrotliCompress());
  else if (encoding === "gzip") steps.push(createGzip());
  // `pipeline` cierra todo si el navegador corta la descarga, sin tumbar el servidor.
  pipeline(...steps, res, () => {});
}).listen(port, () => {
  console.log(`Sirviendo out/ en http://localhost:${port}`);
});
