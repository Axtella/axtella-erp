import { Repository } from 'typeorm';
import { CostCenter } from './entities/cost-center.entity';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { FindCostCentersDto } from './dto/find-cost-centers.dto';
import { Property } from '../properties/entities/property.entity';
export declare class CostCentersService {
    private readonly repo;
    private readonly propertyRepo;
    constructor(repo: Repository<CostCenter>, propertyRepo: Repository<Property>);
    private ensureProperty;
    create(dto: CreateCostCenterDto): Promise<CostCenter>;
    findAll(query: FindCostCentersDto): Promise<{
        items: CostCenter[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<CostCenter>;
    update(id: string, dto: UpdateCostCenterDto): Promise<CostCenter>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
