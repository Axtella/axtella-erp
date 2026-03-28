import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'coa_account_heads' })
export class CoaAccountHead extends AppBaseEntity {
  @Column({ name: 'account_code', unique: true, length: 50 })
  accountCode: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'account_type', length: 30 })
  accountType: string;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
