import { InvestorStatementsService } from './investor-statements.service';
export declare class InvestorStatementsController {
    private readonly service;
    constructor(service: InvestorStatementsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
