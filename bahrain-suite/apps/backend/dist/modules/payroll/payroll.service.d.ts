export declare class PayrollService {
    generateRun(dto: {
        payrollMonth: number;
        payrollYear: number;
    }): {
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
    previewSharedAllocation(month: number, year: number): {
        month: number;
        year: number;
        basis: string;
        items: any[];
    };
}
