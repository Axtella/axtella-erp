import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { Property } from '../../properties/entities/property.entity';

@Entity({ name: 'cost_centers' })
@Index(['propertyId', 'code'], { unique: true })
export class CostCenter extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'cost_center_type', length: 50 })
  costCenterType: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Property, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
