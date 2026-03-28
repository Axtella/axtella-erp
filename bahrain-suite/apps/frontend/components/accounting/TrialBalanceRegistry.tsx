'use client';

import { formatBhd } from '../module-registry/formatCells';
import { StatusBanner } from '../StatusBanner';

type TbRow = {
  accountCode: string;
  totalDebit: number;
  totalCredit: number;
  netDebit: number;
  netCredit: number;
};

type TrialBalancePayload = {
  from: string;
  to: string;
  propertyId?: string | null;
  rows: TbRow[];
  totalDebit: number;
  totalCredit: number;
  difference: number;
};

function isTrialBalance(data: unknown): data is TrialBalancePayload {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  return (
    Array.isArray(o.rows) &&
    typeof o.totalDebit === 'number' &&
    typeof o.totalCredit === 'number' &&
    typeof o.difference === 'number'
  );
}

export function TrialBalanceRegistry({ data }: { data: unknown }) {
  if (!isTrialBalance(data)) {
    return (
      <StatusBanner
        tone="error"
        message="Unexpected trial balance response. Expected rows, totalDebit, totalCredit, and difference."
      />
    );
  }

  const { rows, totalDebit, totalCredit, difference, from, to } = data;
  const balanced = Math.abs(difference) < 0.02;
  const acctCount = rows.length;

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="Trial balance summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{formatBhd(totalDebit)}</span>
          <span className="properties-kpi-label">Total debit (BHD)</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{formatBhd(totalCredit)}</span>
          <span className="properties-kpi-label">Total credit (BHD)</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">
            {balanced ? 'Balanced' : formatBhd(difference)}
          </span>
          <span className="properties-kpi-label">
            {balanced ? 'Posted journals' : 'Difference (DR − CR)'}
          </span>
        </div>
      </section>

      <p className="tb-registry-period">
        Period <strong>{from}</strong> → <strong>{to}</strong>
        {' · '}
        <span className="tb-registry-meta">
          {acctCount} account{acctCount === 1 ? '' : 's'} · posted activity only
        </span>
      </p>

      <section className="card properties-register-card">
        <div className="card-header properties-register-card-header">
          <span>Trial balance register</span>
          <span className="properties-register-meta">
            Debits and credits by account code for the selected range
          </span>
        </div>
        <div className="card-body properties-register-body">
          {rows.length === 0 ? (
            <p className="properties-empty">
              No posted lines in this period. Post journals or widen the date range.
            </p>
          ) : (
            <div className="properties-table-wrap">
              <table className="properties-table">
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col" className="properties-table-num">
                      Debit
                    </th>
                    <th scope="col" className="properties-table-num">
                      Credit
                    </th>
                    <th scope="col" className="properties-table-num">
                      Net DR
                    </th>
                    <th scope="col" className="properties-table-num">
                      Net CR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.accountCode}>
                      <td>
                        <code className="properties-code">{r.accountCode}</code>
                      </td>
                      <td className="properties-table-num">
                        {formatBhd(r.totalDebit)}
                      </td>
                      <td className="properties-table-num">
                        {formatBhd(r.totalCredit)}
                      </td>
                      <td className="properties-table-num">
                        {formatBhd(r.netDebit)}
                      </td>
                      <td className="properties-table-num">
                        {formatBhd(r.netCredit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
