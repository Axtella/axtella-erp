'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { COMPANY_SHORT, PRODUCT_TAGLINE } from '../../lib/branding';
import { AxtellaWordmark } from './AxtellaWordmark';
import { BrandMarkA } from './BrandMarkA';

export type AxtellaLogoVariant =
  | 'mark'
  /** Blue #114A9F rounded tile + white stroked A (matches `app/icon.svg`) */
  | 'appTile'
  /** #0A0F1C tile + gradient A — dark dashboards / sidebar */
  | 'darkDashboard'
  /** Gold→navy gradient tile + white A — light cards (e.g. sign-in) */
  | 'lightCard';

type Props = {
  variant?: AxtellaLogoVariant;
  /** Square tile / mark box in CSS px. Defaults: 44 (darkDashboard), 40 (lightCard), 48 (appTile), 32 (mark). */
  size?: number;
  showWordmark?: boolean;
  showTagline?: boolean;
  /** Second line under the wordmark (e.g. “Enterprise Suite” on the login card). */
  caption?: ReactNode;
  wordmarkAs?: 'span' | 'div';
  /**
   * Wordmark colors. Defaults: `dark` on `darkDashboard`, `light` elsewhere.
   */
  wordmarkSurface?: 'dark' | 'light';
  /** `mark` only — passed to `BrandMarkA`. */
  markStyle?: 'default' | 'darkTile';
  align?: 'start' | 'center';
  className?: string;
  /** Wrapper for the text block; login uses `auth-card-brand-text`. */
  textClassName?: string;
  /** When set, the whole lockup is a link (e.g. `href="/"`). */
  href?: string;
  linkClassName?: string;
};

function defaultSize(variant: AxtellaLogoVariant): number {
  switch (variant) {
    case 'lightCard':
      return 40;
    case 'appTile':
      return 48;
    case 'mark':
      return 32;
    default:
      return 44;
  }
}

function resolveWordmarkSurface(
  variant: AxtellaLogoVariant,
  override?: 'dark' | 'light',
): 'dark' | 'light' {
  if (override) return override;
  if (variant === 'darkDashboard') return 'dark';
  return 'light';
}

const TILE_MODIFIER: Record<Exclude<AxtellaLogoVariant, 'mark'>, string> = {
  appTile: 'axtella-logo__tile--app',
  darkDashboard: 'axtella-logo__tile--dark',
  lightCard: 'axtella-logo__tile--light-card',
};

/**
 * Composed tile + wordmark lockup for shell and auth. For a flat module wordmark SVG use **`AxtellaLogo`** or **`AxtellaWhiteLabel`**.
 */
export function AxtellaLogoLockup({
  variant = 'mark',
  size: sizeProp,
  showWordmark = false,
  showTagline = false,
  caption,
  wordmarkAs = 'div',
  wordmarkSurface: wordmarkSurfaceProp,
  markStyle = 'default',
  align = 'start',
  className = '',
  textClassName,
  href,
  linkClassName = '',
}: Props) {
  const size = sizeProp ?? defaultSize(variant);
  const wordmarkSurface = resolveWordmarkSurface(variant, wordmarkSurfaceProp);

  /** Tiles always use master R→Y→B “A”; bare `mark` defaults to `currentColor`. */
  const brandMarkVariant =
    variant === 'mark' && markStyle !== 'darkTile' ? 'default' : 'darkTile';

  const mark =
    variant === 'mark' ? (
      <BrandMarkA
        size={size}
        className="axtella-logo__mark"
        variant={brandMarkVariant}
      />
    ) : (
      <BrandMarkA className="axtella-logo__mark" variant={brandMarkVariant} />
    );

  const tile =
    variant === 'mark' ? (
      <span className="axtella-logo__mark-slot" aria-hidden>
        {mark}
      </span>
    ) : (
      <div
        className={`axtella-logo__tile ${TILE_MODIFIER[variant]}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {mark}
      </div>
    );

  const defaultTextClass =
    variant === 'lightCard' ? 'auth-card-brand-text' : 'brand-block';

  const textBlock =
    showWordmark || showTagline || caption != null ? (
      <div className={textClassName ?? defaultTextClass}>
        {showWordmark ? (
          <AxtellaWordmark
            as={wordmarkAs}
            surface={wordmarkSurface}
            className={variant === 'lightCard' ? '' : 'brand'}
          />
        ) : null}
        {caption != null ? (
          <>
            {showWordmark ? <br /> : null}
            {caption}
          </>
        ) : null}
        {showTagline ? (
          <div className="brand-tagline">{PRODUCT_TAGLINE}</div>
        ) : null}
      </div>
    ) : null;

  const rootClass = [
    'axtella-logo',
    align === 'center' ? 'axtella-logo--align-center' : '',
    variant === 'mark' && !textBlock ? 'axtella-logo--mark-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {tile}
      {textBlock}
    </>
  );

  const lockupNeedsAria =
    Boolean(href) && !showWordmark && !showTagline && caption == null;

  if (href) {
    return (
      <Link
        href={href}
        className={`${rootClass} ${linkClassName}`.trim()}
        aria-label={lockupNeedsAria ? COMPANY_SHORT : undefined}
      >
        {inner}
      </Link>
    );
  }

  return <div className={rootClass}>{inner}</div>;
}
