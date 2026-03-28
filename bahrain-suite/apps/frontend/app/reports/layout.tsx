'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const REPORT_LINKS = [
  { href: '/reports', label: 'Reports home' },
  { href: '/reports/income-expense', label: 'Income & expense' },
  { href: '/accounting/pnl', label: 'Profit & loss' },
  { href: '/reports/business-overview', label: 'Business overview' },
  { href: '/receivables-aging', label: 'Receivables aging' },
  { href: '/payables-aging', label: 'Payables aging' },
  { href: '/tools/vat', label: 'Bahrain VAT' },
] as const;

export default function ReportsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <nav
        className="workspace-subnav workspace-subnav--reports"
        aria-label="Reports workspace"
      >
        <span className="workspace-subnav-label">Reports &amp; analytics</span>
        <ul className="workspace-subnav-list">
          {REPORT_LINKS.map(({ href, label }) => {
            const active =
              href === '/reports'
                ? pathname === '/reports'
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`workspace-subnav-link${active ? ' workspace-subnav-link--active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {children}
    </>
  );
}
