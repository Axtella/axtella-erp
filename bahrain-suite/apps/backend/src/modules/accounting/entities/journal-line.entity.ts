import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'journal_lines' })
export class JournalLine extends AppBaseEntity {
  @Column({ name: 'journal_entry_id', type: 'uuid' })
  journalEntryId: string;

  @Column({ name: 'account_code', length: 50 })
  accountCode: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  debit: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  credit: number;

  /** cash_receipt | pos | benefit_pay — set on revenue-side lines for channel reporting */
  @Column({ name: 'income_channel', length: 30, nullable: true })
  incomeChannel?: string;
}
