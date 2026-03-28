import { GovernmentPaymentsService } from './government-payments.service';
export declare class GovernmentPaymentsController {
    private readonly service;
    constructor(service: GovernmentPaymentsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
