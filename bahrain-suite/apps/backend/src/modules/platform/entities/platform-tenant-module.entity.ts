import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_tenant_modules' })
export class PlatformTenantModule extends AppBaseEntity {
  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column({ name: 'module_id', type: 'uuid' })
  moduleId: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ length: 30, default: 'manual' })
  source: string;
}
