import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'employees' })
export class Employee extends AppBaseEntity {
  @Column({ name: 'employee_code', unique: true, length: 50 })
  employeeCode: string;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ length: 100 })
  designation: string;

  @Column({ length: 100, nullable: true })
  department?: string;

  @Column({ name: 'is_shared', default: false })
  isShared: boolean;

  @Column({ length: 30, default: 'active' })
  status: string;
}
