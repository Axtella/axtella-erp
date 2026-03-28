import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class User extends AppBaseEntity {
    email: string;
    passwordHash: string;
    role: string;
    isActive: boolean;
}
