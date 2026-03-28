import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'properties' })
export class Property extends AppBaseEntity {
  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'property_type', length: 50 })
  propertyType: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 100, default: 'Bahrain' })
  city: string;

  @Column({ name: 'investor_id', type: 'uuid', nullable: true })
  investorId?: string;

  @Column({ name: 'owner_rent_monthly', type: 'numeric', precision: 14, scale: 2, default: 0 })
  ownerRentMonthly: number;

  @Column({ name: 'operation_start_date', type: 'date', nullable: true })
  operationStartDate?: string;

  @Column({ length: 30, default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  /** UI accent #RRGGBB for registers, P&L context, and header scope. */
  @Column({ name: 'accent_color', length: 7, nullable: true })
  accentColor?: string | null;
}
