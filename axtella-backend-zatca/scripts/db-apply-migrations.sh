#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "error: missing $ROOT/.env (copy from .env.example)" >&2
  exit 1
fi

set -a
source .env
set +a

export PGPASSWORD="${DB_PASSWORD:-postgres}"
PSQL=(
  psql
  -h "${DB_HOST:-localhost}"
  -p "${DB_PORT:-5432}"
  -U "${DB_USERNAME:-postgres}"
  -d "${DB_NAME:-axtella_global_platform}"
  -v ON_ERROR_STOP=1
)

for file in "$ROOT"/src/database/migrations/*.sql; do
  echo "Applying migration: $(basename "$file")"
  "${PSQL[@]}" -f "$file"
done

echo "ok: all SQL migrations applied."
