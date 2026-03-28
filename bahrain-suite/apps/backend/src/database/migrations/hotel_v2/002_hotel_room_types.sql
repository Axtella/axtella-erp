CREATE TABLE IF NOT EXISTS hotel_room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES hotel_properties(id) ON DELETE CASCADE,
  code VARCHAR(50) NOT NULL,
  name_i18n JSONB NOT NULL DEFAULT '{}'::jsonb,
  category VARCHAR(50),
  max_occupancy INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (property_id, code),
  CONSTRAINT chk_hotel_room_types_max_occ CHECK (max_occupancy > 0)
);

CREATE INDEX IF NOT EXISTS idx_hotel_room_types_customer_id
  ON hotel_room_types(customer_id);
