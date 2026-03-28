import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { normalizePagination, pagedResult } from '../../common/utils/pagination.util';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlatformUser } from './entities/platform-user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(PlatformUser)
    private readonly repo: Repository<PlatformUser>,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists');
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: FindUsersDto) {
    const { page, limit } = normalizePagination(query);
    const qb = this.repo.createQueryBuilder('u');
    if (query.search?.trim()) {
      qb.where('u.email ILIKE :q OR u.full_name ILIKE :q', {
        q: `%${query.search.trim()}%`,
      });
    }
    qb.orderBy('u.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    const [items, total] = await qb.getManyAndCount();
    return pagedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('User not found');
    return item;
  }

  async update(id: string, dto: UpdateUserDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
}
