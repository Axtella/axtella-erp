import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class Investor extends AppBaseEntity {
    code: string;
    name: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
}
