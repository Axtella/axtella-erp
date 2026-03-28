import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreateProvisioningRequestDto } from './dto/create-provisioning-request.dto';
import { FindProvisioningRequestsDto } from './dto/find-provisioning-requests.dto';
import { UpdateProvisioningRequestDto } from './dto/update-provisioning-request.dto';
import { ProvisioningRequest } from './entities/provisioning-request.entity';

@Injectable()
export class ProvisioningService {
  constructor(
    @InjectRepository(ProvisioningRequest)
    private readonly repo: Repository<ProvisioningRequest>,
  ) {}

  create(dto: CreateProvisioningRequestDto, tenantId?: string) {
    if (tenantId && tenantId !== dto.customerId) {
      throw new ForbiddenException('Tenant scope mismatch');
    }
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindProvisioningRequestsDto, tenantId?: string) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('p')
      .orderBy('p.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (query.search?.trim()) {
      qb.where('p.request_type ILIKE :q OR p.status ILIKE :q', {
        q: `%${query.search.trim()}%`,
      });
    }
    if (tenantId) {
      qb.andWhere('p.customer_id = :tenantId', { tenantId });
    }
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Provisioning request not found');
    return item;
  }

  async update(id: string, dto: UpdateProvisioningRequestDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
