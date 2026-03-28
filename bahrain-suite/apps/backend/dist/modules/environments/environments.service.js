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
exports.EnvironmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../../common/utils/pagination.util");
const customer_environment_entity_1 = require("./entities/customer-environment.entity");
let EnvironmentsService = class EnvironmentsService {
    constructor(repo) {
        this.repo = repo;
    }
    create(dto, tenantId) {
        if (tenantId && tenantId !== dto.customerId) {
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        }
        return this.repo.save(this.repo.create(dto));
    }
    async findAll(query, tenantId) {
        const { page, limit } = (0, pagination_util_1.normalizePagination)(query);
        const qb = this.repo
            .createQueryBuilder('e')
            .orderBy('e.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (query.search?.trim()) {
            qb.where('e.environment_key ILIKE :q OR e.environment_type ILIKE :q', {
                q: `%${query.search.trim()}%`,
            });
        }
        if (tenantId) {
            qb.andWhere('e.customer_id = :tenantId', { tenantId });
        }
        const [items, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.pagedResult)(items, total, page, limit);
    }
    async findOne(id) {
        const item = await this.repo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Environment not found');
        return item;
    }
    async update(id, dto) {
        const item = await this.findOne(id);
        Object.assign(item, dto);
        return this.repo.save(item);
    }
};
exports.EnvironmentsService = EnvironmentsService;
exports.EnvironmentsService = EnvironmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_environment_entity_1.CustomerEnvironment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EnvironmentsService);
//# sourceMappingURL=environments.service.js.map