'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const ACCOUNTING_LINKS = [
  { href: '/accounting/journals', label: 'Journal entries' },
  { href: '/accounting/daybook', label: 'Daybook' },
  { href: '/accounting/trial-balance', label: 'Trial balance' },
  { href: '/accounting/pnl', label: 'Monthly P&L' },
  { href: '/accounting/chart-of-accounts', label: 'Chart of accounts' },
] as const;

export default function AccountingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <nav
        className="workspace-subnav workspace-subnav--accounting"
        aria-label="Accounting workspace"
      >
        <span className="workspace-subnav-label">Ledger &amp; reports</span>
        <ul className="workspace-subnav-list">
          {ACCOUNTING_LINKS.map(({ href, label }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
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
