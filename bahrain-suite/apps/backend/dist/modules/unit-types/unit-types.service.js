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
exports.UnitTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_type_entity_1 = require("./entities/unit-type.entity");
let UnitTypesService = class UnitTypesService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { code: dto.code } });
        if (existing)
            throw new common_1.ConflictException(`Unit type code '${dto.code}' already exists`);
        return this.repo.save(this.repo.create(dto));
    }
    async findAll(query) {
        const { page, limit, category, search, sortBy, sortOrder } = query;
        const qb = this.repo.createQueryBuilder('ut');
        if (category)
            qb.andWhere('ut.category = :category', { category });
        if (search)
            qb.andWhere('(ut.code ILIKE :q OR ut.name ILIKE :q)', { q: `%${search}%` });
        qb.orderBy(`ut.${sortBy}`, sortOrder).skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Unit type not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        if (dto.code && dto.code !== entity.code) {
            const existing = await this.repo.findOne({ where: { code: dto.code } });
            if (existing && existing.id !== id)
                throw new common_1.ConflictException(`Unit type code '${dto.code}' already exists`);
        }
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { success: true };
    }
};
exports.UnitTypesService = UnitTypesService;
exports.UnitTypesService = UnitTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_type_entity_1.UnitType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnitTypesService);
//# sourceMappingURL=unit-types.service.js.map