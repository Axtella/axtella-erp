import { UnitTypesService } from './unit-types.service';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { FindUnitTypesQueryDto } from './dto/find-unit-types-query.dto';
export declare class UnitTypesController {
    private readonly service;
    constructor(service: UnitTypesService);
    create(dto: CreateUnitTypeDto): Promise<import("./entities/unit-type.entity").UnitType>;
    findAll(query: FindUnitTypesQueryDto): Promise<{
        items: import("./entities/unit-type.entity").UnitType[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/unit-type.entity").UnitType>;
    update(id: string, dto: UpdateUnitTypeDto): Promise<import("./entities/unit-type.entity").UnitType>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
