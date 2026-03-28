CREATE TABLE IF NOT EXISTS hotel_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES hotel_properties(id) ON DELETE RESTRICT,
  guest_id UUID NOT NULL REFERENCES hotel_guests(id) ON DELETE RESTRICT,
  room_id UUID REFERENCES hotel_rooms(id) ON DELETE SET NULL,
  reservation_no VARCHAR(100) NOT NULL,
  arrival_date DATE NOT NULL,
  departure_date DATE NOT NULL,
  adults INT NOT NULL DEFAULT 1,
  children INT NOT NULL DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'reserved',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (customer_id, reservation_no),
  CONSTRAINT chk_hotel_reservation_dates CHECK (departure_date > arrival_date),
  CONSTRAINT chk_hotel_reservation_status CHECK (status IN ('reserved', 'checked_in', 'checked_out', 'cancelled')),
  CONSTRAINT chk_hotel_reservation_counts CHECK (adults > 0 AND children >= 0)
);

CREATE INDEX IF NOT EXISTS idx_hotel_reservations_customer_id
  ON hotel_reservations(customer_id);

CREATE INDEX IF NOT EXISTS idx_hotel_reservations_room_dates
  ON hotel_reservations(room_id, arrival_date, departure_date);
