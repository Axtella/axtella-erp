/**
 * Stable, distinct UI colors per property. Uses DB `accentColor` when valid;
 * otherwise hashes the UUID into a fixed palette (WCAG-friendly contrast on white).
 */

const FALLBACK_PALETTE = [
  '#114a9f',
  '#047857',
  '#b45309',
  '#7c3aed',
  '#0369a1',
  '#0d9488',
  '#be123c',
  '#a16207',
  '#4338ca',
  '#0f766e',
  '#c2410c',
  '#6d28d9',
] as const;

const HEX6 = /^#[0-9A-Fa-f]{6}$/;

function hashUuidToIndex(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % FALLBACK_PALETTE.length;
}

export function resolvePropertyAccentHex(
  propertyId: string,
  storedAccent?: string | null,
): string {
  if (storedAccent && HEX6.test(storedAccent)) {
    return storedAccent;
  }
  return FALLBACK_PALETTE[hashUuidToIndex(propertyId)] ?? FALLBACK_PALETTE[0];
}
