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
exports.CoaAccountHeadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coa_account_head_entity_1 = require("./entities/coa-account-head.entity");
function normCode(code) {
    return code.replace(/\s/g, '').toUpperCase();
}
let CoaAccountHeadsService = class CoaAccountHeadsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const accountCode = normCode(dto.accountCode);
        if (!accountCode) {
            throw new common_1.BadRequestException('accountCode is required');
        }
        const dup = await this.repo.findOne({ where: { accountCode } });
        if (dup) {
            throw new common_1.BadRequestException('An account head with this code already exists');
        }
        const entity = this.repo.create({
            accountCode,
            name: dto.name.trim(),
            accountType: dto.accountType,
            notes: dto.notes?.trim() || null,
            isActive: dto.isActive ?? true,
        });
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { page = 1, limit = 100, search, accountType, activeOnly, } = query;
        const qb = this.repo.createQueryBuilder('c');
        if (accountType) {
            qb.andWhere('c.accountType = :accountType', { accountType });
        }
        if (activeOnly === true) {
            qb.andWhere('c.isActive = true');
        }
        if (search?.trim()) {
            const q = `%${search.trim()}%`;
            qb.andWhere('(c.accountCode ILIKE :q OR c.name ILIKE :q OR c.notes ILIKE :q)', { q });
        }
        qb.orderBy('c.accountCode', 'ASC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Account head not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        if (dto.accountCode !== undefined) {
            const accountCode = normCode(dto.accountCode);
            if (!accountCode) {
                throw new common_1.BadRequestException('accountCode cannot be empty');
            }
            if (accountCode !== entity.accountCode) {
                const dup = await this.repo.findOne({ where: { accountCode } });
                if (dup && dup.id !== id) {
                    throw new common_1.BadRequestException('An account head with this code already exists');
                }
            }
            entity.accountCode = accountCode;
        }
        if (dto.name !== undefined)
            entity.name = dto.name.trim();
        if (dto.accountType !== undefined)
            entity.accountType = dto.accountType;
        if (dto.notes !== undefined) {
            entity.notes = dto.notes?.trim() || null;
        }
        if (dto.isActive !== undefined)
            entity.isActive = dto.isActive;
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { deleted: true };
    }
};
exports.CoaAccountHeadsService = CoaAccountHeadsService;
exports.CoaAccountHeadsService = CoaAccountHeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coa_account_head_entity_1.CoaAccountHead)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoaAccountHeadsService);
//# sourceMappingURL=coa-account-heads.service.js.map