import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRolesDto } from './dto/find-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PlatformRole } from './entities/platform-role.entity';
export declare class RolesService {
    private readonly repo;
    constructor(repo: Repository<PlatformRole>);
    create(dto: CreateRoleDto): Promise<PlatformRole>;
    findAll(query: FindRolesDto): Promise<{
        items: PlatformRole[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<PlatformRole>;
    update(id: string, dto: UpdateRoleDto): Promise<PlatformRole>;
}
