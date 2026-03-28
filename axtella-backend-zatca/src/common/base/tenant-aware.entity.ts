import { Column } from 'typeorm';
import { AppBaseEntity } from './base.entity';

export abstract class TenantAwareEntity extends AppBaseEntity {
  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;
}
