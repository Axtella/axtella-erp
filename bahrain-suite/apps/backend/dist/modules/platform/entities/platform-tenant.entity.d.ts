import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformTenant extends AppBaseEntity {
    code: string;
    legalName: string;
    displayName: string;
    countryCode: string;
    currencyCode: string;
    timezone: string;
    defaultLanguage: string;
    planCode: string;
    status: string;
    countryPackId?: string | null;
    compliancePackId?: string | null;
    roleTemplateId?: string | null;
    settings: Record<string, unknown>;
    createdBy?: string | null;
    updatedBy?: string | null;
}
