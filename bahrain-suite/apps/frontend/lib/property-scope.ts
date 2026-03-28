import { DEMO_SEED_PROPERTY_ID } from './rbac';

/** Dispatched when the user changes the header property scope. */
export const PROPERTY_SCOPE_CHANGED_EVENT = 'axtella-property-scope-changed';

const STORAGE_KEY = 'axtella_selected_property_scope';

/** Sentinel stored in localStorage when the user wants every property in list APIs. */
export const PROPERTY_SCOPE_ALL = '__all__';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getDefaultPropertyId(): string {
  const env = process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_ID?.trim();
  if (env && UUID_RE.test(env)) return env;
  return DEMO_SEED_PROPERTY_ID;
}

export function readScopeStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * Value for API query params: UUID, or `null` when "All properties" is selected
 * (list endpoints should omit `propertyId`).
 */
export function getPropertyIdForApi(): string | null {
  if (typeof window === 'undefined') return getDefaultPropertyId();
  const raw = readScopeStorage();
  if (raw === PROPERTY_SCOPE_ALL) return null;
  if (raw && UUID_RE.test(raw)) return raw;
  return getDefaultPropertyId();
}

/** Controlled select value (always a concrete string). */
export function getPropertyScopeSelectValue(): string {
  const raw = readScopeStorage();
  if (raw === PROPERTY_SCOPE_ALL) return PROPERTY_SCOPE_ALL;
  if (raw && UUID_RE.test(raw)) return raw;
  return getDefaultPropertyId();
}

export function setPropertyScope(next: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, next);
  window.dispatchEvent(new Event(PROPERTY_SCOPE_CHANGED_EVENT));
}

/** Ensure first-time visitors persist a default so the header and APIs stay aligned. */
export function ensurePropertyScopeInitialized(preferredId?: string): void {
  if (typeof window === 'undefined') return;
  if (readScopeStorage() !== null) return;
  const id =
    preferredId && UUID_RE.test(preferredId)
      ? preferredId
      : getDefaultPropertyId();
  localStorage.setItem(STORAGE_KEY, id);
  window.dispatchEvent(new Event(PROPERTY_SCOPE_CHANGED_EVENT));
}

export function mergeScopedQueryParam(
  pathWithQuery: string,
  paramName: string,
  value: string | null,
): string {
  if (!value) return pathWithQuery;
  const qIdx = pathWithQuery.indexOf('?');
  const path = qIdx === -1 ? pathWithQuery : pathWithQuery.slice(0, qIdx);
  const qs = qIdx === -1 ? '' : pathWithQuery.slice(qIdx + 1);
  const params = new URLSearchParams(qs);
  params.set(paramName, value);
  return `${path}?${params.toString()}`;
}
