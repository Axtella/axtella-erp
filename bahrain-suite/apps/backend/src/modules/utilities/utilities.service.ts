import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { Unit } from '../units/entities/unit.entity';
import { UtilityEwaAccount } from './entities/utility-ewa-account.entity';
import { UtilityEwaBill } from './entities/utility-ewa-bill.entity';
import { CreateEwaAccountDto } from './dto/create-ewa-account.dto';
import { CreateEwaBillDto } from './dto/create-ewa-bill.dto';
import { FindEwaAccountsDto } from './dto/find-ewa-accounts.dto';
import { FindEwaBillsDto } from './dto/find-ewa-bills.dto';

function num(v: unknown, fallback = 0): number {
  const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function optNum(v: unknown): number | null {
  if (v === undefined || v === null || v === '') return null;
  const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : null;
}

function optFixed(v: number | null): string | null {
  if (v === null) return null;
  return v.toFixed(3);
}

@Injectable()
export class UtilitiesService {
  constructor(
    @InjectRepository(UtilityEwaAccount)
    private readonly acctRepo: Repository<UtilityEwaAccount>,
    @InjectRepository(UtilityEwaBill)
    private readonly billRepo: Repository<UtilityEwaBill>,
    @InjectRepository(Property)
    private readonly propRepo: Repository<Property>,
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
  ) {}

  async overview(propertyId?: string) {
    const acctQb = this.acctRepo.createQueryBuilder('a');
    const billQb = this.billRepo
      .createQueryBuilder('b')
      .innerJoin('b.ewaAccount', 'a');
    const sumQb = this.billRepo
      .createQueryBuilder('b')
      .innerJoin('b.ewaAccount', 'a')
      .select(
        'COALESCE(SUM(COALESCE(b.balance_due, 0)), 0)',
        'balanceSum',
      );

    if (propertyId) {
      acctQb.andWhere('a.propertyId = :pid', { pid: propertyId });
      billQb.andWhere('a.propertyId = :pid', { pid: propertyId });
      sumQb.andWhere('a.propertyId = :pid', { pid: propertyId });
    }

    const [ewaAccountCount, ewaBillCount, sumRow] = await Promise.all([
      acctQb.getCount(),
      billQb.getCount(),
      sumQb.getRawOne<{ balanceSum: string }>(),
    ]);

    return {
      module: 'utilities',
      propertyId: propertyId ?? null,
      summary: {
        ewaAccountCount,
        ewaBillCount,
        totalBalanceDue: num(sumRow?.balanceSum, 0),
      },
    };
  }

  async findEwaAccounts(query: FindEwaAccountsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 100;
    const qb = this.acctRepo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.property', 'p')
      .leftJoinAndSelect('a.unit', 'u')
      .orderBy('p.name', 'ASC')
      .addOrderBy('a.ewaAccountNo', 'ASC');

    if (query.propertyId) {
      qb.andWhere('a.propertyId = :pid', { pid: query.propertyId });
    }

    const [rows, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = rows.map((a) => ({
      id: a.id,
      propertyId: a.propertyId,
      propertyName: a.property?.name ?? '',
      propertyCode: a.property?.code ?? '',
      unitId: a.unitId,
      unitNo: a.unit?.unitNo ?? null,
      unitLabel: a.unitLabel,
      ewaAccountNo: a.ewaAccountNo,
      notes: a.notes,
    }));

    return { items, total, page, limit };
  }

  async createEwaAccount(dto: CreateEwaAccountDto) {
    const prop = await this.propRepo.findOne({
      where: { id: dto.propertyId },
    });
    if (!prop) {
      throw new NotFoundException('Property not found');
    }
    if (dto.unitId) {
      const unit = await this.unitRepo.findOne({ where: { id: dto.unitId } });
      if (!unit) {
        throw new NotFoundException('Unit not found');
      }
      if (unit.propertyId !== dto.propertyId) {
        throw new ConflictException('Unit does not belong to this property');
      }
    }

    const row = this.acctRepo.create({
      propertyId: dto.propertyId,
      unitId: dto.unitId ?? null,
      unitLabel: dto.unitLabel?.trim() || null,
      ewaAccountNo: dto.ewaAccountNo.trim(),
      notes: dto.notes?.trim() || null,
    });

    try {
      const saved = await this.acctRepo.save(row);
      return this.mapAccountRow(saved.id);
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        (e as QueryFailedError & { driverError?: { code?: string } })
          .driverError?.code === '23505'
      ) {
        throw new ConflictException(
          'This EWA account number is already registered for the property',
        );
      }
      throw e;
    }
  }

  async findEwaBills(query: FindEwaBillsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 100;
    const qb = this.billRepo
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.ewaAccount', 'a')
      .leftJoinAndSelect('a.property', 'p')
      .leftJoinAndSelect('a.unit', 'u')
      .orderBy('b.billDate', 'DESC', 'NULLS LAST')
      .addOrderBy('b.createdAt', 'DESC');

    if (query.propertyId) {
      qb.andWhere('a.propertyId = :pid', { pid: query.propertyId });
    }
    if (query.ewaAccountId) {
      qb.andWhere('b.ewaAccountId = :aid', { aid: query.ewaAccountId });
    }
    if (query.from) {
      qb.andWhere('b.billDate >= :from', { from: query.from.slice(0, 10) });
    }
    if (query.to) {
      qb.andWhere('b.billDate <= :to', { to: query.to.slice(0, 10) });
    }

    const [rows, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = rows.map((b) => this.mapBill(b));
    return { items, total, page, limit };
  }

  async createEwaBill(dto: CreateEwaBillDto) {
    const acct = await this.acctRepo.findOne({
      where: { id: dto.ewaAccountId },
      relations: ['property', 'unit'],
    });
    if (!acct) {
      throw new NotFoundException('EWA account not found');
    }

    const net = optNum(dto.netAmount);
    const vat = optNum(dto.vatAmount);
    const total = dto.totalBill;
    const paid = num(dto.paidAmount, 0);
    const balanceDue = total - paid;

    const row = this.billRepo.create({
      ewaAccountId: dto.ewaAccountId,
      billPeriodFrom: dto.billPeriodFrom?.slice(0, 10) ?? null,
      billPeriodTo: dto.billPeriodTo?.slice(0, 10) ?? null,
      billDate: dto.billDate?.slice(0, 10) ?? null,
      billNo: dto.billNo?.trim() || null,
      capAmount: optFixed(optNum(dto.capAmount)),
      capDate: dto.capDate?.slice(0, 10) ?? null,
      netAmount: optFixed(net),
      vatAmount: optFixed(vat),
      totalBill: optFixed(total),
      paymentDueDate: dto.paymentDueDate?.slice(0, 10) ?? null,
      paidDate: dto.paidDate?.slice(0, 10) ?? null,
      paidAmount: paid.toFixed(3),
      balanceDue: optFixed(balanceDue),
      notes: dto.notes?.trim() || null,
    });

    const saved = await this.billRepo.save(row);
    const full = await this.billRepo.findOne({
      where: { id: saved.id },
      relations: ['ewaAccount', 'ewaAccount.property', 'ewaAccount.unit'],
    });
    if (!full) return saved;
    return this.mapBill(full);
  }

  private async mapAccountRow(id: string) {
    const a = await this.acctRepo.findOne({
      where: { id },
      relations: ['property', 'unit'],
    });
    if (!a) {
      throw new NotFoundException('EWA account not found');
    }
    return {
      id: a.id,
      propertyId: a.propertyId,
      propertyName: a.property?.name ?? '',
      propertyCode: a.property?.code ?? '',
      unitId: a.unitId,
      unitNo: a.unit?.unitNo ?? null,
      unitLabel: a.unitLabel,
      ewaAccountNo: a.ewaAccountNo,
      notes: a.notes,
    };
  }

  private mapBill(b: UtilityEwaBill) {
    const a = b.ewaAccount;
    return {
      id: b.id,
      ewaAccountId: b.ewaAccountId,
      propertyId: a?.propertyId ?? null,
      propertyName: a?.property?.name ?? '',
      propertyCode: a?.property?.code ?? '',
      unitNo: a?.unit?.unitNo ?? null,
      unitLabel: a?.unitLabel ?? null,
      ewaAccountNo: a?.ewaAccountNo ?? '',
      billPeriodFrom: b.billPeriodFrom,
      billPeriodTo: b.billPeriodTo,
      billDate: b.billDate,
      billNo: b.billNo,
      capAmount: b.capAmount != null ? num(b.capAmount) : null,
      capDate: b.capDate,
      netAmount: b.netAmount != null ? num(b.netAmount) : null,
      vatAmount: b.vatAmount != null ? num(b.vatAmount) : null,
      totalBill: b.totalBill != null ? num(b.totalBill) : null,
      paymentDueDate: b.paymentDueDate,
      paidDate: b.paidDate,
      paidAmount: num(b.paidAmount),
      balanceDue: b.balanceDue != null ? num(b.balanceDue) : null,
      notes: b.notes,
    };
  }
}
