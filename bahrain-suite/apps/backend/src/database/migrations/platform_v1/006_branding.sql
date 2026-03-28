CREATE TABLE IF NOT EXISTS branding_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  primary_color VARCHAR(20),
  secondary_color VARCHAR(20),
  accent_color VARCHAR(20),
  logo_url TEXT,
  logo_dark_url TEXT,
  icon_url TEXT,
  font_family VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_branding_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  branding_pack_id UUID REFERENCES branding_packs(id) ON DELETE SET NULL,
  custom_display_name VARCHAR(200),
  login_title VARCHAR(200),
  splash_text VARCHAR(200),
  custom_css_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id)
);
