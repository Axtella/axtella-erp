CREATE TABLE IF NOT EXISTS provisioning_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  request_type VARCHAR(50) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  requested_config_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  result_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provisioning_request_id UUID REFERENCES provisioning_requests(id) ON DELETE CASCADE,
  approval_type VARCHAR(50) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
