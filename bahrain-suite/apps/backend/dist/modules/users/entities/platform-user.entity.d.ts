import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformUser extends AppBaseEntity {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    status: string;
}
