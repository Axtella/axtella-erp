#!/usr/bin/env bash
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
MIG="$ROOT/src/database/migrations/hotel_v2"

for f in \
  001_hotel_properties.sql \
  002_hotel_room_types.sql \
  003_hotel_rooms.sql \
  004_hotel_guests.sql \
  005_hotel_reservations.sql \
  006_hotel_housekeeping_tasks.sql; do
  echo "Applying hotel migration: $f"
  "${PSQL[@]}" -f "$MIG/$f"
done

echo "ok: hotel_v2 migrations 001–006 applied"
