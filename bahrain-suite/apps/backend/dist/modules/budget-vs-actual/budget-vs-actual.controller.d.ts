import { BudgetVsActualService } from './budget-vs-actual.service';
export declare class BudgetVsActualController {
    private readonly service;
    constructor(service: BudgetVsActualService);
    findAll(): {
        module: string;
        items: any[];
    };
}
