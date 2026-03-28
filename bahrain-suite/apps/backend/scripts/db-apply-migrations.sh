#!/usr/bin/env bash
# Apply SQL schema migrations 001–021 in order (idempotent where files use IF NOT EXISTS).
# Does not run 008 (dev user) — use npm run db:seed-dev-user for users + 008.
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
MIG="$ROOT/src/database/migrations"
for f in \
  001_core_tables.sql \
  002_ops_tables.sql \
  003_finance_tables.sql \
  004_journal_tables.sql \
  005_seed_three_properties.sql \
  006_attendance_records.sql \
  007_journal_line_income_channel.sql \
  009_properties_entity_columns.sql \
  010_operating_daybook_ewa.sql \
  011_portfolio_named_properties.sql \
  012_property_accent_color.sql \
  013_portfolio_property_display_names.sql \
  014_coa_account_heads.sql \
  015_properties_id_default.sql \
  016_align_bookings_units_tenants_unit_types.sql \
  017_seed_demo_bookings_seef.sql \
  018_catalog_items.sql \
  019_catalog_item_groups.sql \
  020_platform_tenant_provisioning.sql \
  021_seed_platform_catalogs.sql; do
  echo "Applying $f …"
  "${PSQL[@]}" -f "$MIG/$f"
done
echo "ok: migrations 001–007, 009–021 applied. Dev login user: npm run db:seed-dev-user (includes 008)."
