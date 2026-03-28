CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  ticket_no VARCHAR(100) UNIQUE NOT NULL,
  subject VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  priority VARCHAR(30) NOT NULL DEFAULT 'medium',
  status VARCHAR(30) NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  opened_by_contact_id UUID REFERENCES customer_contacts(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_ticket_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  support_ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,
  message TEXT,
  created_by UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sla_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  response_minutes INT NOT NULL,
  resolution_minutes INT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_sla_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  sla_policy_id UUID NOT NULL REFERENCES sla_policies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id)
);
