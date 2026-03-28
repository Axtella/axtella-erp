-- Align ops tables with TypeORM entities so GET /bookings, /utilities/ewa/*, etc. do not 500
-- on "column does not exist" when TypeORM selects joined entities.

-- Referenced by units.unit_type_id; was missing from early migrations.
CREATE TABLE IF NOT EXISTS unit_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- [booking.entity.ts]
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_source VARCHAR(100) NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS contract_start_date DATE NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS contract_end_date DATE NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS rate_daily NUMERIC(12, 2) NOT NULL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS rate_monthly NUMERIC(12, 2) NOT NULL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC(12, 2) NOT NULL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS notes TEXT NULL;

-- [unit.entity.ts]
ALTER TABLE units ADD COLUMN IF NOT EXISTS area_sq_m NUMERIC(12, 2) NULL;
ALTER TABLE units ADD COLUMN IF NOT EXISTS max_occupancy INT NULL;
ALTER TABLE units ADD COLUMN IF NOT EXISTS default_daily_rate NUMERIC(12, 2) NOT NULL DEFAULT 0;
ALTER TABLE units ADD COLUMN IF NOT EXISTS default_monthly_rate NUMERIC(12, 2) NOT NULL DEFAULT 0;
ALTER TABLE units ADD COLUMN IF NOT EXISTS notes TEXT NULL;

-- [tenant.entity.ts]
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS nationality VARCHAR(100) NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS passport_no VARCHAR(100) NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS id_expiry_date DATE NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS address TEXT NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS company_name VARCHAR(200) NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(200) NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(50) NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS notes TEXT NULL;
