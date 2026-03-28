import { AppBaseEntity } from './base.entity';
export declare abstract class TenantAwareEntity extends AppBaseEntity {
    tenantId: string;
}
