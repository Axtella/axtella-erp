import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitType } from './entities/unit-type.entity';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { FindUnitTypesQueryDto } from './dto/find-unit-types-query.dto';

@Injectable()
export class UnitTypesService {
  constructor(@InjectRepository(UnitType) private readonly repo: Repository<UnitType>) {}

  async create(dto: CreateUnitTypeDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) throw new ConflictException(`Unit type code '${dto.code}' already exists`);
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindUnitTypesQueryDto) {
    const { page, limit, category, search, sortBy, sortOrder } = query;
    const qb = this.repo.createQueryBuilder('ut');
    if (category) qb.andWhere('ut.category = :category', { category });
    if (search) qb.andWhere('(ut.code ILIKE :q OR ut.name ILIKE :q)', { q: `%${search}%` });
    qb.orderBy(`ut.${sortBy}`, sortOrder).skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Unit type not found');
    return entity;
  }

  async update(id: string, dto: UpdateUnitTypeDto) {
    const entity = await this.findOne(id);
    if (dto.code && dto.code !== entity.code) {
      const existing = await this.repo.findOne({ where: { code: dto.code } });
      if (existing && existing.id !== id) throw new ConflictException(`Unit type code '${dto.code}' already exists`);
    }
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { success: true };
  }
}
