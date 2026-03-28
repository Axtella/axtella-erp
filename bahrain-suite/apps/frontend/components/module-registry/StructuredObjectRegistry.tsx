import { formatDate } from './formatCells';

function isScalar(v: unknown): boolean {
  return (
    v === null ||
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean'
  );
}

function formatScalar(v: unknown): string {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (typeof v === 'number') {
    return new Intl.NumberFormat('en-BH', { maximumFractionDigits: 6 }).format(
      v,
    );
  }
  if (typeof v === 'string') {
    if (/^\d{4}-\d{2}-\d{2}/.test(v)) return formatDate(v);
    return v;
  }
  return String(v);
}

export function StructuredObjectRegistry({ data }: { data: unknown }) {
  if (data === null || typeof data !== 'object') {
    return (
      <div className="properties-registry">
        <p className="properties-empty">No structured object to display.</p>
      </div>
    );
  }

  const o = data as Record<string, unknown>;
  const entries = Object.entries(o).filter(
    ([k, v]) => !k.startsWith('_') && isScalar(v),
  );

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="Response summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{entries.length}</span>
          <span className="properties-kpi-label">Scalar fields</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">
            {Object.keys(o).length}
          </span>
          <span className="properties-kpi-label">Top-level keys</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">JSON</span>
          <span className="properties-kpi-label">Full payload below</span>
        </div>
      </section>

      <section className="card properties-register-card">
        <div className="card-header properties-register-card-header">
          <span>Structured response</span>
          <span className="properties-register-meta">
            This endpoint does not return a standard list register. Scalar fields are
            summarized here; nested data stays in the raw JSON disclosure.
          </span>
        </div>
        <div className="card-body properties-register-body">
          {entries.length === 0 ? (
            <p className="properties-empty">
              No scalar top-level fields to summarize. Expand raw JSON for the full
              payload.
            </p>
          ) : (
            <div className="properties-table-wrap">
              <table className="properties-table">
                <thead>
                  <tr>
                    <th scope="col">Field</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(([key, val]) => (
                    <tr key={key}>
                      <td>
                        <code className="properties-code">{key}</code>
                      </td>
                      <td>{formatScalar(val)}</td>
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
