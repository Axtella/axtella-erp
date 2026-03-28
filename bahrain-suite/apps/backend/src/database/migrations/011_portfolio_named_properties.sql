-- Named portfolio rows aligned with commercial rent / daybook / EWA workbooks (upsert by code).

INSERT INTO properties (
  id,
  code,
  name,
  property_type,
  city,
  investor_id,
  owner_rent_monthly,
  status,
  created_at,
  updated_at
)
VALUES
  (
    'b0000001-0000-4000-8000-000000000001',
    'BP-ALABBAS',
    'Al Abbas Tower',
    'mixed',
    'Bahrain',
    NULL,
    0,
    'active',
    NOW(),
    NOW()
  ),
  (
    'b0000002-0000-4000-8000-000000000002',
    'BP-MIRAGE',
    'Mirage Apartment',
    'residential',
    'Bahrain',
    NULL,
    0,
    'active',
    NOW(),
    NOW()
  ),
  (
    'b0000003-0000-4000-8000-000000000003',
    'BP-DIAMOND',
    'Diamond Service Apartment',
    'residential',
    'Bahrain',
    NULL,
    0,
    'active',
    NOW(),
    NOW()
  )
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  updated_at = NOW();
