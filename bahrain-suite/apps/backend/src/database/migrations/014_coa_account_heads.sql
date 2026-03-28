-- Chart of account heads (codes align with journal_lines.account_code for posting).

CREATE TABLE IF NOT EXISTS coa_account_heads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code VARCHAR(50) NOT NULL,
  name VARCHAR(200) NOT NULL,
  account_type VARCHAR(30) NOT NULL,
  notes TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT uq_coa_account_heads_code UNIQUE (account_code)
);

CREATE INDEX IF NOT EXISTS idx_coa_account_heads_type ON coa_account_heads (account_type);
CREATE INDEX IF NOT EXISTS idx_coa_account_heads_active ON coa_account_heads (is_active);
