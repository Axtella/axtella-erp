import { Repository } from 'typeorm';
import { CreateTenantSettingDto } from './dto/create-tenant-setting.dto';
import { FindTenantSettingsDto } from './dto/find-tenant-settings.dto';
import { UpdateTenantSettingDto } from './dto/update-tenant-setting.dto';
import { TenantSetting } from './entities/tenant-setting.entity';
export declare class TenantSettingsService {
    private readonly repo;
    constructor(repo: Repository<TenantSetting>);
    create(dto: CreateTenantSettingDto, tenantId?: string): Promise<TenantSetting>;
    findAll(query: FindTenantSettingsDto, tenantId?: string): Promise<{
        items: TenantSetting[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<TenantSetting>;
    update(id: string, dto: UpdateTenantSettingDto): Promise<TenantSetting>;
}
