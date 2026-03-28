import { HrCoreService } from './hr-core.service';
export declare class HrCoreController {
    private readonly service;
    constructor(service: HrCoreService);
    getStatus(): import("../scaffold-status.type").ScaffoldStatus;
}
