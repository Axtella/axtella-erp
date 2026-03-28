/**
 * When unset/empty: `/api/v1` (same origin + Next.js rewrite → Nest). Use this for local dev
 * so login works whether you open the UI as localhost, 127.0.0.1, or a LAN IP.
 * Set `NEXT_PUBLIC_API_BASE_URL` to a full URL only when the API is on another host in production.
 */
function normalizeApiBase(raw: string | undefined): string {
  const s = (raw ?? '').trim().replace(/\/+$/, '');
  if (!s) return '/api/v1';
  const withApi = s.endsWith('/api/v1') ? s : `${s.replace(/\/+$/, '')}/api/v1`;
  return withApi;
}

function canonicalHost(hostname: string): string {
  return hostname === 'localhost' ? '127.0.0.1' : hostname;
}

/**
 * If NEXT_PUBLIC_API_BASE_URL targets this Next dev server by mistake, use the
 * same-origin proxy so /api/v1/* forwards to Nest (avoids 404 "proxy disabled").
 */
function resolveApiBase(): string {
  const trimmed = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').trim();
  if (!trimmed) return '/api/v1';
  const full = normalizeApiBase(trimmed);
  if (typeof window === 'undefined') return full;
  try {
    let abs = full;
    if (!abs.includes('://')) {
      abs = `http://${abs}`;
    }
    const u = new URL(abs);
    const loc = window.location;
    const sameHost =
      canonicalHost(u.hostname) === canonicalHost(loc.hostname);
    const portU = u.port || (u.protocol === 'https:' ? '443' : '80');
    const portL = loc.port || (loc.protocol === 'https:' ? '443' : '80');
    if (sameHost && portU === portL) {
      return '/api/v1';
    }
  } catch {
    /* keep full */
  }
  return full;
}

export const API_BASE = resolveApiBase();

/** Matches login / AppShell: same-origin when using the `/api/v1` Next proxy. */
export function credentialsForApi(): RequestCredentials {
  return API_BASE.startsWith('/') ? 'same-origin' : 'include';
}

/** Host where Nest serves `/docs` and `/` metadata (not proxied through Next). */
export const API_ORIGIN = (() => {
  if (API_BASE.startsWith('/')) {
    return (
      process.env.NEXT_PUBLIC_API_ORIGIN?.replace(/\/+$/, '') ||
      'http://127.0.0.1:3000'
    );
  }
  return API_BASE.replace(/\/api\/v1\/?$/, '');
})();
export const SWAGGER_DOCS_URL = `${API_ORIGIN}/docs`;

function parseJsonResponseBody(text: string): unknown {
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text.length > 800 ? `${text.slice(0, 800)}…` : text };
  }
}

/** Human-readable failure for GET/HEAD responses (reuses Nest validation / exception shape). */
export function formatGetErrorMessage(
  path: string,
  status: number,
  bodyText: string,
): string {
  const parsed = parseJsonResponseBody(bodyText);
  const fromServer = formatApiErrorMessage(parsed);
  if (fromServer && fromServer !== 'Request failed') {
    return `HTTP ${status} on GET ${path}: ${fromServer}`;
  }
  if (bodyText.trim()) {
    const snippet = bodyText.replace(/\s+/g, ' ').trim().slice(0, 240);
    return `HTTP ${status} on GET ${path}${snippet ? `: ${snippet}` : ''}`;
  }
  return `HTTP ${status} on GET ${path}`;
}

/** Server-side fetch without auth (will 401 if the route requires JWT). Prefer apiGetAuthenticated in the browser. */
export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(formatGetErrorMessage(path, res.status, text));
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`GET ${path}: response was not valid JSON`);
  }
}

export async function apiGetAuthenticated(path: string, token: string) {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      cache: 'no-store',
      credentials: credentialsForApi(),
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    const name = e instanceof Error ? e.name : '';
    const msg = e instanceof Error ? e.message : String(e);
    if (
      name === 'TypeError' &&
      (msg === 'Failed to fetch' ||
        /network|load failed|fetch/i.test(msg))
    ) {
      throw new Error(
        `Cannot reach the API at ${API_BASE}${path} (network error). Start or restart the backend (usually port 3000), keep Next on 3001, and confirm the browser can open that URL.`,
      );
    }
    throw e instanceof Error ? e : new Error(String(e));
  }
  const text = await res.text();
  if (!res.ok) {
    throw new Error(formatGetErrorMessage(path, res.status, text));
  }
  try {
    return text ? (JSON.parse(text) as unknown) : {};
  } catch {
    throw new Error(
      `GET ${path}: success response was not valid JSON (check API_BASE and proxy).`,
    );
  }
}

export async function apiPostAuthenticated(
  path: string,
  token: string,
  body: unknown,
) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    cache: 'no-store',
    credentials: credentialsForApi(),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { message: text };
  }
  if (!res.ok) {
    throw new Error(
      formatApiErrorMessage(parsed) || `POST ${path} failed (${res.status})`,
    );
  }
  return parsed;
}

export async function apiPatchAuthenticated(
  path: string,
  token: string,
  body: unknown,
) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    cache: 'no-store',
    credentials: credentialsForApi(),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { message: text };
  }
  if (!res.ok) {
    throw new Error(
      formatApiErrorMessage(parsed) || `PATCH ${path} failed (${res.status})`,
    );
  }
  return parsed;
}

export async function apiDeleteAuthenticated(path: string, token: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    cache: 'no-store',
    credentials: credentialsForApi(),
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { message: text };
  }
  if (!res.ok) {
    throw new Error(
      formatApiErrorMessage(parsed) || `DELETE ${path} failed (${res.status})`,
    );
  }
  return parsed;
}

export function formatApiErrorMessage(body: unknown): string {
  if (!body || typeof body !== 'object') return 'Request failed';
  const o = body as {
    message?: string | string[] | unknown[];
    error?: string;
    statusCode?: number;
  };
  if (Array.isArray(o.message)) {
    return o.message
      .map((m) => {
        if (typeof m === 'string') return m;
        if (m && typeof m === 'object' && 'constraints' in m) {
          const c = (m as { constraints?: Record<string, string> }).constraints;
          return c ? Object.values(c).join('; ') : JSON.stringify(m);
        }
        return typeof m === 'object' ? JSON.stringify(m) : String(m);
      })
      .join(', ');
  }
  if (typeof o.message === 'string') return o.message;
  if (typeof o.error === 'string' && o.statusCode)
    return `${o.error} (${o.statusCode})`;
  if (typeof o.error === 'string') return o.error;
  return 'Request failed';
}
