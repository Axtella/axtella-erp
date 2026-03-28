import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PayrollRun extends AppBaseEntity {
    payrollMonth: number;
    payrollYear: number;
    status: string;
}
