/**
 * Official brand JSON — keep in sync with `:root` in `app/globals.css`.
 * Use `LOGO_PALETTE` / `BRAND_COLORS` for charts, exports, and mobile.
 *
 * White-label “A” mark: stroke gradient **red → yellow → primary blue** (see
 * `--logo-mark-a-gradient` in globals.css and `BrandMarkA` `darkTile`).
 */
export const BRAND_COLORS = {
  primary_blue: '#114A9F',
  red: '#C70F14',
  yellow: '#E4BE16',
  dark_blue: '#0B3C5D',
  light_blue: '#00C2FF',
  background_light: '#FFFFFF',
  background_dark: '#0A0F1C',
} as const;

/** Lowercase keys for CSS-variable-style access */
export const BRAND_COLORS_CSS = {
  'brand-primary-blue': BRAND_COLORS.primary_blue,
  'brand-red': BRAND_COLORS.red,
  'brand-yellow': BRAND_COLORS.yellow,
  'brand-dark-blue': BRAND_COLORS.dark_blue,
  'brand-light-blue': BRAND_COLORS.light_blue,
  'brand-bg-light': BRAND_COLORS.background_light,
  'brand-bg-dark': BRAND_COLORS.background_dark,
} as const;

/** Legacy names still used across some UI token references */
export const LOGO_PALETTE = {
  navy950: BRAND_COLORS.background_dark,
  navy900: BRAND_COLORS.dark_blue,
  navy700: BRAND_COLORS.primary_blue,
  goldAccent: BRAND_COLORS.yellow,
  lightBlue: BRAND_COLORS.light_blue,
  red: BRAND_COLORS.red,
  onNavy: '#E8F4FC',
} as const;
