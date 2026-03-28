import { DataSource, Repository } from 'typeorm';
import { HotelRoom } from '../rooms/entities/hotel-room.entity';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { FindHotelReservationsDto } from './dto/find-hotel-reservations.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';
import { HotelReservation } from './entities/hotel-reservation.entity';
export declare class HotelReservationsService {
    private readonly repo;
    private readonly roomsRepo;
    private readonly dataSource;
    constructor(repo: Repository<HotelReservation>, roomsRepo: Repository<HotelRoom>, dataSource: DataSource);
    create(dto: CreateHotelReservationDto, tenantId?: string, actorUserId?: string): Promise<HotelReservation>;
    findAll(query: FindHotelReservationsDto, tenantId?: string): Promise<{
        items: HotelReservation[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<HotelReservation>;
    update(id: string, dto: UpdateHotelReservationDto, tenantId?: string, actorUserId?: string): Promise<HotelReservation>;
    private ensureDateWindow;
    private assertRoomReservable;
    private assertNoOverlap;
    private assertTransition;
    private syncRoomStatus;
    private logAudit;
}
