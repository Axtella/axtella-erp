# Axtella ERP

**Axtella ERP** is this product’s monorepo. The root npm package is still named `axtella-erp-suit` in [package.json](package.json); GitHub remote is [github.com/Axtella/axtella-erp](https://github.com/Axtella/axtella-erp) — clone with `git clone https://github.com/Axtella/axtella-erp.git`. See [SECURITY.md](SECURITY.md) for tokens and credentials, and [CONTRIBUTING.md](CONTRIBUTING.md) for collaborators, branch protection, and repo metadata on GitHub.

It combines:
- **Bahrain suite** (`bahrain-suite`) — Nest + Next + Expo for ERP flows; the web UI often uses **FMS** white-label branding (see Naming below), not ZATCA.
- **ZATCA / global Nest API** (`axtella-backend-zatca`) — separate backend; not the ERP web UI.

Root scripts orchestrate both trees from one place.

## Folder Layout

- `bahrain-suite/apps/backend` - NestJS API (Bahrain)
- `bahrain-suite/apps/frontend` - Next.js web app
- `bahrain-suite/apps/mobile` - Expo mobile app
- `axtella-backend-zatca` - NestJS API for ZATCA / global platform (not the ERP web UI)

## Naming (don’t mix these up)

| Name | Meaning |
|------|---------|
| **Axtella ERP** | This **monorepo** and product: Bahrain suite (ERP + **FMS**-branded web) plus the ZATCA/global Nest API. Root package id: `axtella-erp-suit`. |
| **FMS** | **Axtella FMS — Fleet Management System**: white-label **module** for the Bahrain **web** app only (`bahrain-suite/apps/frontend`). Set via `NEXT_PUBLIC_BRAND_MODULE` (default `fms`). See [`bahrain-suite/apps/frontend/lib/brand-module-logos.ts`](bahrain-suite/apps/frontend/lib/brand-module-logos.ts). Not the name of the whole repo. |
| **Bahrain suite** | Nest + Next (+ Expo) for Bahrain properties / ERP flows. UI branding may be **FMS**; that is not the ZATCA API. |
| **axtella-backend-zatca** | Nest API for **ZATCA / global platform** (default dev port **3010**, its own DB). **Not** the ERP or FMS front end. |

## Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm 9+
- PostgreSQL 14+ (or Docker for Bahrain backend Postgres)

## First-Time Setup

1. Install all dependencies:
   - `npm run install:all`
2. Create env files:
   - Bahrain backend: copy `bahrain-suite/apps/backend/.env.example` -> `bahrain-suite/apps/backend/.env`
   - Bahrain frontend: copy `bahrain-suite/apps/frontend/.env.example` -> `bahrain-suite/apps/frontend/.env.local`
   - Bahrain mobile: copy `bahrain-suite/apps/mobile/.env.example` -> `bahrain-suite/apps/mobile/.env`
   - ZATCA / global Nest API: copy `axtella-backend-zatca/.env.example` -> `axtella-backend-zatca/.env`
3. Use root env mapping defaults from `.env.example` in this folder:
   - Bahrain backend `PORT=3000`
   - Bahrain frontend `PORT=3001`
   - ZATCA Nest API `PORT=3010`
   - Frontend proxy `API_PROXY_TARGET=http://127.0.0.1:3000`

## Database Startup and Migration Order

### Bahrain backend

Deterministic auth bootstrap order from root:
1. `npm --prefix "bahrain-suite/apps/backend" run db:up` (optional Docker path)
2. `npm run bootstrap:bahrain-auth`
3. `npm run dev:bahrain-backend`
4. `npm run dev:bahrain-frontend`

Or run DB helpers directly:
- `npm --prefix "bahrain-suite/apps/backend" run db:up`
- `npm --prefix "bahrain-suite/apps/backend" run db:check`
- `npm --prefix "bahrain-suite/apps/backend" run db:migrate`
- `npm --prefix "bahrain-suite/apps/backend" run db:seed-dev-user`

Auth endpoint:
- `POST http://localhost:3000/api/v1/auth/login`

Auth readiness check from root:
- `npm run check:bahrain-login`

### ZATCA / global Nest API (`axtella-backend-zatca`)

Run auth + RBAC bootstrap before first login:
- `npm --prefix "axtella-backend-zatca" run db:bootstrap-auth`

Then start API:
- `npm run dev:axtella-backend` (or set `PORT=3010`)

## Run Commands

- Bahrain backend: `npm run dev:bahrain-backend`
- Bahrain frontend: `npm run dev:bahrain-frontend`
- Bahrain mobile: `npm run dev:bahrain-mobile`
- ZATCA Nest API: `npm run dev:axtella-backend`
- Combined dev (Bahrain backend + Bahrain frontend + ZATCA Nest API): `npm run dev:all`

Build all apps:
- `npm run build:all`

## Health Checks

Use these after startup:
- Bahrain backend docs: `http://localhost:3000/docs`
- Bahrain backend public status (example): `http://localhost:3000/api/v1/public/status`
- Bahrain frontend: `http://localhost:3001`
- ZATCA Nest API base: `http://localhost:3010/api/v1`
- ZATCA Nest API auth login: `http://localhost:3010/api/v1/auth/login`

Quick path verification:
- `npm run health:paths`
- `npm run check:bahrain-login`
- `npm --prefix "axtella-backend-zatca" run verify:auth`

Verification completed for this setup:
- Root script listing via `npm run` returned all orchestration commands.
- `npm run health:paths` passed.
- Script discovery passed in each copied app (`backend`, `frontend`, `mobile`, `axtella-backend-zatca`) using `npm --prefix "<app>" run`.

## Current Notes / Blockers

- `dev:all` uses `npx concurrently` (downloads on first run if not cached).
- The ZATCA Nest API (`axtella-backend-zatca`) is scaffold-level for integration and needs real credentials/cert flow for production compliance.
- Bahrain suite may contain nested legacy copies under `bahrain-suite/apps` that are not part of the root orchestration scripts.
