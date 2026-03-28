import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformTenantModule extends AppBaseEntity {
    tenantId: string;
    moduleId: string;
    enabled: boolean;
    source: string;
}
