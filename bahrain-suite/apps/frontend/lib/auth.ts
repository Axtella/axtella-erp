export const AUTH_TOKEN_KEY = 'bp_access_token';

/** Fired in-browser when the JWT is set or cleared so AppShell / module pages can refresh. */
export const AUTH_CHANGED_EVENT = 'bp-auth-changed';

/** Normalize login/register JSON (Nest uses `access_token`; some clients use camelCase). */
export function extractAccessToken(body: Record<string, unknown>): string | undefined {
  const snake = body.access_token;
  if (typeof snake === 'string' && snake.trim()) return snake.trim();
  const camel = (body as { accessToken?: unknown }).accessToken;
  if (typeof camel === 'string' && camel.trim()) return camel.trim();
  return undefined;
}

function dispatchAuthChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(AUTH_CHANGED_EVENT));
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const fromLs = localStorage.getItem(AUTH_TOKEN_KEY);
    if (fromLs) return fromLs;
  } catch {
    /* private mode / storage disabled */
  }
  try {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string, notifyListeners = true) {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    try {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    } catch {
      /* ignore */
    }
  } catch {
    try {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch {
      throw new Error(
        'Could not write session to localStorage or sessionStorage. Allow site data for this host or disable private browsing.',
      );
    }
  }
  if (notifyListeners) dispatchAuthChanged();
}

export function clearStoredToken(notifyListeners = true) {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    /* ignore */
  }
  if (notifyListeners) dispatchAuthChanged();
}
