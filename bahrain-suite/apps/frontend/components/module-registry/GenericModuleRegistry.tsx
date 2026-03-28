'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import {
  type CellFormat,
  renderFormattedCell,
} from './formatCells';
import { extractListPayload } from './listPayload';
import { resolvePropertyAccentHex } from '../../lib/property-colors';
import { StatusBanner } from '../StatusBanner';
import { usePropertyCatalog } from '../PropertyCatalogProvider';

export type RegistryColumn =
  | {
      key: string;
      label: string;
      format?: CellFormat;
      /** Right-align numeric-style cells */
      align?: 'left' | 'right';
    }
  | {
      key: string;
      label: string;
      render: (row: Record<string, unknown>) => ReactNode;
      align?: 'left' | 'right';
    };

export type GenericModuleRegistryProps = {
  data: unknown;
  registerTitle: string;
  registerSubtitle?: string;
  entityLabel: string;
  columns: RegistryColumn[];
  midKpi?: (items: Record<string, unknown>[]) => {
    label: string;
    value: string | number;
  };
  expectedEndpoint?: string;
  /** Left border color stripe per row using this FK (e.g. propertyId). */
  rowPropertyIdKey?: string;
};

function getCell(
  row: Record<string, unknown>,
  col: RegistryColumn,
): ReactNode {
  if ('render' in col) return col.render(row);
  const v = row[col.key];
  return renderFormattedCell(v, col.format);
}

export function GenericModuleRegistry({
  data,
  registerTitle,
  registerSubtitle,
  entityLabel,
  columns,
  midKpi,
  expectedEndpoint,
  rowPropertyIdKey: rowPropertyIdKeyProp,
}: GenericModuleRegistryProps) {
  const catalog = usePropertyCatalog();
  const list = extractListPayload(data);
  if (!list) {
    return (
      <StatusBanner
        tone="error"
        message={
          <>
            <strong>Unexpected response shape</strong>
            {expectedEndpoint ? (
              <span>{` for ${expectedEndpoint}`}</span>
            ) : null}
            . This screen needs JSON like{' '}
            <code>{`{ "items": [...], "total": number }`}</code>. If you see an
            error object instead, read the message above the raw JSON panel—or
            check the browser Network tab for the same request.
          </>
        }
      />
    );
  }

  const { items, total, page, limit } = list;
  const mid = midKpi?.(items);

  const rowPropertyIdKey =
    rowPropertyIdKeyProp ??
    (items[0] && typeof items[0].propertyId === 'string'
      ? 'propertyId'
      : undefined);

  function rowAccentStyle(
    row: Record<string, unknown>,
  ): CSSProperties | undefined {
    if (!rowPropertyIdKey) return undefined;
    const pid = row[rowPropertyIdKey];
    if (typeof pid !== 'string' || pid.length < 32) return undefined;
    const hex = resolvePropertyAccentHex(
      pid,
      catalog?.getMeta(pid)?.accentColor ?? null,
    );
    return { borderLeft: `4px solid ${hex}` };
  }

  const pageNum = page ?? 1;
  const plural =
    total === 1 ? entityLabel : `${entityLabel.replace(/s$/, '')}s`;

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="Summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{total}</span>
          <span className="properties-kpi-label">Total in register</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">
            {mid ? mid.value : items.length}
          </span>
          <span className="properties-kpi-label">
            {mid ? mid.label : 'Rows in view'}
          </span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{items.length}</span>
          <span className="properties-kpi-label">
            {limit != null
              ? `Rows (page ${pageNum})`
              : 'Rows in response'}
          </span>
        </div>
      </section>

      <section className="card properties-register-card">
        <div className="card-header properties-register-card-header">
          <span>{registerTitle}</span>
          {registerSubtitle ? (
            <span className="properties-register-meta">{registerSubtitle}</span>
          ) : null}
        </div>
        <div className="card-body properties-register-body">
          {items.length === 0 ? (
            <div className="properties-empty-state" role="status">
              <p className="properties-empty-title">No records in this view</p>
              <p className="properties-empty-lead">
                The API returned an empty list. Pick another property in the top
                bar if this module is scoped, or add data in the relevant
                module—then refresh this page.
              </p>
              <p className="properties-empty-cta">
                <Link href="/" className="inline-link">
                  Back to dashboard
                </Link>
                <span className="properties-empty-dot" aria-hidden>
                  {' '}
                  ·{' '}
                </span>
                <Link href="/reports" className="inline-link">
                  Reports
                </Link>
              </p>
            </div>
          ) : (
            <div className="properties-table-wrap">
              <table className="properties-table">
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th
                        key={c.key}
                        scope="col"
                        className={
                          c.align === 'right' ? 'properties-table-num' : ''
                        }
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, idx) => {
                    const id =
                      typeof row.id === 'string'
                        ? row.id
                        : `row-${idx}`;
                    const accent = rowAccentStyle(row);
                    return (
                      <tr
                        key={id}
                        className={
                          accent ? 'properties-table-row--accent' : undefined
                        }
                        style={accent}
                      >
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className={
                              col.align === 'right' ? 'properties-table-num' : ''
                            }
                          >
                            {getCell(row, col)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="properties-table-foot">
            Showing <strong>{items.length}</strong> of <strong>{total}</strong>{' '}
            {plural}
            {limit != null ? (
              <>
                {' '}
                · page <strong>{pageNum}</strong>, limit{' '}
                <strong>{limit}</strong>
              </>
            ) : null}
          </p>
        </div>
      </section>
    </div>
  );
}
