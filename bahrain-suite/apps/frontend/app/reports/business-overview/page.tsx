import { ModulePlaceholder } from '../../../components/ModulePlaceholder';

export default function BusinessOverviewPage() {
  return (
    <ModulePlaceholder
      title="Business overview"
      description="Executive KPIs and portfolio roll-ups across properties."
      hint="The home dashboard and financial reports already summarize activity. This dedicated executive view will aggregate KPIs when the reporting API is extended."
      relatedLinks={[
        { href: '/', label: 'Dashboard' },
        { href: '/accounting/pnl', label: 'Monthly P&L' },
        { href: '/reports/income-expense', label: 'Income & expense' },
      ]}
    />
  );
}
