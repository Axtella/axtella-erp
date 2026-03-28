CREATE TABLE IF NOT EXISTS utility_bills (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  utility_type VARCHAR(30) NOT NULL,
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS amc_contracts (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  amc_type VARCHAR(50) NOT NULL,
  vendor_name VARCHAR(200) NOT NULL,
  contract_value NUMERIC(14,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS government_payments (
  id UUID PRIMARY KEY,
  property_id UUID,
  payment_type VARCHAR(50) NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payroll_runs (
  id UUID PRIMARY KEY,
  payroll_month INT NOT NULL,
  payroll_year INT NOT NULL,
  status VARCHAR(30) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employee_allocations (
  id UUID PRIMARY KEY,
  employee_id UUID NOT NULL,
  property_id UUID NOT NULL,
  allocation_basis VARCHAR(50) NOT NULL,
  percentage NUMERIC(8,4) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
