import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke tests hit the Next app (default :3001) so requests use the same origin
 * as the browser (`/api/v1` → proxy → Nest on API_PROXY_TARGET, default :3000).
 *
 * Start Nest and Next before running: `npm run test:e2e`
 * Override base URL: `E2E_BASE_URL=http://localhost:3001 npm run test:e2e`
 */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
