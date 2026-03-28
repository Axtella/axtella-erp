import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'payroll_runs' })
export class PayrollRun extends AppBaseEntity {
  @Column({ name: 'payroll_month', type: 'int' })
  payrollMonth: number;

  @Column({ name: 'payroll_year', type: 'int' })
  payrollYear: number;

  @Column({ length: 30, default: 'draft' })
  status: string;
}
