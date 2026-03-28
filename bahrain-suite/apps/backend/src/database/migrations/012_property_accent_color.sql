-- Per-property accent color (#RRGGBB) for UI recognition across modules.

ALTER TABLE properties ADD COLUMN IF NOT EXISTS accent_color VARCHAR(7) NULL;

UPDATE properties SET accent_color = '#114a9f', updated_at = NOW() WHERE code = 'BP-ALABBAS' AND (accent_color IS NULL OR accent_color = '');
UPDATE properties SET accent_color = '#047857', updated_at = NOW() WHERE code = 'BP-MIRAGE' AND (accent_color IS NULL OR accent_color = '');
UPDATE properties SET accent_color = '#b45309', updated_at = NOW() WHERE code = 'BP-DIAMOND' AND (accent_color IS NULL OR accent_color = '');
UPDATE properties SET accent_color = '#7c3aed', updated_at = NOW() WHERE code = 'BP-SEEF' AND (accent_color IS NULL OR accent_color = '');
UPDATE properties SET accent_color = '#0369a1', updated_at = NOW() WHERE code = 'BP-JUFFAIR' AND (accent_color IS NULL OR accent_color = '');
UPDATE properties SET accent_color = '#0d9488', updated_at = NOW() WHERE code = 'BP-AMWAJ' AND (accent_color IS NULL OR accent_color = '');
