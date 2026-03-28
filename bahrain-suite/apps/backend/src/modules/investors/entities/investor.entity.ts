import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'investors' })
export class Investor extends AppBaseEntity {
  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'contact_person', length: 200, nullable: true })
  contactPerson?: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 200, nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
