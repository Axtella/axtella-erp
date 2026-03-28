import { ReceivablesAgingService } from './receivables-aging.service';
export declare class ReceivablesAgingController {
    private readonly service;
    constructor(service: ReceivablesAgingService);
    findAll(): {
        module: string;
        items: any[];
    };
}
