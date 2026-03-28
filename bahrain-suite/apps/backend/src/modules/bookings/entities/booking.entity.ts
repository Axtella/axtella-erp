import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { CostCenter } from '../../cost-centers/entities/cost-center.entity';
import { Property } from '../../properties/entities/property.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Unit } from '../../units/entities/unit.entity';

@Entity({ name: 'bookings' })
export class Booking extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  property?: Property;

  @Column({ name: 'cost_center_id', type: 'uuid' })
  costCenterId: string;

  @ManyToOne(() => CostCenter)
  @JoinColumn({ name: 'cost_center_id' })
  costCenter?: CostCenter;

  @Column({ name: 'unit_id', type: 'uuid' })
  unitId: string;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id' })
  unit?: Unit;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column({ name: 'booking_type', length: 30 })
  bookingType: string;

  @Column({ name: 'booking_source', length: 100, nullable: true })
  bookingSource?: string;

  @Column({ name: 'check_in_date', type: 'timestamp' })
  checkInDate: Date;

  @Column({ name: 'check_out_date', type: 'timestamp', nullable: true })
  checkOutDate?: Date;

  @Column({ name: 'contract_start_date', type: 'date', nullable: true })
  contractStartDate?: string;

  @Column({ name: 'contract_end_date', type: 'date', nullable: true })
  contractEndDate?: string;

  @Column({ length: 30, default: 'reserved' })
  status: string;

  @Column({ name: 'rate_daily', type: 'numeric', precision: 12, scale: 2, default: 0 })
  rateDaily: number;

  @Column({ name: 'rate_monthly', type: 'numeric', precision: 12, scale: 2, default: 0 })
  rateMonthly: number;

  @Column({ name: 'deposit_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  depositAmount: number;

  @Column({ name: 'discount_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
