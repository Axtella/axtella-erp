import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRolesDto } from './dto/find-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PlatformRole } from './entities/platform-role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(PlatformRole)
    private readonly repo: Repository<PlatformRole>,
  ) {}

  async create(dto: CreateRoleDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) throw new ConflictException('Role code already exists');
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindRolesDto) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo.createQueryBuilder('r').orderBy('r.created_at', 'DESC');
    if (query.search?.trim()) {
      qb.where('r.code ILIKE :q OR r.name ILIKE :q', { q: `%${query.search.trim()}%` });
    }
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const role = await this.repo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.findOne(id);
    Object.assign(role, dto);
    return this.repo.save(role);
  }
}
