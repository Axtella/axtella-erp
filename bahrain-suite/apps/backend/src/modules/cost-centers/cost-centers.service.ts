import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostCenter } from './entities/cost-center.entity';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { FindCostCentersDto } from './dto/find-cost-centers.dto';
import { Property } from '../properties/entities/property.entity';

@Injectable()
export class CostCentersService {
  constructor(
    @InjectRepository(CostCenter) private readonly repo: Repository<CostCenter>,
    @InjectRepository(Property) private readonly propertyRepo: Repository<Property>,
  ) {}

  private async ensureProperty(propertyId: string) {
    const property = await this.propertyRepo.findOne({ where: { id: propertyId } });
    if (!property) throw new NotFoundException('Property not found');
  }

  async create(dto: CreateCostCenterDto) {
    const property = await this.propertyRepo.findOne({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new BadRequestException('Property not found');
    }

    const existing = await this.repo.findOne({ where: { propertyId: dto.propertyId, code: dto.code } });
    if (existing) {
      throw new BadRequestException('Cost center code already exists for this property');
    }

    const entity = this.repo.create({
      ...dto,
      isActive: dto.isActive ?? true,
    });

    return this.repo.save(entity);
  }

  async findAll(query: FindCostCentersDto) {
    const { page = 1, limit = 20, propertyId, costCenterType, isActive, search } = query;
    const qb = this.repo.createQueryBuilder('cc');
    if (propertyId) qb.andWhere('cc.propertyId = :propertyId', { propertyId });
    if (costCenterType) qb.andWhere('cc.costCenterType = :costCenterType', { costCenterType });
    if (typeof isActive === 'boolean') qb.andWhere('cc.isActive = :isActive', { isActive });
    if (search) qb.andWhere('(cc.name ILIKE :q OR cc.code ILIKE :q)', { q: `%${search}%` });
    qb.orderBy('cc.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Cost center not found');
    return entity;
  }

  async update(id: string, dto: UpdateCostCenterDto) {
    const entity = await this.findOne(id);
    const nextPropertyId = dto.propertyId || entity.propertyId;
    const nextCode = dto.code || entity.code;

    if (dto.propertyId) {
      const property = await this.propertyRepo.findOne({
        where: { id: dto.propertyId },
      });
      if (!property) {
        throw new BadRequestException('Property not found');
      }
    }

    const duplicate = await this.repo.findOne({
      where: {
        propertyId: nextPropertyId,
        code: nextCode,
      },
    });

    if (duplicate && duplicate.id !== entity.id) {
      throw new BadRequestException('Cost center code already exists for this property');
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
