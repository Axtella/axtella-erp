-- Operating daybook (property cash book — income / expense / salary lines)
-- EWA-style utility accounts and bills per property / unit

CREATE TABLE IF NOT EXISTS operating_daybook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  unit_id UUID NULL REFERENCES units(id) ON DELETE SET NULL,
  entry_date DATE NOT NULL,
  voucher_no VARCHAR(100) NULL,
  account_category VARCHAR(50) NOT NULL,
  description TEXT NULL,
  reference TEXT NULL,
  payment_channel VARCHAR(50) NULL,
  bank_account_hint VARCHAR(200) NULL,
  debit NUMERIC(16, 3) NOT NULL DEFAULT 0,
  credit NUMERIC(16, 3) NOT NULL DEFAULT 0,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  approved_by VARCHAR(200) NULL,
  approval_date DATE NULL,
  remarks TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_odb_property_date ON operating_daybook_entries (property_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_odb_entry_date ON operating_daybook_entries (entry_date DESC);

CREATE TABLE IF NOT EXISTS utility_ewa_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  unit_id UUID NULL REFERENCES units(id) ON DELETE SET NULL,
  unit_label VARCHAR(120) NULL,
  ewa_account_no VARCHAR(50) NOT NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_ewa_account_per_property UNIQUE (property_id, ewa_account_no)
);

CREATE INDEX IF NOT EXISTS idx_ewa_acct_property ON utility_ewa_accounts (property_id);

CREATE TABLE IF NOT EXISTS utility_ewa_bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ewa_account_id UUID NOT NULL REFERENCES utility_ewa_accounts(id) ON DELETE CASCADE,
  bill_period_from DATE NULL,
  bill_period_to DATE NULL,
  bill_date DATE NULL,
  bill_no VARCHAR(100) NULL,
  cap_amount NUMERIC(16, 3) NULL,
  cap_date DATE NULL,
  net_amount NUMERIC(16, 3) NULL,
  vat_amount NUMERIC(16, 3) NULL,
  total_bill NUMERIC(16, 3) NULL,
  payment_due_date DATE NULL,
  paid_date DATE NULL,
  paid_amount NUMERIC(16, 3) NOT NULL DEFAULT 0,
  balance_due NUMERIC(16, 3) NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ewa_bills_account ON utility_ewa_bills (ewa_account_id, bill_date DESC NULLS LAST);
