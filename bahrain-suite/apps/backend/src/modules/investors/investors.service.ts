import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Investor } from './entities/investor.entity';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { FindInvestorsQueryDto } from './dto/find-investors-query.dto';

@Injectable()
export class InvestorsService {
  constructor(@InjectRepository(Investor) private readonly repo: Repository<Investor>) {}

  async create(dto: CreateInvestorDto) {
    const existing = await this.repo.findOne({ where: { code: dto.code } });
    if (existing) throw new ConflictException(`Investor code '${dto.code}' already exists`);
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: FindInvestorsQueryDto) {
    const { page, limit, search, sortBy, sortOrder } = query;
    const where = search ? [{ code: ILike(`%${search}%`) }, { name: ILike(`%${search}%`) }] : undefined;
    const [items, total] = await this.repo.findAndCount({ where, skip: (page - 1) * limit, take: limit, order: { [sortBy]: sortOrder } as any });
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Investor not found');
    return entity;
  }

  async update(id: string, dto: UpdateInvestorDto) {
    const entity = await this.findOne(id);
    if (dto.code && dto.code !== entity.code) {
      const existing = await this.repo.findOne({ where: { code: dto.code } });
      if (existing && existing.id !== id) throw new ConflictException(`Investor code '${dto.code}' already exists`);
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
