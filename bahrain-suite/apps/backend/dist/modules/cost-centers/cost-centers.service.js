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
exports.CostCentersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cost_center_entity_1 = require("./entities/cost-center.entity");
const property_entity_1 = require("../properties/entities/property.entity");
let CostCentersService = class CostCentersService {
    constructor(repo, propertyRepo) {
        this.repo = repo;
        this.propertyRepo = propertyRepo;
    }
    async ensureProperty(propertyId) {
        const property = await this.propertyRepo.findOne({ where: { id: propertyId } });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
    }
    async create(dto) {
        const property = await this.propertyRepo.findOne({
            where: { id: dto.propertyId },
        });
        if (!property) {
            throw new common_1.BadRequestException('Property not found');
        }
        const existing = await this.repo.findOne({ where: { propertyId: dto.propertyId, code: dto.code } });
        if (existing) {
            throw new common_1.BadRequestException('Cost center code already exists for this property');
        }
        const entity = this.repo.create({
            ...dto,
            isActive: dto.isActive ?? true,
        });
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { page = 1, limit = 20, propertyId, costCenterType, isActive, search } = query;
        const qb = this.repo.createQueryBuilder('cc');
        if (propertyId)
            qb.andWhere('cc.propertyId = :propertyId', { propertyId });
        if (costCenterType)
            qb.andWhere('cc.costCenterType = :costCenterType', { costCenterType });
        if (typeof isActive === 'boolean')
            qb.andWhere('cc.isActive = :isActive', { isActive });
        if (search)
            qb.andWhere('(cc.name ILIKE :q OR cc.code ILIKE :q)', { q: `%${search}%` });
        qb.orderBy('cc.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Cost center not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        const nextPropertyId = dto.propertyId || entity.propertyId;
        const nextCode = dto.code || entity.code;
        if (dto.propertyId) {
            const property = await this.propertyRepo.findOne({
                where: { id: dto.propertyId },
            });
            if (!property) {
                throw new common_1.BadRequestException('Property not found');
            }
        }
        const duplicate = await this.repo.findOne({
            where: {
                propertyId: nextPropertyId,
                code: nextCode,
            },
        });
        if (duplicate && duplicate.id !== entity.id) {
            throw new common_1.BadRequestException('Cost center code already exists for this property');
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
exports.CostCentersService = CostCentersService;
exports.CostCentersService = CostCentersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cost_center_entity_1.CostCenter)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CostCentersService);
//# sourceMappingURL=cost-centers.service.js.map