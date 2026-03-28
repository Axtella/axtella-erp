'use client';

import { useState } from 'react';
import { API_BASE, apiGetAuthenticated } from '../../../lib/api';
import { getStoredToken } from '../../../lib/auth';
import { PageHeader } from '../../../components/PageHeader';
import { StatusBanner } from '../../../components/StatusBanner';
import { JsonPanel } from '../../../components/JsonPanel';

export default function VatToolPage() {
  const [net, setNet] = useState('1000');
  const [gross, setGross] = useState('1100');
  const [fromNetResult, setFromNetResult] = useState<unknown>(null);
  const [fromGrossResult, setFromGrossResult] = useState<unknown>(null);
  const [err, setErr] = useState('');

  async function loadFromNet() {
    const token = getStoredToken();
    if (!token) {
      setErr('Sign in to use VAT endpoints.');
      return;
    }
    setErr('');
    try {
      const q = new URLSearchParams({ amount: net });
      const json = await apiGetAuthenticated(
        `/tax/bahrain-vat/from-net?${q}`,
        token,
      );
      setFromNetResult(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Request failed');
    }
  }

  async function loadFromGross() {
    const token = getStoredToken();
    if (!token) {
      setErr('Sign in to use VAT endpoints.');
      return;
    }
    setErr('');
    try {
      const q = new URLSearchParams({ amount: gross });
      const json = await apiGetAuthenticated(
        `/tax/bahrain-vat/from-gross?${q}`,
        token,
      );
      setFromGrossResult(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Request failed');
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        badge="Tax · Bahrain"
        title="Standard VAT 10%"
        description="Kingdom of Bahrain VAT rate applied server-side for net→gross and gross→net splits (auditable, API-driven)."
      />
      {err ? <StatusBanner message={err} tone="error" /> : null}
      <div className="module-grid">
        <div className="card">
          <div className="card-header">From net (exclusive)</div>
          <div className="card-body">
            <label className="login-label">
              Amount (net)
              <input
                className="login-input"
                value={net}
                onChange={(e) => setNet(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="login-submit"
              onClick={() => void loadFromNet()}
            >
              Calculate
            </button>
            <JsonPanel data={fromNetResult} />
          </div>
        </div>
        <div className="card">
          <div className="card-header">From gross (inclusive)</div>
          <div className="card-body">
            <label className="login-label">
              Amount (gross)
              <input
                className="login-input"
                value={gross}
                onChange={(e) => setGross(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="login-submit"
              onClick={() => void loadFromGross()}
            >
              Calculate
            </button>
            <JsonPanel data={fromGrossResult} />
          </div>
        </div>
      </div>
    </div>
  );
}
