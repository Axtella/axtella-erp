import {
  ModulePlaceholder,
  type ModulePlaceholderLink,
} from '../../../components/ModulePlaceholder';

const SALES_LINKS: ModulePlaceholderLink[] = [
  { href: '/tenants', label: 'Tenants' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/reports/income-expense', label: 'Income & expense' },
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
    title: 'Sales',
    description:
      'Quotes, invoices, and collections aligned with tenants and property contracts.',
    hint: 'Tenant and booking data is live today. Full AR invoicing and quotes will layer on in a future release.',
    relatedLinks: SALES_LINKS,
  },
  quotes: {
    title: 'Quotes',
    description: 'Commercial proposals before invoicing.',
    relatedLinks: SALES_LINKS,
  },
  invoices: {
    title: 'Invoices',
    description: 'AR billing for rent, services, and recoveries.',
    relatedLinks: SALES_LINKS,
  },
  'payments-received': {
    title: 'Payments received',
    description:
      'Collection register. For income by channel (cash, POS, bank), use Income & expense.',
    hint: 'Operating daybook and income-expense reports cover cash-style receipts today.',
    relatedLinks: SALES_LINKS,
  },
  'recurring-invoices': {
    title: 'Recurring invoices',
    description: 'Scheduled billing for leases and retainers.',
    relatedLinks: SALES_LINKS,
  },
  orders: {
    title: 'Sales orders',
    description: 'Order pipeline before fulfillment and invoicing.',
    relatedLinks: SALES_LINKS,
  },
};

export default function Page({ params }: { params: { rest?: string[] } }) {
  const key = params.rest?.join('/') ?? '';
  const conf = MAP[key] ?? MAP[''];
  return <ModulePlaceholder {...conf} />;
}
