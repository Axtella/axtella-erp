import Link from 'next/link';
import { DataCard } from '../components/DataCard';
import { PageHeader } from '../components/PageHeader';
import { COMPANY_NAME } from '../lib/branding';

function KpiIcon({ name }: { name: 'occupancy' | 'finance' | 'approvals' | 'pnl' }) {
  const common = { width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'occupancy':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      );
    case 'finance':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'approvals':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case 'pnl':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M3 3v18h18M7 16l4-4 4 4 5-6" />
        </svg>
      );
    default:
      return null;
  }
}

const executiveCards = [
  {
    label: 'Occupancy snapshot',
    value: '94.2%',
    trend: '+1.4% vs last month',
    icon: 'occupancy' as const,
  },
  {
    label: 'Receivables aging',
    value: 'BHD 182k',
    trend: '-6.1% overdue balance',
    icon: 'finance' as const,
  },
  {
    label: 'Pending approvals',
    value: '17',
    trend: '4 critical items need review',
    icon: 'approvals' as const,
  },
  {
    label: 'Monthly P&L status',
    value: 'On track',
    trend: 'Operating margin within target',
    icon: 'pnl' as const,
  },
] as const;

const moduleGroups = [
  {
    title: 'Operations',
    links: [
      ['/properties', 'Properties'],
      ['/tenants', 'Tenants'],
      ['/bookings', 'Bookings'],
      ['/utilities', 'Utilities'],
      ['/amc', 'AMC'],
      ['/fixed-assets', 'Fixed Assets'],
      ['/notifications', 'Notifications'],
      ['/attendance', 'Attendance'],
    ],
  },
  {
    title: 'Finance',
    links: [
      ['/payroll', 'Payroll'],
      ['/accounting/pnl', 'Accounting P&L'],
      ['/accounting/trial-balance', 'Trial balance'],
      ['/receivables-aging', 'Receivables Aging'],
      ['/payables-aging', 'Payables Aging'],
      ['/bank-reconciliation', 'Bank Reconciliation'],
      ['/budget-vs-actual', 'Budget vs Actual'],
      ['/investor-statements', 'Investor Statements'],
      ['/government-payments', 'Government Payments'],
      ['/tools/vat', 'Bahrain VAT (10%)'],
    ],
  },
  {
    title: 'Reports & data',
    links: [
      ['/reports', 'Reports hub'],
      ['/data-import', 'Bulk data import'],
    ],
  },
  {
    title: 'Control & compliance',
    links: [['/approvals', 'Approvals']],
  },
] as const;

export default function HomePage() {
  return (
    <div className="page-container dashboard-hero">
      <p className="home-signin-banner">
        <Link href="/login" className="home-signin-link">
          Sign in
        </Link>
        <span className="home-signin-meta">
          · JWT session ·{' '}
          <Link href="/login">http://localhost:3001/login</Link>
        </span>
      </p>
      <PageHeader
        badge="Executive overview"
        title="Operations & finance pulse"
        description="Portfolio-level indicators and structured access to operations, finance, and compliance modules. Connect to the API and sign in to refresh figures from live systems."
      />
      <p className="kpi-disclaimer">
        Illustrative KPIs below are for layout and review purposes. Production
        deployments should bind these tiles to your reporting warehouse or API
        endpoints.
      </p>
      <section className="kpi-grid" aria-label="Key indicators">
        {executiveCards.map((item) => (
          <article className="kpi-card" key={item.label}>
            <div className="kpi-card-head">
              <div>
                <p className="kpi-label">{item.label}</p>
                <p className="kpi-value">{item.value}</p>
              </div>
              <div className="kpi-icon" aria-hidden>
                <KpiIcon name={item.icon} />
              </div>
            </div>
            <p className="kpi-trend">{item.trend}</p>
          </article>
        ))}
      </section>

      <section className="module-grid" aria-label="Modules">
        {moduleGroups.map((group) => (
          <DataCard key={group.title} title={group.title}>
            <ul className="module-links">
              {group.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </DataCard>
        ))}
      </section>

      <footer className="page-footer-legal">
        {COMPANY_NAME} — internal business workspace. Do not distribute
        screenshots or data outside your organization without approval. Module
        pages use configured API routes; enforce access controls and audit
        policies in production.
      </footer>
    </div>
  );
}
