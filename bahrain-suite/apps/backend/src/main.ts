import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NotFoundFilter } from './filters/not-found.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LanguageInterceptor } from './common/interceptors/language.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Axtella Property Management API')
    .setDescription(
      [
        'Axtella Property Management Co. — commercial property operations, finance, reports, and tax APIs.',
        '',
        '**Auth:** Most routes require a JWT. Use **POST /auth/login** (or **POST /auth/register**), then **Authorize** with `Bearer <access_token>`.',
        '**Public (no JWT):** `GET /` (root metadata), `GET /api/v1/health` (liveness), `GET /api/v1/health/ready` (readiness / DB ping), `GET /auth/public-config`, `GET /auth/supported-roles`, `POST /auth/login`, `POST /auth/register`.',
        '**Contract:** This document is the live OpenAPI spec; keep Postman/Insomnia collections in sync with the same base URL.',
      ].join('\n'),
    )
    .setVersion('1.1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  const defaultOrigins = [
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ];
  const fromEnv = process.env.CORS_ORIGIN?.split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const isProd = process.env.NODE_ENV === 'production';
  /** In dev, reflect the request origin so LAN IPs (e.g. http://192.168.x.x:3001) work with NEXT_PUBLIC_API_BASE_URL. */
  const origin = isProd
    ? fromEnv?.length
      ? fromEnv
      : defaultOrigins
    : true;
  app.enableCors({
    origin,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new NotFoundFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new LanguageInterceptor());
  await app.listen(process.env.PORT || 3000);
}

function logDbBootstrapHint(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error('\n[Nest] Bootstrap failed.');
  if (/password authentication failed|28P01/i.test(msg)) {
    console.error(
      'PostgreSQL rejected DB_USERNAME / DB_PASSWORD. Fix apps/backend/.env, then verify:',
    );
    console.error(
      '  PGPASSWORD="$DB_PASSWORD" psql -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" -U "$DB_USERNAME" -d "$DB_NAME" -c "SELECT 1"',
    );
    console.error('See docs/RUNBOOK.md (Database section).');
  } else if (/ECONNREFUSED|connect ECONNREFUSED/i.test(msg)) {
    console.error(
      'Cannot reach PostgreSQL. Start Postgres and check DB_HOST / DB_PORT in apps/backend/.env.',
    );
  }
  console.error(msg);
}

bootstrap().catch((err) => {
  logDbBootstrapHint(err);
  process.exit(1);
});
