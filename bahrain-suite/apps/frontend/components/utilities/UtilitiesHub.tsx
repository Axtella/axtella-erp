'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  apiGetAuthenticated,
  apiPostAuthenticated,
} from '../../lib/api';
import {
  AUTH_CHANGED_EVENT,
  clearStoredToken,
  getStoredToken,
} from '../../lib/auth';
import { usePropertyScopeEpoch } from '../../hooks/usePropertyScopeEpoch';
import { getPropertyIdForApi } from '../../lib/property-scope';
import { GenericModuleRegistry } from '../module-registry/GenericModuleRegistry';
import { ModuleScopeHint } from '../ModuleScopeHint';
import { PageHeader } from '../PageHeader';
import { StatusBanner } from '../StatusBanner';

type ListPayload = {
  items: Record<string, unknown>[];
  total: number;
  page?: number;
  limit?: number;
};

type Overview = {
  summary?: {
    ewaAccountCount?: number;
    ewaBillCount?: number;
    totalBalanceDue?: number;
  };
};

function money3(n: number | undefined): string {
  if (n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export function UtilitiesHub() {
  const scopeEpoch = usePropertyScopeEpoch();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [accounts, setAccounts] = useState<ListPayload | null>(null);
  const [bills, setBills] = useState<ListPayload | null>(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [authEpoch, setAuthEpoch] = useState(0);
  const [saving, setSaving] = useState(false);
  const [formMsg, setFormMsg] = useState('');

  const [acctEwaNo, setAcctEwaNo] = useState('');
  const [acctUnitLabel, setAcctUnitLabel] = useState('');
  const [acctNotes, setAcctNotes] = useState('');

  const [billNet, setBillNet] = useState('');
  const [billVat, setBillVat] = useState('');
  const [billTotal, setBillTotal] = useState('');
  const [billPaid, setBillPaid] = useState('');
  const [billDate, setBillDate] = useState('');
  const [billPaidDate, setBillPaidDate] = useState('');
  const [billEwaAccountId, setBillEwaAccountId] = useState('');
  const [billNotes, setBillNotes] = useState('');

  const propertyId = useMemo(() => {
    void scopeEpoch;
    return getPropertyIdForApi();
  }, [scopeEpoch]);

  useEffect(() => {
    function onAuth() {
      setAuthEpoch((n) => n + 1);
    }
    window.addEventListener(AUTH_CHANGED_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuth);
  }, []);

  const load = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      setErr(
        'You are not signed in. Open the login page to load utilities data.',
      );
      setOverview(null);
      setAccounts(null);
      setBills(null);
      return;
    }
    setLoading(true);
    setErr('');
    try {
      const pid = getPropertyIdForApi();
      const ovPath = pid
        ? `/utilities?propertyId=${encodeURIComponent(pid)}`
        : '/utilities';
      const u = new URLSearchParams();
      u.set('limit', '100');
      if (pid) u.set('propertyId', pid);
      const acPath = `/utilities/ewa/accounts?${u.toString()}`;
      const blPath = `/utilities/ewa/bills?${u.toString()}`;

      const [ov, ac, bl] = await Promise.all([
        apiGetAuthenticated(ovPath, token) as Promise<Overview>,
        apiGetAuthenticated(acPath, token) as Promise<ListPayload>,
        apiGetAuthenticated(blPath, token) as Promise<ListPayload>,
      ]);
      setOverview(ov);
      setAccounts(ac);
      setBills(bl);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Request failed';
      if (msg.includes('401')) {
        clearStoredToken();
        setErr('Session expired. Please sign in again.');
      } else {
        setErr(msg);
      }
      setOverview(null);
      setAccounts(null);
      setBills(null);
    } finally {
      setLoading(false);
    }
  }, [scopeEpoch, authEpoch]);

  useEffect(() => {
    void load();
  }, [load]);

  const accountsData = useMemo(
    () => accounts ?? { items: [], total: 0 },
    [accounts],
  );
  const billsData = useMemo(() => bills ?? { items: [], total: 0 }, [bills]);

  async function submitAccount(e: React.FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    const pid = getPropertyIdForApi();
    if (!token || !pid) return;
    const no = acctEwaNo.trim();
    if (no.length < 4) {
      setFormMsg('EWA account number must be at least 4 characters.');
      return;
    }
    setSaving(true);
    setFormMsg('');
    try {
      await apiPostAuthenticated('/utilities/ewa/accounts', token, {
        propertyId: pid,
        ewaAccountNo: no,
        unitLabel: acctUnitLabel.trim() || undefined,
        notes: acctNotes.trim() || undefined,
      });
      setAcctEwaNo('');
      setAcctUnitLabel('');
      setAcctNotes('');
      setFormMsg('EWA account saved.');
      await load();
    } catch (e) {
      setFormMsg(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function submitBill(e: React.FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    if (!token || !billEwaAccountId.trim()) return;
    if (!billDate.trim()) {
      setFormMsg('Bill date and total bill are required.');
      return;
    }
    const totalBill = Number.parseFloat(billTotal.trim());
    if (!Number.isFinite(totalBill) || totalBill < 0) {
      setFormMsg('Enter a valid total bill amount (0 or greater).');
      return;
    }
    setSaving(true);
    setFormMsg('');
    try {
      const body: Record<string, unknown> = {
        ewaAccountId: billEwaAccountId.trim(),
        billDate: billDate.trim(),
        totalBill,
        notes: billNotes.trim() || undefined,
      };
      if (billPaidDate) body.paidDate = billPaidDate;
      if (billNet.trim()) body.netAmount = Number.parseFloat(billNet);
      if (billVat.trim()) body.vatAmount = Number.parseFloat(billVat);
      if (billPaid.trim()) body.paidAmount = Number.parseFloat(billPaid);
      await apiPostAuthenticated('/utilities/ewa/bills', token, body);
      setBillNet('');
      setBillVat('');
      setBillTotal('');
      setBillPaid('');
      setBillDate('');
      setBillPaidDate('');
      setBillNotes('');
      setFormMsg('Bill saved.');
      await load();
    } catch (e) {
      setFormMsg(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  const s = overview?.summary;
  const canPostAccount = !!propertyId;

  return (
    <div className="page-container">
      <PageHeader
        title="Utilities"
        badge="EWA & meters"
        description="Electricity and water (EWA) accounts and bills. Use the Property control in the top bar to filter registers; choose a specific building before adding a new EWA account."
      />

      <ModuleScopeHint />

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-body" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
          <strong>Property scope</strong> is set in the top bar next to your session.
          Select <strong>All properties</strong> to see every EWA row, or one
          building to focus the grid. Portfolio names are maintained under{' '}
          <Link href="/properties" className="inline-link">
            Properties
          </Link>
          .
        </div>
      </div>

      {loading ? <StatusBanner message="Loading…" tone="info" /> : null}
      {!loading && err ? (
        <StatusBanner
          message={
            <>
              {err}{' '}
              <Link href="/login" className="inline-link">
                Sign in
              </Link>
            </>
          }
        />
      ) : null}

      {!loading && !err && s ? (
        <section
          className="properties-kpi-strip"
          aria-label="Utilities summary"
          style={{ marginBottom: '1.25rem' }}
        >
          <div className="properties-kpi-card">
            <span className="properties-kpi-value">{s.ewaAccountCount ?? 0}</span>
            <span className="properties-kpi-label">EWA accounts</span>
          </div>
          <div className="properties-kpi-card">
            <span className="properties-kpi-value">{s.ewaBillCount ?? 0}</span>
            <span className="properties-kpi-label">Bill rows</span>
          </div>
          <div className="properties-kpi-card">
            <span className="properties-kpi-value">
              {money3(s.totalBalanceDue)}
            </span>
            <span className="properties-kpi-label">Balance due (filtered)</span>
          </div>
        </section>
      ) : null}

      {!loading && !err && accounts && bills ? (
        <>
          <GenericModuleRegistry
            registerTitle="EWA account register"
            registerSubtitle="One row per EWA meter account, optionally linked to a unit label from your sheet."
            entityLabel="account"
            expectedEndpoint="/utilities/ewa/accounts"
            data={accountsData}
            columns={[
              { key: 'propertyName', label: 'Property' },
              { key: 'propertyCode', label: 'Code', format: 'code' },
              { key: 'unitLabel', label: 'Unit label' },
              { key: 'unitNo', label: 'Unit no' },
              { key: 'ewaAccountNo', label: 'EWA account' },
              { key: 'notes', label: 'Notes', format: 'truncate' },
            ]}
          />

          <div style={{ height: '1.5rem' }} />

          <GenericModuleRegistry
            registerTitle="EWA bill register"
            registerSubtitle="Bill date, amounts, paid, and computed balance due."
            entityLabel="bill"
            expectedEndpoint="/utilities/ewa/bills"
            data={billsData}
            columns={[
              { key: 'billDate', label: 'Bill date', format: 'date' },
              { key: 'propertyName', label: 'Property' },
              { key: 'ewaAccountNo', label: 'EWA account' },
              { key: 'unitLabel', label: 'Unit' },
              {
                key: 'netAmount',
                label: 'Net',
                format: 'currency',
                align: 'right',
              },
              {
                key: 'vatAmount',
                label: 'VAT',
                format: 'currency',
                align: 'right',
              },
              {
                key: 'totalBill',
                label: 'Total',
                format: 'currency',
                align: 'right',
              },
              {
                key: 'paidAmount',
                label: 'Paid',
                format: 'currency',
                align: 'right',
              },
              {
                key: 'balanceDue',
                label: 'Balance due',
                format: 'currency',
                align: 'right',
              },
              {
                key: 'paymentDueDate',
                label: 'Due',
                format: 'date',
              },
            ]}
          />

          <details className="card" style={{ marginTop: '1.25rem' }}>
            <summary className="card-header" style={{ cursor: 'pointer' }}>
              Add EWA account
            </summary>
            <div className="card-body">
              {!canPostAccount ? (
                <p style={{ marginTop: 0, fontSize: '0.9rem' }}>
                  Select a <strong>specific property</strong> in the top bar (not
                  “All properties”) to register a new EWA account.
                </p>
              ) : null}
              <form onSubmit={(e) => void submitAccount(e)} className="login-form">
                <label>
                  EWA account number
                  <input
                    className="login-input"
                    required
                    value={acctEwaNo}
                    onChange={(e) => setAcctEwaNo(e.target.value)}
                    placeholder="e.g. 1072634858"
                  />
                </label>
                <label>
                  Unit label (optional)
                  <input
                    className="login-input"
                    value={acctUnitLabel}
                    onChange={(e) => setAcctUnitLabel(e.target.value)}
                    placeholder="Flat #63, ENTRANCE, …"
                  />
                </label>
                <label>
                  Notes
                  <input
                    className="login-input"
                    value={acctNotes}
                    onChange={(e) => setAcctNotes(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="login-submit"
                  disabled={saving || !canPostAccount}
                >
                  Save account
                </button>
              </form>
            </div>
          </details>

          <details className="card" style={{ marginTop: '1rem' }}>
            <summary className="card-header" style={{ cursor: 'pointer' }}>
              Add EWA bill
            </summary>
            <div className="card-body">
              <form onSubmit={(e) => void submitBill(e)} className="login-form">
                <label>
                  EWA account
                  <select
                    className="login-input"
                    required
                    value={billEwaAccountId}
                    onChange={(e) => setBillEwaAccountId(e.target.value)}
                  >
                    <option value="">Select account…</option>
                    {accountsData.items.map((row) => (
                      <option key={String(row.id)} value={String(row.id)}>
                        {String(row.ewaAccountNo ?? '')} —{' '}
                        {String(row.unitLabel ?? row.unitNo ?? '')}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Bill date
                  <input
                    className="login-input"
                    type="date"
                    required
                    value={billDate}
                    onChange={(e) => setBillDate(e.target.value)}
                  />
                </label>
                <label>
                  Net amount
                  <input
                    className="login-input"
                    inputMode="decimal"
                    value={billNet}
                    onChange={(e) => setBillNet(e.target.value)}
                  />
                </label>
                <label>
                  VAT amount
                  <input
                    className="login-input"
                    inputMode="decimal"
                    value={billVat}
                    onChange={(e) => setBillVat(e.target.value)}
                  />
                </label>
                <label>
                  Total bill
                  <input
                    className="login-input"
                    inputMode="decimal"
                    required
                    value={billTotal}
                    onChange={(e) => setBillTotal(e.target.value)}
                  />
                </label>
                <label>
                  Paid amount
                  <input
                    className="login-input"
                    inputMode="decimal"
                    value={billPaid}
                    onChange={(e) => setBillPaid(e.target.value)}
                  />
                </label>
                <label>
                  Paid date
                  <input
                    className="login-input"
                    type="date"
                    value={billPaidDate}
                    onChange={(e) => setBillPaidDate(e.target.value)}
                  />
                </label>
                <label>
                  Notes
                  <input
                    className="login-input"
                    value={billNotes}
                    onChange={(e) => setBillNotes(e.target.value)}
                  />
                </label>
                <button type="submit" className="login-submit" disabled={saving}>
                  Save bill
                </button>
              </form>
            </div>
          </details>

          {formMsg ? (
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>{formMsg}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
