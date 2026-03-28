import { Repository } from 'typeorm';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { FindEnvironmentsDto } from './dto/find-environments.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { CustomerEnvironment } from './entities/customer-environment.entity';
export declare class EnvironmentsService {
    private readonly repo;
    constructor(repo: Repository<CustomerEnvironment>);
    create(dto: CreateEnvironmentDto, tenantId?: string): Promise<CustomerEnvironment>;
    findAll(query: FindEnvironmentsDto, tenantId?: string): Promise<{
        items: CustomerEnvironment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<CustomerEnvironment>;
    update(id: string, dto: UpdateEnvironmentDto): Promise<CustomerEnvironment>;
}
