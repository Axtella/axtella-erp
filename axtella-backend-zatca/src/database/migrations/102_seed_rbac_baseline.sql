INSERT INTO roles (code, name, is_system)
VALUES
  ('platform_admin', 'Platform Administrator', TRUE),
  ('operations_manager', 'Operations Manager', TRUE),
  ('finance_manager', 'Finance Manager', TRUE),
  ('hr_manager', 'HR Manager', TRUE),
  ('crm_manager', 'CRM Manager', TRUE)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  is_system = EXCLUDED.is_system,
  updated_at = NOW();

INSERT INTO permissions (code, name, scope)
VALUES
  ('tenants.read', 'Read tenants', 'platform'),
  ('provisioning.write', 'Create provisioning requests', 'platform'),
  ('hotel.read', 'Read hotel modules', 'hotel'),
  ('hotel.write', 'Write hotel modules', 'hotel'),
  ('accounting.read', 'Read accounting modules', 'accounting'),
  ('accounting.write', 'Write accounting modules', 'accounting'),
  ('hr.read', 'Read HR modules', 'hr'),
  ('hr.write', 'Write HR modules', 'hr'),
  ('crm.read', 'Read CRM modules', 'crm'),
  ('crm.write', 'Write CRM modules', 'crm'),
  ('zatca.read', 'Read ZATCA configuration', 'compliance'),
  ('zatca.write', 'Manage ZATCA integration', 'compliance')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  scope = EXCLUDED.scope,
  updated_at = NOW();

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.code = 'platform_admin'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN ('hotel.read', 'hotel.write')
WHERE r.code = 'operations_manager'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN ('accounting.read', 'accounting.write', 'zatca.read', 'zatca.write')
WHERE r.code = 'finance_manager'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN ('hr.read', 'hr.write')
WHERE r.code = 'hr_manager'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN ('crm.read', 'crm.write')
WHERE r.code = 'crm_manager'
ON CONFLICT DO NOTHING;
