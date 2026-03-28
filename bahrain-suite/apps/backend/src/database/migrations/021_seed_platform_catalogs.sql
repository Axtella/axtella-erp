-- Seed baseline platform provisioning catalogs (idempotent).

INSERT INTO platform_modules (
  id, code, name, category, is_default, is_active, sort_order, created_at, updated_at
)
VALUES
  ('f1000001-0001-4001-8001-000000000001', 'core_auth', 'Core auth', 'core', TRUE, TRUE, 10, NOW(), NOW()),
  ('f1000002-0002-4002-8002-000000000002', 'core_users', 'Users and roles', 'core', TRUE, TRUE, 20, NOW(), NOW()),
  ('f1000003-0003-4003-8003-000000000003', 'core_branches', 'Branches', 'core', TRUE, TRUE, 30, NOW(), NOW()),
  ('f1000004-0004-4004-8004-000000000004', 'core_dashboards', 'Dashboards', 'core', TRUE, TRUE, 40, NOW(), NOW()),
  ('f1000005-0005-4005-8005-000000000005', 'catalog', 'Catalog items', 'erp', TRUE, TRUE, 100, NOW(), NOW()),
  ('f1000006-0006-4006-8006-000000000006', 'price_lists', 'Price lists', 'erp', FALSE, TRUE, 110, NOW(), NOW()),
  ('f1000007-0007-4007-8007-000000000007', 'inventory', 'Inventory', 'erp', FALSE, TRUE, 120, NOW(), NOW()),
  ('f1000008-0008-4008-8008-000000000008', 'sales', 'Sales', 'erp', FALSE, TRUE, 130, NOW(), NOW()),
  ('f1000009-0009-4009-8009-000000000009', 'purchases', 'Purchases', 'erp', FALSE, TRUE, 140, NOW(), NOW()),
  ('f1000010-0010-4010-8010-000000000010', 'accounting', 'Accounting', 'erp', TRUE, TRUE, 150, NOW(), NOW()),
  ('f1000011-0011-4011-8011-000000000011', 'vat', 'VAT engine', 'compliance', TRUE, TRUE, 160, NOW(), NOW()),
  ('f1000012-0012-4012-8012-000000000012', 'zatca', 'ZATCA pack', 'compliance', FALSE, TRUE, 170, NOW(), NOW()),
  ('f1000013-0013-4013-8013-000000000013', 'properties', 'Properties', 'property', FALSE, TRUE, 200, NOW(), NOW()),
  ('f1000014-0014-4014-8014-000000000014', 'units', 'Units', 'property', FALSE, TRUE, 210, NOW(), NOW()),
  ('f1000015-0015-4015-8015-000000000015', 'tenants', 'Tenants', 'property', FALSE, TRUE, 220, NOW(), NOW()),
  ('f1000016-0016-4016-8016-000000000016', 'bookings', 'Bookings', 'property', FALSE, TRUE, 230, NOW(), NOW()),
  ('f1000017-0017-4017-8017-000000000017', 'utilities', 'Utilities', 'property', FALSE, TRUE, 240, NOW(), NOW()),
  ('f1000018-0018-4018-8018-000000000018', 'amc', 'AMC', 'property', FALSE, TRUE, 250, NOW(), NOW()),
  ('f1000019-0019-4019-8019-000000000019', 'reports', 'Reporting', 'core', TRUE, TRUE, 260, NOW(), NOW()),
  ('f1000020-0020-4020-8020-000000000020', 'approvals', 'Approvals', 'core', TRUE, TRUE, 270, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

INSERT INTO platform_country_packs (
  id, code, name, settings, is_active, created_at, updated_at
)
VALUES
  (
    'f2000001-0001-4001-8001-000000000001',
    'BH',
    'Bahrain pack',
    '{"country":"BH","defaultLanguage":"bilingual","timezone":"Asia/Bahrain","currency":"BHD"}'::jsonb,
    TRUE, NOW(), NOW()
  ),
  (
    'f2000002-0002-4002-8002-000000000002',
    'SA',
    'Saudi Arabia pack',
    '{"country":"SA","defaultLanguage":"bilingual","timezone":"Asia/Riyadh","currency":"SAR"}'::jsonb,
    TRUE, NOW(), NOW()
  ),
  (
    'f2000003-0003-4003-8003-000000000003',
    'AE',
    'UAE pack',
    '{"country":"AE","defaultLanguage":"bilingual","timezone":"Asia/Dubai","currency":"AED"}'::jsonb,
    TRUE, NOW(), NOW()
  ),
  (
    'f2000004-0004-4004-8004-000000000004',
    'GCC',
    'Generic GCC pack',
    '{"country":"GCC","defaultLanguage":"en"}'::jsonb,
    TRUE, NOW(), NOW()
  )
ON CONFLICT (code) DO NOTHING;

INSERT INTO platform_compliance_packs (
  id, code, country_code, name, settings, is_active, created_at, updated_at
)
VALUES
  (
    'f3000001-0001-4001-8001-000000000001',
    'BH_VAT_STANDARD',
    'BH',
    'Bahrain VAT standard',
    '{"vatEnabled":true,"zatcaEnabled":false,"invoiceLanguage":"bilingual"}'::jsonb,
    TRUE, NOW(), NOW()
  ),
  (
    'f3000002-0002-4002-8002-000000000002',
    'SA_VAT_ZATCA_PHASE2',
    'SA',
    'Saudi VAT + ZATCA phase 2',
    '{"vatEnabled":true,"zatcaEnabled":true,"invoiceLanguage":"ar"}'::jsonb,
    TRUE, NOW(), NOW()
  ),
  (
    'f3000003-0003-4003-8003-000000000003',
    'GCC_VAT_BASE',
    'GCC',
    'Generic GCC VAT baseline',
    '{"vatEnabled":true,"zatcaEnabled":false}'::jsonb,
    TRUE, NOW(), NOW()
  )
ON CONFLICT (code) DO NOTHING;

INSERT INTO platform_role_templates (
  id, code, name, template, is_active, created_at, updated_at
)
VALUES
  (
    'f4000001-0001-4001-8001-000000000001',
    'DEFAULT_CUSTOMER',
    'Default customer roles',
    '{"roles":["customer_admin","finance_manager","accountant","auditor"]}'::jsonb,
    TRUE, NOW(), NOW()
  ),
  (
    'f4000002-0002-4002-8002-000000000002',
    'DEFAULT_PROPERTY',
    'Default property roles',
    '{"roles":["property_manager","front_desk","operations_manager"]}'::jsonb,
    TRUE, NOW(), NOW()
  )
ON CONFLICT (code) DO NOTHING;
