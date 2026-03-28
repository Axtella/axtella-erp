import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { FindEnvironmentsDto } from './dto/find-environments.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnvironmentsService } from './environments.service';
export declare class EnvironmentsController {
    private readonly service;
    constructor(service: EnvironmentsService);
    create(dto: CreateEnvironmentDto, tenantId?: string): Promise<import("./entities/customer-environment.entity").CustomerEnvironment>;
    findAll(query: FindEnvironmentsDto, tenantId?: string): Promise<{
        items: import("./entities/customer-environment.entity").CustomerEnvironment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/customer-environment.entity").CustomerEnvironment>;
    update(id: string, dto: UpdateEnvironmentDto): Promise<import("./entities/customer-environment.entity").CustomerEnvironment>;
}
