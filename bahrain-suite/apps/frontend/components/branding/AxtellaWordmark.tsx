import type { ElementType, ReactNode } from 'react';
import { COMPANY_SHORT } from '../../lib/branding';

type Props = {
  /** `div` for block layout in sidebar; `span` inline in cards */
  as?: 'span' | 'div';
  /** `dark` = sidebar on navy; `light` = auth card / light surfaces */
  surface?: 'dark' | 'light';
  className?: string;
  children?: ReactNode;
};

/**
 * Typographic wordmark for “Axtella” (vector-friendly: swap for outlined SVG later).
 */
export function AxtellaWordmark({
  as,
  surface = 'dark',
  className = '',
  children,
}: Props) {
  const Tag = (as ?? 'span') as ElementType;
  const mod =
    surface === 'light'
      ? 'brand-wordmark brand-wordmark--light'
      : 'brand-wordmark brand-wordmark--dark';
  return (
    <Tag className={`${mod} ${className}`.trim()} lang="en">
      {children ?? COMPANY_SHORT}
    </Tag>
  );
}
