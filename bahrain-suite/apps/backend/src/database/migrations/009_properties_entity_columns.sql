-- Align `properties` with TypeORM [property.entity.ts](../../modules/properties/entities/property.entity.ts).
-- Without these columns, GET /api/v1/properties returns 500 (undefined column in SELECT).

ALTER TABLE properties ADD COLUMN IF NOT EXISTS address TEXT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS city VARCHAR(100) NOT NULL DEFAULT 'Bahrain';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS operation_start_date DATE NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS notes TEXT NULL;
