INSERT INTO country_packs (id, code, name, country_code, description)
VALUES
  (gen_random_uuid(), 'BAHRAIN', 'Bahrain Pack', 'BH', 'Bahrain country defaults and controls'),
  (gen_random_uuid(), 'SAUDI', 'Saudi Pack', 'SA', 'Saudi country defaults and controls')
ON CONFLICT (code) DO NOTHING;

INSERT INTO compliance_packs (id, code, name, country_code, description, version_no)
VALUES
  (gen_random_uuid(), 'BH_VAT', 'Bahrain VAT Pack', 'BH', 'Bahrain VAT rules pack', '1.0'),
  (gen_random_uuid(), 'SA_VAT', 'Saudi VAT Pack', 'SA', 'Saudi VAT rules pack', '1.0'),
  (gen_random_uuid(), 'SA_ZATCA', 'Saudi ZATCA Pack', 'SA', 'Saudi ZATCA invoice and controls pack', '1.0')
ON CONFLICT (code) DO NOTHING;

INSERT INTO platform_modules (
  id,
  code,
  name,
  category,
  module_key,
  module_name,
  module_group,
  is_core,
  is_sellable,
  description
)
VALUES
  (gen_random_uuid(), 'CORE_DASHBOARD', 'Core Dashboard', 'core', 'core_dashboard', 'Core Dashboard', 'core', true, false, 'Shared dashboard and shell'),
  (gen_random_uuid(), 'CUSTOMER_PROVISIONING', 'Customer Provisioning', 'admin', 'customer_provisioning', 'Customer Provisioning', 'admin', true, false, 'Internal tenant provisioning'),
  (gen_random_uuid(), 'BRANDING', 'White Label Branding', 'admin', 'branding', 'White Label Branding', 'admin', false, true, 'Customer branding and theme control'),
  (gen_random_uuid(), 'PROPERTY_MANAGEMENT', 'Property Management', 'operations', 'property_management', 'Property Management', 'operations', false, true, 'Property and hospitality module'),
  (gen_random_uuid(), 'FINANCE_ACCOUNTING', 'Finance & Accounting', 'finance', 'finance_accounting', 'Finance & Accounting', 'finance', false, true, 'Accounting and reporting'),
  (gen_random_uuid(), 'SUPPORT_CENTER', 'Support Center', 'admin', 'support_center', 'Support Center', 'admin', false, false, 'Internal support and SLA')
ON CONFLICT (code) DO NOTHING;

INSERT INTO subscription_plans (id, plan_code, plan_name, billing_cycle, base_price, currency_code, description)
VALUES
  (gen_random_uuid(), 'STARTER', 'Starter Plan', 'monthly', 0, 'BHD', 'Starter commercial plan'),
  (gen_random_uuid(), 'BUSINESS', 'Business Plan', 'monthly', 0, 'BHD', 'Business commercial plan'),
  (gen_random_uuid(), 'ENTERPRISE', 'Enterprise Plan', 'yearly', 0, 'BHD', 'Enterprise commercial plan')
ON CONFLICT (plan_code) DO NOTHING;
