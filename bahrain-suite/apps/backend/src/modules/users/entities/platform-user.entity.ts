import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'platform_users' })
export class PlatformUser extends AppBaseEntity {
  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 30, default: 'active' })
  status: string;
}
