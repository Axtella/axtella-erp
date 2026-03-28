CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_code VARCHAR(50) UNIQUE NOT NULL,
  plan_name VARCHAR(150) NOT NULL,
  billing_cycle VARCHAR(30) NOT NULL,
  base_price NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency_code VARCHAR(10) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscription_plan_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  platform_module_id UUID NOT NULL REFERENCES platform_modules(id) ON DELETE CASCADE,
  is_included BOOLEAN NOT NULL DEFAULT TRUE,
  limits_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subscription_plan_id, platform_module_id)
);

CREATE TABLE IF NOT EXISTS customer_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  subscription_plan_id UUID REFERENCES subscription_plans(id) ON DELETE SET NULL,
  contract_start_date DATE NOT NULL,
  contract_end_date DATE,
  billing_cycle VARCHAR(30) NOT NULL,
  currency_code VARCHAR(10) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  total_price NUMERIC(14,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_subscription_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_subscription_id UUID NOT NULL REFERENCES customer_subscriptions(id) ON DELETE CASCADE,
  addon_type VARCHAR(50) NOT NULL,
  reference_key VARCHAR(100),
  quantity NUMERIC(12,2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(14,2) NOT NULL DEFAULT 0,
  total_price NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
