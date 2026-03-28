import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { FindPermissionsDto } from './dto/find-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PlatformPermission } from './entities/platform-permission.entity';
export declare class PermissionsService {
    private readonly repo;
    constructor(repo: Repository<PlatformPermission>);
    create(dto: CreatePermissionDto): Promise<PlatformPermission>;
    findAll(query: FindPermissionsDto): Promise<{
        items: PlatformPermission[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<PlatformPermission>;
    update(id: string, dto: UpdatePermissionDto): Promise<PlatformPermission>;
}
