import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { FindUnitsDto } from './dto/find-units.dto';
export declare class UnitsController {
    private readonly service;
    constructor(service: UnitsService);
    create(dto: CreateUnitDto): Promise<import("./entities/unit.entity").Unit>;
    findAll(query: FindUnitsDto): Promise<{
        items: import("./entities/unit.entity").Unit[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/unit.entity").Unit>;
    update(id: string, dto: UpdateUnitDto): Promise<import("./entities/unit.entity").Unit>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
