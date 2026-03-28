CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  cost_center_id UUID NOT NULL,
  unit_no VARCHAR(50) NOT NULL,
  unit_type_id UUID NOT NULL,
  bedroom_count INT DEFAULT 0,
  bathroom_count INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'vacant',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY,
  tenant_type VARCHAR(30) NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(200),
  cpr_no VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  cost_center_id UUID NOT NULL,
  unit_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  booking_type VARCHAR(30) NOT NULL,
  check_in_date TIMESTAMP NOT NULL,
  check_out_date TIMESTAMP,
  status VARCHAR(30) DEFAULT 'reserved',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
