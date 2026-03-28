import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { FindFeatureFlagsDto } from './dto/find-feature-flags.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { FeatureFlagsService } from './feature-flags.service';
export declare class FeatureFlagsController {
    private readonly service;
    constructor(service: FeatureFlagsService);
    create(dto: CreateFeatureFlagDto, tenantId?: string): Promise<import("./entities/customer-feature-flag.entity").CustomerFeatureFlag>;
    findAll(query: FindFeatureFlagsDto, tenantId?: string): Promise<{
        items: import("./entities/customer-feature-flag.entity").CustomerFeatureFlag[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/customer-feature-flag.entity").CustomerFeatureFlag>;
    update(id: string, dto: UpdateFeatureFlagDto): Promise<import("./entities/customer-feature-flag.entity").CustomerFeatureFlag>;
}
