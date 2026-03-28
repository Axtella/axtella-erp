#!/usr/bin/env bash
# Create users table if needed, then upsert dev@example.com (password AxtellaDev2024!).
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
PSQL=(psql -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-postgres}" -d "${DB_NAME:-bahrain_properties}" -v ON_ERROR_STOP=1)
echo "Applying sql/create-users-table.sql …"
"${PSQL[@]}" -f "$ROOT/sql/create-users-table.sql"
echo "Applying 008_seed_dev_user.sql (upsert dev user) …"
"${PSQL[@]}" -f "$ROOT/src/database/migrations/008_seed_dev_user.sql"
echo "ok: dev user dev@example.com is ready (see migration file for password)."
