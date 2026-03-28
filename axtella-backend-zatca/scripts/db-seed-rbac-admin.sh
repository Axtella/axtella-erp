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

ADMIN_EMAIL="${AUTH_ADMIN_EMAIL:-admin@axtella.local}"
ADMIN_PASSWORD="${AUTH_ADMIN_PASSWORD:-ChangeMe123!}"
ADMIN_FULL_NAME="${AUTH_ADMIN_FULL_NAME:-Axtella Platform Admin}"
TENANT_ID="${AUTH_ADMIN_TENANT_ID:-}"

if [[ -z "$ADMIN_EMAIL" || -z "$ADMIN_PASSWORD" ]]; then
  echo "error: AUTH_ADMIN_EMAIL and AUTH_ADMIN_PASSWORD must be set" >&2
  exit 1
fi

PASSWORD_HASH="$(node -e "const bcrypt=require('bcrypt'); bcrypt.hash(process.argv[1],10).then((h)=>{console.log(h);}).catch((e)=>{console.error(e.message); process.exit(1);});" "$ADMIN_PASSWORD")"

export PGPASSWORD="${DB_PASSWORD:-postgres}"
PSQL=(
  psql
  -h "${DB_HOST:-localhost}"
  -p "${DB_PORT:-5432}"
  -U "${DB_USERNAME:-postgres}"
  -d "${DB_NAME:-axtella_global_platform}"
  -v ON_ERROR_STOP=1
)

echo "Seeding admin user: $ADMIN_EMAIL"
"${PSQL[@]}" \
  -v admin_email="$ADMIN_EMAIL" \
  -v admin_hash="$PASSWORD_HASH" \
  -v admin_full_name="$ADMIN_FULL_NAME" \
  -v admin_tenant_id="$TENANT_ID" <<'SQL'
WITH upserted_user AS (
  INSERT INTO users (email, password_hash, full_name, tenant_id, is_active)
  VALUES (
    LOWER(:'admin_email'),
    :'admin_hash',
    :'admin_full_name',
    NULLIF(:'admin_tenant_id', '')::UUID,
    TRUE
  )
  ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    tenant_id = EXCLUDED.tenant_id,
    is_active = TRUE,
    updated_at = NOW()
  RETURNING id
)
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM upserted_user u
JOIN roles r ON r.code = 'platform_admin'
ON CONFLICT DO NOTHING;
SQL

echo "ok: admin user upserted and assigned platform_admin role."
