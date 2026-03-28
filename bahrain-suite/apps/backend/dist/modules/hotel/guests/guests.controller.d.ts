import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';
import { FindHotelGuestsDto } from './dto/find-hotel-guests.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';
import { HotelGuestsService } from './guests.service';
export declare class HotelGuestsController {
    private readonly service;
    constructor(service: HotelGuestsService);
    create(dto: CreateHotelGuestDto, tenantId?: string): Promise<import("./entities/hotel-guest.entity").HotelGuest>;
    findAll(query: FindHotelGuestsDto, tenantId?: string): Promise<{
        items: import("./entities/hotel-guest.entity").HotelGuest[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<import("./entities/hotel-guest.entity").HotelGuest>;
    update(id: string, dto: UpdateHotelGuestDto, tenantId?: string): Promise<import("./entities/hotel-guest.entity").HotelGuest>;
}
