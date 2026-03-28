import type { AuthUser } from '../../auth/types/jwt-payload.interface';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { FindHotelReservationsDto } from './dto/find-hotel-reservations.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';
import { HotelReservationsService } from './reservations.service';
export declare class HotelReservationsController {
    private readonly service;
    constructor(service: HotelReservationsService);
    create(dto: CreateHotelReservationDto, tenantId?: string, user?: AuthUser): Promise<import("./entities/hotel-reservation.entity").HotelReservation>;
    findAll(query: FindHotelReservationsDto, tenantId?: string): Promise<{
        items: import("./entities/hotel-reservation.entity").HotelReservation[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<import("./entities/hotel-reservation.entity").HotelReservation>;
    update(id: string, dto: UpdateHotelReservationDto, tenantId?: string, user?: AuthUser): Promise<import("./entities/hotel-reservation.entity").HotelReservation>;
}
