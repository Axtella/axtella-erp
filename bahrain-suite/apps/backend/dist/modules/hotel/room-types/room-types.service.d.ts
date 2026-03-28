import { Repository } from 'typeorm';
import { CreateHotelRoomTypeDto } from './dto/create-hotel-room-type.dto';
import { FindHotelRoomTypesDto } from './dto/find-hotel-room-types.dto';
import { UpdateHotelRoomTypeDto } from './dto/update-hotel-room-type.dto';
import { HotelRoomType } from './entities/hotel-room-type.entity';
export declare class HotelRoomTypesService {
    private readonly repo;
    constructor(repo: Repository<HotelRoomType>);
    create(dto: CreateHotelRoomTypeDto, tenantId?: string): Promise<HotelRoomType>;
    findAll(query: FindHotelRoomTypesDto, tenantId?: string): Promise<{
        items: HotelRoomType[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<HotelRoomType>;
    update(id: string, dto: UpdateHotelRoomTypeDto, tenantId?: string): Promise<HotelRoomType>;
}
