-- Demo ops rows for seed property Seef (BP-SEEF) so GET /bookings?propertyId=… is non-empty in dev.
-- Idempotent: fixed UUIDs + ON CONFLICT DO NOTHING. Safe if 005 seed property is missing (skips dependents).

INSERT INTO unit_types (id, code, name, category, created_at, updated_at)
VALUES (
  'cafe0001-0001-4001-8001-000000000001',
  'AXT-DEMO-1BR',
  'One bedroom (demo seed)',
  'residential',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO cost_centers (id, property_id, code, name, cost_center_type, is_active, created_at, updated_at)
SELECT
  'cafe0002-0002-4002-8002-000000000001',
  'a0000001-0000-4000-8000-000000000001',
  'OPS-MAIN',
  'Main operations',
  'building',
  TRUE,
  NOW(),
  NOW()
WHERE EXISTS (SELECT 1 FROM properties WHERE id = 'a0000001-0000-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (
  id,
  property_id,
  cost_center_id,
  unit_no,
  unit_type_id,
  bedroom_count,
  bathroom_count,
  status,
  created_at,
  updated_at
)
SELECT
  'cafe0003-0003-4003-8003-000000000001',
  'a0000001-0000-4000-8000-000000000001',
  'cafe0002-0002-4002-8002-000000000001',
  'A-101',
  'cafe0001-0001-4001-8001-000000000001',
  1,
  1,
  'vacant',
  NOW(),
  NOW()
WHERE EXISTS (SELECT 1 FROM cost_centers WHERE id = 'cafe0002-0002-4002-8002-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (
  id,
  property_id,
  cost_center_id,
  unit_no,
  unit_type_id,
  bedroom_count,
  bathroom_count,
  status,
  created_at,
  updated_at
)
SELECT
  'cafe0007-0007-4007-8007-000000000001',
  'a0000001-0000-4000-8000-000000000001',
  'cafe0002-0002-4002-8002-000000000001',
  'A-102',
  'cafe0001-0001-4001-8001-000000000001',
  1,
  1,
  'occupied',
  NOW(),
  NOW()
WHERE EXISTS (SELECT 1 FROM cost_centers WHERE id = 'cafe0002-0002-4002-8002-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tenants (id, tenant_type, full_name, phone, email, created_at, updated_at)
VALUES
  (
    'cafe0004-0004-4004-8004-000000000001',
    'individual',
    'Demo Tenant — Seef',
    '+973 3800 0001',
    'demo.tenant@example.com',
    NOW(),
    NOW()
  ),
  (
    'cafe0008-0008-4008-8008-000000000001',
    'individual',
    'Ahmed Al-Khalifa (demo)',
    '+973 3800 0002',
    'ahmed.demo@example.com',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO bookings (
  id,
  property_id,
  cost_center_id,
  unit_id,
  tenant_id,
  booking_type,
  booking_source,
  check_in_date,
  check_out_date,
  contract_start_date,
  contract_end_date,
  status,
  rate_daily,
  rate_monthly,
  deposit_amount,
  discount_amount,
  notes,
  created_at,
  updated_at
)
SELECT
  'cafe0005-0005-4005-8005-000000000001',
  'a0000001-0000-4000-8000-000000000001',
  'cafe0002-0002-4002-8002-000000000001',
  'cafe0003-0003-4003-8003-000000000001',
  'cafe0004-0004-4004-8004-000000000001',
  'lease',
  'walk_in',
  (CURRENT_TIMESTAMP + INTERVAL '7 days'),
  (CURRENT_TIMESTAMP + INTERVAL '180 days'),
  CURRENT_DATE,
  CURRENT_DATE + 365,
  'reserved',
  45.00,
  850.00,
  500.00,
  0,
  'Demo row — reserved upcoming lease.',
  NOW(),
  NOW()
WHERE EXISTS (SELECT 1 FROM units WHERE id = 'cafe0003-0003-4003-8003-000000000001')
  AND EXISTS (SELECT 1 FROM tenants WHERE id = 'cafe0004-0004-4004-8004-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO bookings (
  id,
  property_id,
  cost_center_id,
  unit_id,
  tenant_id,
  booking_type,
  booking_source,
  check_in_date,
  check_out_date,
  status,
  rate_daily,
  rate_monthly,
  deposit_amount,
  discount_amount,
  notes,
  created_at,
  updated_at
)
SELECT
  'cafe0006-0006-4006-8006-000000000001',
  'a0000001-0000-4000-8000-000000000001',
  'cafe0002-0002-4002-8002-000000000001',
  'cafe0007-0007-4007-8007-000000000001',
  'cafe0008-0008-4008-8008-000000000001',
  'short_stay',
  'online',
  (CURRENT_TIMESTAMP - INTERVAL '3 days'),
  (CURRENT_TIMESTAMP + INTERVAL '11 days'),
  'checked_in',
  38.00,
  0,
  200.00,
  0,
  'Demo row — active stay.',
  NOW(),
  NOW()
WHERE EXISTS (SELECT 1 FROM units WHERE id = 'cafe0007-0007-4007-8007-000000000001')
  AND EXISTS (SELECT 1 FROM tenants WHERE id = 'cafe0008-0008-4008-8008-000000000001')
ON CONFLICT (id) DO NOTHING;
