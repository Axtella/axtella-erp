import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { UtilityEwaAccount } from './utility-ewa-account.entity';

@Entity({ name: 'utility_ewa_bills' })
export class UtilityEwaBill extends AppBaseEntity {
  @Column({ name: 'ewa_account_id', type: 'uuid' })
  ewaAccountId: string;

  @ManyToOne(() => UtilityEwaAccount, (a) => a.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ewa_account_id' })
  ewaAccount?: UtilityEwaAccount;

  @Column({ name: 'bill_period_from', type: 'date', nullable: true })
  billPeriodFrom?: string | null;

  @Column({ name: 'bill_period_to', type: 'date', nullable: true })
  billPeriodTo?: string | null;

  @Column({ name: 'bill_date', type: 'date', nullable: true })
  billDate?: string | null;

  @Column({ name: 'bill_no', length: 100, nullable: true })
  billNo?: string | null;

  @Column({ name: 'cap_amount', type: 'numeric', precision: 16, scale: 3, nullable: true })
  capAmount?: string | null;

  @Column({ name: 'cap_date', type: 'date', nullable: true })
  capDate?: string | null;

  @Column({ name: 'net_amount', type: 'numeric', precision: 16, scale: 3, nullable: true })
  netAmount?: string | null;

  @Column({ name: 'vat_amount', type: 'numeric', precision: 16, scale: 3, nullable: true })
  vatAmount?: string | null;

  @Column({ name: 'total_bill', type: 'numeric', precision: 16, scale: 3, nullable: true })
  totalBill?: string | null;

  @Column({ name: 'payment_due_date', type: 'date', nullable: true })
  paymentDueDate?: string | null;

  @Column({ name: 'paid_date', type: 'date', nullable: true })
  paidDate?: string | null;

  @Column({ name: 'paid_amount', type: 'numeric', precision: 16, scale: 3, default: 0 })
  paidAmount: string;

  @Column({ name: 'balance_due', type: 'numeric', precision: 16, scale: 3, nullable: true })
  balanceDue?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;
}
