CREATE TABLE IF NOT EXISTS template_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_code VARCHAR(100) UNIQUE NOT NULL,
  template_name VARCHAR(150) NOT NULL,
  template_type VARCHAR(50) NOT NULL,
  module_scope VARCHAR(100),
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  version_no VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_template_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  template_definition_id UUID NOT NULL REFERENCES template_definitions(id) ON DELETE CASCADE,
  override_content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, template_definition_id)
);

CREATE TABLE IF NOT EXISTS platform_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  related_table VARCHAR(100),
  related_id UUID,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  document_type VARCHAR(50),
  uploaded_by UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
