import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../../common/utils/pagination.util';
import { CreateHotelHousekeepingTaskDto } from './dto/create-hotel-housekeeping-task.dto';
import { FindHotelHousekeepingTasksDto } from './dto/find-hotel-housekeeping-tasks.dto';
import { UpdateHotelHousekeepingTaskDto } from './dto/update-hotel-housekeeping-task.dto';
import { HotelHousekeepingTask } from './entities/hotel-housekeeping-task.entity';

@Injectable()
export class HotelHousekeepingService {
  constructor(
    @InjectRepository(HotelHousekeepingTask)
    private readonly repo: Repository<HotelHousekeepingTask>,
  ) {}

  create(dto: CreateHotelHousekeepingTaskDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) throw new ForbiddenException('Tenant scope mismatch');
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindHotelHousekeepingTasksDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('h')
      .orderBy('h.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (tenantId) qb.where('h.customer_id = :tenantId', { tenantId });
    if (query.status) qb.andWhere('h.status = :status', { status: query.status });
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string, tenantId?: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Housekeeping task not found');
    if (tenantId && item.customerId !== tenantId) throw new ForbiddenException('Tenant scope mismatch');
    return item;
  }

  async update(id: string, dto: UpdateHotelHousekeepingTaskDto, tenantId?: string) {
    const item = await this.findOne(id, tenantId);
    Object.assign(item, dto);
    if (dto.status === 'done' && !item.completedAt) item.completedAt = new Date();
    return this.repo.save(item);
  }
}
