import { PayablesAgingService } from './payables-aging.service';
export declare class PayablesAgingController {
    private readonly service;
    constructor(service: PayablesAgingService);
    findAll(): {
        module: string;
        items: any[];
    };
}
