CREATE TABLE IF NOT EXISTS hotel_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  code VARCHAR(50) NOT NULL,
  name VARCHAR(200) NOT NULL,
  city VARCHAR(120),
  country_code VARCHAR(10) NOT NULL DEFAULT 'BH',
  timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Bahrain',
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (customer_id, code),
  CONSTRAINT chk_hotel_properties_status CHECK (status IN ('active', 'inactive'))
);

CREATE INDEX IF NOT EXISTS idx_hotel_properties_customer_id
  ON hotel_properties(customer_id);
