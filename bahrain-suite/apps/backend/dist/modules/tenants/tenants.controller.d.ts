import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { FindTenantsDto } from './dto/find-tenants.dto';
export declare class TenantsController {
    private readonly service;
    constructor(service: TenantsService);
    create(dto: CreateTenantDto): Promise<import("./entities/tenant.entity").Tenant>;
    findAll(query: FindTenantsDto): Promise<{
        items: import("./entities/tenant.entity").Tenant[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/tenant.entity").Tenant>;
    update(id: string, dto: UpdateTenantDto): Promise<import("./entities/tenant.entity").Tenant>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
