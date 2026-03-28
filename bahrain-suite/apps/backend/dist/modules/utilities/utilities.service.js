"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("../properties/entities/property.entity");
const unit_entity_1 = require("../units/entities/unit.entity");
const utility_ewa_account_entity_1 = require("./entities/utility-ewa-account.entity");
const utility_ewa_bill_entity_1 = require("./entities/utility-ewa-bill.entity");
function num(v, fallback = 0) {
    const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : fallback;
}
function optNum(v) {
    if (v === undefined || v === null || v === '')
        return null;
    const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : null;
}
function optFixed(v) {
    if (v === null)
        return null;
    return v.toFixed(3);
}
let UtilitiesService = class UtilitiesService {
    constructor(acctRepo, billRepo, propRepo, unitRepo) {
        this.acctRepo = acctRepo;
        this.billRepo = billRepo;
        this.propRepo = propRepo;
        this.unitRepo = unitRepo;
    }
    async overview(propertyId) {
        const acctQb = this.acctRepo.createQueryBuilder('a');
        const billQb = this.billRepo
            .createQueryBuilder('b')
            .innerJoin('b.ewaAccount', 'a');
        const sumQb = this.billRepo
            .createQueryBuilder('b')
            .innerJoin('b.ewaAccount', 'a')
            .select('COALESCE(SUM(COALESCE(b.balance_due, 0)), 0)', 'balanceSum');
        if (propertyId) {
            acctQb.andWhere('a.propertyId = :pid', { pid: propertyId });
            billQb.andWhere('a.propertyId = :pid', { pid: propertyId });
            sumQb.andWhere('a.propertyId = :pid', { pid: propertyId });
        }
        const [ewaAccountCount, ewaBillCount, sumRow] = await Promise.all([
            acctQb.getCount(),
            billQb.getCount(),
            sumQb.getRawOne(),
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
    async findEwaAccounts(query) {
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
    async createEwaAccount(dto) {
        const prop = await this.propRepo.findOne({
            where: { id: dto.propertyId },
        });
        if (!prop) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (dto.unitId) {
            const unit = await this.unitRepo.findOne({ where: { id: dto.unitId } });
            if (!unit) {
                throw new common_1.NotFoundException('Unit not found');
            }
            if (unit.propertyId !== dto.propertyId) {
                throw new common_1.ConflictException('Unit does not belong to this property');
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
        }
        catch (e) {
            if (e instanceof typeorm_2.QueryFailedError &&
                e
                    .driverError?.code === '23505') {
                throw new common_1.ConflictException('This EWA account number is already registered for the property');
            }
            throw e;
        }
    }
    async findEwaBills(query) {
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
    async createEwaBill(dto) {
        const acct = await this.acctRepo.findOne({
            where: { id: dto.ewaAccountId },
            relations: ['property', 'unit'],
        });
        if (!acct) {
            throw new common_1.NotFoundException('EWA account not found');
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
        if (!full)
            return saved;
        return this.mapBill(full);
    }
    async mapAccountRow(id) {
        const a = await this.acctRepo.findOne({
            where: { id },
            relations: ['property', 'unit'],
        });
        if (!a) {
            throw new common_1.NotFoundException('EWA account not found');
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
    mapBill(b) {
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
};
exports.UtilitiesService = UtilitiesService;
exports.UtilitiesService = UtilitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utility_ewa_account_entity_1.UtilityEwaAccount)),
    __param(1, (0, typeorm_1.InjectRepository)(utility_ewa_bill_entity_1.UtilityEwaBill)),
    __param(2, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(3, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UtilitiesService);
//# sourceMappingURL=utilities.service.js.map