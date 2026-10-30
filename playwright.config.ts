import { defineConfig, devices } from "@playwright/test";

const port = 4174;

/** Las pruebas corren sobre la exportación estática (`out/`), igual que en producción. */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    locale: "es-CR",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "escritorio",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "movil",
      use: { ...devices["Pixel 7"], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: "node scripts/serve-out.mjs",
    env: { PORT: String(port) },
    url: `http://localhost:${port}/es/`,
    reuseExistingServer: !process.env.CI,
  },
});
