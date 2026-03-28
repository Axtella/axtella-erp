import { ApprovalsService } from './approvals.service';
export declare class ApprovalsController {
    private readonly service;
    constructor(service: ApprovalsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
