import type { ReactNode } from 'react';

export function formatBhd(value: unknown): string {
  const n =
    typeof value === 'string'
      ? Number.parseFloat(value)
      : typeof value === 'number'
        ? value
        : Number.NaN;
  if (Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('en-BH', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatDate(value: unknown): string {
  if (value == null || value === '') return '—';
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(value: unknown): string {
  if (value == null || value === '') return '—';
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function shortUuid(value: unknown): string {
  if (typeof value !== 'string' || !value) return '—';
  return `${value.slice(0, 8)}…`;
}

function typeSlug(s: string): string {
  const x = (s || 'default').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return x || 'default';
}

export type CellFormat =
  | 'text'
  | 'currency'
  | 'code'
  | 'date'
  | 'datetime'
  | 'uuid'
  | 'truncate'
  | 'pill';

export function renderFormattedCell(
  value: unknown,
  format: CellFormat | undefined,
): ReactNode {
  const f = format ?? 'text';
  if (value == null || value === '') {
    return f === 'pill' ? (
      <span className="properties-type-pill properties-type-pill--mixed">—</span>
    ) : (
      '—'
    );
  }
  switch (f) {
    case 'currency':
      return formatBhd(value);
    case 'code':
      return <code className="properties-code">{String(value)}</code>;
    case 'date':
      return formatDate(value);
    case 'datetime':
      return formatDateTime(value);
    case 'uuid':
      return (
        <code className="properties-code">{shortUuid(value)}</code>
      );
    case 'truncate': {
      const t = String(value);
      return t.length > 64 ? `${t.slice(0, 61)}…` : t;
    }
    case 'pill':
      return (
        <span
          className={`properties-type-pill properties-type-pill--${typeSlug(String(value))}`}
        >
          {String(value)}
        </span>
      );
    default:
      return String(value);
  }
}
