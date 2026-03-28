'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_SHORT } from '../lib/branding';

/**
 * App Router error boundary for this segment (replaces page content; root layout still runs).
 * Prevents Next dev from showing “missing required error components” when a render throws.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div
      className="app-error-boundary"
      style={{
        maxWidth: 520,
        margin: '3rem auto',
        padding: '1.5rem 2rem',
        borderRadius: 12,
        border: '1px solid rgba(17, 74, 159, 0.25)',
        background: '#f8fafc',
      }}
    >
      <h1 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: '#114A9F' }}>
        Something went wrong
      </h1>
      <p style={{ margin: '0 0 1rem', color: '#334155', lineHeight: 1.5 }}>
        {COMPANY_SHORT} hit an unexpected error. You can try again or return to a safe page.
      </p>
      {process.env.NODE_ENV === 'development' && error.message ? (
        <pre
          style={{
            fontSize: 12,
            overflow: 'auto',
            padding: '0.75rem',
            background: '#fff',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            marginBottom: '1rem',
          }}
        >
          {error.message}
        </pre>
      ) : null}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: 'none',
            background: '#114A9F',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Try again
        </button>
        <Link
          href="/login"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: '1px solid #114A9F',
            color: '#114A9F',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Sign in
        </Link>
        <Link
          href="/"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 8,
            color: '#475569',
            textDecoration: 'none',
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
}
