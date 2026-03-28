import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'tenants' })
export class Tenant extends AppBaseEntity {
  @Column({ name: 'tenant_type', length: 30 })
  tenantType: string;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ length: 100, nullable: true })
  nationality?: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 200, nullable: true })
  email?: string;

  @Column({ name: 'cpr_no', length: 100, nullable: true })
  cprNo?: string;

  @Column({ name: 'passport_no', length: 100, nullable: true })
  passportNo?: string;

  @Column({ name: 'id_expiry_date', type: 'date', nullable: true })
  idExpiryDate?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ name: 'company_name', length: 200, nullable: true })
  companyName?: string;

  @Column({ name: 'emergency_contact_name', length: 200, nullable: true })
  emergencyContactName?: string;

  @Column({ name: 'emergency_contact_phone', length: 50, nullable: true })
  emergencyContactPhone?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
