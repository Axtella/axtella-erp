import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class AttendanceRecord extends AppBaseEntity {
    employeeCode: string;
    employeeName?: string;
    workDate: string;
    clockIn?: string;
    clockOut?: string;
    status: string;
    propertyId?: string;
    notes?: string;
}
