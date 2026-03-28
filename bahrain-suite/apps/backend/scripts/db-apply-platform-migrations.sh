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
MIG="$ROOT/src/database/migrations/platform_v1"

for f in \
  001_platform_security.sql \
  002_customers.sql \
  003_customer_environments.sql \
  004_module_catalog.sql \
  005_country_compliance_packs.sql \
  006_branding.sql \
  007_subscriptions.sql \
  008_role_templates.sql \
  009_provisioning_workflow.sql \
  010_templates_documents.sql \
  011_support_sla.sql \
  012_audit_monitoring.sql \
  013_optional_integrations_ops.sql \
  014_seed_core_data.sql; do
  echo "Applying platform migration: $f"
  "${PSQL[@]}" -f "$MIG/$f"
done

echo "ok: platform_v1 migrations 001–014 applied"
