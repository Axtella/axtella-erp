'use client';

/**
 * Catches errors in the root layout. Replaces the entire root output — must define html/body.
 * See https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f1f5f9',
          color: '#0f172a',
        }}
      >
        <div
          style={{
            maxWidth: 480,
            padding: '2rem',
            borderRadius: 12,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(15, 23, 42, 0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: '#114A9F' }}>
            Application error
          </h1>
          <p style={{ margin: '0 0 1.25rem', lineHeight: 1.5, color: '#475569' }}>
            Axtella could not render this page. Restart the dev server or clear{' '}
            <code style={{ fontSize: 13, background: '#f1f5f9', padding: '0.1rem 0.35rem' }}>
              apps/frontend/.next
            </code>{' '}
            if this persists after an upgrade.
          </p>
          {process.env.NODE_ENV === 'development' && error.message ? (
            <pre
              style={{
                fontSize: 12,
                overflow: 'auto',
                padding: '0.75rem',
                background: '#f8fafc',
                borderRadius: 8,
                marginBottom: '1rem',
              }}
            >
              {error.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1.25rem',
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
        </div>
      </body>
    </html>
  );
}
