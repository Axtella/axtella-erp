import { formatBhd } from './formatCells';
import { StatusBanner } from '../StatusBanner';
import { isMonthlyPnlPayload } from './listPayload';

type Bucket = Record<string, number>;

function bucketRows(bucket: Bucket): { key: string; amount: number }[] {
  return Object.entries(bucket).map(([key, amount]) => ({ key, amount }));
}

function labelize(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PnlMonthlyRegistry({ data }: { data: unknown }) {
  if (!isMonthlyPnlPayload(data)) {
    return (
      <StatusBanner
        tone="error"
        message="Unexpected P&L response. Expected revenue, expenses, and netProfitLoss."
      />
    );
  }

  const o = data as Record<string, unknown>;
  const revenue = o.revenue as Bucket;
  const expenses = o.expenses as Bucket;
  const month = o.month as number;
  const year = o.year as number;
  const net = o.netProfitLoss as number;

  const totalRev = Object.values(revenue).reduce((a, b) => a + b, 0);
  const totalExp = Object.values(expenses).reduce((a, b) => a + b, 0);

  const revRows = bucketRows(revenue);
  const expRows = bucketRows(expenses);

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="P&L summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{formatBhd(net)}</span>
          <span className="properties-kpi-label">Net P&amp;L (BHD)</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{formatBhd(totalRev)}</span>
          <span className="properties-kpi-label">Revenue (bucketed)</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{formatBhd(totalExp)}</span>
          <span className="properties-kpi-label">Expenses (bucketed)</span>
        </div>
      </section>

      <p className="pnl-registry-period">
        Period:{' '}
        <strong>
          {String(month).padStart(2, '0')}/{year}
        </strong>
        {typeof o._basis === 'string' ? (
          <>
            {' '}
            · <span className="pnl-registry-basis">{o._basis}</span>
          </>
        ) : null}
      </p>

      <div className="pnl-registry-buckets">
        <section className="card properties-register-card pnl-bucket-card">
          <div className="card-header properties-register-card-header">
            <span>Revenue</span>
            <span className="properties-register-meta">
              Classification from posted lines (COA map)
            </span>
          </div>
          <div className="card-body properties-register-body">
            <div className="properties-table-wrap">
              <table className="properties-table pnl-bucket-table">
                <thead>
                  <tr>
                    <th scope="col">Line</th>
                    <th scope="col" className="properties-table-num">
                      Amount (BHD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revRows.map((r) => (
                    <tr key={r.key}>
                      <td>{labelize(r.key)}</td>
                      <td className="properties-table-num">
                        {formatBhd(r.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="card properties-register-card pnl-bucket-card">
          <div className="card-header properties-register-card-header">
            <span>Expenses</span>
            <span className="properties-register-meta">
              Operating and owner-related buckets
            </span>
          </div>
          <div className="card-body properties-register-body">
            <div className="properties-table-wrap">
              <table className="properties-table pnl-bucket-table">
                <thead>
                  <tr>
                    <th scope="col">Line</th>
                    <th scope="col" className="properties-table-num">
                      Amount (BHD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expRows.map((r) => (
                    <tr key={r.key}>
                      <td>{labelize(r.key)}</td>
                      <td className="properties-table-num">
                        {formatBhd(r.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
