import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../../common/utils/pagination.util';
import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';
import { FindHotelGuestsDto } from './dto/find-hotel-guests.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';
import { HotelGuest } from './entities/hotel-guest.entity';

@Injectable()
export class HotelGuestsService {
  constructor(
    @InjectRepository(HotelGuest)
    private readonly repo: Repository<HotelGuest>,
  ) {}

  create(dto: CreateHotelGuestDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) throw new ForbiddenException('Tenant scope mismatch');
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindHotelGuestsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('g')
      .orderBy('g.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (tenantId) qb.where('g.customer_id = :tenantId', { tenantId });
    if (query.search?.trim()) {
      qb.andWhere('g.guest_no ILIKE :q OR g.full_name ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string, tenantId?: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Guest not found');
    if (tenantId && item.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');
    return item;
  }

  async update(id: string, dto: UpdateHotelGuestDto, tenantId?: string) {
    const item = await this.findOne(id, tenantId);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
