import { test, expect } from '@playwright/test';

test.describe('Login page (browser)', () => {
  test('dev seed sign-in reaches dashboard with session', async ({ page }) => {
    test.setTimeout(90_000);

    const health = await page.request.get('/api/v1/health');
    test.skip(
      !health.ok(),
      'Next on baseURL and Nest behind proxy must be running (see docs/RUNBOOK.md)',
    );

    await page.goto('/login', { waitUntil: 'load' });

    const hydrated = await page
      .locator('form.login-form[data-auth-form-ready="true"]')
      .waitFor({ state: 'visible', timeout: 25_000 })
      .then(() => true)
      .catch(() => false);

    test.skip(
      !hydrated,
      'Login page did not hydrate. In DevTools Network, if main-app.js or app-pages-internals.js returns 404, stop Next, run `rm -rf .next` in apps/frontend, then `npm run dev` again (see docs/RUNBOOK.md).',
    );

    await page.getByLabel('Work email').fill('dev@example.com');
    await page.getByLabel('Password').fill('AxtellaDev2024!');

    const submit = page.getByRole('button', { name: 'Sign in securely' });

    const [loginRes] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().includes('/api/v1/auth/login') &&
          r.request().method() === 'POST',
        { timeout: 30_000 },
      ),
      submit.click(),
    ]);

    if (!loginRes.ok()) {
      throw new Error(
        `POST auth/login expected 200, got ${loginRes.status()}: ${await loginRes.text()}`,
      );
    }

    const homeOrError = await Promise.race([
      page
        .waitForURL(
          (url) => url.pathname === '/' || url.pathname === '',
          { timeout: 45_000 },
        )
        .then(() => 'home' as const),
      page
        .locator('.login-error')
        .waitFor({ state: 'visible', timeout: 45_000 })
        .then(async () => ({
          kind: 'error' as const,
          text: await page.locator('.login-error').innerText(),
        })),
    ]);

    if (homeOrError !== 'home') {
      const token = await page.evaluate(() =>
        localStorage.getItem('bp_access_token'),
      );
      throw new Error(
        `Expected redirect to / after login, still on ${page.url()}. ` +
          `UI error: ${homeOrError.text}. localStorage token present: ${Boolean(token)}`,
      );
    }

    await expect(page.getByText(/Signed in/i).first()).toBeVisible({
      timeout: 20_000,
    });
  });
});
