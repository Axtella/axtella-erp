import { CatalogItemGroupsHub } from '../../../components/catalog/CatalogItemGroupsHub';
import { CatalogItemsHub } from '../../../components/catalog/CatalogItemsHub';
import { ModulePlaceholder } from '../../../components/ModulePlaceholder';

const MAP: Record<string, { title: string; description: string }> = {
  '': {
    title: 'Items',
    description:
      'Product and service catalog for rent lines, fees, and recoveries.',
  },
  groups: {
    title: 'Item groups',
    description: 'Group items for pricing, reporting, and POS categories.',
  },
  'price-lists': {
    title: 'Price lists',
    description: 'Tiered or contract pricing for tenants and commercial units.',
  },
};

export default function Page({ params }: { params: { rest?: string[] } }) {
  const key = params.rest?.join('/') ?? '';
  if (key === '') {
    return <CatalogItemsHub />;
  }
  if (key === 'groups') {
    return <CatalogItemGroupsHub />;
  }
  const conf = MAP[key] ?? MAP[''];
  const isPriceLists = key === 'price-lists';
  return (
    <ModulePlaceholder
      {...conf}
      hint={
        isPriceLists
          ? 'Price lists will let you attach contract-specific prices to catalog items and tenant agreements. Use Catalog items and Item groups today to organize what you bill.'
          : 'Use Catalog items and Item groups for live data. Price lists will connect here in a future release.'
      }
      relatedLinks={
        isPriceLists
          ? [
              { href: '/items', label: 'Catalog items' },
              { href: '/items/groups', label: 'Item groups' },
              { href: '/', label: 'Dashboard' },
            ]
          : [
              { href: '/items', label: 'Catalog items' },
              { href: '/items/groups', label: 'Item groups' },
              { href: '/reports', label: 'Reports' },
            ]
      }
    />
  );
}
