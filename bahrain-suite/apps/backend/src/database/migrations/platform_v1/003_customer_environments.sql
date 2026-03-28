CREATE TABLE IF NOT EXISTS tenant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
  default_language VARCHAR(20) NOT NULL DEFAULT 'en',
  supported_languages JSONB NOT NULL DEFAULT '["en"]'::jsonb,
  date_format VARCHAR(50) NOT NULL DEFAULT 'YYYY-MM-DD',
  time_format VARCHAR(20) NOT NULL DEFAULT '24h',
  number_format VARCHAR(50) NOT NULL DEFAULT 'en-US',
  currency_format VARCHAR(50) NOT NULL DEFAULT 'standard',
  timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Bahrain',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_environments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  environment_key VARCHAR(100) UNIQUE NOT NULL,
  environment_type VARCHAR(30) NOT NULL,
  app_url TEXT,
  api_url TEXT,
  db_name VARCHAR(100),
  db_schema_name VARCHAR(100),
  deployment_status VARCHAR(30) NOT NULL DEFAULT 'pending',
  version_tag VARCHAR(100),
  last_deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, environment_type)
);

CREATE TABLE IF NOT EXISTS environment_deployment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_environment_id UUID NOT NULL REFERENCES customer_environments(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,
  status VARCHAR(30) NOT NULL,
  version_tag VARCHAR(100),
  message TEXT,
  triggered_by UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ
);
