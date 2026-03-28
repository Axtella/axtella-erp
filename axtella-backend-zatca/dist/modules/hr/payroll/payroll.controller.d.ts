import { PayrollService } from './payroll.service';
export declare class PayrollController {
    private readonly service;
    constructor(service: PayrollService);
    findAll(): {
        module: string;
        items: any[];
    };
}
