import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../../common/utils/pagination.util';
import { HotelRoom } from '../rooms/entities/hotel-room.entity';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { FindHotelReservationsDto } from './dto/find-hotel-reservations.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';
import { HotelReservation } from './entities/hotel-reservation.entity';

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  reserved: ['checked_in', 'cancelled'],
  checked_in: ['checked_out', 'cancelled'],
  checked_out: [],
  cancelled: [],
};

@Injectable()
export class HotelReservationsService {
  constructor(
    @InjectRepository(HotelReservation)
    private readonly repo: Repository<HotelReservation>,
    @InjectRepository(HotelRoom)
    private readonly roomsRepo: Repository<HotelRoom>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateHotelReservationDto, tenantId?: string, actorUserId?: string) {
    if (tenantId && tenantId !== dto.customerId) throw new ForbiddenException('Tenant scope mismatch');
    this.ensureDateWindow(dto.arrivalDate, dto.departureDate);
    if (dto.roomId) await this.assertRoomReservable(dto.roomId, dto.customerId);
    await this.assertNoOverlap(dto.roomId, dto.arrivalDate, dto.departureDate);
    const entity = this.repo.create({ ...dto, status: dto.status ?? 'reserved' });
    const created = await this.repo.save(entity);
    await this.logAudit('reservation_created', created.id, actorUserId, undefined, created);
    return created;
  }

  async findAll(query: FindHotelReservationsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('r')
      .orderBy('r.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (tenantId) qb.where('r.customer_id = :tenantId', { tenantId });
    if (query.roomId) qb.andWhere('r.room_id = :roomId', { roomId: query.roomId });
    if (query.status) qb.andWhere('r.status = :status', { status: query.status });
    if (query.search?.trim()) {
      qb.andWhere('r.reservation_no ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string, tenantId?: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Reservation not found');
    if (tenantId && item.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');
    return item;
  }

  async update(id: string, dto: UpdateHotelReservationDto, tenantId?: string, actorUserId?: string) {
    const existing = await this.findOne(id, tenantId);
    const previousStatus = existing.status;
    const next = this.repo.merge(existing, dto);
    if (tenantId && next.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');

    this.ensureDateWindow(next.arrivalDate, next.departureDate);
    if (next.roomId) await this.assertRoomReservable(next.roomId, next.customerId);
    await this.assertNoOverlap(next.roomId, next.arrivalDate, next.departureDate, id);
    await this.assertTransition(previousStatus, next.status);
    await this.syncRoomStatus(next.roomId, previousStatus, next.status);

    const saved = await this.repo.save(next);
    await this.logAudit('reservation_updated', saved.id, actorUserId, existing, saved);
    return saved;
  }

  private ensureDateWindow(arrivalDate: string, departureDate: string) {
    if (new Date(departureDate) <= new Date(arrivalDate)) {
      throw new BadRequestException('departureDate must be later than arrivalDate');
    }
  }

  private async assertRoomReservable(roomId?: string, customerId?: string) {
    if (!roomId) return;
    const room = await this.roomsRepo.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found for reservation');
    if (customerId && room.customerId !== customerId) {
      throw new ForbiddenException('Room belongs to different tenant');
    }
    if (room.status === 'maintenance') {
      throw new ConflictException('Room is under maintenance and cannot be reserved');
    }
  }

  private async assertNoOverlap(
    roomId: string | undefined,
    arrivalDate: string,
    departureDate: string,
    excludeReservationId?: string,
  ) {
    if (!roomId) return;
    const qb = this.repo
      .createQueryBuilder('r')
      .where('r.room_id = :roomId', { roomId })
      .andWhere('r.status IN (:...statuses)', { statuses: ['reserved', 'checked_in'] })
      .andWhere(':arrivalDate < r.departure_date', { arrivalDate })
      .andWhere(':departureDate > r.arrival_date', { departureDate });
    if (excludeReservationId) {
      qb.andWhere('r.id <> :excludeReservationId', { excludeReservationId });
    }
    const overlap = await qb.getOne();
    if (!overlap) return;
    throw new ConflictException('Reservation overlaps with existing stay for this room');
  }

  private async assertTransition(previous: string, next: string) {
    if (previous === next) return;
    const allowed = ALLOWED_TRANSITIONS[previous] ?? [];
    if (!allowed.includes(next)) {
      throw new BadRequestException(`Invalid reservation status transition: ${previous} -> ${next}`);
    }
  }

  private async syncRoomStatus(roomId: string | undefined, previous: string, next: string) {
    if (!roomId || previous === next) return;
    const room = await this.roomsRepo.findOne({ where: { id: roomId } });
    if (!room) return;
    if (next === 'checked_in') room.status = 'occupied';
    if (next === 'checked_out' || next === 'cancelled') room.status = 'vacant';
    await this.roomsRepo.save(room);
  }

  private async logAudit(
    actionType: string,
    targetId: string,
    actorUserId?: string,
    oldData?: HotelReservation,
    newData?: HotelReservation,
  ) {
    const isUuid = (value?: string) =>
      !!value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    try {
      await this.dataSource.query(
        `INSERT INTO platform_audit_logs
         (id, platform_user_id, action_type, target_type, target_id, old_data, new_data, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
        [
          isUuid(actorUserId) ? actorUserId : null,
          actionType,
          'hotel_reservation',
          targetId,
          oldData ? JSON.stringify(oldData) : null,
          newData ? JSON.stringify(newData) : null,
        ],
      );
    } catch {
      // Audit write should not break reservation state changes.
    }
  }
}
