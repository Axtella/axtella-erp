import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'utility_bills' })
export class UtilityBill extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'utility_type', length: 30 })
  utilityType: string;

  @Column({ name: 'billing_period_start', type: 'date' })
  billingPeriodStart: string;

  @Column({ name: 'billing_period_end', type: 'date' })
  billingPeriodEnd: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  amount: number;

  @Column({ length: 30, default: 'unpaid' })
  status: string;
}
