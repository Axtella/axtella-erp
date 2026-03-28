export interface AuthenticatedUser {
    userId: string;
    email: string;
    tenantId: string | null;
    roles: string[];
    permissions: string[];
}
