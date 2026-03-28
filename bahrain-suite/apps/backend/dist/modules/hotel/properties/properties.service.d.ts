import { Repository } from 'typeorm';
import { CreateHotelPropertyDto } from './dto/create-hotel-property.dto';
import { FindHotelPropertiesDto } from './dto/find-hotel-properties.dto';
import { UpdateHotelPropertyDto } from './dto/update-hotel-property.dto';
import { HotelProperty } from './entities/hotel-property.entity';
export declare class HotelPropertiesService {
    private readonly repo;
    constructor(repo: Repository<HotelProperty>);
    create(dto: CreateHotelPropertyDto, tenantId?: string): Promise<HotelProperty>;
    findAll(query: FindHotelPropertiesDto, tenantId?: string): Promise<{
        items: HotelProperty[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<HotelProperty>;
    update(id: string, dto: UpdateHotelPropertyDto, tenantId?: string): Promise<HotelProperty>;
}
