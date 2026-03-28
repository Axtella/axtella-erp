/**
 * White-label modular product logos (static SVGs under `public/branding/`).
 * Master rule: “A” = red → yellow → blue gradient; wordmark #114A9F; Inter / Poppins / Arial.
 */
export const BRAND_GLOBAL_LOGO_SVG = '/branding/axtella-global-original.png';

/** Default topbar / home tile when `NEXT_PUBLIC_BRAND_MODULE` is unset: FMS. */
export const BRAND_DEFAULT_APP_TILE_SVG = '/branding/icons/fms-icon.svg';

export const BRAND_MODULE_LOGO_SVG = {
  fms: '/branding/axtella-fms.svg',
  avl: '/branding/axtella-avl.svg',
  iots: '/branding/axtella-iots.svg',
  eagleEye: '/branding/axtella-eagleeye.svg',
} as const;

export type BrandModuleKey = keyof typeof BRAND_MODULE_LOGO_SVG;

export const BRAND_MODULE_LABEL: Record<BrandModuleKey, string> = {
  fms: 'Axtella FMS — Fleet Management System',
  avl: 'Axtella AVL — Advanced Vehicle Tracking',
  iots: 'Axtella IoTs — Smart IoT Platform',
  eagleEye: 'Axtella Eagle Eye — AI Surveillance Platform',
};

/**
 * 128× module app icons: same stroked “A” (red → yellow → blue); tile tint only.
 * | FMS: blue | AVL: dark blue | IoTs: cyan | Eagle Eye: purple/blue |
 */
export const BRAND_MODULE_APP_ICON: Record<
  BrandModuleKey,
  { src: string; tileHex: string }
> = {
  fms: { src: '/branding/icons/fms-icon.svg', tileHex: '#114A9F' },
  avl: { src: '/branding/icons/avl-icon.svg', tileHex: '#0B3C5D' },
  iots: { src: '/branding/icons/iot-icon.svg', tileHex: '#0891B2' },
  eagleEye: {
    src: '/branding/icons/eagleeye-icon.svg',
    tileHex: '#4338CA',
  },
};

/**
 * Active white-label module from `NEXT_PUBLIC_BRAND_MODULE` (`fms` | `avl` | `iots` | `eagleEye`, case-insensitive; `eagle-eye` allowed).
 * Used by the dashboard topbar and module-branded pages. Defaults to **fms**.
 */
export function getPublicBrandModule(): BrandModuleKey {
  const raw = process.env.NEXT_PUBLIC_BRAND_MODULE?.trim();
  if (!raw) return 'fms';
  const n = raw.toLowerCase().replace(/-/g, '');
  if (n === 'eagleeye') return 'eagleEye';
  if (n === 'fms' || n === 'avl' || n === 'iots') return n;
  return 'fms';
}

export function getPublicBrandTopbarIconSrc(): string {
  return BRAND_MODULE_APP_ICON[getPublicBrandModule()].src;
}
