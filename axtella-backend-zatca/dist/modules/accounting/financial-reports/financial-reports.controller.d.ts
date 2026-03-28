import { FinancialReportsService } from './financial-reports.service';
export declare class FinancialReportsController {
    private readonly service;
    constructor(service: FinancialReportsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
