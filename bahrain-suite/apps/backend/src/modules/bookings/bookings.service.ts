import { randomUUID } from 'crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CheckinDto } from './dto/checkin.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { FindBookingsDto } from './dto/find-bookings.dto';
import { Property } from '../properties/entities/property.entity';
import { CostCenter } from '../cost-centers/entities/cost-center.entity';
import { Unit } from '../units/entities/unit.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CheckinCheckoutLog } from './entities/checkin-checkout-log.entity';

function num(v: unknown, fallback = 0): number {
  const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function iso(d: Date | string | undefined | null): string | null {
  if (d == null) return null;
  if (d instanceof Date) return d.toISOString();
  return String(d);
}

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
    @InjectRepository(CostCenter)
    private readonly costCenterRepo: Repository<CostCenter>,
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
    @InjectRepository(CheckinCheckoutLog)
    private readonly logRepo: Repository<CheckinCheckoutLog>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateBookingDto) {
    const property = await this.propertyRepo.findOne({
      where: { id: dto.propertyId },
    });
    if (!property) {
      throw new BadRequestException('Property not found');
    }

    const costCenter = await this.costCenterRepo.findOne({
      where: { id: dto.costCenterId },
    });
    if (!costCenter) {
      throw new BadRequestException('Cost center not found');
    }

    if (costCenter.propertyId !== dto.propertyId) {
      throw new BadRequestException('Cost center does not belong to the selected property');
    }

    const unit = await this.unitRepo.findOne({
      where: { id: dto.unitId },
    });
    if (!unit) {
      throw new BadRequestException('Unit not found');
    }

    if (unit.propertyId !== dto.propertyId) {
      throw new BadRequestException('Unit does not belong to the selected property');
    }

    const tenant = await this.tenantRepo.findOne({
      where: { id: dto.tenantId },
    });
    if (!tenant) {
      throw new BadRequestException('Tenant not found');
    }

    const overlapping = await this.repo
      .createQueryBuilder('booking')
      .where('booking.unitId = :unitId', { unitId: dto.unitId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: ['reserved', 'checked_in'],
      })
      .andWhere(
        `
        (
          (:checkInDate BETWEEN booking.checkInDate AND COALESCE(booking.checkOutDate, :checkInDate))
          OR
          (COALESCE(:checkOutDate, :checkInDate) BETWEEN booking.checkInDate AND COALESCE(booking.checkOutDate, COALESCE(:checkOutDate, :checkInDate)))
          OR
          (booking.checkInDate BETWEEN :checkInDate AND COALESCE(:checkOutDate, :checkInDate))
        )
        `,
        {
          checkInDate: dto.checkInDate,
          checkOutDate: dto.checkOutDate || dto.checkInDate,
        },
      )
      .getOne();

    if (overlapping) {
      throw new BadRequestException('Unit already has an overlapping active booking');
    }

    const entity = this.repo.create({
      id: randomUUID(),
      ...dto,
      status: 'reserved',
      rateDaily: dto.rateDaily ?? 0,
      rateMonthly: dto.rateMonthly ?? 0,
      depositAmount: dto.depositAmount ?? 0,
      discountAmount: dto.discountAmount ?? 0,
    });

    return this.repo.save(entity);
  }

  private mapBookingRegisterRow(b: Booking) {
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

  async findAll(query: FindBookingsDto) {
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

  async findOne(id: string) {
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
      throw new NotFoundException('Booking not found');
    }
    return this.mapBookingRegisterRow(entity);
  }

  private async requireBookingEntity(id: string): Promise<Booking> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Booking not found');
    }
    return entity;
  }

  async update(id: string, dto: UpdateBookingDto) {
    const entity = await this.requireBookingEntity(id);

    if (entity.status === 'checked_out') {
      throw new BadRequestException('Cannot update a checked out booking');
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.requireBookingEntity(id);

    if (entity.status === 'checked_in') {
      throw new BadRequestException('Cannot delete a checked in booking');
    }

    await this.repo.remove(entity);
    return { deleted: true };
  }

  async checkIn(id: string, dto: CheckinDto) {
    return this.dataSource.transaction(async (manager) => {
      const bookingRepo = manager.getRepository(Booking);
      const unitRepo = manager.getRepository(Unit);
      const logRepo = manager.getRepository(CheckinCheckoutLog);

      const booking = await bookingRepo.findOne({ where: { id } });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      if (booking.status !== 'reserved') {
        throw new BadRequestException('Only reserved bookings can be checked in');
      }

      const unit = await unitRepo.findOne({
        where: { id: booking.unitId },
      });

      if (!unit) {
        throw new BadRequestException('Unit not found');
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

  async checkOut(id: string, dto: CheckoutDto) {
    return this.dataSource.transaction(async (manager) => {
      const bookingRepo = manager.getRepository(Booking);
      const unitRepo = manager.getRepository(Unit);
      const logRepo = manager.getRepository(CheckinCheckoutLog);

      const booking = await bookingRepo.findOne({ where: { id } });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      if (booking.status !== 'checked_in') {
        throw new BadRequestException('Only checked in bookings can be checked out');
      }

      const unit = await unitRepo.findOne({
        where: { id: booking.unitId },
      });

      if (!unit) {
        throw new BadRequestException('Unit not found');
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
}
