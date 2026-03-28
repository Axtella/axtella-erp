# Axtella Global Platform Backend Scaffold

NestJS backend scaffold for:
- Privileged provisioning platform
- Hotel management
- Accounting
- HR
- CRM
- International language readiness
- Saudi ZATCA Phase 2 / FATOORA integration scaffold

This package is a developer-ready scaffold, not a production-certified compliance solution.

## Auth and RBAC

This backend now includes JWT auth plus RBAC tables:
- `users`
- `roles`
- `permissions`
- `user_roles`
- `role_permissions`

### First-time setup

1. Copy env template:
   - `.env.example` -> `.env`
2. Configure DB and JWT variables in `.env`.
3. Run auth bootstrap:
   - `npm run db:bootstrap-auth`
4. Start server:
   - `npm run start:dev`

### Login endpoints

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (Bearer token required)

### Admin seed credentials

Admin seed values come from env:
- `AUTH_ADMIN_EMAIL`
- `AUTH_ADMIN_PASSWORD`
- `AUTH_ADMIN_FULL_NAME`
- `AUTH_ADMIN_TENANT_ID` (optional)

You can reseed admin at any time with:
- `npm run db:seed-admin`

### Auth verification

With server running:
- `npm run verify:auth`
