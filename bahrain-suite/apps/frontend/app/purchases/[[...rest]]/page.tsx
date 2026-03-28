import {
  ModulePlaceholder,
  type ModulePlaceholderLink,
} from '../../../components/ModulePlaceholder';

const PAY_LINKS: ModulePlaceholderLink[] = [
  { href: '/payables-aging', label: 'Payables aging' },
  { href: '/government-payments', label: 'Government payments' },
  { href: '/bank-reconciliation', label: 'Bank reconciliation' },
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
    title: 'Purchases',
    description: 'Vendor spend, bills, and payment runs when AP goes live here.',
    hint: 'Use payables aging and bank tools today for outbound cash visibility.',
    relatedLinks: PAY_LINKS,
  },
  vendors: {
    title: 'Vendors',
    description: 'Supplier master and payment terms.',
    relatedLinks: PAY_LINKS,
  },
  expenses: {
    title: 'Expenses',
    description: 'Employee and property operating expenses.',
    relatedLinks: PAY_LINKS,
  },
  bills: {
    title: 'Bills',
    description: 'Accounts payable documents matched to approvals.',
    relatedLinks: PAY_LINKS,
  },
  'payments-made': {
    title: 'Payments made',
    description: 'Outbound payments and allocation to bills.',
    relatedLinks: PAY_LINKS,
  },
};

export default function Page({ params }: { params: { rest?: string[] } }) {
  const key = params.rest?.join('/') ?? '';
  const conf = MAP[key] ?? MAP[''];
  return <ModulePlaceholder {...conf} />;
}
