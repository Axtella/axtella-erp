#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../.." && pwd)"
BACKEND_DIR="$ROOT_DIR/apps/backend"
OUT_DIR="$BACKEND_DIR/dist-scaffold"
ZIP_PATH="$OUT_DIR/backend-scaffold.zip"

mkdir -p "$OUT_DIR"
rm -f "$ZIP_PATH"

cd "$ROOT_DIR"
zip -rq "$ZIP_PATH" \
  "apps/backend/src" \
  "apps/backend/package.json" \
  "apps/backend/tsconfig.json" \
  "apps/backend/tsconfig.build.json" \
  "apps/backend/SCAFFOLD_PACKAGE.md" \
  -x "*/node_modules/*" \
  -x "*/dist/*" \
  -x "*/.next/*" \
  -x "*/coverage/*"

echo "Scaffold package created: $ZIP_PATH"
