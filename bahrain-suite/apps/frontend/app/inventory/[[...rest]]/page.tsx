import {
  ModulePlaceholder,
  type ModulePlaceholderLink,
} from '../../../components/ModulePlaceholder';

const STOCK_LINKS: ModulePlaceholderLink[] = [
  { href: '/properties', label: 'Properties' },
  { href: '/data-import', label: 'Bulk import' },
  { href: '/reports', label: 'Reports' },
];

const MAP: Record<
  string,
  {
    title: string;
    description: string;
    hint?: string;
    relatedLinks?: ModulePlaceholderLink[];
  }
> = {
  '': {
    title: 'Inventory',
    description:
      'Stock and consumables by property or warehouse when this module is enabled.',
    hint: 'Track parts and materials alongside your properties. Connect ERP or inventory APIs in a future release.',
    relatedLinks: STOCK_LINKS,
  },
  adjustments: {
    title: 'Inventory adjustments',
    description:
      'Corrections, write-offs, and stock reconciliation when inventory goes live.',
    hint: 'Use bulk import and journals today for manual adjustments until automated stock is available.',
    relatedLinks: STOCK_LINKS,
  },
  transfers: {
    title: 'Inventory transfers',
    description:
      'Inter-location or inter-property stock movements when warehousing is connected.',
    relatedLinks: STOCK_LINKS,
  },
};

export default function Page({ params }: { params: { rest?: string[] } }) {
  const key = params.rest?.join('/') ?? '';
  const conf = MAP[key] ?? MAP[''];
  return <ModulePlaceholder {...conf} />;
}
