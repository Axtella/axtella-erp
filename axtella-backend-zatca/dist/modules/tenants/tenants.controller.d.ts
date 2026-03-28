import { TenantsService } from './tenants.service';
export declare class TenantsController {
    private readonly service;
    constructor(service: TenantsService);
    findAll(): {
        items: any[];
        total: number;
        page: number;
        limit: number;
    };
}
