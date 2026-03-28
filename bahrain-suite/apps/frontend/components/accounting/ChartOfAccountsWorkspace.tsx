'use client';

import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from 'react';
import {
  API_BASE,
  apiDeleteAuthenticated,
  apiGetAuthenticated,
  apiPatchAuthenticated,
  apiPostAuthenticated,
  credentialsForApi,
} from '../../lib/api';
import { AUTH_CHANGED_EVENT, getStoredToken } from '../../lib/auth';
import { canAccessAccountantNav, canAccessAdmin } from '../../lib/rbac';
import { PageHeader } from '../PageHeader';
import { StatusBanner } from '../StatusBanner';

const ACCOUNT_TYPES = [
  { value: 'asset', label: 'Asset' },
  { value: 'liability', label: 'Liability' },
  { value: 'equity', label: 'Equity' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'expense', label: 'Expense' },
] as const;

type CoaRow = {
  id: string;
  accountCode: string;
  name: string;
  accountType: string;
  notes?: string | null;
  isActive: boolean;
};

type ListPayload = {
  items: CoaRow[];
  total: number;
  page: number;
  limit: number;
};

type FormState = {
  accountCode: string;
  name: string;
  accountType: string;
  notes: string;
  isActive: boolean;
};

const EMPTY_FORM: FormState = {
  accountCode: '',
  name: '',
  accountType: 'expense',
  notes: '',
  isActive: true,
};

function rowToForm(row: CoaRow): FormState {
  return {
    accountCode: row.accountCode,
    name: row.name,
    accountType: row.accountType,
    notes: row.notes ?? '',
    isActive: row.isActive,
  };
}

function labelType(t: string): string {
  const x = ACCOUNT_TYPES.find((o) => o.value === t);
  return x?.label ?? t;
}

export function ChartOfAccountsWorkspace() {
  const [data, setData] = useState<ListPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<FormState>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM);

  const canEdit = canAccessAccountantNav(role);
  const isAdmin = canAccessAdmin(role);

  const loadList = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setData(null);
      setLoading(false);
      setError('Sign in to view the chart of accounts.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const q = new URLSearchParams({ limit: '200', page: '1' });
      if (search.trim()) q.set('search', search.trim());
      const j = (await apiGetAuthenticated(
        `/accounting/coa/account-heads?${q.toString()}`,
        token,
      )) as ListPayload;
      setData(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load account heads');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [search]);

  const syncRole = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setRole(null);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
        credentials: credentialsForApi(),
      });
      if (!res.ok) {
        setRole(null);
        return;
      }
      const b = (await res.json()) as { role?: string };
      setRole(b.role ?? null);
    } catch {
      setRole(null);
    }
  }, []);

  useEffect(() => {
    void syncRole();
  }, [syncRole]);

  useEffect(() => {
    if (!search.trim()) {
      void loadList();
      return;
    }
    const t = window.setTimeout(() => void loadList(), 300);
    return () => window.clearTimeout(t);
  }, [loadList, search]);

  useEffect(() => {
    function onAuth() {
      void loadList();
      void syncRole();
    }
    window.addEventListener(AUTH_CHANGED_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuth);
  }, [loadList, syncRole]);

  async function submitCreate(e: FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    if (!token) return;
    if (!createForm.accountCode.trim() || !createForm.name.trim()) {
      setError('Account code and name are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await apiPostAuthenticated('/accounting/coa/account-heads', token, {
        accountCode: createForm.accountCode.trim(),
        name: createForm.name.trim(),
        accountType: createForm.accountType,
        notes: createForm.notes.trim() || undefined,
        isActive: createForm.isActive,
      });
      setCreateForm(EMPTY_FORM);
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setSaving(false);
    }
  }

  async function submitEdit(e: FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    if (!token || !editingId) return;
    if (!editForm.accountCode.trim() || !editForm.name.trim()) {
      setError('Account code and name are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await apiPatchAuthenticated(
        `/accounting/coa/account-heads/${editingId}`,
        token,
        {
          accountCode: editForm.accountCode.trim(),
          name: editForm.name.trim(),
          accountType: editForm.accountType,
          notes: editForm.notes.trim(),
          isActive: editForm.isActive,
        },
      );
      setEditingId(null);
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  async function removeRow(row: CoaRow) {
    const token = getStoredToken();
    if (!token) return;
    const ok = window.confirm(
      `Remove account head “${row.name}” (${row.accountCode})?`,
    );
    if (!ok) return;
    setSaving(true);
    setError('');
    try {
      await apiDeleteAuthenticated(
        `/accounting/coa/account-heads/${row.id}`,
        token,
      );
      if (editingId === row.id) setEditingId(null);
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setSaving(false);
    }
  }

  function renderFields(
    f: FormState,
    setF: Dispatch<SetStateAction<FormState>>,
    idPrefix: string,
  ) {
    return (
      <div className="properties-workspace-form-grid">
        <label htmlFor={`${idPrefix}-code`}>
          Account code
          <input
            id={`${idPrefix}-code`}
            className="login-input"
            value={f.accountCode}
            onChange={(e) =>
              setF((s) => ({ ...s, accountCode: e.target.value }))
            }
            required
            placeholder="e.g. 6100"
            autoComplete="off"
          />
        </label>
        <label htmlFor={`${idPrefix}-name`}>
          Account name
          <input
            id={`${idPrefix}-name`}
            className="login-input"
            value={f.name}
            onChange={(e) => setF((s) => ({ ...s, name: e.target.value }))}
            required
          />
        </label>
        <label htmlFor={`${idPrefix}-type`}>
          Type
          <select
            id={`${idPrefix}-type`}
            className="login-input"
            value={f.accountType}
            onChange={(e) =>
              setF((s) => ({ ...s, accountType: e.target.value }))
            }
          >
            {ACCOUNT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor={`${idPrefix}-active`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          <input
            id={`${idPrefix}-active`}
            type="checkbox"
            checked={f.isActive}
            onChange={(e) =>
              setF((s) => ({ ...s, isActive: e.target.checked }))
            }
          />
          Active
        </label>
        <label htmlFor={`${idPrefix}-notes`} style={{ gridColumn: '1 / -1' }}>
          Notes
          <textarea
            id={`${idPrefix}-notes`}
            className="login-input"
            rows={2}
            value={f.notes}
            onChange={(e) => setF((s) => ({ ...s, notes: e.target.value }))}
          />
        </label>
      </div>
    );
  }

  const items = data?.items ?? [];

  return (
    <div className="page-container">
      <PageHeader
        title="Chart of accounts"
        badge="COA"
        description="Define account heads (code, name, type). Use these codes on journal lines. P&amp;L bucket mapping still follows numeric prefixes in the server map unless you align codes accordingly."
      />

      {error ? <StatusBanner tone="error" message={error} /> : null}

      {!canEdit ? (
        <StatusBanner
          tone="info"
          message="Only administrators and accountants can create or edit account heads."
        />
      ) : null}

      <section className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">Search</div>
        <div className="card-body">
          <label style={{ display: 'block', maxWidth: 360 }}>
            <span className="data-preview-label">Filter by code or name</span>
            <input
              className="login-input"
              style={{ width: '100%', marginTop: 6 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
            />
          </label>
        </div>
      </section>

      {canEdit ? (
        <section className="card" style={{ marginBottom: '1.25rem' }}>
          <div className="card-header">New account head</div>
          <div className="card-body">
            <form className="login-form" onSubmit={(e) => void submitCreate(e)}>
              {renderFields(createForm, setCreateForm, 'new')}
              <div style={{ marginTop: '1rem' }}>
                <button
                  type="submit"
                  className="login-submit"
                  disabled={saving || loading}
                >
                  Create account head
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      {editingId && canEdit ? (
        <section className="card" style={{ marginBottom: '1.25rem' }}>
          <div className="card-header">Edit account head</div>
          <div className="card-body">
            <form className="login-form" onSubmit={(e) => void submitEdit(e)}>
              {renderFields(editForm, setEditForm, 'edit')}
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <button
                  type="submit"
                  className="login-submit"
                  disabled={saving}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="properties-workspace-btn"
                  disabled={saving}
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      {loading && !data ? (
        <p className="data-preview-label">Loading chart…</p>
      ) : (
        <section className="card properties-register-card">
          <div className="card-header properties-register-card-header">
            <span>Account heads</span>
            <span className="properties-register-meta">
              {data?.total ?? 0} in register · showing {items.length} rows
            </span>
          </div>
          <div className="card-body properties-register-body">
            {items.length === 0 ? (
              <p className="properties-empty">No account heads yet.</p>
            ) : (
              <div className="properties-table-wrap">
                <table className="properties-table">
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      {(canEdit || isAdmin) && (
                        <th scope="col" className="properties-table-actions">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <code className="properties-code">
                            {row.accountCode}
                          </code>
                        </td>
                        <td>
                          <span className="properties-name">{row.name}</span>
                          {row.notes ? (
                            <span className="properties-sub">{row.notes}</span>
                          ) : null}
                        </td>
                        <td>{labelType(row.accountType)}</td>
                        <td>
                          <span
                            className={`properties-status-pill properties-status-pill--${row.isActive ? 'active' : 'inactive'}`}
                          >
                            {row.isActive ? 'active' : 'inactive'}
                          </span>
                        </td>
                        {(canEdit || isAdmin) && (
                          <td className="properties-table-actions">
                            <div className="properties-workspace-actions">
                              {canEdit ? (
                                <button
                                  type="button"
                                  className="properties-workspace-btn"
                                  disabled={saving}
                                  onClick={() => {
                                    setEditingId(row.id);
                                    setEditForm(rowToForm(row));
                                  }}
                                >
                                  Edit
                                </button>
                              ) : null}
                              {isAdmin ? (
                                <button
                                  type="button"
                                  className="properties-workspace-btn properties-workspace-btn--danger"
                                  disabled={saving}
                                  onClick={() => void removeRow(row)}
                                >
                                  Delete
                                </button>
                              ) : null}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
