import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'journal_entries' })
export class JournalEntry extends AppBaseEntity {
  @Column({ name: 'journal_no', unique: true, length: 100 })
  journalNo: string;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate: string;

  @Column({ name: 'property_id', type: 'uuid', nullable: true })
  propertyId?: string;

  @Column({ type: 'text', nullable: true })
  narration?: string;
}
