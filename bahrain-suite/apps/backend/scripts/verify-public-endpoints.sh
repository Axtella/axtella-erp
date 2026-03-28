#!/usr/bin/env bash
# Smoke-check public HTTP routes (no JWT). Run while the API is up.
# Usage: ./scripts/verify-public-endpoints.sh
# Optional: API_ROOT=http://127.0.0.1:3000 ./scripts/verify-public-endpoints.sh

set -euo pipefail
ROOT="${API_ROOT:-http://localhost:3000}"

echo "Checking GET $ROOT/ ..."
curl -sfS "$ROOT/" | head -c 400
echo ""
echo ""

echo "Checking GET $ROOT/api/v1/health (liveness) ..."
curl -sfS "$ROOT/api/v1/health"
echo ""
echo ""

echo "Checking GET $ROOT/api/v1/health/ready (readiness; 503 if DB unreachable) ..."
curl -sS -w "\n(HTTP %{http_code})\n" "$ROOT/api/v1/health/ready" || true
echo ""
echo "Done: liveness should be 200; readiness 200 when Postgres is up."
