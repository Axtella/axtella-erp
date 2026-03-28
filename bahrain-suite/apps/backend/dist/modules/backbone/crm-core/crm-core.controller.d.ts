import { CrmCoreService } from './crm-core.service';
export declare class CrmCoreController {
    private readonly service;
    constructor(service: CrmCoreService);
    getStatus(): import("../scaffold-status.type").ScaffoldStatus;
}
