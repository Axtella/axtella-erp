import { PayablesService } from './payables.service';
export declare class PayablesController {
    private readonly service;
    constructor(service: PayablesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
