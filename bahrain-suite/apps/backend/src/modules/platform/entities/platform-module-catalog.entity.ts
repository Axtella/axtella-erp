import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_modules' })
export class PlatformModuleCatalog extends AppBaseEntity {
  @Column({ unique: true, length: 80 })
  code: string;

  @Column({ length: 160 })
  name: string;

  @Column({ length: 80 })
  category: string;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;
}
