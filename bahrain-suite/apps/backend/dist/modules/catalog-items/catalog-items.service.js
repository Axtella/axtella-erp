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
exports.CatalogItemsService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const catalog_item_entity_1 = require("./entities/catalog-item.entity");
let CatalogItemsService = class CatalogItemsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { code: dto.code } });
        if (existing) {
            throw new common_1.ConflictException(`Catalog code '${dto.code}' already exists`);
        }
        const entity = this.repo.create({
            id: (0, crypto_1.randomUUID)(),
            code: dto.code.trim(),
            name: dto.name.trim(),
            itemType: dto.itemType?.trim() || 'service',
            unitOfMeasure: dto.unitOfMeasure?.trim() || 'ea',
            defaultPrice: dto.defaultPrice ?? 0,
            isActive: dto.isActive ?? true,
            notes: dto.notes?.trim() || undefined,
            groupId: dto.groupId ?? undefined,
        });
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { page = 1, limit = 50, search, sortBy, sortOrder } = query;
        const qb = this.repo
            .createQueryBuilder('ci')
            .leftJoinAndSelect('ci.group', 'g');
        if (search?.trim()) {
            qb.andWhere('(ci.code ILIKE :q OR ci.name ILIKE :q)', {
                q: `%${search.trim()}%`,
            });
        }
        qb.orderBy(`ci.${sortBy}`, sortOrder)
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({
            where: { id },
            relations: ['group'],
        });
        if (!entity)
            throw new common_1.NotFoundException('Catalog item not found');
        const { group, ...rest } = entity;
        return {
            ...rest,
            groupCode: group?.code ?? null,
            groupName: group?.name ?? null,
        };
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        if (dto.code !== undefined && dto.code !== entity.code) {
            const dup = await this.repo.findOne({ where: { code: dto.code } });
            if (dup && dup.id !== id) {
                throw new common_1.ConflictException(`Catalog code '${dto.code}' already exists`);
            }
        }
        if (dto.code !== undefined)
            entity.code = dto.code.trim();
        if (dto.name !== undefined)
            entity.name = dto.name.trim();
        if (dto.itemType !== undefined)
            entity.itemType = dto.itemType.trim() || 'service';
        if (dto.unitOfMeasure !== undefined) {
            entity.unitOfMeasure = dto.unitOfMeasure.trim() || 'ea';
        }
        if (dto.defaultPrice !== undefined)
            entity.defaultPrice = dto.defaultPrice;
        if (dto.isActive !== undefined)
            entity.isActive = dto.isActive;
        if (dto.notes !== undefined) {
            entity.notes = dto.notes?.trim() || undefined;
        }
        if (dto.groupId !== undefined) {
            entity.groupId = dto.groupId ?? null;
        }
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { deleted: true };
    }
};
exports.CatalogItemsService = CatalogItemsService;
exports.CatalogItemsService = CatalogItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(catalog_item_entity_1.CatalogItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatalogItemsService);
//# sourceMappingURL=catalog-items.service.js.map