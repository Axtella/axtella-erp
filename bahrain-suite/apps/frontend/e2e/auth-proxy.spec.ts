import { test, expect } from '@playwright/test';

test.describe('Auth API proxy smoke', () => {
  test('POST login returns access_token and GET auth/me returns role', async ({
    request,
  }) => {
    const health = await request.get('/api/v1/health');
    test.skip(
      !health.ok(),
      'Next on baseURL and Nest behind proxy must be running (see docs/RUNBOOK.md)',
    );

    const login = await request.post('/api/v1/auth/login', {
      data: {
        email: 'dev@example.com',
        password: 'AxtellaDev2024!',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!login.ok()) {
      throw new Error(`login ${login.status()}: ${await login.text()}`);
    }
    const body = (await login.json()) as { access_token?: string };
    expect(body.access_token, 'login JSON should include access_token').toBeTruthy();

    const me = await request.get('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${body.access_token}` },
    });
    if (!me.ok()) {
      throw new Error(`auth/me ${me.status()}: ${await me.text()}`);
    }
    const meBody = (await me.json()) as { role?: string };
    expect(meBody.role, 'auth/me should include role').toBeTruthy();
  });
});
