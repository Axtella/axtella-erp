import type { CSSProperties, ElementType, ReactNode } from 'react';
import {
  BRAND_MODULE_APP_ICON,
  BRAND_MODULE_LABEL,
  BRAND_MODULE_LOGO_SVG,
  type BrandModuleKey,
} from '../../lib/brand-module-logos';

type Variant = 'horizontal' | 'icon';

type Props = {
  /** Product line: drives logo asset + `--axtella-module-tile` token. */
  module: BrandModuleKey;
  /** `horizontal` = 600× module wordmark SVG; `icon` = tinted 128× app tile. */
  variant?: Variant;
  className?: string;
  /** Root element; default `div`. Use `span` for inline lockups. */
  as?: ElementType;
  /**
   * Display height in CSS px; width follows intrinsic aspect ratio.
   * Defaults: **48** (horizontal), **64** (icon).
   */
  height?: number;
  /** Optional content after the image (e.g. edition badge). */
  children?: ReactNode;
};

/**
 * Dynamic white-label brand asset: picks the correct `/branding/*` SVG and
 * exposes the module tile color as **`--axtella-module-tile`** on the root for CSS / children.
 *
 * @example Header wordmark
 * ```tsx
 * <AxtellaWhiteLabel module="fms" />
 * ```
 *
 * @example Launcher-style icon
 * ```tsx
 * <AxtellaWhiteLabel module="eagleEye" variant="icon" height={128} />
 * ```
 *
 * @example Themed shell (use token in CSS)
 * ```css
 * .shell { background: var(--axtella-module-tile); }
 * ```
 */
export function AxtellaWhiteLabel({
  module,
  variant = 'horizontal',
  className = '',
  as: Root = 'div',
  height: heightProp,
  children,
}: Props) {
  const { tileHex } = BRAND_MODULE_APP_ICON[module];
  const src =
    variant === 'horizontal'
      ? BRAND_MODULE_LOGO_SVG[module]
      : BRAND_MODULE_APP_ICON[module].src;
  const alt = BRAND_MODULE_LABEL[module];
  const defaultHeight = variant === 'horizontal' ? 48 : 64;
  const height = heightProp ?? defaultHeight;

  const rootClass = [
    'axtella-white-label',
    `axtella-white-label--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Root
      className={rootClass}
      data-axtella-module={module}
      style={
        {
          '--axtella-module-tile': tileHex,
        } as CSSProperties
      }
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ height, width: 'auto', display: 'block' }}
      />
      {children}
    </Root>
  );
}
