import { PayrollService } from './payroll.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
export declare class PayrollController {
    private readonly service;
    constructor(service: PayrollService);
    generate(dto: CreatePayrollRunDto): {
        allocations: {
            employee: string;
            abbas: number;
            diamond: number;
            mirage: number;
        }[];
        payrollMonth: number;
        payrollYear: number;
        message: string;
    };
    preview(month: string, year: string): {
        month: number;
        year: number;
        basis: string;
        items: any[];
    };
}
