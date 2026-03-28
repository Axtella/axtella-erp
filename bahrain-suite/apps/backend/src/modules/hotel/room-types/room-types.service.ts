import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../../common/utils/pagination.util';
import { CreateHotelRoomTypeDto } from './dto/create-hotel-room-type.dto';
import { FindHotelRoomTypesDto } from './dto/find-hotel-room-types.dto';
import { UpdateHotelRoomTypeDto } from './dto/update-hotel-room-type.dto';
import { HotelRoomType } from './entities/hotel-room-type.entity';

@Injectable()
export class HotelRoomTypesService {
  constructor(
    @InjectRepository(HotelRoomType)
    private readonly repo: Repository<HotelRoomType>,
  ) {}

  create(dto: CreateHotelRoomTypeDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) throw new ForbiddenException('Tenant scope mismatch');
    return this.repo.save(this.repo.create({ ...dto, nameI18n: dto.nameI18n ?? {} }));
  }

  async findAll(query: FindHotelRoomTypesDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('rt')
      .orderBy('rt.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (tenantId) qb.where('rt.customer_id = :tenantId', { tenantId });
    if (query.propertyId) qb.andWhere('rt.property_id = :propertyId', { propertyId: query.propertyId });
    if (query.search?.trim()) {
      qb.andWhere('rt.code ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string, tenantId?: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Room type not found');
    if (tenantId && item.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');
    return item;
  }

  async update(id: string, dto: UpdateHotelRoomTypeDto, tenantId?: string) {
    const item = await this.findOne(id, tenantId);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
