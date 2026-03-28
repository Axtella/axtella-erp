/** Application roles; stored on `users.role` (lowercase string). */
export enum UserRole {
  ADMIN = 'admin',
  PLATFORM_SUPER_ADMIN = 'platform_super_admin',
  ACCOUNTANT = 'accountant',
  HR = 'hr',
  DEVELOPER = 'developer',
  STAFF = 'staff',
}

export const ALL_ROLES = Object.values(UserRole) as UserRole[];

export function parseUserRole(value: string | undefined | null): UserRole {
  if (!value) return UserRole.STAFF;
  const v = String(value).toLowerCase().trim();
  if ((ALL_ROLES as string[]).includes(v)) {
    return v as UserRole;
  }
  return UserRole.STAFF;
}

export function roleHasAccess(userRole: UserRole, allowed: UserRole[]): boolean {
  if (userRole === UserRole.ADMIN) return true;
  return allowed.includes(userRole);
}
