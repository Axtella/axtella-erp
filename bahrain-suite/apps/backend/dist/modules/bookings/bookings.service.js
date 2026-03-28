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
exports.BookingsService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const property_entity_1 = require("../properties/entities/property.entity");
const cost_center_entity_1 = require("../cost-centers/entities/cost-center.entity");
const unit_entity_1 = require("../units/entities/unit.entity");
const tenant_entity_1 = require("../tenants/entities/tenant.entity");
const checkin_checkout_log_entity_1 = require("./entities/checkin-checkout-log.entity");
function num(v, fallback = 0) {
    const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : fallback;
}
function iso(d) {
    if (d == null)
        return null;
    if (d instanceof Date)
        return d.toISOString();
    return String(d);
}
let BookingsService = class BookingsService {
    constructor(repo, propertyRepo, costCenterRepo, unitRepo, tenantRepo, logRepo, dataSource) {
        this.repo = repo;
        this.propertyRepo = propertyRepo;
        this.costCenterRepo = costCenterRepo;
        this.unitRepo = unitRepo;
        this.tenantRepo = tenantRepo;
        this.logRepo = logRepo;
        this.dataSource = dataSource;
    }
    async create(dto) {
        const property = await this.propertyRepo.findOne({
            where: { id: dto.propertyId },
        });
        if (!property) {
            throw new common_1.BadRequestException('Property not found');
        }
        const costCenter = await this.costCenterRepo.findOne({
            where: { id: dto.costCenterId },
        });
        if (!costCenter) {
            throw new common_1.BadRequestException('Cost center not found');
        }
        if (costCenter.propertyId !== dto.propertyId) {
            throw new common_1.BadRequestException('Cost center does not belong to the selected property');
        }
        const unit = await this.unitRepo.findOne({
            where: { id: dto.unitId },
        });
        if (!unit) {
            throw new common_1.BadRequestException('Unit not found');
        }
        if (unit.propertyId !== dto.propertyId) {
            throw new common_1.BadRequestException('Unit does not belong to the selected property');
        }
        const tenant = await this.tenantRepo.findOne({
            where: { id: dto.tenantId },
        });
        if (!tenant) {
            throw new common_1.BadRequestException('Tenant not found');
        }
        const overlapping = await this.repo
            .createQueryBuilder('booking')
            .where('booking.unitId = :unitId', { unitId: dto.unitId })
            .andWhere('booking.status IN (:...statuses)', {
            statuses: ['reserved', 'checked_in'],
        })
            .andWhere(`
        (
          (:checkInDate BETWEEN booking.checkInDate AND COALESCE(booking.checkOutDate, :checkInDate))
          OR
          (COALESCE(:checkOutDate, :checkInDate) BETWEEN booking.checkInDate AND COALESCE(booking.checkOutDate, COALESCE(:checkOutDate, :checkInDate)))
          OR
          (booking.checkInDate BETWEEN :checkInDate AND COALESCE(:checkOutDate, :checkInDate))
        )
        `, {
            checkInDate: dto.checkInDate,
            checkOutDate: dto.checkOutDate || dto.checkInDate,
        })
            .getOne();
        if (overlapping) {
            throw new common_1.BadRequestException('Unit already has an overlapping active booking');
        }
        const entity = this.repo.create({
            id: (0, crypto_1.randomUUID)(),
            ...dto,
            status: 'reserved',
            rateDaily: dto.rateDaily ?? 0,
            rateMonthly: dto.rateMonthly ?? 0,
            depositAmount: dto.depositAmount ?? 0,
            discountAmount: dto.discountAmount ?? 0,
        });
        return this.repo.save(entity);
    }
    mapBookingRegisterRow(b) {
        return {
            id: b.id,
            propertyId: b.propertyId,
            propertyName: b.property?.name ?? '',
            propertyCode: b.property?.code ?? '',
            costCenterId: b.costCenterId,
            costCenterCode: b.costCenter?.code ?? '',
            costCenterName: b.costCenter?.name ?? '',
            unitId: b.unitId,
            unitNo: b.unit?.unitNo ?? '',
            unitTypeCode: b.unit?.unitType?.code ?? '',
            unitTypeName: b.unit?.unitType?.name ?? '',
            unitStatus: b.unit?.status ?? '',
            tenantId: b.tenantId,
            tenantName: b.tenant?.fullName ?? '',
            tenantPhone: b.tenant?.phone ?? '',
            tenantEmail: b.tenant?.email ?? '',
            tenantCpr: b.tenant?.cprNo ?? '',
            bookingType: b.bookingType,
            bookingSource: b.bookingSource ?? null,
            status: b.status,
            checkInDate: iso(b.checkInDate),
            checkOutDate: iso(b.checkOutDate),
            contractStartDate: b.contractStartDate ?? null,
            contractEndDate: b.contractEndDate ?? null,
            rateDaily: num(b.rateDaily),
            rateMonthly: num(b.rateMonthly),
            depositAmount: num(b.depositAmount),
            discountAmount: num(b.discountAmount),
            notes: b.notes ?? null,
            createdAt: iso(b.createdAt),
            updatedAt: iso(b.updatedAt),
        };
    }
    async findAll(query) {
        const page = Number(query.page || 1);
        const limit = Number(query.limit || 50);
        const qb = this.repo
            .createQueryBuilder('booking')
            .leftJoinAndSelect('booking.property', 'property')
            .leftJoinAndSelect('booking.costCenter', 'costCenter')
            .leftJoinAndSelect('booking.unit', 'unit')
            .leftJoinAndSelect('unit.unitType', 'unitType')
            .leftJoinAndSelect('booking.tenant', 'tenant');
        if (query.propertyId) {
            qb.andWhere('booking.propertyId = :propertyId', {
                propertyId: query.propertyId,
            });
        }
        if (query.costCenterId) {
            qb.andWhere('booking.costCenterId = :costCenterId', {
                costCenterId: query.costCenterId,
            });
        }
        if (query.unitId) {
            qb.andWhere('booking.unitId = :unitId', {
                unitId: query.unitId,
            });
        }
        if (query.tenantId) {
            qb.andWhere('booking.tenantId = :tenantId', {
                tenantId: query.tenantId,
            });
        }
        if (query.status) {
            qb.andWhere('booking.status = :status', {
                status: query.status,
            });
        }
        if (query.bookingType) {
            qb.andWhere('booking.bookingType = :bookingType', {
                bookingType: query.bookingType,
            });
        }
        if (query.fromDate) {
            qb.andWhere('booking.checkInDate >= :fromDate', {
                fromDate: query.fromDate,
            });
        }
        if (query.toDate) {
            qb.andWhere('booking.checkInDate <= :toDate', {
                toDate: query.toDate,
            });
        }
        qb.orderBy('booking.checkInDate', 'DESC')
            .addOrderBy('booking.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [rows, total] = await qb.getManyAndCount();
        const items = rows.map((b) => this.mapBookingRegisterRow(b));
        return {
            items,
            total,
            page,
            limit,
        };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({
            where: { id },
            relations: [
                'property',
                'costCenter',
                'unit',
                'unit.unitType',
                'tenant',
            ],
        });
        if (!entity) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return this.mapBookingRegisterRow(entity);
    }
    async requireBookingEntity(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return entity;
    }
    async update(id, dto) {
        const entity = await this.requireBookingEntity(id);
        if (entity.status === 'checked_out') {
            throw new common_1.BadRequestException('Cannot update a checked out booking');
        }
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.requireBookingEntity(id);
        if (entity.status === 'checked_in') {
            throw new common_1.BadRequestException('Cannot delete a checked in booking');
        }
        await this.repo.remove(entity);
        return { deleted: true };
    }
    async checkIn(id, dto) {
        return this.dataSource.transaction(async (manager) => {
            const bookingRepo = manager.getRepository(booking_entity_1.Booking);
            const unitRepo = manager.getRepository(unit_entity_1.Unit);
            const logRepo = manager.getRepository(checkin_checkout_log_entity_1.CheckinCheckoutLog);
            const booking = await bookingRepo.findOne({ where: { id } });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            if (booking.status !== 'reserved') {
                throw new common_1.BadRequestException('Only reserved bookings can be checked in');
            }
            const unit = await unitRepo.findOne({
                where: { id: booking.unitId },
            });
            if (!unit) {
                throw new common_1.BadRequestException('Unit not found');
            }
            booking.status = 'checked_in';
            await bookingRepo.save(booking);
            unit.status = 'occupied';
            await unitRepo.save(unit);
            const log = logRepo.create({
                bookingId: booking.id,
                propertyId: booking.propertyId,
                unitId: booking.unitId,
                logType: 'checkin',
                eventTime: dto.actualCheckInTime
                    ? new Date(dto.actualCheckInTime)
                    : new Date(),
                remarks: dto.remarks,
            });
            await logRepo.save(log);
            return {
                message: 'Checked in successfully',
                booking,
            };
        });
    }
    async checkOut(id, dto) {
        return this.dataSource.transaction(async (manager) => {
            const bookingRepo = manager.getRepository(booking_entity_1.Booking);
            const unitRepo = manager.getRepository(unit_entity_1.Unit);
            const logRepo = manager.getRepository(checkin_checkout_log_entity_1.CheckinCheckoutLog);
            const booking = await bookingRepo.findOne({ where: { id } });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            if (booking.status !== 'checked_in') {
                throw new common_1.BadRequestException('Only checked in bookings can be checked out');
            }
            const unit = await unitRepo.findOne({
                where: { id: booking.unitId },
            });
            if (!unit) {
                throw new common_1.BadRequestException('Unit not found');
            }
            booking.status = 'checked_out';
            booking.checkOutDate = dto.actualCheckOutTime
                ? new Date(dto.actualCheckOutTime)
                : new Date();
            await bookingRepo.save(booking);
            unit.status = 'vacant';
            await unitRepo.save(unit);
            const log = logRepo.create({
                bookingId: booking.id,
                propertyId: booking.propertyId,
                unitId: booking.unitId,
                logType: 'checkout',
                eventTime: dto.actualCheckOutTime
                    ? new Date(dto.actualCheckOutTime)
                    : new Date(),
                remarks: dto.remarks,
            });
            await logRepo.save(log);
            return {
                message: 'Checked out successfully',
                booking,
                extraCharges: dto.extraCharges ?? 0,
            };
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(2, (0, typeorm_1.InjectRepository)(cost_center_entity_1.CostCenter)),
    __param(3, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(4, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(5, (0, typeorm_1.InjectRepository)(checkin_checkout_log_entity_1.CheckinCheckoutLog)),
    __param(6, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map