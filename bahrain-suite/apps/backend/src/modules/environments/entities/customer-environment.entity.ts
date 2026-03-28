import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'customer_environments' })
export class CustomerEnvironment extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'environment_key', length: 100, unique: true })
  environmentKey: string;

  @Column({ name: 'environment_type', length: 30 })
  environmentType: string;

  @Column({ name: 'app_url', type: 'text', nullable: true })
  appUrl?: string;

  @Column({ name: 'api_url', type: 'text', nullable: true })
  apiUrl?: string;

  @Column({ name: 'deployment_status', length: 30, default: 'pending' })
  deploymentStatus: string;
}
