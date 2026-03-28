CREATE TABLE IF NOT EXISTS hotel_guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  guest_no VARCHAR(100) NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200),
  phone VARCHAR(50),
  nationality VARCHAR(80),
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (customer_id, guest_no),
  CONSTRAINT chk_hotel_guests_status CHECK (status IN ('active', 'inactive'))
);

CREATE INDEX IF NOT EXISTS idx_hotel_guests_customer_id
  ON hotel_guests(customer_id);
