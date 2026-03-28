import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_role_templates' })
export class PlatformRoleTemplate extends AppBaseEntity {
  @Column({ unique: true, length: 80 })
  code: string;

  @Column({ length: 160 })
  name: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  template: Record<string, unknown>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
