import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'customer_feature_flags' })
export class CustomerFeatureFlag extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'module_feature_id', type: 'uuid' })
  moduleFeatureId: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  @Column({ name: 'config_json', type: 'jsonb', default: () => "'{}'::jsonb" })
  configJson: Record<string, unknown>;
}
