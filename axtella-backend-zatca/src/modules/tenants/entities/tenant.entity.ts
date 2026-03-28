import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'tenants' })
export class Tenant extends AppBaseEntity {
  @Column({ name: 'tenant_code', unique: true, length: 50 })
  tenantCode: string;

  @Column({ name: 'legal_name', length: 200 })
  legalName: string;

  @Column({ name: 'display_name', length: 200 })
  displayName: string;

  @Column({ name: 'country_code', length: 10 })
  countryCode: string;

  @Column({ name: 'currency_code', length: 10, default: 'BHD' })
  currencyCode: string;

  @Column({ name: 'timezone', length: 100 })
  timezone: string;

  @Column({ name: 'status', length: 30, default: 'active' })
  status: string;
}
