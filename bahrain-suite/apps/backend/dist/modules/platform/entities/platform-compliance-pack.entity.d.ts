import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformCompliancePack extends AppBaseEntity {
    code: string;
    countryCode: string;
    name: string;
    settings: Record<string, unknown>;
    isActive: boolean;
}
