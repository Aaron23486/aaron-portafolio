// Sirve la exportación estática (`out/`) en local, sin dependencias externas.
// Uso: npm run build && npm start  →  http://localhost:4173
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

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
  const decoded = decodeURIComponent(urlPath.split("?")[0] ?? "/");
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
    if (notFound) createReadStream(notFound).pipe(res);
    else res.end("404");
    return;
  }
  res.writeHead(200, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Sirviendo out/ en http://localhost:${port}`);
});
