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
import { canAccessAdmin } from '../../lib/rbac';
import { usePropertyCatalog } from '../PropertyCatalogProvider';
import { PageHeader } from '../PageHeader';
import { StatusBanner } from '../StatusBanner';
import { PropertiesRegistry, type PropertyRow } from './PropertiesRegistry';

type ListPayload = {
  items: PropertyRow[];
  total: number;
  page: number;
  limit: number;
};

type FormState = {
  code: string;
  name: string;
  propertyType: string;
  city: string;
  status: string;
  ownerRentMonthly: string;
  address: string;
  notes: string;
  accentColor: string;
  operationStartDate: string;
};

const CREATE_INITIAL: FormState = {
  code: '',
  name: '',
  propertyType: 'mixed',
  city: 'Bahrain',
  status: 'active',
  ownerRentMonthly: '0',
  address: '',
  notes: '',
  accentColor: '',
  operationStartDate: '',
};

const TYPE_OPTIONS = [
  { value: 'mixed', label: 'Mixed use' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
];

function rowToForm(row: PropertyRow): FormState {
  return {
    code: row.code,
    name: row.name,
    propertyType: row.propertyType || 'mixed',
    city: row.city || 'Bahrain',
    status: row.status || 'active',
    ownerRentMonthly: String(row.ownerRentMonthly ?? '0'),
    address: row.address ?? '',
    notes: row.notes ?? '',
    accentColor: row.accentColor?.trim() ?? '',
    operationStartDate: row.operationStartDate
      ? String(row.operationStartDate).slice(0, 10)
      : '',
  };
}

function buildCreateBody(f: FormState) {
  const ownerRentMonthly = Number.parseFloat(f.ownerRentMonthly);
  const body: Record<string, unknown> = {
    code: f.code.trim(),
    name: f.name.trim(),
    propertyType: f.propertyType,
    address: f.address.trim(),
    city: f.city.trim(),
    operationStartDate: f.operationStartDate.trim(),
    status: f.status.trim() || 'active',
    ownerRentMonthly: Number.isFinite(ownerRentMonthly) ? ownerRentMonthly : 0,
  };
  if (f.notes.trim()) body.notes = f.notes.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(f.accentColor.trim())) {
    body.accentColor = f.accentColor.trim();
  }
  return body;
}

function buildPatchBody(f: FormState) {
  const ownerRentMonthly = Number.parseFloat(f.ownerRentMonthly);
  const body: Record<string, unknown> = {
    code: f.code.trim(),
    name: f.name.trim(),
    propertyType: f.propertyType,
    address: f.address.trim(),
    city: f.city.trim(),
    operationStartDate: f.operationStartDate.trim(),
    status: f.status.trim() || 'active',
    ownerRentMonthly: Number.isFinite(ownerRentMonthly) ? ownerRentMonthly : 0,
  };
  body.notes = f.notes.trim() || null;
  if (/^#[0-9A-Fa-f]{6}$/.test(f.accentColor.trim())) {
    body.accentColor = f.accentColor.trim();
  } else {
    body.accentColor = null;
  }
  return body;
}

export function PropertiesWorkspace() {
  const catalog = usePropertyCatalog();
  const [data, setData] = useState<ListPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<FormState>(CREATE_INITIAL);
  const [editForm, setEditForm] = useState<FormState>(CREATE_INITIAL);

  const isAdmin = canAccessAdmin(role);

  const loadList = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setData(null);
      setLoading(false);
      setError(
        'You are not signed in. Open the login page to manage properties.',
      );
      return;
    }
    setLoading(true);
    setError('');
    try {
      const j = (await apiGetAuthenticated(
        '/properties?limit=200&page=1',
        token,
      )) as ListPayload;
      setData(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load properties');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

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
    void loadList();
    void syncRole();
  }, [loadList, syncRole]);

  useEffect(() => {
    function onAuth() {
      void loadList();
      void syncRole();
    }
    window.addEventListener(AUTH_CHANGED_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuth);
  }, [loadList, syncRole]);

  async function afterMutation() {
    catalog?.refresh();
    await loadList();
  }

  async function submitCreate(e: FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    if (!token) return;
    if (
      !createForm.code.trim() ||
      !createForm.name.trim() ||
      !createForm.address.trim() ||
      !createForm.city.trim() ||
      !createForm.operationStartDate.trim()
    ) {
      setError(
        'Code, name, address, city, and operation start date are required.',
      );
      return;
    }
    setSaving(true);
    setError('');
    try {
      await apiPostAuthenticated(
        '/properties',
        token,
        buildCreateBody(createForm),
      );
      setCreateForm(CREATE_INITIAL);
      await afterMutation();
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
    if (
      !editForm.code.trim() ||
      !editForm.name.trim() ||
      !editForm.address.trim() ||
      !editForm.city.trim() ||
      !editForm.operationStartDate.trim()
    ) {
      setError(
        'Code, name, address, city, and operation start date are required.',
      );
      return;
    }
    setSaving(true);
    setError('');
    try {
      await apiPatchAuthenticated(
        `/properties/${editingId}`,
        token,
        buildPatchBody(editForm),
      );
      setEditingId(null);
      await afterMutation();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  async function removeRow(row: PropertyRow) {
    const token = getStoredToken();
    if (!token) return;
    const ok = window.confirm(
      `Delete property “${row.name}” (${row.code})? This cannot be undone.`,
    );
    if (!ok) return;
    setSaving(true);
    setError('');
    try {
      await apiDeleteAuthenticated(`/properties/${row.id}`, token);
      if (editingId === row.id) setEditingId(null);
      await afterMutation();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setSaving(false);
    }
  }

  function renderFormFields(
    f: FormState,
    setF: Dispatch<SetStateAction<FormState>>,
    idPrefix: string,
  ) {
    return (
      <div className="properties-workspace-form-grid">
        <label htmlFor={`${idPrefix}-code`}>
          Code
          <input
            id={`${idPrefix}-code`}
            className="login-input"
            value={f.code}
            onChange={(e) => setF((s) => ({ ...s, code: e.target.value }))}
            required
            autoComplete="off"
          />
        </label>
        <label htmlFor={`${idPrefix}-name`}>
          Name
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
            required
            value={f.propertyType}
            onChange={(e) =>
              setF((s) => ({ ...s, propertyType: e.target.value }))
            }
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${idPrefix}-city`}>
          City
          <input
            id={`${idPrefix}-city`}
            className="login-input"
            required
            value={f.city}
            onChange={(e) => setF((s) => ({ ...s, city: e.target.value }))}
          />
        </label>
        <label htmlFor={`${idPrefix}-status`}>
          Status
          <input
            id={`${idPrefix}-status`}
            className="login-input"
            value={f.status}
            onChange={(e) => setF((s) => ({ ...s, status: e.target.value }))}
          />
        </label>
        <label htmlFor={`${idPrefix}-rent`}>
          Owner rent (monthly)
          <input
            id={`${idPrefix}-rent`}
            className="login-input"
            inputMode="decimal"
            value={f.ownerRentMonthly}
            onChange={(e) =>
              setF((s) => ({ ...s, ownerRentMonthly: e.target.value }))
            }
          />
        </label>
        <label htmlFor={`${idPrefix}-accent`}>
          Accent (#RRGGBB)
          <input
            id={`${idPrefix}-accent`}
            className="login-input"
            placeholder="#114a9f"
            value={f.accentColor}
            onChange={(e) =>
              setF((s) => ({ ...s, accentColor: e.target.value }))
            }
          />
        </label>
        <label htmlFor={`${idPrefix}-start`}>
          Operation start
          <input
            id={`${idPrefix}-start`}
            className="login-input"
            type="date"
            required
            value={f.operationStartDate}
            onChange={(e) =>
              setF((s) => ({ ...s, operationStartDate: e.target.value }))
            }
          />
        </label>
        <label htmlFor={`${idPrefix}-address`} style={{ gridColumn: '1 / -1' }}>
          Address
          <input
            id={`${idPrefix}-address`}
            className="login-input"
            required
            value={f.address}
            onChange={(e) => setF((s) => ({ ...s, address: e.target.value }))}
          />
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

  const listPayload: ListPayload | null = data ?? {
    items: [],
    total: 0,
    page: 1,
    limit: 200,
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Properties"
        badge="Portfolio register"
        description="Add, edit, or remove portfolio buildings. Changes sync to the header Property filter and registers. Delete is limited to administrators."
      />

      {error ? (
        <StatusBanner tone="error" message={error} />
      ) : null}

      <section className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="card-header">Add property</div>
        <div className="card-body">
          <form className="login-form" onSubmit={(e) => void submitCreate(e)}>
            {renderFormFields(createForm, setCreateForm, 'new')}
            <div style={{ marginTop: '1rem' }}>
              <button
                type="submit"
                className="login-submit"
                disabled={saving || loading}
              >
                Save new property
              </button>
            </div>
          </form>
        </div>
      </section>

      {editingId ? (
        <section className="card" style={{ marginBottom: '1.25rem' }}>
          <div className="card-header">Edit property</div>
          <div className="card-body">
            <form className="login-form" onSubmit={(e) => void submitEdit(e)}>
              {renderFormFields(editForm, setEditForm, 'edit')}
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
        <p className="data-preview-label">Loading properties…</p>
      ) : (
        <PropertiesRegistry
          data={listPayload}
          actionHeader="Manage"
          renderActions={(row) => (
            <div className="properties-workspace-actions">
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
          )}
        />
      )}
    </div>
  );
}
