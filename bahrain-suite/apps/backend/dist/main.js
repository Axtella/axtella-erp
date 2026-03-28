"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const not_found_filter_1 = require("./filters/not-found.filter");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const language_interceptor_1 = require("./common/interceptors/language.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    app.setGlobalPrefix('api/v1', {
        exclude: [{ path: '/', method: common_1.RequestMethod.GET }],
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Axtella Property Management API')
        .setDescription([
        'Axtella Property Management Co. — commercial property operations, finance, reports, and tax APIs.',
        '',
        '**Auth:** Most routes require a JWT. Use **POST /auth/login** (or **POST /auth/register**), then **Authorize** with `Bearer <access_token>`.',
        '**Public (no JWT):** `GET /` (root metadata), `GET /api/v1/health` (liveness), `GET /api/v1/health/ready` (readiness / DB ping), `GET /auth/public-config`, `GET /auth/supported-roles`, `POST /auth/login`, `POST /auth/register`.',
        '**Contract:** This document is the live OpenAPI spec; keep Postman/Insomnia collections in sync with the same base URL.',
    ].join('\n'))
        .setVersion('1.1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, swaggerDocument);
    const defaultOrigins = [
        'http://localhost:3001',
        'http://127.0.0.1:3001',
    ];
    const fromEnv = process.env.CORS_ORIGIN?.split(',')
        .map((o) => o.trim())
        .filter(Boolean);
    const isProd = process.env.NODE_ENV === 'production';
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
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new not_found_filter_1.NotFoundFilter(), new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new language_interceptor_1.LanguageInterceptor());
    await app.listen(process.env.PORT || 3000);
}
function logDbBootstrapHint(err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('\n[Nest] Bootstrap failed.');
    if (/password authentication failed|28P01/i.test(msg)) {
        console.error('PostgreSQL rejected DB_USERNAME / DB_PASSWORD. Fix apps/backend/.env, then verify:');
        console.error('  PGPASSWORD="$DB_PASSWORD" psql -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" -U "$DB_USERNAME" -d "$DB_NAME" -c "SELECT 1"');
        console.error('See docs/RUNBOOK.md (Database section).');
    }
    else if (/ECONNREFUSED|connect ECONNREFUSED/i.test(msg)) {
        console.error('Cannot reach PostgreSQL. Start Postgres and check DB_HOST / DB_PORT in apps/backend/.env.');
    }
    console.error(msg);
}
bootstrap().catch((err) => {
    logDbBootstrapHint(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map