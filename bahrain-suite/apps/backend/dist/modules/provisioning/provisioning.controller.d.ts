import { CreateProvisioningRequestDto } from './dto/create-provisioning-request.dto';
import { FindProvisioningRequestsDto } from './dto/find-provisioning-requests.dto';
import { UpdateProvisioningRequestDto } from './dto/update-provisioning-request.dto';
import { ProvisioningService } from './provisioning.service';
export declare class ProvisioningController {
    private readonly service;
    constructor(service: ProvisioningService);
    create(dto: CreateProvisioningRequestDto, tenantId?: string): Promise<import("./entities/provisioning-request.entity").ProvisioningRequest>;
    findAll(query: FindProvisioningRequestsDto, tenantId?: string): Promise<{
        items: import("./entities/provisioning-request.entity").ProvisioningRequest[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/provisioning-request.entity").ProvisioningRequest>;
    update(id: string, dto: UpdateProvisioningRequestDto): Promise<import("./entities/provisioning-request.entity").ProvisioningRequest>;
}
