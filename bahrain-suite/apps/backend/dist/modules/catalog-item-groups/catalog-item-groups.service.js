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
exports.CatalogItemGroupsService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const catalog_item_group_entity_1 = require("./entities/catalog-item-group.entity");
let CatalogItemGroupsService = class CatalogItemGroupsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { code: dto.code } });
        if (existing) {
            throw new common_1.ConflictException(`Group code '${dto.code}' already exists`);
        }
        const entity = this.repo.create({
            id: (0, crypto_1.randomUUID)(),
            code: dto.code.trim(),
            name: dto.name.trim(),
            sortOrder: dto.sortOrder ?? 0,
            isActive: dto.isActive ?? true,
            notes: dto.notes?.trim() || undefined,
        });
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { page = 1, limit = 50, search, sortBy, sortDirection } = query;
        const qb = this.repo.createQueryBuilder('g');
        if (search?.trim()) {
            qb.andWhere('(g.code ILIKE :q OR g.name ILIKE :q)', {
                q: `%${search.trim()}%`,
            });
        }
        qb.orderBy(`g.${sortBy}`, sortDirection)
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Catalog item group not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        if (dto.code !== undefined && dto.code !== entity.code) {
            const dup = await this.repo.findOne({ where: { code: dto.code } });
            if (dup && dup.id !== id) {
                throw new common_1.ConflictException(`Group code '${dto.code}' already exists`);
            }
        }
        if (dto.code !== undefined)
            entity.code = dto.code.trim();
        if (dto.name !== undefined)
            entity.name = dto.name.trim();
        if (dto.sortOrder !== undefined)
            entity.sortOrder = dto.sortOrder;
        if (dto.isActive !== undefined)
            entity.isActive = dto.isActive;
        if (dto.notes !== undefined) {
            entity.notes = dto.notes?.trim() || undefined;
        }
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { deleted: true };
    }
};
exports.CatalogItemGroupsService = CatalogItemGroupsService;
exports.CatalogItemGroupsService = CatalogItemGroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(catalog_item_group_entity_1.CatalogItemGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatalogItemGroupsService);
//# sourceMappingURL=catalog-item-groups.service.js.map