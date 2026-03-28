CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS zatca_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    environment VARCHAR(30) NOT NULL DEFAULT 'sandbox',
    seller_vat_number VARCHAR(50),
    branch_name_ar VARCHAR(200),
    branch_name_en VARCHAR(200),
    branch_address_ar TEXT,
    branch_address_en TEXT,
    csr_pem TEXT,
    csid TEXT,
    binary_security_token TEXT,
    secret TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS zatca_invoice_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    invoice_no VARCHAR(100) NOT NULL,
    invoice_type VARCHAR(30) NOT NULL,
    clearance_mode VARCHAR(30) NOT NULL,
    request_payload JSONB,
    response_payload JSONB,
    status VARCHAR(30) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
