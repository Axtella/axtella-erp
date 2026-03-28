-- Optional master list: three portfolio properties with stable IDs for dev/demo.
-- Safe to re-run: skips rows that already exist by code.
-- Matches frontend `DEFAULT_SEED_PROPERTY_ID` (Seef Residences).

INSERT INTO properties (
  id,
  code,
  name,
  property_type,
  investor_id,
  owner_rent_monthly,
  status,
  created_at,
  updated_at
)
VALUES
  (
    'a0000001-0000-4000-8000-000000000001',
    'BP-SEEF',
    'Seef Residences',
    'residential',
    NULL,
    0,
    'active',
    NOW(),
    NOW()
  ),
  (
    'a0000002-0000-4000-8000-000000000002',
    'BP-JUFFAIR',
    'Juffair Commercial Plaza',
    'commercial',
    NULL,
    0,
    'active',
    NOW(),
    NOW()
  ),
  (
    'a0000003-0000-4000-8000-000000000003',
    'BP-AMWAJ',
    'Amwaj Islands Mixed Use',
    'mixed',
    NULL,
    0,
    'active',
    NOW(),
    NOW()
  )
ON CONFLICT (code) DO NOTHING;
