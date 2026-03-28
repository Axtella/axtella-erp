import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'commercial_spaces' })
export class CommercialSpace extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'cost_center_id', type: 'uuid' })
  costCenterId: string;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId?: string;

  @Column({ name: 'space_type', length: 50 })
  spaceType: string;

  @Column({ name: 'tenant_name', length: 200, nullable: true })
  tenantName?: string;

  @Column({ name: 'monthly_rent', type: 'numeric', precision: 12, scale: 2, default: 0 })
  monthlyRent: number;

  @Column({ length: 30, default: 'active' })
  status: string;
}
