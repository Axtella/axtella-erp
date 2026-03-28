export declare class UserEntity {
    id: string;
    email: string;
    passwordHash: string;
    fullName?: string;
    tenantId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
