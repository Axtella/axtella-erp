import { ChartOfAccountsService } from './chart-of-accounts.service';
export declare class ChartOfAccountsController {
    private readonly service;
    constructor(service: ChartOfAccountsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
