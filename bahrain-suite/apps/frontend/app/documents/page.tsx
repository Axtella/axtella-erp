import { ModulePlaceholder } from '../../components/ModulePlaceholder';

export default function DocumentsPage() {
  return (
    <ModulePlaceholder
      title="Documents"
      description="Central library for contracts, invoices, and compliance files."
      hint="Upload and search will connect here when document storage is integrated. Use reports and journals for traceability today."
      relatedLinks={[
        { href: '/reports', label: 'Reports' },
        { href: '/accounting/journals', label: 'Journal entries' },
        { href: '/', label: 'Dashboard' },
      ]}
    />
  );
}
