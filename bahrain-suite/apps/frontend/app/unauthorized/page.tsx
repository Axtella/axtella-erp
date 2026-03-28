import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="page-container">
      <h1 className="topbar-title" style={{ marginBottom: '0.5rem' }}>
        Access restricted
      </h1>
      <p style={{ maxWidth: 520, lineHeight: 1.5 }}>
        Your account does not have permission for that module. If you need
        access, ask an administrator to update your role (for example{' '}
        <code>hr</code> for payroll or <code>accountant</code> for journal
        posting).
      </p>
      <p style={{ marginTop: '1.25rem' }}>
        <Link href="/" className="inline-link">
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}
