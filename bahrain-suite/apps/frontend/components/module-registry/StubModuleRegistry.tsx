import { extractListPayload } from './listPayload';
import { StatusBanner } from '../StatusBanner';

function humanizeModule(slug: string): string {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function StubModuleRegistry({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') {
    return (
      <StatusBanner tone="error" message="Invalid module stub response." />
    );
  }
  const o = data as Record<string, unknown>;
  const moduleSlug = typeof o.module === 'string' ? o.module : 'module';
  const list = extractListPayload(data);
  if (!list) {
    return (
      <StatusBanner
        tone="error"
        message="Stub response missing items array."
      />
    );
  }

  const { items, total } = list;
  const title = `${humanizeModule(moduleSlug)} register`;

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="Module summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{total}</span>
          <span className="properties-kpi-label">Records</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">Stub</span>
          <span className="properties-kpi-label">API stage</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{items.length}</span>
          <span className="properties-kpi-label">Rows returned</span>
        </div>
      </section>

      <section className="card properties-register-card">
        <div className="card-header properties-register-card-header">
          <span>{title}</span>
          <span className="properties-register-meta">
            Placeholder payload from <code className="properties-code">{moduleSlug}</code> ·
            connect or extend the backend to populate this register.
          </span>
        </div>
        <div className="card-body properties-register-body">
          {items.length === 0 ? (
            <p className="properties-empty">
              No rows yet. When the module API is wired, records will appear here in
              the same commercial layout as the rest of the suite.
            </p>
          ) : (
            <p className="properties-empty">
              This stub returned rows; switch to a typed layout when the schema is
              finalized. Use raw JSON below for the exact shape.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
