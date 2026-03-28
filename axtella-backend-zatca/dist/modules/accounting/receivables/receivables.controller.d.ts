import { ReceivablesService } from './receivables.service';
export declare class ReceivablesController {
    private readonly service;
    constructor(service: ReceivablesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
