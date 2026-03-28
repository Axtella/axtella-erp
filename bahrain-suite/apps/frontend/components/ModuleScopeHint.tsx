'use client';

import { getPropertyIdForApi } from '../lib/property-scope';
import { resolvePropertyAccentHex } from '../lib/property-colors';
import { usePropertyCatalog } from './PropertyCatalogProvider';

/**
 * Shows current header property scope with that property’s accent color.
 */
export function ModuleScopeHint() {
  const catalog = usePropertyCatalog();
  const pid = getPropertyIdForApi();

  if (!pid) {
    return (
      <div
        className="module-scope-banner module-scope-banner--all"
        role="status"
      >
        <span className="module-scope-banner-label">Data scope</span>
        <span>All properties — lists are not filtered by building.</span>
      </div>
    );
  }

  const meta = catalog?.getMeta(pid);
  const hex = resolvePropertyAccentHex(pid, meta?.accentColor ?? null);

  return (
    <div
      className="module-scope-banner"
      role="status"
      style={{ borderLeft: `4px solid ${hex}` }}
    >
      <span
        className="prop-accent-dot"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <span className="module-scope-banner-label">Data scope</span>
      <span>
        <strong>{meta?.name ?? 'Property'}</strong>
        {meta?.code ? (
          <span className="module-scope-code"> ({meta.code})</span>
        ) : null}
        <span className="module-scope-meta">
          {' '}
          — this page’s data requests include this building when the API
          supports a property filter.
        </span>
      </span>
    </div>
  );
}
