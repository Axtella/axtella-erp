CREATE TABLE IF NOT EXISTS customer_role_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_code VARCHAR(50) UNIQUE NOT NULL,
  template_name VARCHAR(150) NOT NULL,
  module_scope VARCHAR(100),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_role_template_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_role_template_id UUID NOT NULL REFERENCES customer_role_templates(id) ON DELETE CASCADE,
  permission_code VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_role_template_id, permission_code)
);

CREATE TABLE IF NOT EXISTS customer_role_template_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  customer_role_template_id UUID NOT NULL REFERENCES customer_role_templates(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_by UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  UNIQUE(customer_id, customer_role_template_id)
);
