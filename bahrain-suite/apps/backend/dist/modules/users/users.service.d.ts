import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlatformUser } from './entities/platform-user.entity';
export declare class UsersService {
    private readonly repo;
    constructor(repo: Repository<PlatformUser>);
    create(dto: CreateUserDto): Promise<PlatformUser>;
    findAll(query: FindUsersDto): Promise<{
        items: PlatformUser[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<PlatformUser>;
    update(id: string, dto: UpdateUserDto): Promise<PlatformUser>;
}
