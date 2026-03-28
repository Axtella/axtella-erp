import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../../common/utils/pagination.util';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { FindHotelRoomsDto } from './dto/find-hotel-rooms.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoom } from './entities/hotel-room.entity';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectRepository(HotelRoom)
    private readonly repo: Repository<HotelRoom>,
  ) {}

  create(dto: CreateHotelRoomDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) throw new ForbiddenException('Tenant scope mismatch');
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindHotelRoomsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('r')
      .orderBy('r.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (tenantId) qb.where('r.customer_id = :tenantId', { tenantId });
    if (query.propertyId) qb.andWhere('r.property_id = :propertyId', { propertyId: query.propertyId });
    if (query.search?.trim()) {
      qb.andWhere('r.room_no ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string, tenantId?: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Room not found');
    if (tenantId && item.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');
    return item;
  }

  async update(id: string, dto: UpdateHotelRoomDto, tenantId?: string) {
    const item = await this.findOne(id, tenantId);
    Object.assign(item, dto);
    if (tenantId && item.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');
    return this.repo.save(item);
  }
}
