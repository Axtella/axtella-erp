-- Internal Axtella platform provisioning layer (privileged only).

CREATE TABLE IF NOT EXISTS platform_modules (
  id UUID PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(80) NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_country_packs (
  id UUID PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_compliance_packs (
  id UUID PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  country_code VARCHAR(40) NOT NULL,
  name VARCHAR(160) NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_platform_compliance_country_code CHECK (
    country_code IN ('BH', 'SA', 'AE', 'GCC')
  )
);

CREATE TABLE IF NOT EXISTS platform_role_templates (
  id UUID PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  template JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_tenants (
  id UUID PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  legal_name VARCHAR(220) NOT NULL,
  display_name VARCHAR(220) NOT NULL,
  country_code VARCHAR(40) NOT NULL,
  currency_code VARCHAR(10) NOT NULL,
  timezone VARCHAR(80) NOT NULL,
  default_language VARCHAR(20) NOT NULL DEFAULT 'en',
  plan_code VARCHAR(80) NOT NULL DEFAULT 'starter',
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  country_pack_id UUID NULL REFERENCES platform_country_packs(id),
  compliance_pack_id UUID NULL REFERENCES platform_compliance_packs(id),
  role_template_id UUID NULL REFERENCES platform_role_templates(id),
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID NULL,
  updated_by UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_platform_tenants_country_code CHECK (
    country_code IN ('BH', 'SA', 'AE', 'GCC')
  ),
  CONSTRAINT chk_platform_tenants_status CHECK (
    status IN ('draft', 'provisioning', 'active', 'suspended', 'archived')
  ),
  CONSTRAINT chk_platform_tenants_default_language CHECK (
    default_language IN ('en', 'ar', 'bilingual')
  )
);

CREATE INDEX IF NOT EXISTS idx_platform_tenants_status
  ON platform_tenants(status);
CREATE INDEX IF NOT EXISTS idx_platform_tenants_country
  ON platform_tenants(country_code);

CREATE TABLE IF NOT EXISTS platform_tenant_modules (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES platform_tenants(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES platform_modules(id),
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  source VARCHAR(30) NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, module_id),
  CONSTRAINT chk_platform_tenant_modules_source CHECK (
    source IN ('plan', 'manual', 'country_pack')
  )
);

CREATE INDEX IF NOT EXISTS idx_platform_tenant_modules_tenant
  ON platform_tenant_modules(tenant_id);

CREATE TABLE IF NOT EXISTS platform_tenant_branding (
  tenant_id UUID PRIMARY KEY REFERENCES platform_tenants(id) ON DELETE CASCADE,
  brand_name VARCHAR(220) NULL,
  logo_light_url TEXT NULL,
  logo_dark_url TEXT NULL,
  primary_color VARCHAR(20) NULL,
  secondary_color VARCHAR(20) NULL,
  accent_color VARCHAR(20) NULL,
  email_from_name VARCHAR(220) NULL,
  support_email VARCHAR(220) NULL,
  support_phone VARCHAR(60) NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_tenant_provision_runs (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES platform_tenants(id) ON DELETE CASCADE,
  run_status VARCHAR(30) NOT NULL DEFAULT 'started',
  dry_run BOOLEAN NOT NULL DEFAULT FALSE,
  requested_modules JSONB NOT NULL DEFAULT '[]'::jsonb,
  result_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_message TEXT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ NULL,
  created_by UUID NULL,
  CONSTRAINT chk_platform_tenant_provision_runs_status CHECK (
    run_status IN ('started', 'success', 'failed')
  )
);

CREATE INDEX IF NOT EXISTS idx_platform_tenant_provision_runs_tenant
  ON platform_tenant_provision_runs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_platform_tenant_provision_runs_status
  ON platform_tenant_provision_runs(run_status);
