import { randomUUID } from 'crypto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogItemGroup } from './entities/catalog-item-group.entity';
import { CreateCatalogItemGroupDto } from './dto/create-catalog-item-group.dto';
import { UpdateCatalogItemGroupDto } from './dto/update-catalog-item-group.dto';
import { FindCatalogItemGroupsDto } from './dto/find-catalog-item-groups.dto';

@Injectable()
export class CatalogItemGroupsService {
  constructor(
    @InjectRepository(CatalogItemGroup)
    private readonly repo: Repository<CatalogItemGroup>,
  ) {}

  async create(dto: CreateCatalogItemGroupDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException(`Group code '${dto.code}' already exists`);
    }
    const entity = this.repo.create({
      id: randomUUID(),
      code: dto.code.trim(),
      name: dto.name.trim(),
      sortOrder: dto.sortOrder ?? 0,
      isActive: dto.isActive ?? true,
      notes: dto.notes?.trim() || undefined,
    });
    return this.repo.save(entity);
  }

  async findAll(query: FindCatalogItemGroupsDto) {
    const { page = 1, limit = 50, search, sortBy, sortDirection } = query;
    const qb = this.repo.createQueryBuilder('g');
    if (search?.trim()) {
      qb.andWhere('(g.code ILIKE :q OR g.name ILIKE :q)', {
        q: `%${search.trim()}%`,
      });
    }
    qb.orderBy(`g.${sortBy}`, sortDirection)
      .skip((page - 1) * limit)
      .take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Catalog item group not found');
    return entity;
  }

  async update(id: string, dto: UpdateCatalogItemGroupDto) {
    const entity = await this.findOne(id);
    if (dto.code !== undefined && dto.code !== entity.code) {
      const dup = await this.repo.findOne({ where: { code: dto.code } });
      if (dup && dup.id !== id) {
        throw new ConflictException(`Group code '${dto.code}' already exists`);
      }
    }
    if (dto.code !== undefined) entity.code = dto.code.trim();
    if (dto.name !== undefined) entity.name = dto.name.trim();
    if (dto.sortOrder !== undefined) entity.sortOrder = dto.sortOrder;
    if (dto.isActive !== undefined) entity.isActive = dto.isActive;
    if (dto.notes !== undefined) {
      entity.notes = dto.notes?.trim() || undefined;
    }
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
