import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_permissions' })
export class PlatformPermission extends AppBaseEntity {
  @Column({ length: 100, unique: true })
  code: string;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'module_key', length: 100 })
  moduleKey: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
