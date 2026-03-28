import { CreateRoleDto } from './dto/create-role.dto';
import { FindRolesDto } from './dto/find-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly service;
    constructor(service: RolesService);
    create(dto: CreateRoleDto): Promise<import("./entities/platform-role.entity").PlatformRole>;
    findAll(query: FindRolesDto): Promise<{
        items: import("./entities/platform-role.entity").PlatformRole[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/platform-role.entity").PlatformRole>;
    update(id: string, dto: UpdateRoleDto): Promise<import("./entities/platform-role.entity").PlatformRole>;
}
