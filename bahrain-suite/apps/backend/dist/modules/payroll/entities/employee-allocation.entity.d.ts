import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class EmployeeAllocation extends AppBaseEntity {
    employeeId: string;
    propertyId: string;
    allocationBasis: string;
    percentage: number;
}
