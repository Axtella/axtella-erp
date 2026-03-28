CREATE TABLE IF NOT EXISTS platform_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_key VARCHAR(100) UNIQUE NOT NULL,
  module_name VARCHAR(150) NOT NULL,
  module_group VARCHAR(100) NOT NULL,
  is_core BOOLEAN NOT NULL DEFAULT FALSE,
  is_sellable BOOLEAN NOT NULL DEFAULT TRUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE platform_modules
  ADD COLUMN IF NOT EXISTS module_key VARCHAR(100),
  ADD COLUMN IF NOT EXISTS module_name VARCHAR(150),
  ADD COLUMN IF NOT EXISTS module_group VARCHAR(100),
  ADD COLUMN IF NOT EXISTS category VARCHAR(100),
  ADD COLUMN IF NOT EXISTS is_core BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_sellable BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS description TEXT;

UPDATE platform_modules
SET module_key = COALESCE(module_key, lower(replace(code, '-', '_')))
WHERE module_key IS NULL AND code IS NOT NULL;

UPDATE platform_modules
SET module_name = COALESCE(module_name, name)
WHERE module_name IS NULL AND name IS NOT NULL;

UPDATE platform_modules
SET module_group = COALESCE(module_group, category)
WHERE module_group IS NULL AND category IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_platform_modules_module_key
  ON platform_modules(module_key);

CREATE TABLE IF NOT EXISTS module_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_module_id UUID NOT NULL REFERENCES platform_modules(id) ON DELETE CASCADE,
  feature_key VARCHAR(120) NOT NULL,
  feature_name VARCHAR(150) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(platform_module_id, feature_key)
);

CREATE TABLE IF NOT EXISTS customer_module_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  platform_module_id UUID NOT NULL REFERENCES platform_modules(id) ON DELETE CASCADE,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  enabled_from DATE,
  enabled_to DATE,
  source_type VARCHAR(30) NOT NULL DEFAULT 'plan',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, platform_module_id)
);

CREATE TABLE IF NOT EXISTS customer_feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  module_feature_id UUID NOT NULL REFERENCES module_features(id) ON DELETE CASCADE,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  config_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, module_feature_id)
);
