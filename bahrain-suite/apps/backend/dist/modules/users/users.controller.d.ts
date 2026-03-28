import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(dto: CreateUserDto): Promise<import("./entities/platform-user.entity").PlatformUser>;
    findAll(query: FindUsersDto): Promise<{
        items: import("./entities/platform-user.entity").PlatformUser[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/platform-user.entity").PlatformUser>;
    update(id: string, dto: UpdateUserDto): Promise<import("./entities/platform-user.entity").PlatformUser>;
}
