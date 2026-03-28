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
exports.OperatingDaybookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("../properties/entities/property.entity");
const operating_daybook_entry_entity_1 = require("./entities/operating-daybook-entry.entity");
function num(v, fallback = 0) {
    const n = typeof v === 'string' ? Number.parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : fallback;
}
let OperatingDaybookService = class OperatingDaybookService {
    constructor(repo, propRepo) {
        this.repo = repo;
        this.propRepo = propRepo;
    }
    async findAll(query) {
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
    async create(dto) {
        const prop = await this.propRepo.findOne({ where: { id: dto.propertyId } });
        if (!prop) {
            throw new common_1.NotFoundException('Property not found');
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
        if (!withProp)
            return saved;
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
};
exports.OperatingDaybookService = OperatingDaybookService;
exports.OperatingDaybookService = OperatingDaybookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operating_daybook_entry_entity_1.OperatingDaybookEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OperatingDaybookService);
//# sourceMappingURL=operating-daybook.service.js.map