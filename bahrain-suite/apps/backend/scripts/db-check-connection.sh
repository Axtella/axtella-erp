#!/usr/bin/env bash
# Verify DB_* in .env: exit 0 only if SELECT 1 succeeds.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [[ ! -f .env ]]; then
  echo "error: missing $ROOT/.env — copy from .env.example" >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
source .env
set +a
export PGPASSWORD="${DB_PASSWORD:-}"
if psql -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-postgres}" -d "${DB_NAME:-bahrain_properties}" -c "SELECT 1" >/dev/null; then
  echo "ok: database connection succeeded for user ${DB_USERNAME} / ${DB_NAME}"
  exit 0
else
  echo "error: connection failed (often password mismatch). As Postgres superuser run:" >&2
  echo "  ALTER ROLE ${DB_USERNAME:-postgres} WITH PASSWORD 'same_as_DB_PASSWORD_in_env';" >&2
  echo "Or use Docker Postgres from apps/backend: npm run db:up (see docs/RUNBOOK.md, Docker Postgres)." >&2
  exit 1
fi
