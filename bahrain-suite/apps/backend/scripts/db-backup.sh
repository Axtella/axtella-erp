#!/usr/bin/env bash
# Logical backup of Postgres (same DB_* vars as Nest). Run before DELETE or VACUUM FULL.
# Usage: from apps/backend — bash scripts/db-backup.sh [output_dir]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "error: missing $ROOT/.env — copy from .env.example and set DB_*" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

OUT_DIR="${1:-$ROOT/backups}"
mkdir -p "$OUT_DIR"
STAMP="$(date +%Y%m%d_%H%M%S)"
NAME="${DB_NAME:-bahrain_properties}_${STAMP}.sql.gz"
OUT_FILE="$OUT_DIR/$NAME"

export PGPASSWORD="${DB_PASSWORD:-}"

pg_dump \
  -h "${DB_HOST:-localhost}" \
  -p "${DB_PORT:-5432}" \
  -U "${DB_USERNAME:-postgres}" \
  -d "${DB_NAME:-bahrain_properties}" \
  --no-owner \
  | gzip -c >"$OUT_FILE"

echo "wrote $OUT_FILE"
