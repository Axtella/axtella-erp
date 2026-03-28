import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class TenantSetting extends AppBaseEntity {
    customerId: string;
    defaultLanguage: string;
    supportedLanguages: string[];
    dateFormat: string;
    timeFormat: string;
    numberFormat: string;
}
