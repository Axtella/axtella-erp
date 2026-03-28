'use client';

import type { ReactNode } from 'react';
import { resolvePropertyAccentHex } from '../../lib/property-colors';
import { StatusBanner } from '../StatusBanner';

export type PropertyRow = {
  id: string;
  code: string;
  name: string;
  propertyType: string;
  address?: string | null;
  city: string;
  investorId?: string | null;
  ownerRentMonthly: string | number;
  operationStartDate?: string | null;
  status: string;
  notes?: string | null;
  accentColor?: string | null;
};

type PropertiesListPayload = {
  items: PropertyRow[];
  total: number;
  page: number;
  limit: number;
};

function isPropertiesList(data: unknown): data is PropertiesListPayload {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  return Array.isArray(o.items) && typeof o.total === 'number';
}

function formatBhd(value: string | number): string {
  const n = typeof value === 'string' ? Number.parseFloat(value) : value;
  if (Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('en-BH', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function labelType(type: string): string {
  if (!type) return '—';
  return type
    .split(/[\s_-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function typeSlug(type: string): string {
  const s = (type || 'mixed').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return s || 'mixed';
}

export function PropertiesRegistry({
  data,
  actionHeader,
  renderActions,
}: {
  data: unknown;
  actionHeader?: string;
  renderActions?: (row: PropertyRow) => ReactNode;
}) {
  if (!isPropertiesList(data)) {
    return (
      <StatusBanner
        tone="error"
        message="Unexpected response from /properties. Expected a list with items and total."
      />
    );
  }

  const { items, total, page, limit } = data;
  const activeCount = items.filter(
    (p) => (p.status || '').toLowerCase() === 'active',
  ).length;

  return (
    <div className="properties-registry">
      <section className="properties-kpi-strip" aria-label="Portfolio summary">
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{total}</span>
          <span className="properties-kpi-label">Properties in register</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{activeCount}</span>
          <span className="properties-kpi-label">Active in view</span>
        </div>
        <div className="properties-kpi-card">
          <span className="properties-kpi-value">{items.length}</span>
          <span className="properties-kpi-label">Rows (page {page})</span>
        </div>
      </section>

      <section className="card properties-register-card">
        <div className="card-header properties-register-card-header">
          <span>Portfolio register</span>
          <span className="properties-register-meta">
            Commercial property master data · synchronized with ledger and operations
          </span>
        </div>
        <div className="card-body properties-register-body">
          {items.length === 0 ? (
            <p className="properties-empty">No properties match this view.</p>
          ) : (
            <div className="properties-table-wrap">
              <table className="properties-table">
                <thead>
                  <tr>
                    <th scope="col" className="properties-table-col-swatch">
                      Color
                    </th>
                    <th scope="col">Code</th>
                    <th scope="col">Property</th>
                    <th scope="col">Type</th>
                    <th scope="col">City</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="properties-table-num">
                      Owner rent (BHD)
                    </th>
                    {renderActions ? (
                      <th scope="col" className="properties-table-actions">
                        {actionHeader ?? 'Actions'}
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id}>
                      <td className="properties-table-col-swatch">
                        <span
                          className="properties-row-swatch"
                          style={{
                            backgroundColor: resolvePropertyAccentHex(
                              row.id,
                              row.accentColor ?? null,
                            ),
                          }}
                          title={resolvePropertyAccentHex(
                            row.id,
                            row.accentColor ?? null,
                          )}
                          aria-label={`Accent ${row.code}`}
                        />
                      </td>
                      <td>
                        <code className="properties-code">{row.code}</code>
                      </td>
                      <td>
                        <span className="properties-name">{row.name}</span>
                        {row.address ? (
                          <span className="properties-sub">{row.address}</span>
                        ) : null}
                      </td>
                      <td>
                        <span
                          className={`properties-type-pill properties-type-pill--${typeSlug(row.propertyType)}`}
                        >
                          {labelType(row.propertyType)}
                        </span>
                      </td>
                      <td>{row.city || '—'}</td>
                      <td>
                        <span
                          className={`properties-status-pill properties-status-pill--${(row.status || 'unknown').toLowerCase()}`}
                        >
                          {(row.status || '—').toLowerCase()}
                        </span>
                      </td>
                      <td className="properties-table-num">
                        {formatBhd(row.ownerRentMonthly)}
                      </td>
                      {renderActions ? (
                        <td className="properties-table-actions">
                          {renderActions(row)}
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="properties-table-foot">
            Showing <strong>{items.length}</strong> of <strong>{total}</strong>{' '}
            {total === 1 ? 'property' : 'properties'}
            {limit ? (
              <>
                {' '}
                · page <strong>{page}</strong>, limit <strong>{limit}</strong>
              </>
            ) : null}
          </p>
        </div>
      </section>
    </div>
  );
}
