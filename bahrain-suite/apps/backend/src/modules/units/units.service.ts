import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { FindUnitsDto } from './dto/find-units.dto';
import { Property } from '../properties/entities/property.entity';
import { CostCenter } from '../cost-centers/entities/cost-center.entity';
import { UnitType } from '../unit-types/entities/unit-type.entity';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit) private readonly repo: Repository<Unit>,
    @InjectRepository(Property) private readonly propertyRepo: Repository<Property>,
    @InjectRepository(CostCenter) private readonly costCenterRepo: Repository<CostCenter>,
    @InjectRepository(UnitType) private readonly unitTypeRepo: Repository<UnitType>,
  ) {}

  async create(dto: CreateUnitDto) {
    const property = await this.propertyRepo.findOne({
      where: { id: dto.propertyId },
    });
    if (!property) {
      throw new BadRequestException('Property not found');
    }

    const costCenter = await this.costCenterRepo.findOne({
      where: { id: dto.costCenterId },
    });
    if (!costCenter) {
      throw new BadRequestException('Cost center not found');
    }

    if (costCenter.propertyId !== dto.propertyId) {
      throw new BadRequestException('Cost center does not belong to the selected property');
    }

    const unitType = await this.unitTypeRepo.findOne({
      where: { id: dto.unitTypeId },
    });
    if (!unitType) {
      throw new BadRequestException('Unit type not found');
    }

    const existing = await this.repo.findOne({ where: { propertyId: dto.propertyId, unitNo: dto.unitNo } });
    if (existing) {
      throw new BadRequestException('Unit number already exists in this property');
    }

    const entity = this.repo.create({
      ...dto,
      bedroomCount: dto.bedroomCount ?? 0,
      bathroomCount: dto.bathroomCount ?? 0,
      status: dto.status || 'vacant',
      defaultDailyRate: dto.defaultDailyRate ?? 0,
      defaultMonthlyRate: dto.defaultMonthlyRate ?? 0,
    });

    return this.repo.save(entity);
  }

  async findAll(query: FindUnitsDto) {
    const { page = 1, limit = 20, propertyId, costCenterId, unitTypeId, status, search } = query;
    const qb = this.repo.createQueryBuilder('u');
    if (propertyId) qb.andWhere('u.propertyId = :propertyId', { propertyId });
    if (costCenterId) qb.andWhere('u.costCenterId = :costCenterId', { costCenterId });
    if (unitTypeId) qb.andWhere('u.unitTypeId = :unitTypeId', { unitTypeId });
    if (status) qb.andWhere('u.status = :status', { status });
    if (search) qb.andWhere('u.unitNo ILIKE :q', { q: `%${search}%` });
    qb.orderBy('u.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Unit not found');
    return entity;
  }

  async update(id: string, dto: UpdateUnitDto) {
    const entity = await this.findOne(id);
    const nextPropertyId = dto.propertyId || entity.propertyId;
    const nextCostCenterId = dto.costCenterId || entity.costCenterId;
    const nextUnitNo = dto.unitNo || entity.unitNo;
    const nextUnitTypeId = dto.unitTypeId || entity.unitTypeId;

    const property = await this.propertyRepo.findOne({
      where: { id: nextPropertyId },
    });
    if (!property) {
      throw new BadRequestException('Property not found');
    }

    const costCenter = await this.costCenterRepo.findOne({
      where: { id: nextCostCenterId },
    });
    if (!costCenter) {
      throw new BadRequestException('Cost center not found');
    }

    if (costCenter.propertyId !== nextPropertyId) {
      throw new BadRequestException('Cost center does not belong to the selected property');
    }

    const unitType = await this.unitTypeRepo.findOne({
      where: { id: nextUnitTypeId },
    });
    if (!unitType) {
      throw new BadRequestException('Unit type not found');
    }

    const duplicate = await this.repo.findOne({
      where: {
        propertyId: nextPropertyId,
        unitNo: nextUnitNo,
      },
    });

    if (duplicate && duplicate.id !== entity.id) {
      throw new BadRequestException('Unit number already exists in this property');
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
