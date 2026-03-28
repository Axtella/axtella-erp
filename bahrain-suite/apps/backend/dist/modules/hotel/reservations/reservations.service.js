"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../../../common/utils/pagination.util");
const hotel_room_entity_1 = require("../rooms/entities/hotel-room.entity");
const hotel_reservation_entity_1 = require("./entities/hotel-reservation.entity");
const ALLOWED_TRANSITIONS = {
    reserved: ['checked_in', 'cancelled'],
    checked_in: ['checked_out', 'cancelled'],
    checked_out: [],
    cancelled: [],
};
let HotelReservationsService = class HotelReservationsService {
    constructor(repo, roomsRepo, dataSource) {
        this.repo = repo;
        this.roomsRepo = roomsRepo;
        this.dataSource = dataSource;
    }
    async create(dto, tenantId, actorUserId) {
        if (tenantId && tenantId !== dto.customerId)
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        this.ensureDateWindow(dto.arrivalDate, dto.departureDate);
        if (dto.roomId)
            await this.assertRoomReservable(dto.roomId, dto.customerId);
        await this.assertNoOverlap(dto.roomId, dto.arrivalDate, dto.departureDate);
        const entity = this.repo.create({ ...dto, status: dto.status ?? 'reserved' });
        const created = await this.repo.save(entity);
        await this.logAudit('reservation_created', created.id, actorUserId, undefined, created);
        return created;
    }
    async findAll(query, tenantId) {
        const { page, limit } = (0, pagination_util_1.normalizePagination)(query);
        const qb = this.repo
            .createQueryBuilder('r')
            .orderBy('r.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (tenantId)
            qb.where('r.customer_id = :tenantId', { tenantId });
        if (query.roomId)
            qb.andWhere('r.room_id = :roomId', { roomId: query.roomId });
        if (query.status)
            qb.andWhere('r.status = :status', { status: query.status });
        if (query.search?.trim()) {
            qb.andWhere('r.reservation_no ILIKE :q', { q: `%${query.search.trim()}%` });
        }
        const [items, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.pagedResult)(items, total, page, limit);
    }
    async findOne(id, tenantId) {
        const item = await this.repo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Reservation not found');
        if (tenantId && item.customerId !== tenantId)
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        return item;
    }
    async update(id, dto, tenantId, actorUserId) {
        const existing = await this.findOne(id, tenantId);
        const previousStatus = existing.status;
        const next = this.repo.merge(existing, dto);
        if (tenantId && next.customerId !== tenantId)
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        this.ensureDateWindow(next.arrivalDate, next.departureDate);
        if (next.roomId)
            await this.assertRoomReservable(next.roomId, next.customerId);
        await this.assertNoOverlap(next.roomId, next.arrivalDate, next.departureDate, id);
        await this.assertTransition(previousStatus, next.status);
        await this.syncRoomStatus(next.roomId, previousStatus, next.status);
        const saved = await this.repo.save(next);
        await this.logAudit('reservation_updated', saved.id, actorUserId, existing, saved);
        return saved;
    }
    ensureDateWindow(arrivalDate, departureDate) {
        if (new Date(departureDate) <= new Date(arrivalDate)) {
            throw new common_1.BadRequestException('departureDate must be later than arrivalDate');
        }
    }
    async assertRoomReservable(roomId, customerId) {
        if (!roomId)
            return;
        const room = await this.roomsRepo.findOne({ where: { id: roomId } });
        if (!room)
            throw new common_1.NotFoundException('Room not found for reservation');
        if (customerId && room.customerId !== customerId) {
            throw new common_1.ForbiddenException('Room belongs to different tenant');
        }
        if (room.status === 'maintenance') {
            throw new common_1.ConflictException('Room is under maintenance and cannot be reserved');
        }
    }
    async assertNoOverlap(roomId, arrivalDate, departureDate, excludeReservationId) {
        if (!roomId)
            return;
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
        if (!overlap)
            return;
        throw new common_1.ConflictException('Reservation overlaps with existing stay for this room');
    }
    async assertTransition(previous, next) {
        if (previous === next)
            return;
        const allowed = ALLOWED_TRANSITIONS[previous] ?? [];
        if (!allowed.includes(next)) {
            throw new common_1.BadRequestException(`Invalid reservation status transition: ${previous} -> ${next}`);
        }
    }
    async syncRoomStatus(roomId, previous, next) {
        if (!roomId || previous === next)
            return;
        const room = await this.roomsRepo.findOne({ where: { id: roomId } });
        if (!room)
            return;
        if (next === 'checked_in')
            room.status = 'occupied';
        if (next === 'checked_out' || next === 'cancelled')
            room.status = 'vacant';
        await this.roomsRepo.save(room);
    }
    async logAudit(actionType, targetId, actorUserId, oldData, newData) {
        const isUuid = (value) => !!value &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
        try {
            await this.dataSource.query(`INSERT INTO platform_audit_logs
         (id, platform_user_id, action_type, target_type, target_id, old_data, new_data, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`, [
                isUuid(actorUserId) ? actorUserId : null,
                actionType,
                'hotel_reservation',
                targetId,
                oldData ? JSON.stringify(oldData) : null,
                newData ? JSON.stringify(newData) : null,
            ]);
        }
        catch {
        }
    }
};
exports.HotelReservationsService = HotelReservationsService;
exports.HotelReservationsService = HotelReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_reservation_entity_1.HotelReservation)),
    __param(1, (0, typeorm_1.InjectRepository)(hotel_room_entity_1.HotelRoom)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], HotelReservationsService);
//# sourceMappingURL=reservations.service.js.map