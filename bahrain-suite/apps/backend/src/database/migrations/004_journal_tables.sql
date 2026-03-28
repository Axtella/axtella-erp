-- General ledger: journal header + lines (property-scoped optional).
-- Apply after core `properties` table exists.

CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY,
  journal_no VARCHAR(100) UNIQUE NOT NULL,
  entry_date DATE NOT NULL,
  property_id UUID NULL REFERENCES properties (id) ON DELETE SET NULL,
  narration TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_lines (
  id UUID PRIMARY KEY,
  journal_entry_id UUID NOT NULL REFERENCES journal_entries (id) ON DELETE CASCADE,
  account_code VARCHAR(50) NOT NULL,
  debit NUMERIC(14,2) DEFAULT 0 NOT NULL,
  credit NUMERIC(14,2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journal_entries_property_date
  ON journal_entries (property_id, entry_date);

CREATE INDEX IF NOT EXISTS idx_journal_lines_entry
  ON journal_lines (journal_entry_id);
