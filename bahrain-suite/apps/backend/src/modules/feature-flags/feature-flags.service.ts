import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { FindFeatureFlagsDto } from './dto/find-feature-flags.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { CustomerFeatureFlag } from './entities/customer-feature-flag.entity';

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(CustomerFeatureFlag)
    private readonly repo: Repository<CustomerFeatureFlag>,
  ) {}

  create(dto: CreateFeatureFlagDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindFeatureFlagsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('f')
      .orderBy('f.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (query.search?.trim()) {
      qb.where('f.customer_id::text ILIKE :q OR f.module_feature_id::text ILIKE :q', {
        q: `%${query.search.trim()}%`,
      });
    }
    if (tenantId) {
      qb.andWhere('f.customer_id = :tenantId', { tenantId });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Feature flag not found');
    return item;
  }

  async update(id: string, dto: UpdateFeatureFlagDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
