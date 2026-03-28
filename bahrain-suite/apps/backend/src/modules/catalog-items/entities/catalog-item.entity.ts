import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { CatalogItemGroup } from '../../catalog-item-groups/entities/catalog-item-group.entity';

@Entity({ name: 'catalog_items' })
export class CatalogItem extends AppBaseEntity {
  @Column({ unique: true, length: 80 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'item_type', length: 30, default: 'service' })
  itemType: string;

  @Column({ name: 'unit_of_measure', length: 30, default: 'ea' })
  unitOfMeasure: string;

  @Column({
    name: 'default_price',
    type: 'numeric',
    precision: 14,
    scale: 3,
    default: 0,
  })
  defaultPrice: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'group_id', type: 'uuid', nullable: true })
  groupId?: string | null;

  @ManyToOne(() => CatalogItemGroup, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'group_id' })
  group?: CatalogItemGroup | null;
}
