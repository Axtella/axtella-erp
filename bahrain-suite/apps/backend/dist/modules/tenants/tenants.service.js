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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("./entities/tenant.entity");
let TenantsService = class TenantsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) { return this.repo.save(this.repo.create(dto)); }
    async findAll(query) {
        const { page = 1, limit = 20, search, tenantType, phone, cprNo } = query;
        const qb = this.repo.createQueryBuilder('tenant');
        if (tenantType) {
            qb.andWhere('tenant.tenantType = :tenantType', {
                tenantType,
            });
        }
        if (phone) {
            qb.andWhere('tenant.phone ILIKE :phone', {
                phone: `%${phone}%`,
            });
        }
        if (cprNo) {
            qb.andWhere('tenant.cprNo ILIKE :cprNo', {
                cprNo: `%${cprNo}%`,
            });
        }
        if (search) {
            qb.andWhere(`(tenant.fullName ILIKE :search OR tenant.phone ILIKE :search OR tenant.cprNo ILIKE :search OR tenant.passportNo ILIKE :search)`, { search: `%${search}%` });
        }
        qb.orderBy('tenant.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Tenant not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { success: true };
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map