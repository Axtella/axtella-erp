CREATE TABLE IF NOT EXISTS hotel_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES hotel_properties(id) ON DELETE CASCADE,
  room_type_id UUID NOT NULL REFERENCES hotel_room_types(id) ON DELETE RESTRICT,
  room_no VARCHAR(50) NOT NULL,
  floor_label VARCHAR(30),
  status VARCHAR(30) NOT NULL DEFAULT 'vacant',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (property_id, room_no),
  CONSTRAINT chk_hotel_rooms_status CHECK (status IN ('vacant', 'occupied', 'maintenance'))
);

CREATE INDEX IF NOT EXISTS idx_hotel_rooms_customer_id
  ON hotel_rooms(customer_id);
