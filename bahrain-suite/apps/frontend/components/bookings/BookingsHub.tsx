'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ModuleDataPage } from '../ModuleDataPage';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'checked_in', label: 'Checked in' },
  { value: 'checked_out', label: 'Checked out' },
];

export function BookingsHub() {
  const [status, setStatus] = useState('');

  const endpoint = useMemo(() => {
    const u = new URLSearchParams();
    u.set('limit', '150');
    if (status) u.set('status', status);
    return `/bookings?${u.toString()}`;
  }, [status]);

  return (
    <div className="page-container">
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">Filters</div>
        <div
          className="card-body"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'flex-end',
          }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="data-preview-label">Status</span>
            <select
              className="login-input"
              style={{ minWidth: 200 }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value || 'all'} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.85 }}>
            Choose the building in the top bar <strong>Property</strong> control.
            Tenants:{' '}
            <Link href="/tenants" className="inline-link">
              Tenants
            </Link>
            ; portfolio:{' '}
            <Link href="/properties" className="inline-link">
              Properties
            </Link>
            .
          </p>
        </div>
      </div>

      <ModuleDataPage
        key={endpoint}
        title="Bookings"
        badge="Rent roll"
        endpoint={endpoint}
        description="Lease and stay bookings with property, unit type, tenant contact, contract dates, and rates. Scope by building with the Property control in the header."
      />
    </div>
  );
}
