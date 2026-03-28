import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreateTenantSettingDto } from './dto/create-tenant-setting.dto';
import { FindTenantSettingsDto } from './dto/find-tenant-settings.dto';
import { UpdateTenantSettingDto } from './dto/update-tenant-setting.dto';
import { TenantSetting } from './entities/tenant-setting.entity';

@Injectable()
export class TenantSettingsService {
  constructor(
    @InjectRepository(TenantSetting)
    private readonly repo: Repository<TenantSetting>,
  ) {}

  create(dto: CreateTenantSettingDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindTenantSettingsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('ts')
      .orderBy('ts.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (query.search?.trim()) {
      qb.where('ts.customer_id::text ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    if (tenantId) {
      qb.andWhere('ts.customer_id = :tenantId', { tenantId });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Tenant setting not found');
    return item;
  }

  async update(id: string, dto: UpdateTenantSettingDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
