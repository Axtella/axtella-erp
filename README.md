# Axtella ERP Suit

**Remote:** [github.com/Axtella/axtella-erp](https://github.com/Axtella/axtella-erp) — clone with `git clone https://github.com/Axtella/axtella-erp.git`. See [SECURITY.md](SECURITY.md) for tokens and credentials, and [CONTRIBUTING.md](CONTRIBUTING.md) for collaborators, branch protection, and repo metadata on GitHub.

Unified local workspace that combines:
- `bahrain-suite` (backend + frontend + mobile)
- `axtella-backend-zatca` (ZATCA backend scaffold)

This workspace keeps both codebases intact and adds root scripts to run them from one place.

## Folder Layout

- `bahrain-suite/apps/backend` - NestJS API (Bahrain)
- `bahrain-suite/apps/frontend` - Next.js web app
- `bahrain-suite/apps/mobile` - Expo mobile app
- `axtella-backend-zatca` - NestJS scaffold for ZATCA

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
   - Axtella backend: copy `axtella-backend-zatca/.env.example` -> `axtella-backend-zatca/.env`
3. Use root env mapping defaults from `.env.example` in this folder:
   - Bahrain backend `PORT=3000`
   - Bahrain frontend `PORT=3001`
   - Axtella backend `PORT=3010`
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

### Axtella backend (ZATCA scaffold)

Run auth + RBAC bootstrap before first login:
- `npm --prefix "axtella-backend-zatca" run db:bootstrap-auth`

Then start API:
- `npm run dev:axtella-backend` (or set `PORT=3010`)

## Run Commands

- Bahrain backend: `npm run dev:bahrain-backend`
- Bahrain frontend: `npm run dev:bahrain-frontend`
- Bahrain mobile: `npm run dev:bahrain-mobile`
- Axtella backend: `npm run dev:axtella-backend`
- Combined dev (Bahrain backend + Bahrain frontend + Axtella backend): `npm run dev:all`

Build all apps:
- `npm run build:all`

## Health Checks

Use these after startup:
- Bahrain backend docs: `http://localhost:3000/docs`
- Bahrain backend public status (example): `http://localhost:3000/api/v1/public/status`
- Bahrain frontend: `http://localhost:3001`
- Axtella backend base API: `http://localhost:3010/api/v1`
- Axtella auth login: `http://localhost:3010/api/v1/auth/login`

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
- Axtella ZATCA integration is scaffold-level and requires real credentials/cert flow for production compliance.
- Bahrain suite may contain nested legacy copies under `bahrain-suite/apps` that are not part of the root orchestration scripts.
