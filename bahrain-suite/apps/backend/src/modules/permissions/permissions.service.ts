import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { FindPermissionsDto } from './dto/find-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PlatformPermission } from './entities/platform-permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PlatformPermission)
    private readonly repo: Repository<PlatformPermission>,
  ) {}

  async create(dto: CreatePermissionDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) throw new ConflictException('Permission code already exists');
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindPermissionsDto) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo.createQueryBuilder('p').orderBy('p.created_at', 'DESC');
    if (query.search?.trim()) {
      qb.where('p.code ILIKE :q OR p.name ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Permission not found');
    return item;
  }

  async update(id: string, dto: UpdatePermissionDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
