import { CreateHotelPropertyDto } from './dto/create-hotel-property.dto';
import { FindHotelPropertiesDto } from './dto/find-hotel-properties.dto';
import { UpdateHotelPropertyDto } from './dto/update-hotel-property.dto';
import { HotelPropertiesService } from './properties.service';
export declare class HotelPropertiesController {
    private readonly service;
    constructor(service: HotelPropertiesService);
    create(dto: CreateHotelPropertyDto, tenantId?: string): Promise<import("./entities/hotel-property.entity").HotelProperty>;
    findAll(query: FindHotelPropertiesDto, tenantId?: string): Promise<{
        items: import("./entities/hotel-property.entity").HotelProperty[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<import("./entities/hotel-property.entity").HotelProperty>;
    update(id: string, dto: UpdateHotelPropertyDto, tenantId?: string): Promise<import("./entities/hotel-property.entity").HotelProperty>;
}
