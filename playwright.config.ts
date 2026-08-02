import { defineConfig, devices } from "@playwright/test";

/**
 * E2E journeys J1–J4 build out per milestone (docs/engineering/testing.md);
 * M0 ships the pipeline smoke. Mobile + desktop per the testing matrix.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  ...(process.env.E2E_BASE_URL
    ? {}
    : {
        webServer: {
          command: "npm run build && npm run start",
          url: "http://localhost:3000",
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
        },
      }),
});
