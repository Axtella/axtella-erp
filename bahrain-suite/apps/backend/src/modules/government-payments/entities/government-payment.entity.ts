import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'government_payments' })
export class GovernmentPayment extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid', nullable: true })
  propertyId?: string;

  @Column({ name: 'payment_type', length: 50 })
  paymentType: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  amount: number;

  @Column({ length: 30, default: 'unpaid' })
  status: string;
}
