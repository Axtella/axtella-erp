import { CreatePermissionDto } from './dto/create-permission.dto';
import { FindPermissionsDto } from './dto/find-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly service;
    constructor(service: PermissionsService);
    create(dto: CreatePermissionDto): Promise<import("./entities/platform-permission.entity").PlatformPermission>;
    findAll(query: FindPermissionsDto): Promise<{
        items: import("./entities/platform-permission.entity").PlatformPermission[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/platform-permission.entity").PlatformPermission>;
    update(id: string, dto: UpdatePermissionDto): Promise<import("./entities/platform-permission.entity").PlatformPermission>;
}
