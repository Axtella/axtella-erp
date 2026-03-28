import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { FindHotelRoomsDto } from './dto/find-hotel-rooms.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoomsService } from './rooms.service';
export declare class HotelRoomsController {
    private readonly service;
    constructor(service: HotelRoomsService);
    create(dto: CreateHotelRoomDto, tenantId?: string): Promise<import("./entities/hotel-room.entity").HotelRoom>;
    findAll(query: FindHotelRoomsDto, tenantId?: string): Promise<{
        items: import("./entities/hotel-room.entity").HotelRoom[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<import("./entities/hotel-room.entity").HotelRoom>;
    update(id: string, dto: UpdateHotelRoomDto, tenantId?: string): Promise<import("./entities/hotel-room.entity").HotelRoom>;
}
