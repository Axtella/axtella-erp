import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { OperatingDaybookEntry } from './entities/operating-daybook-entry.entity';
import { CreateOperatingDaybookEntryDto } from './dto/create-operating-daybook-entry.dto';
import { FindOperatingDaybookDto } from './dto/find-operating-daybook.dto';

function num(v: unknown, fallback = 0): number {
  const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

@Injectable()
export class OperatingDaybookService {
  constructor(
    @InjectRepository(OperatingDaybookEntry)
    private readonly repo: Repository<OperatingDaybookEntry>,
    @InjectRepository(Property)
    private readonly propRepo: Repository<Property>,
  ) {}

  async findAll(query: FindOperatingDaybookDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const qb = this.repo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.property', 'p')
      .orderBy('e.entryDate', 'DESC')
      .addOrderBy('e.createdAt', 'DESC');

    if (query.propertyId) {
      qb.andWhere('e.propertyId = :pid', { pid: query.propertyId });
    }
    if (query.from) {
      qb.andWhere('e.entryDate >= :from', { from: query.from });
    }
    if (query.to) {
      qb.andWhere('e.entryDate <= :to', { to: query.to });
    }

    const [rows, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = rows.map((e) => ({
      id: e.id,
      propertyId: e.propertyId,
      propertyName: e.property?.name ?? '',
      propertyCode: e.property?.code ?? '',
      unitId: e.unitId,
      entryDate: e.entryDate,
      voucherNo: e.voucherNo,
      accountCategory: e.accountCategory,
      description: e.description,
      reference: e.reference,
      paymentChannel: e.paymentChannel,
      bankAccountHint: e.bankAccountHint,
      debit: num(e.debit),
      credit: num(e.credit),
      approved: e.approved,
      approvedBy: e.approvedBy,
      approvalDate: e.approvalDate,
      remarks: e.remarks,
    }));

    return { items, total, page, limit };
  }

  async create(dto: CreateOperatingDaybookEntryDto) {
    const prop = await this.propRepo.findOne({ where: { id: dto.propertyId } });
    if (!prop) {
      throw new NotFoundException('Property not found');
    }
    const debit = num(dto.debit);
    const credit = num(dto.credit);
    const row = this.repo.create({
      propertyId: dto.propertyId,
      unitId: dto.unitId ?? null,
      entryDate: dto.entryDate.slice(0, 10),
      voucherNo: dto.voucherNo ?? null,
      accountCategory: dto.accountCategory,
      description: dto.description ?? null,
      reference: dto.reference ?? null,
      paymentChannel: dto.paymentChannel ?? null,
      bankAccountHint: dto.bankAccountHint ?? null,
      debit: debit.toFixed(3),
      credit: credit.toFixed(3),
      approved: dto.approved ?? false,
      approvedBy: dto.approvedBy ?? null,
      approvalDate: dto.approvalDate?.slice(0, 10) ?? null,
      remarks: dto.remarks ?? null,
    });
    const saved = await this.repo.save(row);
    const withProp = await this.repo.findOne({
      where: { id: saved.id },
      relations: ['property'],
    });
    if (!withProp) return saved;
    return {
      id: withProp.id,
      propertyId: withProp.propertyId,
      propertyName: withProp.property?.name ?? '',
      propertyCode: withProp.property?.code ?? '',
      unitId: withProp.unitId,
      entryDate: withProp.entryDate,
      voucherNo: withProp.voucherNo,
      accountCategory: withProp.accountCategory,
      description: withProp.description,
      reference: withProp.reference,
      paymentChannel: withProp.paymentChannel,
      bankAccountHint: withProp.bankAccountHint,
      debit: num(withProp.debit),
      credit: num(withProp.credit),
      approved: withProp.approved,
      approvedBy: withProp.approvedBy,
      approvalDate: withProp.approvalDate,
      remarks: withProp.remarks,
    };
  }
}
