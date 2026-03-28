import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity('users')
export class User extends AppBaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ default: 'staff' })
  role: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
