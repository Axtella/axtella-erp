import { MaintenanceService } from './maintenance.service';
export declare class MaintenanceController {
    private readonly service;
    constructor(service: MaintenanceService);
    findAll(): {
        module: string;
        items: any[];
    };
}
