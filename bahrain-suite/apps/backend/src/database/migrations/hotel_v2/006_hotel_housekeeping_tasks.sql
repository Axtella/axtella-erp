CREATE TABLE IF NOT EXISTS hotel_housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES hotel_properties(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES hotel_rooms(id) ON DELETE CASCADE,
  task_type VARCHAR(30) NOT NULL DEFAULT 'cleaning',
  status VARCHAR(30) NOT NULL DEFAULT 'open',
  assigned_to VARCHAR(120),
  scheduled_for DATE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_hotel_housekeeping_task_type CHECK (task_type IN ('cleaning', 'inspection', 'linen', 'deep_clean')),
  CONSTRAINT chk_hotel_housekeeping_status CHECK (status IN ('open', 'in_progress', 'done', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_hotel_housekeeping_customer_id
  ON hotel_housekeeping_tasks(customer_id);
