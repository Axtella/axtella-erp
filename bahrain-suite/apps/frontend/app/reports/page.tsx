'use client';

import { useState } from 'react';
import Link from 'next/link';
import { API_BASE, credentialsForApi } from '../../lib/api';
import { getStoredToken } from '../../lib/auth';
import { COMPANY_NAME } from '../../lib/branding';
import { PageHeader } from '../../components/PageHeader';
import { StatusBanner } from '../../components/StatusBanner';

async function downloadAuth(
  path: string,
  token: string,
  fallbackName: string,
) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: credentialsForApi(),
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Download failed (${res.status})`);
  }
  const blob = await res.blob();
  const dispo = res.headers.get('Content-Disposition');
  let filename = fallbackName;
  const m = dispo?.match(/filename="?([^";]+)"?/i);
  if (m?.[1]) filename = m[1].trim();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.click();
  URL.revokeObjectURL(url);
}

const REPORT_LINKS: {
  href: string;
  title: string;
  blurb: string;
}[] = [
  {
    href: '/reports/income-expense',
    title: 'Income & expense',
    blurb: 'Statement by collection channel (cash, POS, Benefit Pay) with expenses and net income.',
  },
  {
    href: '/accounting/pnl',
    title: 'Profit & loss',
    blurb: 'Monthly profit & loss from posted journals (COA mapping on the server).',
  },
  {
    href: '/accounting/trial-balance',
    title: 'Trial balance',
    blurb: 'Period trial balance with Excel and PDF export.',
  },
  {
    href: '/tools/vat',
    title: 'Bahrain VAT (10%)',
    blurb: 'Net and gross VAT splits for Bahrain-standard rate.',
  },
  {
    href: '/reports/business-overview',
    title: 'Business overview',
    blurb: 'Executive snapshot placeholder — bind to your KPIs when ready.',
  },
  {
    href: '/receivables-aging',
    title: 'Receivables aging',
    blurb: 'Aged receivables from the API.',
  },
  {
    href: '/payables-aging',
    title: 'Payables aging',
    blurb: 'Aged payables from the API.',
  },
  {
    href: '/data-import',
    title: 'Bulk data import',
    blurb: 'CSV property import (admin / accountant).',
  },
];

export default function ReportsPage() {
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  async function run(label: string, path: string, filename: string) {
    const token = getStoredToken();
    if (!token) {
      setErr('Sign in first to download reports.');
      return;
    }
    setErr('');
    setMsg('');
    setBusy(label);
    try {
      await downloadAuth(path, token, filename);
      setMsg(`${label} downloaded.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Download failed');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        badge="Reports"
        title="Reports home"
        description={`${COMPANY_NAME} — open on-screen reports or download portfolio and trial-balance files generated from live API data.`}
      />
      {err ? <StatusBanner message={err} tone="error" /> : null}
      {msg ? <StatusBanner message={msg} tone="info" /> : null}

      <h2 className="reports-section-title">On-screen reports</h2>
      <p className="reports-section-lead">
        Single-page views; no separate report portal. Sign in where the module
        calls the API.
      </p>
      <div className="reports-link-grid">
        {REPORT_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="reports-link-card">
            <span className="reports-link-card__title">{item.title}</span>
            <span className="reports-link-card__blurb">{item.blurb}</span>
            <span className="reports-link-card__cta">Open →</span>
          </Link>
        ))}
      </div>

      <h2 className="reports-section-title" style={{ marginTop: 32 }}>
        Downloads
      </h2>
      <div className="module-grid" style={{ marginTop: 8 }}>
        <div className="card">
          <div className="card-header">Portfolio register</div>
          <div className="card-body">
            <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
              Property master list for board packs and audits.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button
                type="button"
                className="login-submit"
                style={{ maxWidth: 200 }}
                disabled={!!busy}
                onClick={() =>
                  void run(
                    'Excel portfolio',
                    '/reports/portfolio/excel',
                    'portfolio.xlsx',
                  )
                }
              >
                {busy === 'Excel portfolio' ? '…' : 'Excel (.xlsx)'}
              </button>
              <button
                type="button"
                className="login-submit"
                style={{ maxWidth: 200 }}
                disabled={!!busy}
                onClick={() =>
                  void run(
                    'PDF portfolio',
                    '/reports/portfolio/pdf',
                    'portfolio.pdf',
                  )
                }
              >
                {busy === 'PDF portfolio' ? '…' : 'PDF'}
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Trial balance (PDF)</div>
          <div className="card-body">
            <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
              Same basis as Accounting → Trial balance. Set dates on that page
              for JSON and Excel, or call the API with query parameters.
            </p>
            <p className="login-hint" style={{ marginBottom: 12 }}>
              Example:{' '}
              <code>
                GET /reports/trial-balance/pdf?from=2026-01-01&amp;to=2026-03-31
              </code>
            </p>
            <Link href="/accounting/trial-balance" className="inline-link">
              Open trial balance →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
