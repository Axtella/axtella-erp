-- Item groups for catalog (pricing / reporting / POS categories).

CREATE TABLE IF NOT EXISTS catalog_item_groups (
  id UUID PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE catalog_items
  ADD COLUMN IF NOT EXISTS group_id UUID NULL REFERENCES catalog_item_groups (id) ON DELETE SET NULL;

INSERT INTO catalog_item_groups (
  id,
  code,
  name,
  sort_order,
  is_active,
  notes,
  created_at,
  updated_at
)
VALUES
  (
    'e0e00001-0001-4001-8001-000000000001',
    'OCCUPANCY',
    'Rent & occupancy',
    10,
    TRUE,
    'Demo seed — monthly rent and lease-related lines.',
    NOW(),
    NOW()
  ),
  (
    'e0e00002-0002-4002-8002-000000000002',
    'FEES',
    'Fees & common charges',
    20,
    TRUE,
    'Demo seed — service charges, admin fees.',
    NOW(),
    NOW()
  ),
  (
    'e0e00003-0003-4003-8003-000000000003',
    'UTILITIES',
    'Utilities & recoveries',
    30,
    TRUE,
    'Demo seed — EWA and metered recovery.',
    NOW(),
    NOW()
  )
ON CONFLICT (code) DO NOTHING;

UPDATE catalog_items
SET group_id = 'e0e00001-0001-4001-8001-000000000001'
WHERE code = 'RENT-MONTH' AND group_id IS NULL;

UPDATE catalog_items
SET group_id = 'e0e00002-0002-4002-8002-000000000002'
WHERE code = 'SVC-COMMON' AND group_id IS NULL;

UPDATE catalog_items
SET group_id = 'e0e00003-0003-4003-8003-000000000003'
WHERE code = 'EWA-RECOVERY' AND group_id IS NULL;
