import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../../common/utils/pagination.util';
import { CreateHotelPropertyDto } from './dto/create-hotel-property.dto';
import { FindHotelPropertiesDto } from './dto/find-hotel-properties.dto';
import { UpdateHotelPropertyDto } from './dto/update-hotel-property.dto';
import { HotelProperty } from './entities/hotel-property.entity';

@Injectable()
export class HotelPropertiesService {
  constructor(
    @InjectRepository(HotelProperty)
    private readonly repo: Repository<HotelProperty>,
  ) {}

  create(dto: CreateHotelPropertyDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindHotelPropertiesDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('p')
      .orderBy('p.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (query.search?.trim()) {
      qb.where('p.code ILIKE :q OR p.name ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    if (tenantId) {
      qb.andWhere('p.customer_id = :tenantId', { tenantId });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string, tenantId?: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Hotel property not found');
    if (tenantId && item.customerId !== tenantId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return item;
  }

  async update(id: string, dto: UpdateHotelPropertyDto, tenantId?: string) {
    const item = await this.findOne(id, tenantId);
    Object.assign(item, dto);
    if (tenantId && item.customerId !== tenantId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return this.repo.save(item);
  }
}
