import { CreateTenantSettingDto } from './dto/create-tenant-setting.dto';
import { FindTenantSettingsDto } from './dto/find-tenant-settings.dto';
import { UpdateTenantSettingDto } from './dto/update-tenant-setting.dto';
import { TenantSettingsService } from './tenant-settings.service';
export declare class TenantSettingsController {
    private readonly service;
    constructor(service: TenantSettingsService);
    create(dto: CreateTenantSettingDto, tenantId?: string): Promise<import("./entities/tenant-setting.entity").TenantSetting>;
    findAll(query: FindTenantSettingsDto, tenantId?: string): Promise<{
        items: import("./entities/tenant-setting.entity").TenantSetting[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/tenant-setting.entity").TenantSetting>;
    update(id: string, dto: UpdateTenantSettingDto): Promise<import("./entities/tenant-setting.entity").TenantSetting>;
}
