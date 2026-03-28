import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoaAccountHead } from './entities/coa-account-head.entity';
import { CreateCoaAccountHeadDto } from './dto/create-coa-account-head.dto';
import { UpdateCoaAccountHeadDto } from './dto/update-coa-account-head.dto';
import { FindCoaAccountHeadsDto } from './dto/find-coa-account-heads.dto';

function normCode(code: string) {
  return code.replace(/\s/g, '').toUpperCase();
}

@Injectable()
export class CoaAccountHeadsService {
  constructor(
    @InjectRepository(CoaAccountHead)
    private readonly repo: Repository<CoaAccountHead>,
  ) {}

  async create(dto: CreateCoaAccountHeadDto) {
    const accountCode = normCode(dto.accountCode);
    if (!accountCode) {
      throw new BadRequestException('accountCode is required');
    }
    const dup = await this.repo.findOne({ where: { accountCode } });
    if (dup) {
      throw new BadRequestException('An account head with this code already exists');
    }
    const entity = this.repo.create({
      accountCode,
      name: dto.name.trim(),
      accountType: dto.accountType,
      notes: dto.notes?.trim() || null,
      isActive: dto.isActive ?? true,
    });
    return this.repo.save(entity);
  }

  async findAll(query: FindCoaAccountHeadsDto) {
    const {
      page = 1,
      limit = 100,
      search,
      accountType,
      activeOnly,
    } = query;
    const qb = this.repo.createQueryBuilder('c');
    if (accountType) {
      qb.andWhere('c.accountType = :accountType', { accountType });
    }
    if (activeOnly === true) {
      qb.andWhere('c.isActive = true');
    }
    if (search?.trim()) {
      const q = `%${search.trim()}%`;
      qb.andWhere(
        '(c.accountCode ILIKE :q OR c.name ILIKE :q OR c.notes ILIKE :q)',
        { q },
      );
    }
    qb.orderBy('c.accountCode', 'ASC').skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Account head not found');
    return entity;
  }

  async update(id: string, dto: UpdateCoaAccountHeadDto) {
    const entity = await this.findOne(id);

    if (dto.accountCode !== undefined) {
      const accountCode = normCode(dto.accountCode);
      if (!accountCode) {
        throw new BadRequestException('accountCode cannot be empty');
      }
      if (accountCode !== entity.accountCode) {
        const dup = await this.repo.findOne({ where: { accountCode } });
        if (dup && dup.id !== id) {
          throw new BadRequestException('An account head with this code already exists');
        }
      }
      entity.accountCode = accountCode;
    }
    if (dto.name !== undefined) entity.name = dto.name.trim();
    if (dto.accountType !== undefined) entity.accountType = dto.accountType;
    if (dto.notes !== undefined) {
      entity.notes = dto.notes?.trim() || null;
    }
    if (dto.isActive !== undefined) entity.isActive = dto.isActive;

    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
