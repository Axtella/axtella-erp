import { Repository } from 'typeorm';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { FindHotelRoomsDto } from './dto/find-hotel-rooms.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoom } from './entities/hotel-room.entity';
export declare class HotelRoomsService {
    private readonly repo;
    constructor(repo: Repository<HotelRoom>);
    create(dto: CreateHotelRoomDto, tenantId?: string): Promise<HotelRoom>;
    findAll(query: FindHotelRoomsDto, tenantId?: string): Promise<{
        items: HotelRoom[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<HotelRoom>;
    update(id: string, dto: UpdateHotelRoomDto, tenantId?: string): Promise<HotelRoom>;
}
