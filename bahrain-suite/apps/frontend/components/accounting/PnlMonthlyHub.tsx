'use client';

import { useMemo, useState } from 'react';
import { usePropertyScopeEpoch } from '../../hooks/usePropertyScopeEpoch';
import { getPropertyIdForApi } from '../../lib/property-scope';
import { ModuleDataPage } from '../ModuleDataPage';
import { ModuleScopeHint } from '../ModuleScopeHint';
import { PageHeader } from '../PageHeader';
import { StatusBanner } from '../StatusBanner';

export function PnlMonthlyHub() {
  const d = new Date();
  const [month, setMonth] = useState(d.getMonth() + 1);
  const [year, setYear] = useState(d.getFullYear());
  const scopeEpoch = usePropertyScopeEpoch();

  const propertyId = useMemo(() => {
    void scopeEpoch;
    return getPropertyIdForApi();
  }, [scopeEpoch]);

  const { endpoint, exportUrl } = useMemo(() => {
    if (!propertyId) {
      return { endpoint: '', exportUrl: '' };
    }
    const q = new URLSearchParams({
      propertyId,
      month: String(month),
      year: String(year),
    });
    const qs = q.toString();
    return {
      endpoint: `/accounting/pnl/monthly?${qs}`,
      exportUrl: `/accounting/pnl/monthly/export?${qs}`,
    };
  }, [propertyId, month, year]);

  const periodCard = (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-header">Statement period</div>
      <div
        className="card-body"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="data-preview-label">Month</span>
          <select
            className="login-input"
            style={{ minWidth: 140 }}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, '0')}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="data-preview-label">Year</span>
          <input
            className="login-input"
            type="number"
            style={{ minWidth: 120 }}
            value={year}
            min={2000}
            max={2100}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );

  if (!propertyId) {
    return (
      <div className="page-container">
        <PageHeader
          title="Monthly P&L"
          badge="General ledger"
          description="Monthly profit and loss from posted journal lines. The API needs a single property—choose one in the top bar (not “All properties”)."
        />
        <ModuleScopeHint />
        <StatusBanner
          tone="info"
          message="Select a specific property using the Property control in the top bar. “All properties” is not supported for monthly P&L."
        />
      </div>
    );
  }

  return (
    <ModuleDataPage
      key={`${endpoint}`}
      applyPropertyScope={false}
      lead={
        <>
          <ModuleScopeHint />
          {periodCard}
        </>
      }
      title="Monthly P&L"
      badge="General ledger"
      endpoint={endpoint}
      exportXlsxUrl={exportUrl}
      description="Monthly profit and loss from posted journal lines (COA mapping on the server). Building scope follows the header Property control. Use Download Excel for an accountant-ready workbook."
    />
  );
}
