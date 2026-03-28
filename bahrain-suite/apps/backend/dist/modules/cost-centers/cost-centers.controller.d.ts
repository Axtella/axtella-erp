import { CostCentersService } from './cost-centers.service';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { FindCostCentersDto } from './dto/find-cost-centers.dto';
export declare class CostCentersController {
    private readonly service;
    constructor(service: CostCentersService);
    create(dto: CreateCostCenterDto): Promise<import("./entities/cost-center.entity").CostCenter>;
    findAll(query: FindCostCentersDto): Promise<{
        items: import("./entities/cost-center.entity").CostCenter[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/cost-center.entity").CostCenter>;
    update(id: string, dto: UpdateCostCenterDto): Promise<import("./entities/cost-center.entity").CostCenter>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
