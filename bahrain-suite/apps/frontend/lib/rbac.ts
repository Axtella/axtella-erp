/** Stable ID for `005_seed_three_properties.sql` (Seef Residences). */
export const DEMO_SEED_PROPERTY_ID =
  'a0000001-0000-4000-8000-000000000001';

export function normalizeRole(role: string | undefined | null): string {
  return (role || 'staff').toLowerCase().trim();
}

/** Payroll API is restricted to HR and admin on the backend. */
export function canAccessPayroll(role: string | undefined | null): boolean {
  const r = normalizeRole(role);
  return r === 'admin' || r === 'hr';
}

export function canAccessAdmin(role: string | undefined | null): boolean {
  return normalizeRole(role) === 'admin';
}

export function canAccessDeveloper(role: string | undefined | null): boolean {
  const r = normalizeRole(role);
  return r === 'admin' || r === 'developer';
}

/** Accountant workspace links (posting APIs still enforce role). */
export function canAccessAccountantNav(role: string | undefined | null): boolean {
  const r = normalizeRole(role);
  return r === 'admin' || r === 'accountant';
}
