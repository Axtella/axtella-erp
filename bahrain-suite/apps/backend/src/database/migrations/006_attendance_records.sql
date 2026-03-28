CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY,
  employee_code VARCHAR(50) NOT NULL,
  employee_name VARCHAR(200),
  work_date DATE NOT NULL,
  clock_in VARCHAR(8),
  clock_out VARCHAR(8),
  status VARCHAR(30) DEFAULT 'present',
  property_id UUID NULL REFERENCES properties (id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attendance_work_date ON attendance_records (work_date);
CREATE INDEX IF NOT EXISTS idx_attendance_property ON attendance_records (property_id);
