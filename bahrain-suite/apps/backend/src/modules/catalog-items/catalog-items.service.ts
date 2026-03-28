import { randomUUID } from 'crypto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogItem } from './entities/catalog-item.entity';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';
import { FindCatalogItemsDto } from './dto/find-catalog-items.dto';

@Injectable()
export class CatalogItemsService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly repo: Repository<CatalogItem>,
  ) {}

  async create(dto: CreateCatalogItemDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException(`Catalog code '${dto.code}' already exists`);
    }
    const entity = this.repo.create({
      id: randomUUID(),
      code: dto.code.trim(),
      name: dto.name.trim(),
      itemType: dto.itemType?.trim() || 'service',
      unitOfMeasure: dto.unitOfMeasure?.trim() || 'ea',
      defaultPrice: dto.defaultPrice ?? 0,
      isActive: dto.isActive ?? true,
      notes: dto.notes?.trim() || undefined,
      groupId: dto.groupId ?? undefined,
    });
    return this.repo.save(entity);
  }

  async findAll(query: FindCatalogItemsDto) {
    const { page = 1, limit = 50, search, sortBy, sortOrder } = query;
    const qb = this.repo
      .createQueryBuilder('ci')
      .leftJoinAndSelect('ci.group', 'g');
    if (search?.trim()) {
      qb.andWhere('(ci.code ILIKE :q OR ci.name ILIKE :q)', {
        q: `%${search.trim()}%`,
      });
    }
    qb.orderBy(`ci.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['group'],
    });
    if (!entity) throw new NotFoundException('Catalog item not found');
    const { group, ...rest } = entity;
    return {
      ...rest,
      groupCode: group?.code ?? null,
      groupName: group?.name ?? null,
    };
  }

  async update(id: string, dto: UpdateCatalogItemDto) {
    const entity = await this.findOne(id);
    if (dto.code !== undefined && dto.code !== entity.code) {
      const dup = await this.repo.findOne({ where: { code: dto.code } });
      if (dup && dup.id !== id) {
        throw new ConflictException(`Catalog code '${dto.code}' already exists`);
      }
    }
    if (dto.code !== undefined) entity.code = dto.code.trim();
    if (dto.name !== undefined) entity.name = dto.name.trim();
    if (dto.itemType !== undefined) entity.itemType = dto.itemType.trim() || 'service';
    if (dto.unitOfMeasure !== undefined) {
      entity.unitOfMeasure = dto.unitOfMeasure.trim() || 'ea';
    }
    if (dto.defaultPrice !== undefined) entity.defaultPrice = dto.defaultPrice;
    if (dto.isActive !== undefined) entity.isActive = dto.isActive;
    if (dto.notes !== undefined) {
      entity.notes = dto.notes?.trim() || undefined;
    }
    if (dto.groupId !== undefined) {
      entity.groupId = dto.groupId ?? null;
    }
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
