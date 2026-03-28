import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_tenants' })
export class PlatformTenant extends AppBaseEntity {
  @Column({ unique: true, length: 80 })
  code: string;

  @Column({ name: 'legal_name', length: 220 })
  legalName: string;

  @Column({ name: 'display_name', length: 220 })
  displayName: string;

  @Column({ name: 'country_code', length: 40 })
  countryCode: string;

  @Column({ name: 'currency_code', length: 10 })
  currencyCode: string;

  @Column({ length: 80 })
  timezone: string;

  @Column({ name: 'default_language', length: 20, default: 'en' })
  defaultLanguage: string;

  @Column({ name: 'plan_code', length: 80, default: 'starter' })
  planCode: string;

  @Column({ length: 30, default: 'draft' })
  status: string;

  @Column({ name: 'country_pack_id', type: 'uuid', nullable: true })
  countryPackId?: string | null;

  @Column({ name: 'compliance_pack_id', type: 'uuid', nullable: true })
  compliancePackId?: string | null;

  @Column({ name: 'role_template_id', type: 'uuid', nullable: true })
  roleTemplateId?: string | null;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  settings: Record<string, unknown>;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;
}
