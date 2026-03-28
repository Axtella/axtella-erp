import { BankReconciliationService } from './bank-reconciliation.service';
export declare class BankReconciliationController {
    private readonly service;
    constructor(service: BankReconciliationService);
    findAll(): {
        module: string;
        items: any[];
    };
}
