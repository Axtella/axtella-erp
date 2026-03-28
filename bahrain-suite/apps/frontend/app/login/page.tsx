'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  API_BASE,
  credentialsForApi,
  formatApiErrorMessage,
  SWAGGER_DOCS_URL,
} from '../../lib/api';
import { COMPANY_NAME, PRODUCT_TAGLINE } from '../../lib/branding';
import { LocaleToggle } from '../../components/LocaleToggle';
import { extractAccessToken, getStoredToken, setStoredToken } from '../../lib/auth';
import { DEV_SEED_CREDENTIALS } from '../../lib/dev-login';
import { BRAND_GLOBAL_LOGO_SVG } from '../../lib/brand-module-logos';

/** In `next dev`, show seed credentials unless explicitly hidden (production builds stay off). */
const SHOW_DEV_LOGIN_HINT =
  process.env.NEXT_PUBLIC_SHOW_DEV_LOGIN_HINT === '1' ||
  (process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_HIDE_DEV_LOGIN_HINT !== '1');

const rawSelfSignup = process.env.NEXT_PUBLIC_ENABLE_SELF_SIGNUP ?? '';
const SELF_SIGNUP_ENABLED =
  rawSelfSignup !== '0' && rawSelfSignup.toLowerCase() !== 'false';

function LoginSuspenseFallback() {
  return (
    <div className="auth-shell" aria-busy="true" aria-live="polite">
      <div
        className="auth-hero"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}
      >
        <p className="login-status-loading" role="status" style={{ color: '#fff' }}>
          Loading sign-in…
        </p>
      </div>
      <div
        className="auth-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <p className="login-status-loading" role="status">
          Preparing secure form…
        </p>
      </div>
    </div>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const sessionInvalid = searchParams.get('session') === 'invalid';
  const authInFlight = useRef(false);
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  /** null = still loading or old API without public-config */
  const [serverAllowsRegister, setServerAllowsRegister] = useState<
    boolean | null
  >(null);
  /** Set after mount so e2e (and similar tools) wait for React onSubmit, not native form GET. */
  const [clientMounted, setClientMounted] = useState(false);
  const year = new Date().getFullYear();

  const showRegisterOption =
    SELF_SIGNUP_ENABLED && serverAllowsRegister !== false;

  useEffect(() => {
    setClientMounted(true);
  }, []);

  useEffect(() => {
    if (!SELF_SIGNUP_ENABLED) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/public-config`, {
          cache: 'no-store',
          credentials: credentialsForApi(),
        });
        if (!res.ok) throw new Error('config');
        const j = (await res.json()) as { allowPublicRegister?: boolean };
        if (cancelled) return;
        if (typeof j.allowPublicRegister === 'boolean') {
          setServerAllowsRegister(j.allowPublicRegister);
        } else {
          setServerAllowsRegister(true);
        }
      } catch {
        if (!cancelled) setServerAllowsRegister(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (API_BASE.startsWith('/')) return;
    try {
      const apiOrigin = new URL(API_BASE).origin;
      if (apiOrigin !== window.location.origin) {
        console.warn(
          '[Axtella] NEXT_PUBLIC_API_BASE_URL origin differs from this page. Ensure CORS and cookies match the UI origin:',
          window.location.origin,
        );
      }
    } catch {
      /* ignore malformed API_BASE */
    }
  }, []);

  useEffect(() => {
    if (!SELF_SIGNUP_ENABLED && mode === 'register') {
      setMode('signin');
      setError('');
    }
  }, [SELF_SIGNUP_ENABLED, mode]);

  useEffect(() => {
    if (serverAllowsRegister === false && mode === 'register') {
      setMode('signin');
      setError('');
    }
  }, [serverAllowsRegister, mode]);

  const FETCH_TIMEOUT_MS = 25_000;

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    void runAuthRequest();
  }

  async function runAuthRequest() {
    if (authInFlight.current) return;
    setError('');
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Enter your work email (tap “Fill fields” for the local dev seed).');
      return;
    }
    if (!password) {
      setError('Enter your password.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    authInFlight.current = true;
    setLoading(true);
    const path = mode === 'signin' ? '/auth/login' : '/auth/register';
    const url = `${API_BASE}${path}`;
    const ac = new AbortController();
    const t = window.setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: 'POST',
        mode: API_BASE.startsWith('/') ? 'same-origin' : 'cors',
        credentials: credentialsForApi(),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
        }),
        signal: ac.signal,
      });

      const ct = (res.headers.get('content-type') || '').toLowerCase();
      let body: Record<string, unknown> = {};
      if (ct.includes('application/json') || ct.includes('+json')) {
        body = (await res.json().catch(() => ({}))) as Record<
          string,
          unknown
        >;
      } else {
        const text = await res.text().catch(() => '');
        setError(
          res.ok
            ? 'Unexpected response from server (not JSON). Check API URL.'
            : text?.slice(0, 280) ||
                `Login failed (HTTP ${res.status}). Is the API running at ${API_BASE}?`,
        );
        return;
      }

      if (!res.ok) {
        let baseMsg = formatApiErrorMessage(body);
        if (baseMsg === 'Request failed' || !baseMsg.trim()) {
          baseMsg = `Request failed (HTTP ${res.status})`;
        }
        if (mode === 'register' && res.status === 409) {
          setError(
            `${baseMsg} Try signing in, or use a different email.`,
          );
          return;
        }
        if (mode === 'register' && res.status === 400) {
          setError(`Could not create account: ${baseMsg}`);
          return;
        }
        if (mode === 'register' && res.status === 503) {
          setError(
            `${baseMsg} Ensure Postgres is running and the users table exists (e.g. npm run db:seed-dev-user from apps/backend).`,
          );
          return;
        }
        if (mode === 'signin' && res.status === 401) {
          const hint = SELF_SIGNUP_ENABLED
            ? ' If no account exists yet, use “Create account” below or apply dev seed user (see RUNBOOK).'
            : ' If no account exists yet, apply the dev seed user or create accounts via DB / operations (see RUNBOOK).';
          setError(`${baseMsg}${hint}`);
          return;
        }
        if (mode === 'register' && res.status === 403) {
          setError(
            `${baseMsg} Set ALLOW_PUBLIC_REGISTER in apps/backend/.env (not 0/false) or create users via DB.`,
          );
          return;
        }
        if (res.status === 502 || res.status === 503 || res.status === 504) {
          setError(
            `${baseMsg} Is the API running? From apps/backend: npm run db:up && npm run start:dev. Open UI at the same host you use for the API proxy (localhost vs 127.0.0.1).`,
          );
          return;
        }
        setError(baseMsg);
        return;
      }
      const token = extractAccessToken(body);
      if (!token) {
        setError(
          'Invalid response: missing access token. Check API version and POST /auth/login JSON shape.',
        );
        return;
      }
      try {
        setStoredToken(token);
      } catch (storageErr) {
        setError(
          storageErr instanceof Error
            ? `Could not save session: ${storageErr.message}`
            : 'Could not save session. Allow storage for this site or disable private mode.',
        );
        return;
      }
      const roundTrip = getStoredToken();
      if (!roundTrip || roundTrip.trim() !== token.trim()) {
        setError(
          'Session could not be saved or read back (browser may block storage). Allow site data for this host, disable private mode, or free disk space, then try again.',
        );
        return;
      }
      // Full navigation avoids App Router races where /auth/me runs before the shell
      // sees the new token after client-only navigation + refresh().
      window.location.assign('/');
    } catch (err) {
      const aborted =
        (err instanceof DOMException && err.name === 'AbortError') ||
        (err instanceof Error && err.name === 'AbortError');
      if (aborted) {
        setError(
          `Request timed out after ${FETCH_TIMEOUT_MS / 1000}s. Start the API: cd apps/backend && npm run db:up && npm run start:dev — then try sign-in or create account again.`,
        );
        return;
      }
      const errMsg = err instanceof Error ? err.message : '';
      const browserNetworkFail =
        !!errMsg &&
        /failed to fetch|networkerror|load failed|network request failed/i.test(
          errMsg,
        );
      const extra = errMsg ? ` (${errMsg})` : '';

      let proxyHint = API_BASE.startsWith('/')
        ? 'Cannot reach the API through this app. Start Nest on port 3000 (`cd apps/backend && npm run start:dev`). Ensure Postgres is up (`npm run db:up` for Docker, then `npm run db:check`). If the API exits on boot, fix `DB_*` in `apps/backend/.env` (see docs/RUNBOOK.md).'
        : `Cannot reach ${API_BASE}. Start the API or fix NEXT_PUBLIC_API_BASE_URL in .env.local. If the UI and API use different hosts, CORS must allow your UI origin in apps/backend CORS_ORIGIN.`;

      if (browserNetworkFail && API_BASE.startsWith('/')) {
        proxyHint +=
          ' `Failed to fetch` here means the browser never got an HTTP response from this Next app for `/api/v1` — confirm `npm run dev` is running in `apps/frontend`, then in DevTools → Network retry and see whether `POST …/api/v1/auth/login` is (blocked) or missing. Ad blockers and strict privacy modes can block same-origin API calls.';
      } else if (browserNetworkFail && !API_BASE.startsWith('/')) {
        proxyHint +=
          ' `Failed to fetch` on a separate API host is often CORS: backend `CORS_ORIGIN` must include this page’s exact origin (scheme, host, and port).';
      }

      setError(
        `${proxyHint}${extra} Use http://localhost:3001/login (not https). The API is on :3000, not :3001.`,
      );
    } finally {
      window.clearTimeout(t);
      authInFlight.current = false;
      setLoading(false);
    }
  }

  function fillDevSeed() {
    setEmail(DEV_SEED_CREDENTIALS.email);
    setPassword(DEV_SEED_CREDENTIALS.password);
    setMode('signin');
  }

  return (
    <div className="auth-shell">
      <div className="auth-shell-locale">
        <LocaleToggle />
      </div>
      <div className="auth-hero">
        <div className="auth-hero-main">
          <div className="auth-hero-badge">Secure enterprise access</div>
          <h1>{COMPANY_NAME}</h1>
          <p className="auth-hero-lead">
            {PRODUCT_TAGLINE}. One workspace for portfolio control, finance,
            statutory reporting, and operational compliance.
          </p>
          <ul className="auth-hero-list">
            <li>Role-based modules: admin, accountant, HR, developer, staff</li>
            <li>Excel &amp; PDF report exports aligned to ledger data</li>
            <li>Bahrain VAT (10%) tools and bulk data import</li>
          </ul>
        </div>
        <p className="auth-hero-foot">
          This system processes sensitive business information. Access is
          monitored and restricted to authorized users under your
          organization&apos;s policies.
        </p>
      </div>
      <div className="auth-panel">
        <div className="auth-card">
          <img
            className="auth-card-global-logo"
            src={BRAND_GLOBAL_LOGO_SVG}
            alt="Axtella"
            width={882}
            height={372}
            decoding="async"
          />
          <p className="auth-card-enterprise-caption">Enterprise Suite</p>
          <h2 className="auth-card-title">
            {mode === 'register' && showRegisterOption
              ? 'Create account'
              : 'Sign in'}
          </h2>
          <p className="auth-card-sub">
            {mode === 'register' && showRegisterOption
              ? 'Creates a staff account via the public registration API. You will be signed in immediately. New accounts are staff role; for an admin user, apply migration 008 or promote in the database.'
              : !SELF_SIGNUP_ENABLED
                ? 'Use credentials issued by your administrator or the dev seed user (local). Public self-signup is disabled in the UI for this deployment.'
                : serverAllowsRegister === false
                  ? 'Public account creation is disabled on the API (ALLOW_PUBLIC_REGISTER in apps/backend/.env). Sign in with an issued account or use the local dev seed below.'
                  : 'Use credentials issued by your administrator, the dev seed user (local), or create a new staff account below.'}
          </p>
          {showRegisterOption ? (
            <div className="login-mode-toggle" role="tablist" aria-label="Auth mode">
              <button
                type="button"
                className={`login-mode-btn${mode === 'signin' ? ' login-mode-btn--active' : ''}`}
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`login-mode-btn${mode === 'register' ? ' login-mode-btn--active' : ''}`}
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
              >
                Create account
              </button>
            </div>
          ) : null}
          {SHOW_DEV_LOGIN_HINT ? (
            <div className="login-dev-hint" role="note">
              <strong>Local dev seed</strong> (after{' '}
              <code className="login-dev-hint-code">008_seed_dev_user.sql</code>
              ):<br />
              <span className="login-dev-hint-credentials">
                {DEV_SEED_CREDENTIALS.email} / {DEV_SEED_CREDENTIALS.password}
              </span>
              <button
                type="button"
                className="login-dev-hint-fill"
                onClick={fillDevSeed}
              >
                Fill fields
              </button>
            </div>
          ) : null}
          <div className="auth-trust-row">
            <span className="auth-trust-item">Encrypted session</span>
            <span className="auth-trust-item">JWT authentication</span>
            <span className="auth-trust-item">Internal use</span>
          </div>
          <form
            className="login-form"
            onSubmit={handleFormSubmit}
            noValidate
            data-auth-form-ready={clientMounted ? 'true' : 'false'}
          >
            <div
              className="login-form-status"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {sessionInvalid && !loading ? (
                <p className="login-session-invalid" role="status">
                  Your session expired or was reset. Please sign in again. If this repeats right
                  after a successful sign-in, use one browser tab, keep the same host (
                  <code className="login-dev-hint-code">localhost</code> vs{' '}
                  <code className="login-dev-hint-code">127.0.0.1</code>), and see{' '}
                  <strong>Login verification</strong> in docs/RUNBOOK.md (Network:{' '}
                  <code className="login-dev-hint-code">auth/login</code> and{' '}
                  <code className="login-dev-hint-code">auth/me</code>).
                </p>
              ) : null}
              {loading ? (
                <p className="login-status-loading" role="status">
                  Contacting sign-in service…
                </p>
              ) : null}
              {error && !loading ? (
                <p className="login-error" role="alert">
                  {error}
                </p>
              ) : null}
              {!loading &&
              !error &&
              !email.trim() &&
              !password ? (
                <p className="login-status-hint">
                  Enter email and password, or tap <strong>Fill fields</strong>{' '}
                  for local dev, then submit.
                </p>
              ) : null}
            </div>
            <label className="login-label">
              Work email
              <input
                className="login-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                aria-invalid={!!error && !email.trim()}
              />
            </label>
            <label className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </label>
            <button className="login-submit" type="submit" disabled={loading}>
              {loading
                ? mode === 'signin'
                  ? 'Signing in…'
                  : 'Creating account…'
                : mode === 'signin'
                  ? 'Sign in securely'
                  : 'Create account & sign in'}
            </button>
            <p className="login-hint">
              API:{' '}
              <code>
                POST /api/v1/auth/
                {mode === 'register' ? 'register' : 'login'}
              </code>{' '}
              ·{' '}
              <a href={SWAGGER_DOCS_URL} target="_blank" rel="noreferrer">
                OpenAPI docs
              </a>
            </p>
            <p className="login-hint">
              <Link href="/">Return to dashboard</Link>
              {' · '}
              <Link href="/developer">Developer workspace</Link>
            </p>
            <div className="login-signin-help" role="note">
              <strong>Sign-in help</strong>
              <ul className="login-signin-help-list">
                <li>
                  Use one hostname consistently (<code className="login-dev-hint-code">localhost</code>{' '}
                  vs <code className="login-dev-hint-code">127.0.0.1</code>) so your session storage
                  matches the app URL.
                </li>
                <li>
                  Local default: API on port <strong>3000</strong>, this app on <strong>3001</strong>.
                  Start Nest first (<code className="login-dev-hint-code">cd apps/backend</code> then{' '}
                  <code className="login-dev-hint-code">npm run db:check</code> and{' '}
                  <code className="login-dev-hint-code">npm run start:dev</code>). If the form shows
                  unreachable API / 503 / timeout, the API is not running or Postgres is down.
                </li>
                <li>
                  If sign-in fails with “Invalid email or password”, run{' '}
                  <code className="login-dev-hint-code">npm run db:seed-dev-user</code> from{' '}
                  <code className="login-dev-hint-code">apps/backend</code>.
                </li>
                <li>
                  If clicking <strong>Sign in securely</strong> never sends{' '}
                  <code className="login-dev-hint-code">POST /api/v1/auth/login</code> (see DevTools →
                  Network), reload and check{' '}
                  <code className="login-dev-hint-code">/_next/static/chunks/main-app.js</code> — if it is{' '}
                  <strong>404</strong>, stop Next, run <code className="login-dev-hint-code">rm -rf .next</code>{' '}
                  in <code className="login-dev-hint-code">apps/frontend</code>, then{' '}
                  <code className="login-dev-hint-code">npm run dev</code> again (React did not load).
                </li>
                <li>
                  Operators: see <code className="login-dev-hint-code">docs/RUNBOOK.md</code> (Browser login
                  / Login verification).
                </li>
                <li>
                  If sign-in appears to succeed but you are sent back to this page, the browser may be
                  blocking storage: allow site data for this host or turn off private mode. The app
                  falls back to session storage when local storage is unavailable.
                </li>
                <li>
                  <strong>Create account</strong> requires the API to allow it (
                  <code className="login-dev-hint-code">ALLOW_PUBLIC_REGISTER</code> not set to{' '}
                  <code className="login-dev-hint-code">0</code>/<code className="login-dev-hint-code">false</code>{' '}
                  in <code className="login-dev-hint-code">apps/backend/.env</code>). The UI checks{' '}
                  <code className="login-dev-hint-code">GET /api/v1/auth/public-config</code>.
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div className="auth-legal-footer">
          © {year} {COMPANY_NAME}. Confidential — authorized use only.
          <br />
          By signing in you agree to comply with your organization&apos;s
          acceptable-use and data-handling policies.
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSuspenseFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}
