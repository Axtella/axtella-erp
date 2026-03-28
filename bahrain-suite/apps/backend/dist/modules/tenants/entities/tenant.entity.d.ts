import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class Tenant extends AppBaseEntity {
    tenantType: string;
    fullName: string;
    nationality?: string;
    phone?: string;
    email?: string;
    cprNo?: string;
    passportNo?: string;
    idExpiryDate?: string;
    address?: string;
    companyName?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    notes?: string;
}
