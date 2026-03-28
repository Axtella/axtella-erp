import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class Employee extends AppBaseEntity {
    employeeCode: string;
    fullName: string;
    designation: string;
    department?: string;
    isShared: boolean;
    status: string;
}
