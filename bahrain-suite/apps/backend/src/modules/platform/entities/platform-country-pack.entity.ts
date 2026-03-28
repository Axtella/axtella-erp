import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_country_packs' })
export class PlatformCountryPack extends AppBaseEntity {
  @Column({ unique: true, length: 40 })
  code: string;

  @Column({ length: 120 })
  name: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  settings: Record<string, unknown>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
