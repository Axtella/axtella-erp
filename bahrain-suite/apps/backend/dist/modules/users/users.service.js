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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../../common/utils/pagination.util");
const platform_user_entity_1 = require("./entities/platform-user.entity");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already exists');
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { page, limit } = (0, pagination_util_1.normalizePagination)(query);
        const qb = this.repo.createQueryBuilder('u');
        if (query.search?.trim()) {
            qb.where('u.email ILIKE :q OR u.full_name ILIKE :q', {
                q: `%${query.search.trim()}%`,
            });
        }
        qb.orderBy('u.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.pagedResult)(items, total, page, limit);
    }
    async findOne(id) {
        const item = await this.repo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('User not found');
        return item;
    }
    async update(id, dto) {
        const item = await this.findOne(id);
        Object.assign(item, dto);
        return this.repo.save(item);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(platform_user_entity_1.PlatformUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map