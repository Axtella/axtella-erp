import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'amc_contracts' })
export class AmcContract extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'amc_type', length: 50 })
  amcType: string;

  @Column({ name: 'vendor_name', length: 200 })
  vendorName: string;

  @Column({ name: 'contract_value', type: 'numeric', precision: 14, scale: 2 })
  contractValue: number;
}
