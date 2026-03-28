import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'employee_allocations' })
export class EmployeeAllocation extends AppBaseEntity {
  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'allocation_basis', length: 50 })
  allocationBasis: string;

  @Column({ type: 'numeric', precision: 8, scale: 4 })
  percentage: number;
}
