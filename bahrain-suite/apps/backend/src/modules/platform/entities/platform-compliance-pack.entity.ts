import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_compliance_packs' })
export class PlatformCompliancePack extends AppBaseEntity {
  @Column({ unique: true, length: 80 })
  code: string;

  @Column({ name: 'country_code', length: 40 })
  countryCode: string;

  @Column({ length: 160 })
  name: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  settings: Record<string, unknown>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
