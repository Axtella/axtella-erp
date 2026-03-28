import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'catalog_item_groups' })
export class CatalogItemGroup extends AppBaseEntity {
  @Column({ unique: true, length: 80 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
