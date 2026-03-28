import { Repository } from 'typeorm';
import { CreateProvisioningRequestDto } from './dto/create-provisioning-request.dto';
import { FindProvisioningRequestsDto } from './dto/find-provisioning-requests.dto';
import { UpdateProvisioningRequestDto } from './dto/update-provisioning-request.dto';
import { ProvisioningRequest } from './entities/provisioning-request.entity';
export declare class ProvisioningService {
    private readonly repo;
    constructor(repo: Repository<ProvisioningRequest>);
    create(dto: CreateProvisioningRequestDto, tenantId?: string): Promise<ProvisioningRequest>;
    findAll(query: FindProvisioningRequestsDto, tenantId?: string): Promise<{
        items: ProvisioningRequest[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<ProvisioningRequest>;
    update(id: string, dto: UpdateProvisioningRequestDto): Promise<ProvisioningRequest>;
}
