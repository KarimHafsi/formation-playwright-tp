import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: 'html',
  timeout: 120000, // Délai d'attente pour chaque test individuel (120 secondes)
  globalTimeout: 60 * 60 * 1000, // Délai d'attente global pour l'ensemble des tests (1 heure)

  use: {
    baseURL: 'https://ztrain-web.vercel.app',
    trace: 'on-first-retry',
    headless: true,
    screenshot: "on",
    video: "on-first-retry",
    launchOptions: {
      slowMo: 2000
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "opera",
      use: { ...devices["Desktop Opera"] },
    },
  ],
});