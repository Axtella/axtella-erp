import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { Property } from '../../properties/entities/property.entity';
import { Unit } from '../../units/entities/unit.entity';

@Entity({ name: 'operating_daybook_entries' })
export class OperatingDaybookEntry extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  property?: Property;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId?: string | null;

  @ManyToOne(() => Unit, { nullable: true })
  @JoinColumn({ name: 'unit_id' })
  unit?: Unit | null;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate: string;

  @Column({ name: 'voucher_no', length: 100, nullable: true })
  voucherNo?: string | null;

  @Column({ name: 'account_category', length: 50 })
  accountCategory: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'text', nullable: true })
  reference?: string | null;

  @Column({ name: 'payment_channel', length: 50, nullable: true })
  paymentChannel?: string | null;

  @Column({ name: 'bank_account_hint', length: 200, nullable: true })
  bankAccountHint?: string | null;

  @Column({ type: 'numeric', precision: 16, scale: 3, default: 0 })
  debit: string;

  @Column({ type: 'numeric', precision: 16, scale: 3, default: 0 })
  credit: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ name: 'approved_by', length: 200, nullable: true })
  approvedBy?: string | null;

  @Column({ name: 'approval_date', type: 'date', nullable: true })
  approvalDate?: string | null;

  @Column({ type: 'text', nullable: true })
  remarks?: string | null;
}
