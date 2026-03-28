'use client';

import { useState } from 'react';
import Link from 'next/link';
import { API_BASE, credentialsForApi } from '../../lib/api';
import { getStoredToken } from '../../lib/auth';
import { PageHeader } from '../../components/PageHeader';
import { StatusBanner } from '../../components/StatusBanner';

export default function DataImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setResult(null);
    const token = getStoredToken();
    if (!token) {
      setErr('Sign in first. Bulk upload requires admin or accountant role.');
      return;
    }
    if (!file) {
      setErr('Choose a CSV file.');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/properties/bulk-upload`, {
        method: 'POST',
        credentials: credentialsForApi(),
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(
          typeof (body as { message?: string }).message === 'string'
            ? (body as { message: string }).message
            : `Upload failed (${res.status})`,
        );
        return;
      }
      setResult(body);
    } catch {
      setErr('Network error — check API is running and CORS allows this origin.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        badge="Data"
        title="Bulk property import"
        description="Upload a CSV with header: code,name,property_type,city (last two optional). Duplicate codes are skipped."
      />
      {err ? <StatusBanner message={err} tone="error" /> : null}
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="card-header">CSV upload</div>
        <div className="card-body">
          <p style={{ marginTop: 0 }}>
            <Link href="/login" className="inline-link">
              Sign in
            </Link>{' '}
            as <strong>admin</strong> or <strong>accountant</strong>.
          </p>
          <form className="login-form" onSubmit={onSubmit}>
            <label className="login-label">
              File (.csv)
              <input
                className="login-input"
                type="file"
                accept=".csv,text/csv"
                required
                onChange={(ev) => setFile(ev.target.files?.[0] ?? null)}
              />
            </label>
            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? 'Uploading…' : 'Import properties'}
            </button>
          </form>
          {result ? (
            <pre
              className="json-panel"
              style={{ marginTop: 20 }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : null}
        </div>
      </div>
    </div>
  );
}
