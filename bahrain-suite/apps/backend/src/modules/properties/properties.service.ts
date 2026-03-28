import { randomUUID } from 'crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FindPropertiesDto } from './dto/find-properties.dto';
import { Investor } from '../investors/entities/investor.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private readonly repo: Repository<Property>,
    @InjectRepository(Investor) private readonly investorRepo: Repository<Investor>,
  ) {}

  private async ensureInvestor(investorId?: string) {
    if (!investorId) return;
    const inv = await this.investorRepo.findOne({ where: { id: investorId } });
    if (!inv) throw new NotFoundException('Investor not found');
  }

  async create(dto: CreatePropertyDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) {
      throw new BadRequestException('Property code already exists');
    }

    if (dto.investorId) {
      const investor = await this.investorRepo.findOne({
        where: { id: dto.investorId },
      });
      if (!investor) {
        throw new BadRequestException('Investor not found');
      }
    }

    // `properties.id` has no DB default in 001_core_tables.sql; assign explicitly so INSERT never sends NULL id.
    const entity = this.repo.create({
      id: randomUUID(),
      code: dto.code,
      name: dto.name,
      propertyType: dto.propertyType,
      address: dto.address,
      city: dto.city,
      investorId: dto.investorId,
      ownerRentMonthly: dto.ownerRentMonthly ?? 0,
      operationStartDate: dto.operationStartDate.slice(0, 10),
      status: dto.status || 'active',
      notes: dto.notes,
      accentColor: dto.accentColor,
    });

    return this.repo.save(entity);
  }

  async findAll(query: FindPropertiesDto) {
    const { page = 1, limit = 20, search, investorId, status, propertyType } = query;
    const qb = this.repo.createQueryBuilder('p');
    if (investorId) qb.andWhere('p.investorId = :investorId', { investorId });
    if (status) qb.andWhere('p.status = :status', { status });
    if (propertyType) qb.andWhere('p.propertyType = :propertyType', { propertyType });
    if (search) qb.andWhere('(p.name ILIKE :q OR p.code ILIKE :q)', { q: `%${search}%` });
    qb.orderBy('p.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Property not found');
    return entity;
  }

  async update(id: string, dto: UpdatePropertyDto) {
    const entity = await this.findOne(id);

    if (dto.code && dto.code !== entity.code) {
      const duplicate = await this.repo.findOne({
        where: { code: dto.code },
      });

      if (duplicate && duplicate.id !== id) {
        throw new BadRequestException('Property code already exists');
      }
    }

    if (dto.investorId) {
      const investor = await this.investorRepo.findOne({
        where: { id: dto.investorId },
      });
      if (!investor) {
        throw new BadRequestException('Investor not found');
      }
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { deleted: true };
  }

  /**
   * Bulk import properties from CSV (bypasses POST /properties DTO — rows may omit address / operation start).
   * Header row: code,name,property_type,city (property_type and city optional; default mixed / Bahrain).
   */
  async bulkImportFromCsv(csvText: string) {
    const lines = csvText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) {
      throw new BadRequestException('CSV must include a header row and at least one data row');
    }
    const delim =
      lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';
    const hcols = lines[0].split(delim).map((c) =>
      c.trim().replace(/^\ufeff/, '').toLowerCase(),
    );
    const ix = (k: string) => hcols.indexOf(k);
    const iCode = ix('code');
    const iName = ix('name');
    if (iCode < 0 || iName < 0) {
      throw new BadRequestException(
        'CSV header must include columns: code, name (optional: property_type, city)',
      );
    }
    const iType = ix('property_type');
    const iCity = ix('city');

    let created = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let r = 1; r < lines.length; r++) {
      const cols = lines[r]
        .split(delim)
        .map((c) => c.trim().replace(/^"|"$/g, ''));
      const code = cols[iCode];
      const name = cols[iName];
      if (!code || !name) {
        errors.push(`Row ${r + 1}: missing code or name`);
        continue;
      }
      const existing = await this.repo.findOne({ where: { code } });
      if (existing) {
        skipped++;
        continue;
      }
      try {
        const propertyType =
          iType >= 0 && cols[iType] ? cols[iType] : 'mixed';
        const city = iCity >= 0 && cols[iCity] ? cols[iCity] : 'Bahrain';
        const entity = this.repo.create({
          code,
          name,
          propertyType,
          city,
          status: 'active',
          ownerRentMonthly: 0,
        });
        await this.repo.save(entity);
        created++;
      } catch (e) {
        errors.push(
          `Row ${r + 1}: ${e instanceof Error ? e.message : 'save failed'}`,
        );
      }
    }

    return { created, skipped, errors };
  }
}
