import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'tenant_settings' })
export class TenantSetting extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid', unique: true })
  customerId: string;

  @Column({ name: 'default_language', length: 20, default: 'en' })
  defaultLanguage: string;

  @Column({
    name: 'supported_languages',
    type: 'jsonb',
    default: () => '\'["en"]\'::jsonb',
  })
  supportedLanguages: string[];

  @Column({ name: 'date_format', length: 50, default: 'YYYY-MM-DD' })
  dateFormat: string;

  @Column({ name: 'time_format', length: 20, default: '24h' })
  timeFormat: string;

  @Column({ name: 'number_format', length: 50, default: 'en-US' })
  numberFormat: string;
}
