import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly service;
    constructor(service: AccountsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
