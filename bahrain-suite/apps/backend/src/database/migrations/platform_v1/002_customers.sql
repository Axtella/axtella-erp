CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_code VARCHAR(50) UNIQUE NOT NULL,
  legal_name VARCHAR(200) NOT NULL,
  display_name VARCHAR(200) NOT NULL,
  customer_type VARCHAR(50) NOT NULL,
  country_code VARCHAR(10) NOT NULL,
  currency_code VARCHAR(10) NOT NULL DEFAULT 'BHD',
  timezone VARCHAR(100) NOT NULL,
  language_code VARCHAR(20) NOT NULL DEFAULT 'en',
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  website VARCHAR(200),
  email VARCHAR(200),
  phone VARCHAR(50),
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  full_name VARCHAR(200) NOT NULL,
  role_title VARCHAR(100),
  email VARCHAR(200),
  phone VARCHAR(50),
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
