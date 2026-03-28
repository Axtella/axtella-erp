import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'provisioning_requests' })
export class ProvisioningRequest extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'requested_by', type: 'uuid', nullable: true })
  requestedBy?: string;

  @Column({ name: 'request_type', length: 50 })
  requestType: string;

  @Column({ length: 30, default: 'draft' })
  status: string;

  @Column({ name: 'requested_config_json', type: 'jsonb', default: () => "'{}'::jsonb" })
  requestedConfigJson: Record<string, unknown>;

  @Column({ name: 'result_json', type: 'jsonb', default: () => "'{}'::jsonb" })
  resultJson: Record<string, unknown>;
}
