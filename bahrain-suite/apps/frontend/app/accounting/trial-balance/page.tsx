'use client';

import { useEffect, useMemo, useState } from 'react';
import { API_BASE, apiGetAuthenticated, credentialsForApi } from '../../../lib/api';
import { getStoredToken } from '../../../lib/auth';
import { usePropertyScopeEpoch } from '../../../hooks/usePropertyScopeEpoch';
import { getPropertyIdForApi } from '../../../lib/property-scope';
import { TrialBalanceRegistry } from '../../../components/accounting/TrialBalanceRegistry';
import { JsonPanel } from '../../../components/JsonPanel';
import { ModuleScopeHint } from '../../../components/ModuleScopeHint';
import { PageHeader } from '../../../components/PageHeader';
import { StatusBanner } from '../../../components/StatusBanner';

function monthRange() {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const from = `${y}-${String(m).padStart(2, '0')}-01`;
  const last = new Date(y, m, 0).getDate();
  const to = `${y}-${String(m).padStart(2, '0')}-${String(last).padStart(2, '0')}`;
  return { from, to };
}

async function download(path: string, token: string, fallbackName: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: credentialsForApi(),
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Download failed (${res.status})`);
  const blob = await res.blob();
  const dispo = res.headers.get('Content-Disposition');
  let filename = fallbackName;
  const m = dispo?.match(/filename="?([^";]+)"?/i);
  if (m?.[1]) filename = m[1].trim();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function TrialBalancePage() {
  const initial = useMemo(() => monthRange(), []);
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);
  const [data, setData] = useState<unknown>(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const scopeEpoch = usePropertyScopeEpoch();

  const propertyId = useMemo(() => {
    void scopeEpoch;
    return getPropertyIdForApi();
  }, [scopeEpoch]);

  const qs = useMemo(() => {
    const parts = [
      `from=${encodeURIComponent(from)}`,
      `to=${encodeURIComponent(to)}`,
    ];
    if (propertyId) {
      parts.push(`propertyId=${encodeURIComponent(propertyId)}`);
    }
    return parts.join('&');
  }, [from, to, propertyId]);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      setErr('Sign in to load trial balance.');
      return;
    }
    let cancelled = false;
    setLoading(true);
    setErr('');
    (async () => {
      try {
        const json = await apiGetAuthenticated(
          `/accounting/trial-balance?${qs}`,
          token,
        );
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : 'Request failed');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [qs]);

  async function grab(kind: 'xlsx' | 'pdf') {
    const token = getStoredToken();
    if (!token) return;
    setBusy(kind);
    setErr('');
    try {
      if (kind === 'xlsx') {
        await download(
          `/accounting/trial-balance/export?${qs}`,
          token,
          'trial-balance.xlsx',
        );
      } else {
        await download(
          `/reports/trial-balance/pdf?${qs}`,
          token,
          'trial-balance.pdf',
        );
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Download failed');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        badge="General ledger"
        title="Trial balance"
        description="Posted journals only — debits and credits by account for the selected period. Optional building filter: use the Property control in the top bar (omit filter with All properties). Export to Excel or PDF for auditors and month-end packs."
      />

      <ModuleScopeHint />

      <div className="card toolbar-period-card">
        <div className="card-header toolbar-period-card-header">
          <span>Reporting period</span>
          <span className="toolbar-period-card-meta">
            Adjust dates to match your fiscal close; figures refresh automatically.
          </span>
        </div>
        <div className="card-body toolbar-period-card-body">
          <label className="toolbar-field">
            <span className="toolbar-field-label">From</span>
            <input
              className="login-input toolbar-field-input"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label className="toolbar-field">
            <span className="toolbar-field-label">To</span>
            <input
              className="login-input toolbar-field-input"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="toolbar-export-row">
        <button
          type="button"
          className="btn-commercial btn-commercial--secondary"
          disabled={!!busy || loading}
          onClick={() => void grab('xlsx')}
        >
          {busy === 'xlsx' ? 'Preparing…' : 'Download Excel (.xlsx)'}
        </button>
        <button
          type="button"
          className="btn-commercial btn-commercial--secondary"
          disabled={!!busy || loading}
          onClick={() => void grab('pdf')}
        >
          {busy === 'pdf' ? 'Preparing…' : 'Download PDF'}
        </button>
      </div>

      {loading ? <StatusBanner message="Loading trial balance…" tone="info" /> : null}
      {err ? <StatusBanner message={err} tone="error" /> : null}

      {!loading && !err && data !== null ? (
        <>
          <TrialBalanceRegistry data={data} />
          <details className="api-json-disclosure card">
            <summary className="api-json-disclosure-summary card-header">
              Raw API response (JSON)
            </summary>
            <div className="card-body">
              <div className="data-preview-label">Live JSON</div>
              <JsonPanel data={data} />
            </div>
          </details>
        </>
      ) : null}
    </div>
  );
}
