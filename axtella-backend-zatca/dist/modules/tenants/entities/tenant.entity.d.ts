import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class Tenant extends AppBaseEntity {
    tenantCode: string;
    legalName: string;
    displayName: string;
    countryCode: string;
    currencyCode: string;
    timezone: string;
    status: string;
}
