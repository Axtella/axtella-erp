'use client';

import { useId } from 'react';
import {
  BRAND_MARK_A_PATH,
  BRAND_MARK_A_STROKE_WIDTH,
  BRAND_MARK_A_VIEWBOX,
} from '../../lib/brand-mark-a';

type Props = {
  className?: string;
  /** CSS px; omit when `className` sets width/height in CSS */
  size?: number;
  /** Accessible label; omit when decorative next to visible text */
  title?: string;
  /**
   * `darkTile` — stroke uses master brand gradient: red → yellow → primary blue
   * (`:root` `--logo-mark-a-gradient` stops). Alias for white-label “A” everywhere.
   */
  variant?: 'default' | 'darkTile';
};

/**
 * Vector mark for UI and print. Same geometry as `public/branding/brand-mark-a.svg`.
 * React Native: `import Svg, { Path } from 'react-native-svg'` and use
 * `BRAND_MARK_A_PATH` / `BRAND_MARK_A_VIEWBOX` from `lib/brand-mark-a` (copy constants into mobile or share a package later).
 */
export function BrandMarkA({ className, size, title, variant = 'default' }: Props) {
  const uid = useId().replace(/:/g, '');
  const gradId = `brand-mark-a-grad-${uid}`;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={BRAND_MARK_A_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {variant === 'darkTile' ? (
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientTransform="rotate(145 0.5 0.5)"
          >
            <stop offset="0%" stopColor="var(--brand-red)" />
            <stop offset="50%" stopColor="var(--brand-yellow)" />
            <stop offset="100%" stopColor="var(--brand-primary-blue)" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d={BRAND_MARK_A_PATH}
        stroke={variant === 'darkTile' ? `url(#${gradId})` : 'currentColor'}
        strokeWidth={BRAND_MARK_A_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
