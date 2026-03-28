import { QuotationsService } from './quotations.service';
export declare class QuotationsController {
    private readonly service;
    constructor(service: QuotationsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
