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
exports.InvestorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const investor_entity_1 = require("./entities/investor.entity");
let InvestorsService = class InvestorsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { code: dto.code } });
        if (existing)
            throw new common_1.ConflictException(`Investor code '${dto.code}' already exists`);
        return this.repo.save(this.repo.create(dto));
    }
    async findAll(query) {
        const { page, limit, search, sortBy, sortOrder } = query;
        const where = search ? [{ code: (0, typeorm_2.ILike)(`%${search}%`) }, { name: (0, typeorm_2.ILike)(`%${search}%`) }] : undefined;
        const [items, total] = await this.repo.findAndCount({ where, skip: (page - 1) * limit, take: limit, order: { [sortBy]: sortOrder } });
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Investor not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        if (dto.code && dto.code !== entity.code) {
            const existing = await this.repo.findOne({ where: { code: dto.code } });
            if (existing && existing.id !== id)
                throw new common_1.ConflictException(`Investor code '${dto.code}' already exists`);
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
exports.InvestorsService = InvestorsService;
exports.InvestorsService = InvestorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(investor_entity_1.Investor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvestorsService);
//# sourceMappingURL=investors.service.js.map