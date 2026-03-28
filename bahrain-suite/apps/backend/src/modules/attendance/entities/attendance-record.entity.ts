import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'attendance_records' })
export class AttendanceRecord extends AppBaseEntity {
  @Column({ name: 'employee_code', length: 50 })
  employeeCode: string;

  @Column({ name: 'employee_name', length: 200, nullable: true })
  employeeName?: string;

  @Column({ name: 'work_date', type: 'date' })
  workDate: string;

  @Column({ name: 'clock_in', type: 'varchar', length: 8, nullable: true })
  clockIn?: string;

  @Column({ name: 'clock_out', type: 'varchar', length: 8, nullable: true })
  clockOut?: string;

  @Column({ length: 30, default: 'present' })
  status: string;

  @Column({ name: 'property_id', type: 'uuid', nullable: true })
  propertyId?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
