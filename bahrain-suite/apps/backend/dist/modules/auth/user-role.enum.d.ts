export declare enum UserRole {
    ADMIN = "admin",
    PLATFORM_SUPER_ADMIN = "platform_super_admin",
    ACCOUNTANT = "accountant",
    HR = "hr",
    DEVELOPER = "developer",
    STAFF = "staff"
}
export declare const ALL_ROLES: UserRole[];
export declare function parseUserRole(value: string | undefined | null): UserRole;
export declare function roleHasAccess(userRole: UserRole, allowed: UserRole[]): boolean;
