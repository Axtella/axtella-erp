import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { FindTenantsDto } from './dto/find-tenants.dto';

@Injectable()
export class TenantsService {
  constructor(@InjectRepository(Tenant) private readonly repo: Repository<Tenant>) {}

  async create(dto: CreateTenantDto) { return this.repo.save(this.repo.create(dto)); }

  async findAll(query: FindTenantsDto) {
    const { page = 1, limit = 20, search, tenantType, phone, cprNo } = query;
    const qb = this.repo.createQueryBuilder('tenant');

    if (tenantType) {
      qb.andWhere('tenant.tenantType = :tenantType', {
        tenantType,
      });
    }

    if (phone) {
      qb.andWhere('tenant.phone ILIKE :phone', {
        phone: `%${phone}%`,
      });
    }

    if (cprNo) {
      qb.andWhere('tenant.cprNo ILIKE :cprNo', {
        cprNo: `%${cprNo}%`,
      });
    }

    if (search) {
      qb.andWhere(
        `(tenant.fullName ILIKE :search OR tenant.phone ILIKE :search OR tenant.cprNo ILIKE :search OR tenant.passportNo ILIKE :search)`,
        { search: `%${search}%` },
      );
    }

    qb.orderBy('tenant.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Tenant not found');
    return entity;
  }

  async update(id: string, dto: UpdateTenantDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { success: true };
  }
}
