import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { bootstrapTestApp } from './create-app';

describe('App (e2e)', () => {
  let app: INestApplication | undefined;
  let databaseUp = false;

  beforeAll(async () => {
    app = await bootstrapTestApp();
    const ready = await request(app.getHttpServer()).get(
      '/api/v1/health/ready',
    );
    databaseUp = ready.status === 200;
  });

  afterAll(async () => {
    await app?.close();
  });

  it('GET /', () => {
    if (!app) throw new Error('App failed to bootstrap (check Postgres / .env)');
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body.basePath).toBe('/api/v1');
      });
  });

  it('GET /api/v1/health (liveness)', () => {
    if (!app) throw new Error('App failed to bootstrap (check Postgres / .env)');
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.check).toBe('liveness');
        expect(res.body.status).toBe('ok');
      });
  });

  it('GET /api/v1/health/ready returns 200 or 503', async () => {
    if (!app) throw new Error('App failed to bootstrap (check Postgres / .env)');
    const res = await request(app.getHttpServer()).get(
      '/api/v1/health/ready',
    );
    expect([200, 503]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.database).toBe('up');
      expect(res.body.check).toBe('readiness');
    }
  });

  it('POST /api/v1/auth/login rejects unknown user', () => {
    if (!app) throw new Error('App failed to bootstrap (check Postgres / .env)');
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'nonexistent@test.local', password: 'wrongpass12' })
      .expect(401);
  });

  (databaseUp ? it : it.skip)(
    'auth: register, login, GET /auth/me',
    async () => {
      if (!app) throw new Error('App failed to bootstrap');
      const email = `e2e_${Date.now()}@test.local`;
      const password = 'e2e_secure_pw_12';

      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email, password })
        .expect((res) => {
          expect([200, 201]).toContain(res.status);
        });

      const loginRes = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email, password })
        .expect((res) => {
          expect([200, 201]).toContain(res.status);
        });

      const token = loginRes.body.access_token as string | undefined;
      expect(token).toBeDefined();

      await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(email);
        });
    },
  );
});
