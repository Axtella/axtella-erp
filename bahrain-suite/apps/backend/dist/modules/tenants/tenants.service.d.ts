import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { FindTenantsDto } from './dto/find-tenants.dto';
export declare class TenantsService {
    private readonly repo;
    constructor(repo: Repository<Tenant>);
    create(dto: CreateTenantDto): Promise<Tenant>;
    findAll(query: FindTenantsDto): Promise<{
        items: Tenant[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Tenant>;
    update(id: string, dto: UpdateTenantDto): Promise<Tenant>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
