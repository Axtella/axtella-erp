import {
  BRAND_MODULE_LABEL,
  BRAND_MODULE_LOGO_SVG,
  type BrandModuleKey,
} from '../../lib/brand-module-logos';

export type LogoProps = {
  module: 'FMS' | 'AVL' | 'IoTs' | 'EagleEye';
  height?: number;
  className?: string;
};

const MODULE_TO_KEY: Record<LogoProps['module'], BrandModuleKey> = {
  FMS: 'fms',
  AVL: 'avl',
  IoTs: 'iots',
  EagleEye: 'eagleEye',
};

export default function AxtellaLogo({
  module,
  height = 50,
  className,
}: LogoProps) {
  const key = MODULE_TO_KEY[module];
  return (
    <img
      src={BRAND_MODULE_LOGO_SVG[key]}
      alt={BRAND_MODULE_LABEL[key]}
      className={className}
      style={{ height }}
      draggable={false}
    />
  );
}
