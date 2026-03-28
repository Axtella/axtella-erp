'use client';

import { useEffect, useRef, useState } from 'react';
import { getStoredToken, AUTH_CHANGED_EVENT } from '../lib/auth';
import {
  getPropertyScopeSelectValue,
  getDefaultPropertyId,
  ensurePropertyScopeInitialized,
  PROPERTY_SCOPE_ALL,
  PROPERTY_SCOPE_CHANGED_EVENT,
  setPropertyScope,
} from '../lib/property-scope';
import { resolvePropertyAccentHex } from '../lib/property-colors';
import { usePropertyCatalog } from './PropertyCatalogProvider';

export function PropertyScopeSelect() {
  const catalog = usePropertyCatalog();
  const items = catalog?.items ?? [];
  const loading = catalog?.loading ?? true;
  const [value, setValue] = useState(() => getPropertyScopeSelectValue());
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScope() {
      setValue(getPropertyScopeSelectValue());
    }
    window.addEventListener(PROPERTY_SCOPE_CHANGED_EVENT, onScope);
    return () =>
      window.removeEventListener(PROPERTY_SCOPE_CHANGED_EVENT, onScope);
  }, []);

  useEffect(() => {
    function onAuth() {
      setValue(getPropertyScopeSelectValue());
    }
    window.addEventListener(AUTH_CHANGED_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuth);
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const def = getDefaultPropertyId();
    const firstId = items[0].id;
    ensurePropertyScopeInitialized(
      items.some((p) => p.id === def) ? def : firstId,
    );
    setValue(getPropertyScopeSelectValue());
  }, [items]);

  useEffect(() => {
    if (!items.length) return;
    const v = getPropertyScopeSelectValue();
    if (v !== PROPERTY_SCOPE_ALL && !items.some((p) => p.id === v)) {
      const next = items[0].id;
      setPropertyScope(next);
      setValue(next);
    }
  }, [items]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', onDoc);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onDoc);
        document.removeEventListener('keydown', onKey);
      };
    }
  }, [open]);

  if (!getStoredToken()) return null;

  const swatchHex =
    items.length > 0 && value !== PROPERTY_SCOPE_ALL
      ? resolvePropertyAccentHex(
          value,
          items.find((p) => p.id === value)?.accentColor ?? null,
        )
      : null;

  const selectedLabel =
    value === PROPERTY_SCOPE_ALL
      ? 'All properties'
      : (() => {
          const p = items.find((x) => x.id === value);
          return p ? `${p.name} (${p.code})` : 'Property';
        })();

  function pick(next: string) {
    setPropertyScope(next);
    setValue(next);
    setOpen(false);
  }

  const disabled = loading && items.length === 0;

  return (
    <div className="topbar-property-scope" ref={wrapRef}>
      <span className="topbar-property-scope-label">Property</span>
      <div className="topbar-property-scope-row">
        <div className="topbar-property-scope-combo">
          <button
            type="button"
            className="topbar-property-scope-trigger"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((o) => !o)}
            aria-label="Filter data by property"
          >
            <span className="topbar-property-scope-trigger-text">
              {selectedLabel}
            </span>
            <span
              className={`topbar-property-scope-caret${open ? ' topbar-property-scope-caret--open' : ''}`}
              aria-hidden
            />
          </button>
          {open ? (
            <ul
              className="topbar-property-scope-panel"
              role="listbox"
              aria-label="Properties"
            >
              <li role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === PROPERTY_SCOPE_ALL}
                  className={`topbar-property-scope-option${value === PROPERTY_SCOPE_ALL ? ' topbar-property-scope-option--active' : ''}`}
                  onClick={() => pick(PROPERTY_SCOPE_ALL)}
                >
                  All properties
                </button>
              </li>
              {items.map((p) => (
                <li key={p.id} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === p.id}
                    className={`topbar-property-scope-option${value === p.id ? ' topbar-property-scope-option--active' : ''}`}
                    onClick={() => pick(p.id)}
                  >
                    <span
                      className="topbar-property-scope-option-swatch"
                      style={{
                        backgroundColor: resolvePropertyAccentHex(
                          p.id,
                          p.accentColor ?? null,
                        ),
                      }}
                      aria-hidden
                    />
                    <span className="topbar-property-scope-option-text">
                      {p.name}{' '}
                      <span className="topbar-property-scope-option-code">
                        ({p.code})
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {swatchHex ? (
          <span
            className="topbar-property-scope-swatch"
            style={{ backgroundColor: swatchHex }}
            title="Active property color"
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}
