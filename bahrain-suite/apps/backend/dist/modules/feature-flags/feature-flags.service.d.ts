import { Repository } from 'typeorm';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { FindFeatureFlagsDto } from './dto/find-feature-flags.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { CustomerFeatureFlag } from './entities/customer-feature-flag.entity';
export declare class FeatureFlagsService {
    private readonly repo;
    constructor(repo: Repository<CustomerFeatureFlag>);
    create(dto: CreateFeatureFlagDto, tenantId?: string): Promise<CustomerFeatureFlag>;
    findAll(query: FindFeatureFlagsDto, tenantId?: string): Promise<{
        items: CustomerFeatureFlag[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<CustomerFeatureFlag>;
    update(id: string, dto: UpdateFeatureFlagDto): Promise<CustomerFeatureFlag>;
}
