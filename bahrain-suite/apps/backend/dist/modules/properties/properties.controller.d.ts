import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FindPropertiesDto } from './dto/find-properties.dto';
export declare class PropertiesController {
    private readonly service;
    constructor(service: PropertiesService);
    create(dto: CreatePropertyDto): Promise<import("./entities/property.entity").Property>;
    bulkUpload(file: Express.Multer.File): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    findAll(query: FindPropertiesDto): Promise<{
        items: import("./entities/property.entity").Property[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/property.entity").Property>;
    update(id: string, dto: UpdatePropertyDto): Promise<import("./entities/property.entity").Property>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
