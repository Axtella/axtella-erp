'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { API_BASE, credentialsForApi } from '../lib/api';
import {
  AUTH_CHANGED_EVENT,
  clearStoredToken,
  getStoredToken,
} from '../lib/auth';
import { COMPANY_NAME, COMPANY_SHORT } from '../lib/branding';
import { collectNavLabels, NAV_TREE } from '../lib/nav-tree';
import { normalizeRole } from '../lib/rbac';
import { getPublicBrandTopbarIconSrc } from '../lib/brand-module-logos';
import { AxtellaLogoLockup } from './branding';
import { LocaleToggle } from './LocaleToggle';
import { SidebarNav } from './SidebarNav';
import { TopbarQuickNav } from './TopbarQuickNav';
import { PropertyCatalogProvider } from './PropertyCatalogProvider';
import { PropertyScopeSelect } from './PropertyScopeSelect';

const NAV_LABELS: Record<string, string> = {
  ...collectNavLabels(NAV_TREE),
  '/login': 'Sign in',
  '/unauthorized': 'Access restricted',
};

/** Collapse trailing slash so `/login/` matches login layout. */
function normalizePathname(p: string): string {
  const t = p.replace(/\/+$/, '');
  return t === '' ? '/' : t;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = normalizePathname(usePathname());
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  /** Bumps when JWT is set/cleared so we re-run /auth/me (e.g. login in another tab). */
  const [authEpoch, setAuthEpoch] = useState(0);

  useEffect(() => {
    setSignedIn(!!getStoredToken());
  }, [pathname]);

  useEffect(() => {
    function syncFromStorage() {
      setSignedIn(!!getStoredToken());
      setAuthEpoch((n) => n + 1);
    }
    window.addEventListener(AUTH_CHANGED_EVENT, syncFromStorage);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, syncFromStorage);
  }, []);

  // pathname: validate after navigation. authEpoch: new token without navigation (multi-tab) or
  // after setStoredToken. Still skips fetch on /login (early return) so AUTH_CHANGED there does not
  // hit /auth/me. On 401, only clear storage if the JWT in memory is still the one we sent — avoids
  // wiping a fresh token when an older in-flight /auth/me returns late.
  useEffect(() => {
    if (pathname === '/login' || pathname === '/tools/axtella-branding') {
      return;
    }
    const token = getStoredToken();
    if (!token) {
      setRole(null);
      return;
    }
    const ac = new AbortController();
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
          credentials: credentialsForApi(),
          signal: ac.signal,
        });
        if (!res.ok) {
          if (res.status === 401) {
            if (!cancelled && getStoredToken() === token) {
              clearStoredToken();
              setSignedIn(false);
              setRole(null);
              window.location.assign('/login?session=invalid');
            }
          } else if (!cancelled) {
            setRole('staff');
          }
          return;
        }
        const body = (await res.json()) as { role?: string };
        if (!cancelled) setRole(body.role ?? 'staff');
      } catch (e) {
        if (ac.signal.aborted || (e instanceof Error && e.name === 'AbortError')) {
          return;
        }
        if (!cancelled) setRole('staff');
      }
    })();
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [pathname, authEpoch]);

  const topbarTitle = useMemo(() => {
    if (NAV_LABELS[pathname]) return NAV_LABELS[pathname];
    for (const [href, label] of Object.entries(NAV_LABELS)) {
      if (href !== '/' && pathname.startsWith(`${href}/`)) {
        return label;
      }
    }
    return 'Workspace';
  }, [pathname]);

  const year = useMemo(() => new Date().getFullYear(), []);

  function signOut() {
    clearStoredToken();
    setSignedIn(false);
    window.location.assign('/login');
  }

  if (pathname === '/login' || pathname === '/tools/axtella-branding') {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <AxtellaLogoLockup
          variant="darkDashboard"
          showWordmark
          showTagline
          className="sidebar-brand-row axtella-logo"
        />
        <p className="subtitle">
          {COMPANY_NAME} — authorized workspace for portfolio operations and
          finance.
        </p>
        <nav className="nav-scroll" aria-label="Main navigation">
          <SidebarNav role={role} />
          <div className="nav-section-label">Account</div>
          <ul className="nav-tree">
            <li className="nav-tree-item">
              {signedIn ? (
                <button
                  type="button"
                  className="nav-tree-link nav-link-button"
                  style={{ paddingInlineStart: 14 }}
                  onClick={signOut}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  className={`nav-tree-link${pathname === '/login' ? ' active' : ''}`}
                  style={{ paddingInlineStart: 14 }}
                >
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <footer className="sidebar-footer">
          <strong>Confidential.</strong> For use by authorized personnel only.
          <br />
          © {year} {COMPANY_NAME}. All rights reserved.
        </footer>
      </aside>
      <PropertyCatalogProvider>
        <div className="content-wrap">
          <header className="topbar">
            <div className="topbar-left">
              <div className="topbar-brand-row">
                <Link
                  href="/"
                  className="topbar-logo-link"
                  aria-label={`${COMPANY_SHORT} — home`}
                >
                  <img
                    src={getPublicBrandTopbarIconSrc()}
                    alt=""
                    width={36}
                    height={36}
                    decoding="async"
                  />
                </Link>
                <div className="topbar-headings">
                  <span className="topbar-title">{topbarTitle}</span>
                  <span className="topbar-crumb">
                    {COMPANY_SHORT} · operations &amp; finance
                  </span>
                </div>
              </div>
            </div>
            <div className="topbar-actions">
              {signedIn ? <PropertyScopeSelect /> : null}
              <TopbarQuickNav role={role} />
              <LocaleToggle />
              <span
                className={`status-pill${signedIn ? ' status-pill--live' : ''}`}
              >
                {signedIn
                  ? `Signed in · ${normalizeRole(role ?? undefined)}`
                  : 'Guest'}
              </span>
              <span className="topbar-hint">
                Live figures require API access and a valid session.
              </span>
            </div>
          </header>
          <main className="content">{children}</main>
        </div>
      </PropertyCatalogProvider>
    </div>
  );
}
