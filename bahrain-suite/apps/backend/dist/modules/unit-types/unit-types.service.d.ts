import { Repository } from 'typeorm';
import { UnitType } from './entities/unit-type.entity';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { FindUnitTypesQueryDto } from './dto/find-unit-types-query.dto';
export declare class UnitTypesService {
    private readonly repo;
    constructor(repo: Repository<UnitType>);
    create(dto: CreateUnitTypeDto): Promise<UnitType>;
    findAll(query: FindUnitTypesQueryDto): Promise<{
        items: UnitType[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<UnitType>;
    update(id: string, dto: UpdateUnitTypeDto): Promise<UnitType>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
