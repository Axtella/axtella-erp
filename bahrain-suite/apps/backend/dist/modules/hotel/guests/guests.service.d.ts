import { Repository } from 'typeorm';
import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';
import { FindHotelGuestsDto } from './dto/find-hotel-guests.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';
import { HotelGuest } from './entities/hotel-guest.entity';
export declare class HotelGuestsService {
    private readonly repo;
    constructor(repo: Repository<HotelGuest>);
    create(dto: CreateHotelGuestDto, tenantId?: string): Promise<HotelGuest>;
    findAll(query: FindHotelGuestsDto, tenantId?: string): Promise<{
        items: HotelGuest[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<HotelGuest>;
    update(id: string, dto: UpdateHotelGuestDto, tenantId?: string): Promise<HotelGuest>;
}
