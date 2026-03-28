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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const property_entity_1 = require("../properties/entities/property.entity");
const cost_center_entity_1 = require("../cost-centers/entities/cost-center.entity");
const unit_type_entity_1 = require("../unit-types/entities/unit-type.entity");
let UnitsService = class UnitsService {
    constructor(repo, propertyRepo, costCenterRepo, unitTypeRepo) {
        this.repo = repo;
        this.propertyRepo = propertyRepo;
        this.costCenterRepo = costCenterRepo;
        this.unitTypeRepo = unitTypeRepo;
    }
    async create(dto) {
        const property = await this.propertyRepo.findOne({
            where: { id: dto.propertyId },
        });
        if (!property) {
            throw new common_1.BadRequestException('Property not found');
        }
        const costCenter = await this.costCenterRepo.findOne({
            where: { id: dto.costCenterId },
        });
        if (!costCenter) {
            throw new common_1.BadRequestException('Cost center not found');
        }
        if (costCenter.propertyId !== dto.propertyId) {
            throw new common_1.BadRequestException('Cost center does not belong to the selected property');
        }
        const unitType = await this.unitTypeRepo.findOne({
            where: { id: dto.unitTypeId },
        });
        if (!unitType) {
            throw new common_1.BadRequestException('Unit type not found');
        }
        const existing = await this.repo.findOne({ where: { propertyId: dto.propertyId, unitNo: dto.unitNo } });
        if (existing) {
            throw new common_1.BadRequestException('Unit number already exists in this property');
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
    async findAll(query) {
        const { page = 1, limit = 20, propertyId, costCenterId, unitTypeId, status, search } = query;
        const qb = this.repo.createQueryBuilder('u');
        if (propertyId)
            qb.andWhere('u.propertyId = :propertyId', { propertyId });
        if (costCenterId)
            qb.andWhere('u.costCenterId = :costCenterId', { costCenterId });
        if (unitTypeId)
            qb.andWhere('u.unitTypeId = :unitTypeId', { unitTypeId });
        if (status)
            qb.andWhere('u.status = :status', { status });
        if (search)
            qb.andWhere('u.unitNo ILIKE :q', { q: `%${search}%` });
        qb.orderBy('u.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Unit not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        const nextPropertyId = dto.propertyId || entity.propertyId;
        const nextCostCenterId = dto.costCenterId || entity.costCenterId;
        const nextUnitNo = dto.unitNo || entity.unitNo;
        const nextUnitTypeId = dto.unitTypeId || entity.unitTypeId;
        const property = await this.propertyRepo.findOne({
            where: { id: nextPropertyId },
        });
        if (!property) {
            throw new common_1.BadRequestException('Property not found');
        }
        const costCenter = await this.costCenterRepo.findOne({
            where: { id: nextCostCenterId },
        });
        if (!costCenter) {
            throw new common_1.BadRequestException('Cost center not found');
        }
        if (costCenter.propertyId !== nextPropertyId) {
            throw new common_1.BadRequestException('Cost center does not belong to the selected property');
        }
        const unitType = await this.unitTypeRepo.findOne({
            where: { id: nextUnitTypeId },
        });
        if (!unitType) {
            throw new common_1.BadRequestException('Unit type not found');
        }
        const duplicate = await this.repo.findOne({
            where: {
                propertyId: nextPropertyId,
                unitNo: nextUnitNo,
            },
        });
        if (duplicate && duplicate.id !== entity.id) {
            throw new common_1.BadRequestException('Unit number already exists in this property');
        }
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { deleted: true };
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(2, (0, typeorm_1.InjectRepository)(cost_center_entity_1.CostCenter)),
    __param(3, (0, typeorm_1.InjectRepository)(unit_type_entity_1.UnitType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UnitsService);
//# sourceMappingURL=units.service.js.map