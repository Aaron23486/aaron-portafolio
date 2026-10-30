import { existsSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const projects = [
  { name: "DACTIVOS", repo: "https://github.com/Aaron23486/dactivos" },
  {
    name: "DDEVOLUCIONES",
    repo: "https://github.com/Aaron23486/ddevoluciones",
  },
  { name: "DFACTURAS", repo: "https://github.com/Aaron23486/dfacturas" },
  { name: "DCONTROL", repo: "https://github.com/Aaron23486/dcontrol" },
];

const locales = {
  es: {
    title: /Desarrollador de Software/,
    h1: /problemas reales/,
    button: "Ver repositorio",
    cv: "Descargar CV en español",
  },
  en: {
    title: /Software Developer/,
    h1: /real problems/,
    button: "View repository",
    cv: "Download English CV",
  },
} as const;

const cvBuilt =
  existsSync("out/cv/aaron-gutierrez-es.pdf") &&
  existsSync("out/cv/aaron-gutierrez-en.pdf");

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

for (const [locale, copy] of Object.entries(locales)) {
  test.describe(`idioma ${locale}`, () => {
    test("muestra el contenido completo, sin errores de consola", async ({
      page,
    }) => {
      const errors = collectConsoleErrors(page);
      await page.goto(`/${locale}/`);
      await expect(page).toHaveTitle(copy.title);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        copy.h1,
      );
      for (const id of [
        "home",
        "projects",
        "about",
        "technologies",
        "contact",
      ]) {
        await expect(page.locator(`section#${id}`)).toHaveCount(1);
      }
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });

    test("muestra exactamente los cuatro proyectos con su repositorio", async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      const cards = page.locator("#projects article");
      await expect(cards).toHaveCount(4);
      for (const [index, project] of projects.entries()) {
        const card = cards.nth(index);
        await expect(card.getByRole("heading", { level: 3 })).toHaveText(
          project.name,
        );
        const link = card.getByRole("link", { name: new RegExp(copy.button) });
        await expect(link).toHaveAttribute("href", project.repo);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
        const image = card.locator("img");
        await expect(image).toHaveAttribute("alt", /.{20,}/);
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
      }
    });

    test("solo enlaza a sitios permitidos y nunca a LinkedIn", async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      expect((await page.content()).toLowerCase()).not.toContain("linkedin");
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((links) =>
          links.map((link) => link.getAttribute("href") ?? ""),
        );
      for (const href of hrefs) {
        expect(href, href).toMatch(
          /^(#|\/|mailto:aaron20770@gmail\.com$|https:\/\/github\.com\/Aaron23486(\/[a-z]+)?$)/,
        );
      }
      await expect(
        page.locator('a[href="mailto:aaron20770@gmail.com"]').first(),
      ).toBeVisible();
      const githubRepos = hrefs.filter((href) =>
        /github\.com\/Aaron23486\/.+/.test(href),
      );
      expect(new Set(githubRepos)).toEqual(
        new Set(projects.map((project) => project.repo)),
      );
    });

    test("ofrece el CV del idioma activo solo si el PDF existe", async ({
      page,
      request,
      isMobile,
    }) => {
      await page.goto(`/${locale}/`);
      const primary = page.getByRole("link", { name: new RegExp(copy.cv) });
      if (!cvBuilt) {
        await expect(page.locator('a[href^="/cv/"]')).toHaveCount(0);
        return;
      }
      await expect(primary).toHaveAttribute(
        "href",
        `/cv/aaron-gutierrez-${locale}.pdf`,
      );
      // El botón de la barra (en móvil, dentro del menú) descarga el CV del idioma activo.
      if (isMobile)
        await page.getByRole("button", { name: /menú|menu/i }).click();
      const navCv = page.locator(
        `header a[href="/cv/aaron-gutierrez-${locale}.pdf"]:visible`,
      );
      await expect(navCv).toHaveCount(1);
      await expect(navCv).toHaveAttribute("download", "");
      for (const file of ["es", "en"]) {
        const response = await request.get(`/cv/aaron-gutierrez-${file}.pdf`);
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toBe("application/pdf");
      }
    });

    test("cumple WCAG 2.2 AA según axe", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${locale}/`);
      const results = await new AxeBuilder({ page })
        .withTags([
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
          "best-practice",
        ])
        .analyze();
      expect(
        results.violations.map(
          (violation) =>
            `${violation.id}: ${violation.nodes.map((node) => node.target).join(" | ")}`,
        ),
      ).toEqual([]);
    });
  });
}

test("la raíz lleva al idioma del navegador o al guardado", async ({
  browser,
}) => {
  const spanish = await browser.newContext({ locale: "es-CR" });
  const es = await spanish.newPage();
  await es.goto("/");
  await expect(es).toHaveURL(/\/es\/$/);

  const english = await browser.newContext({ locale: "en-US" });
  const en = await english.newPage();
  await en.goto("/");
  await expect(en).toHaveURL(/\/en\/$/);
  // La elección guardada manda sobre el idioma del navegador.
  await en.evaluate(() => localStorage.setItem("aurora-locale", "es"));
  await en.goto("/");
  await expect(en).toHaveURL(/\/es\/$/);

  await spanish.close();
  await english.close();
});

test("el selector cambia de idioma, conserva la sección y recuerda la elección", async ({
  page,
  isMobile,
}) => {
  await page.goto("/es/#projects");
  if (isMobile) await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .getByRole("link", { name: /EN.*English/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/en\/#projects$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => localStorage.getItem("aurora-locale"))).toBe(
    "en",
  );
});

test("navegación por teclado: saltar al contenido y foco visible", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "El teclado se prueba en escritorio");
  await page.goto("/es/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(
    () => getComputedStyle(document.activeElement as Element).outlineStyle,
  );
  expect(outline).not.toBe("none");
});

test("móvil: menú accesible y sin desplazamiento horizontal", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Solo en móvil");
  await page.goto("/es/");
  const width = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(width).toBe(0);
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.click();
  await expect(
    page.getByRole("button", { name: "Cerrar menú" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole("link", { name: "Contacto" }).last().click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("las rutas inexistentes muestran el 404 bilingüe", async ({ page }) => {
  const response = await page.goto("/no-existe/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Página no encontrada",
  );
});

test("SEO: metadatos, Open Graph, hreflang, sitemap y robots", async ({
  page,
  request,
}) => {
  await page.goto("/en/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /software developer/i,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og\/og-en\.png$/,
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="es"]'),
  ).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/en\/$/,
  );
  expect((await request.get("/og/og-en.png")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/es/");
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
});
