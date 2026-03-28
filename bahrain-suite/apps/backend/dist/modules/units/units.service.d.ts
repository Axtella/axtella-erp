import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { FindUnitsDto } from './dto/find-units.dto';
import { Property } from '../properties/entities/property.entity';
import { CostCenter } from '../cost-centers/entities/cost-center.entity';
import { UnitType } from '../unit-types/entities/unit-type.entity';
export declare class UnitsService {
    private readonly repo;
    private readonly propertyRepo;
    private readonly costCenterRepo;
    private readonly unitTypeRepo;
    constructor(repo: Repository<Unit>, propertyRepo: Repository<Property>, costCenterRepo: Repository<CostCenter>, unitTypeRepo: Repository<UnitType>);
    create(dto: CreateUnitDto): Promise<Unit>;
    findAll(query: FindUnitsDto): Promise<{
        items: Unit[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Unit>;
    update(id: string, dto: UpdateUnitDto): Promise<Unit>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
