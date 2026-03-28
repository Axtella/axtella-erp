import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { FindEnvironmentsDto } from './dto/find-environments.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { CustomerEnvironment } from './entities/customer-environment.entity';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectRepository(CustomerEnvironment)
    private readonly repo: Repository<CustomerEnvironment>,
  ) {}

  create(dto: CreateEnvironmentDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindEnvironmentsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('e')
      .orderBy('e.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (query.search?.trim()) {
      qb.where('e.environment_key ILIKE :q OR e.environment_type ILIKE :q', {
        q: `%${query.search.trim()}%`,
      });
    }
    if (tenantId) {
      qb.andWhere('e.customer_id = :tenantId', { tenantId });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Environment not found');
    return item;
  }

  async update(id: string, dto: UpdateEnvironmentDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
