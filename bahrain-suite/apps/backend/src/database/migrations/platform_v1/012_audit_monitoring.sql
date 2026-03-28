CREATE TABLE IF NOT EXISTS platform_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_user_id UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  target_type VARCHAR(100) NOT NULL,
  target_id UUID,
  old_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  new_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tenant_activity_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  active_users INT NOT NULL DEFAULT 0,
  active_modules INT NOT NULL DEFAULT 0,
  total_storage_mb NUMERIC(14,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, snapshot_date)
);
