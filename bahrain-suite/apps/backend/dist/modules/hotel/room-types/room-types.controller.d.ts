import { CreateHotelRoomTypeDto } from './dto/create-hotel-room-type.dto';
import { FindHotelRoomTypesDto } from './dto/find-hotel-room-types.dto';
import { UpdateHotelRoomTypeDto } from './dto/update-hotel-room-type.dto';
import { HotelRoomTypesService } from './room-types.service';
export declare class HotelRoomTypesController {
    private readonly service;
    constructor(service: HotelRoomTypesService);
    create(dto: CreateHotelRoomTypeDto, tenantId?: string): Promise<import("./entities/hotel-room-type.entity").HotelRoomType>;
    findAll(query: FindHotelRoomTypesDto, tenantId?: string): Promise<{
        items: import("./entities/hotel-room-type.entity").HotelRoomType[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<import("./entities/hotel-room-type.entity").HotelRoomType>;
    update(id: string, dto: UpdateHotelRoomTypeDto, tenantId?: string): Promise<import("./entities/hotel-room-type.entity").HotelRoomType>;
}
