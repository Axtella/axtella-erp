-- Product / service lines for rent components, fees, and recoveries (Services & catalog UI).

CREATE TABLE IF NOT EXISTS catalog_items (
  id UUID PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  item_type VARCHAR(30) NOT NULL DEFAULT 'service',
  unit_of_measure VARCHAR(30) NOT NULL DEFAULT 'ea',
  default_price NUMERIC(14, 3) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO catalog_items (
  id,
  code,
  name,
  item_type,
  unit_of_measure,
  default_price,
  is_active,
  notes,
  created_at,
  updated_at
)
VALUES
  (
    'd0d00001-0001-4001-8001-000000000001',
    'RENT-MONTH',
    'Monthly rent (recoverable)',
    'service',
    'mo',
    0,
    TRUE,
    'Demo seed — default price 0; set per contract or price list.',
    NOW(),
    NOW()
  ),
  (
    'd0d00002-0002-4002-8002-000000000002',
    'SVC-COMMON',
    'Common area service charge',
    'fee',
    'sqm',
    0,
    TRUE,
    'Demo seed — allocate by area or fixed.',
    NOW(),
    NOW()
  ),
  (
    'd0d00003-0003-4003-8003-000000000003',
    'EWA-RECOVERY',
    'Electricity & water recovery',
    'fee',
    'ea',
    0,
    TRUE,
    'Demo seed — link to utilities billing.',
    NOW(),
    NOW()
  )
ON CONFLICT (code) DO NOTHING;
