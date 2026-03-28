'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiGetAuthenticated } from '../../../lib/api';
import { getStoredToken } from '../../../lib/auth';
import { usePropertyScopeEpoch } from '../../../hooks/usePropertyScopeEpoch';
import { getPropertyIdForApi } from '../../../lib/property-scope';
import { ModuleScopeHint } from '../../../components/ModuleScopeHint';
import { PageHeader } from '../../../components/PageHeader';
import { StatusBanner } from '../../../components/StatusBanner';
import { JsonPanel } from '../../../components/JsonPanel';

const CHANNEL_OPTIONS = [
  { id: 'cash_receipt', label: 'Cash receipt' },
  { id: 'pos', label: 'POS / card terminal' },
  { id: 'benefit_pay', label: 'Benefit Pay' },
  { id: 'untagged', label: 'Unallocated (no channel on line)' },
] as const;

const CHANNEL_LABELS: Record<string, string> = {
  cash_receipt: 'Cash receipt',
  pos: 'POS / terminal',
  benefit_pay: 'Benefit Pay',
  untagged: 'Unallocated',
};

const EXPENSE_LABELS: Record<string, string> = {
  payroll: 'Payroll',
  utilities: 'Utilities',
  amc: 'AMC',
  government: 'Government',
  ownerRent: 'Owner rent',
  maintenance: 'Maintenance',
  other: 'Other',
};

type IncomeExpensePayload = {
  propertyId?: string;
  month?: number;
  year?: number;
  channelsFilter?: string[] | null;
  incomeByChannel?: Record<string, number>;
  totalIncomeRecognized?: number;
  totalIncomeInStatement?: number;
  expenses?: Record<string, number>;
  totalExpenses?: number;
  netIncome?: number;
  _note?: string;
};

function formatMoney(n: number | undefined): string {
  if (n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function IncomeExpensePage() {
  const d = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(d.getMonth() + 1);
  const [year, setYear] = useState(d.getFullYear());
  const scopeEpoch = usePropertyScopeEpoch();
  const propertyId = useMemo(() => {
    void scopeEpoch;
    return getPropertyIdForApi();
  }, [scopeEpoch]);

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(CHANNEL_OPTIONS.map((c) => c.id)),
  );
  const [data, setData] = useState<IncomeExpensePayload | null>(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  const channelsParam = useMemo(() => {
    if (selected.size === CHANNEL_OPTIONS.length) return '';
    return Array.from(selected).join(',');
  }, [selected]);

  const load = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      setErr('Sign in to load the income & expense statement.');
      return;
    }
    if (!propertyId) {
      setLoading(false);
      setErr('');
      setData(null);
      return;
    }
    setLoading(true);
    setErr('');
    try {
      let path = `/accounting/income-expense?propertyId=${encodeURIComponent(propertyId)}&month=${month}&year=${year}`;
      if (channelsParam) {
        path += `&channels=${encodeURIComponent(channelsParam)}`;
      }
      const json = (await apiGetAuthenticated(
        path,
        token,
      )) as IncomeExpensePayload;
      setData(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Request failed');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [propertyId, month, year, channelsParam]);

  useEffect(() => {
    void load();
  }, [load]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (next.size === 0) {
        return new Set(prev);
      }
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(CHANNEL_OPTIONS.map((c) => c.id)));
  }

  const incomeRows = data?.incomeByChannel
    ? Object.entries(data.incomeByChannel).map(([key, amount]) => ({
        key,
        label: CHANNEL_LABELS[key] ?? key,
        amount: Number(amount) || 0,
      }))
    : [];

  const expenseRows = data?.expenses
    ? Object.entries(data.expenses).map(([key, amount]) => ({
        key,
        label: EXPENSE_LABELS[key] ?? key,
        amount: Number(amount) || 0,
      }))
    : [];

  return (
    <div className="page-container">
      <PageHeader
        badge="Reports"
        title="Income & expense statement"
        description="Revenue by collection channel (cash receipt, POS, Benefit Pay) with full expense detail for the month. Choose the building in the top bar Property control. Post journals with incomeChannel on revenue lines; unallocated revenue appears in Unallocated."
      />

      <ModuleScopeHint />

      {!propertyId ? (
        <StatusBanner
          tone="info"
          message="Select a specific property in the top bar (not “All properties”) to load this statement."
        />
      ) : null}

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">Period</div>
        <div
          className="card-body"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
        >
          <label className="login-label">
            Month
            <input
              className="login-input"
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
          </label>
          <label className="login-label">
            Year
            <input
              className="login-input"
              type="number"
              min={2000}
              max={2100}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">Income sources (multi-select)</div>
        <div className="card-body">
          <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
            Choose which collection methods count toward{' '}
            <strong>income in this statement</strong>. Expenses always reflect
            the full month. All sources selected matches total recognized income
            (when every line is tagged or unallocated is included).
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 20px',
              marginBottom: 12,
            }}
          >
            {CHANNEL_OPTIONS.map((c) => (
              <label
                key={c.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.has(c.id)}
                  onChange={() => toggle(c.id)}
                />
                {c.label}
              </label>
            ))}
          </div>
          <button
            type="button"
            className="login-submit"
            style={{ maxWidth: 200, marginTop: 0 }}
            onClick={selectAll}
          >
            Select all sources
          </button>
        </div>
      </div>

      {loading ? <StatusBanner message="Loading statement…" tone="info" /> : null}
      {err ? <StatusBanner message={err} tone="error" /> : null}

      {!loading && !err && data ? (
        <>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">Income by channel (recognized)</div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="statement-table">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th className="statement-table__num">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeRows.map((row) => (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      <td className="statement-table__num">
                        {formatMoney(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <strong>Total recognized income</strong>
                    </td>
                    <td className="statement-table__num">
                      <strong>
                        {formatMoney(data.totalIncomeRecognized)}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Income included in statement</strong>
                      {data.channelsFilter?.length ? (
                        <span
                          style={{
                            display: 'block',
                            fontWeight: 400,
                            fontSize: '0.75rem',
                            color: 'var(--muted)',
                            marginTop: 4,
                          }}
                        >
                          Filter: {data.channelsFilter.join(', ')}
                        </span>
                      ) : null}
                    </td>
                    <td className="statement-table__num">
                      <strong>
                        {formatMoney(data.totalIncomeInStatement)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">Expenses</div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="statement-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th className="statement-table__num">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseRows.map((row) => (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      <td className="statement-table__num">
                        {formatMoney(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <strong>Total expenses</strong>
                    </td>
                    <td className="statement-table__num">
                      <strong>{formatMoney(data.totalExpenses)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">Result</div>
            <div className="card-body">
              <p
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)',
                }}
              >
                Net income: {formatMoney(data.netIncome)}
              </p>
              {data._note ? (
                <p className="login-hint" style={{ marginTop: 12, marginBottom: 0 }}>
                  {data._note}
                </p>
              ) : null}
            </div>
          </div>
        </>
      ) : null}

      <details className="card" style={{ marginTop: 8 }}>
        <summary
          className="card-header"
          style={{ cursor: 'pointer', listStyle: 'none' }}
        >
          Advanced — raw API response
        </summary>
        <div className="card-body">
          <JsonPanel data={data} />
          <p className="login-hint" style={{ marginTop: 16 }}>
            POST manual journals with revenue lines, e.g.{' '}
            <code>
              {`"incomeChannel": "pos"`}
            </code>
            . Requires DB migration{' '}
            <code>007_journal_line_income_channel.sql</code>.
          </p>
        </div>
      </details>
    </div>
  );
}
