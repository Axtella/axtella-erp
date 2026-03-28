'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { API_BASE, apiGetAuthenticated, credentialsForApi } from '../lib/api';
import {
  AUTH_CHANGED_EVENT,
  clearStoredToken,
  getStoredToken,
} from '../lib/auth';
import { usePropertyScopeEpoch } from '../hooks/usePropertyScopeEpoch';
import {
  getPropertyIdForApi,
  mergeScopedQueryParam,
} from '../lib/property-scope';
import { JsonPanel } from './JsonPanel';
import { AdaptiveModuleRegistry } from './module-registry/AdaptiveModuleRegistry';
import { ModuleScopeHint } from './ModuleScopeHint';
import { PageHeader } from './PageHeader';
import { StatusBanner } from './StatusBanner';

/** Extra context when the API message alone is not enough to act on. */
function hintForModuleLoadError(message: string): string | null {
  if (/Cannot reach the API at/i.test(message)) return null;
  if (/HTTP 404\b/.test(message)) {
    if (message.includes('/catalog-item-groups')) {
      return 'The Item groups screen calls GET /api/v1/catalog-item-groups. A 404 almost always means the running API is an old build: in apps/backend run npm run build, restart the Node process, and run npm run db:migrate so migration 019 (catalog_item_groups) exists.';
    }
    if (message.includes('/catalog-items')) {
      return 'Catalog items need the same backend rebuild + restart and migration 018. Confirm only one API is listening on port 3000.';
    }
    return 'The server has no route for this path. Rebuild and restart the Nest API after git pull, and verify NEXT_PUBLIC_API_BASE_URL (or use same-origin /api/v1 through Next).';
  }
  if (/HTTP 403\b/.test(message)) {
    return 'You are signed in, but this role cannot access this endpoint.';
  }
  if (/HTTP 500\b/.test(message) || /Internal server error/i.test(message)) {
    return 'The backend threw an error—often a missing DB column or table. Run npm run db:migrate in apps/backend and read the API terminal stack trace.';
  }
  if (/not valid JSON/i.test(message)) {
    return 'The response was HTML or plain text instead of JSON—often a proxy error page or wrong host. Check API_BASE and that the backend is running.';
  }
  return null;
}

function shouldOfferSignInLink(message: string): boolean {
  return (
    message.includes('not signed in') ||
    message.includes('401') ||
    /session expired|sign in again/i.test(message)
  );
}

export function ModuleDataPage({
  title,
  endpoint,
  description,
  exportXlsxUrl,
  lead,
  badge = 'Live data',
  renderData,
  applyPropertyScope = true,
  scopeQueryParam = 'propertyId',
}: {
  title: string;
  endpoint: string;
  description: string;
  /** Same query string base as JSON endpoint, path `/accounting/pnl/monthly/export?...` */
  exportXlsxUrl?: string;
  /** Optional block above the page header (e.g. white-label strip). */
  lead?: ReactNode;
  /** PageHeader badge (default: Live data). */
  badge?: string;
  /** When set, replaces the default commercial registry layout; raw JSON stays in the disclosure below. */
  renderData?: (data: unknown) => ReactNode;
  /** When true, append global header `propertyId` (or omit when “All properties”). */
  applyPropertyScope?: boolean;
  scopeQueryParam?: string;
}) {
  const [data, setData] = useState<unknown>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [authEpoch, setAuthEpoch] = useState(0);
  const scopeEpoch = usePropertyScopeEpoch();

  const resolvedEndpoint = useMemo(() => {
    if (!applyPropertyScope) return endpoint;
    void scopeEpoch;
    const pid = getPropertyIdForApi();
    return mergeScopedQueryParam(endpoint, scopeQueryParam, pid);
  }, [endpoint, applyPropertyScope, scopeQueryParam, scopeEpoch]);

  const resolvedExportUrl = useMemo(() => {
    if (!exportXlsxUrl) return undefined;
    if (!applyPropertyScope) return exportXlsxUrl;
    void scopeEpoch;
    const pid = getPropertyIdForApi();
    return mergeScopedQueryParam(exportXlsxUrl, scopeQueryParam, pid);
  }, [exportXlsxUrl, applyPropertyScope, scopeQueryParam, scopeEpoch]);

  useEffect(() => {
    function onAuthChanged() {
      setAuthEpoch((n) => n + 1);
    }
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      setData(null);
      setErrorMessage(
        'You are not signed in. Open the login page and sign in to load this data.',
      );
      return;
    }

    setLoading(true);
    setErrorMessage('');
    let cancelled = false;
    (async () => {
      try {
        const json = await apiGetAuthenticated(resolvedEndpoint, token);
        if (!cancelled) setData(json);
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Request failed';
        if (msg.includes('401')) {
          clearStoredToken();
          if (!cancelled) {
            setErrorMessage(
              'Session expired or invalid. Please sign in again from the login page.',
            );
          }
        } else if (!cancelled) {
          setErrorMessage(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedEndpoint, authEpoch]);

  const loadErrorHint =
    !loading && errorMessage ? hintForModuleLoadError(errorMessage) : null;

  const renderContent =
    renderData ??
    ((d: unknown) => (
      <AdaptiveModuleRegistry endpoint={resolvedEndpoint} data={d} />
    ));

  async function downloadXlsx() {
    const token = getStoredToken();
    if (!token || !resolvedExportUrl) return;
    setExporting(true);
    try {
      const res = await fetch(`${API_BASE}${resolvedExportUrl}`, {
        credentials: credentialsForApi(),
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Export failed (${res.status})`);
      }
      const blob = await res.blob();
      const dispo = res.headers.get('Content-Disposition');
      let filename = 'report.xlsx';
      const m = dispo?.match(/filename="?([^";]+)"?/i);
      if (m?.[1]) filename = m[1].trim();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.rel = 'noopener';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Export failed';
      setErrorMessage(msg);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="page-container">
      {lead ? <div className="module-brand-lead">{lead}</div> : null}
      <PageHeader title={title} description={description} badge={badge} />
      {applyPropertyScope ? <ModuleScopeHint /> : null}
      {resolvedExportUrl && !loading && !errorMessage ? (
        <div className="page-actions" style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            className="login-submit"
            style={{ maxWidth: 280 }}
            disabled={exporting}
            onClick={() => void downloadXlsx()}
          >
            {exporting ? 'Preparing workbook…' : 'Download Excel (.xlsx)'}
          </button>
        </div>
      ) : null}
      {loading ? (
        <StatusBanner message="Loading…" tone="info" />
      ) : null}
      {!loading && errorMessage ? (
        <div className="module-load-error">
          <StatusBanner
            message={
              <>
                <div>{errorMessage}</div>
                {loadErrorHint ? (
                  <div
                    className="module-load-error-hint"
                    style={{
                      marginTop: '0.65rem',
                      fontSize: '0.92rem',
                      lineHeight: 1.45,
                      opacity: 0.95,
                    }}
                  >
                    {loadErrorHint}
                  </div>
                ) : null}
              </>
            }
          />
          {shouldOfferSignInLink(errorMessage) ? (
            <p style={{ marginTop: '0.75rem' }}>
              <Link href="/login" className="inline-link">
                Open login
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
      {!loading && !errorMessage && data !== null ? (
        <>
          {renderContent(data)}
          <details className="api-json-disclosure card">
            <summary className="api-json-disclosure-summary card-header">
              Raw API response (JSON)
            </summary>
            <div className="card-body">
              <div className="data-preview-label">Live JSON</div>
              <JsonPanel data={data} />
            </div>
          </details>
        </>
      ) : null}
    </div>
  );
}
