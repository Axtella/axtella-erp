import { AccountingCoreService } from './accounting-core.service';
export declare class AccountingCoreController {
    private readonly service;
    constructor(service: AccountingCoreService);
    getStatus(): import("../scaffold-status.type").ScaffoldStatus;
}
