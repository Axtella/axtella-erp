import { DataSource } from 'typeorm';
export declare class AccessControlService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getRolesForUser(userId: string): Promise<string[]>;
    getPermissionsForUser(userId: string): Promise<string[]>;
}
