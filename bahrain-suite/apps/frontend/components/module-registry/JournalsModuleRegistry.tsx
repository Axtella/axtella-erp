'use client';

import type { CSSProperties } from 'react';
import { extractListPayload } from './listPayload';
import {
  formatDate,
  formatBhd,
  renderFormattedCell,
} from './formatCells';
import { resolvePropertyAccentHex } from '../../lib/property-colors';
import { StatusBanner } from '../StatusBanner';
import { usePropertyCatalog } from '../PropertyCatalogProvider';

export function JournalsModuleRegistry({ data }: { data: unknown }) {
  const catalog = usePropertyCatalog();
  const list = extractListPayload(data);
  if (!list) {
    return (
      <StatusBanner
        tone="error"
        message="Unexpected response from journals. Expected items and total."
      />
    );
  }

  const { items, total, page, limit } = list;
  const lineCount = items.reduce((s, row) => {
    const lines = row.lines;
    return s + (Array.isArray(lines) ? lines.length : 0);
  }, 0);
  const pageNum = page ?? 1;

  function journalRowStyle(
    row: Record<string, unknown>,
  ): CSSProperties | undefined {
    const pid = row.propertyId;
    if (typeof pid !== 'string' || pid.length < 32) return undefined;
    const hex = resolvePropertyAccentHex(
      pid,
      catalog?.getMeta(pid)?.accentColor ?? null,
    );
    return { borderLeft: `4px solid ${hex}` };
  }

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="Journal summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{total}</span>
          <span className="properties-kpi-label">Journal entries</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{lineCount}</span>
          <span className="properties-kpi-label">Lines in view</span>
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
          <span>Journal register</span>
          <span className="properties-register-meta">
            Row color matches property (when a journal is tagged to a building).
            Use the header Property control to filter the list.
          </span>
        </div>
        <div className="card-body properties-register-body">
          {items.length === 0 ? (
            <p className="properties-empty">No journals match this view.</p>
          ) : (
            <div className="properties-table-wrap">
              <table className="properties-table">
                <thead>
                  <tr>
                    <th scope="col">Journal</th>
                    <th scope="col">Date</th>
                    <th scope="col">Lines</th>
                    <th scope="col" className="properties-table-num">
                      Net movement
                    </th>
                    <th scope="col">Narration</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, idx) => {
                    const id =
                      typeof row.id === 'string' ? row.id : `j-${idx}`;
                    const lines = Array.isArray(row.lines) ? row.lines : [];
                    let debit = 0;
                    let credit = 0;
                    for (const ln of lines) {
                      if (!ln || typeof ln !== 'object') continue;
                      const l = ln as Record<string, unknown>;
                      debit += Number(l.debit) || 0;
                      credit += Number(l.credit) || 0;
                    }
                    const net = debit - credit;
                    const r = row as Record<string, unknown>;
                    const accent = journalRowStyle(r);
                    return (
                      <tr
                        key={id}
                        className={accent ? 'properties-table-row--accent' : undefined}
                        style={accent}
                      >
                        <td>
                          {renderFormattedCell(row.journalNo, 'code')}
                        </td>
                        <td>{formatDate(row.entryDate)}</td>
                        <td>{lines.length}</td>
                        <td className="properties-table-num">
                          {formatBhd(net)}
                        </td>
                        <td>
                          {renderFormattedCell(row.narration, 'truncate')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="properties-table-foot">
            Showing <strong>{items.length}</strong> of <strong>{total}</strong>{' '}
            journals
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
