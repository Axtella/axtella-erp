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
exports.HotelRoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../../../common/utils/pagination.util");
const hotel_room_entity_1 = require("./entities/hotel-room.entity");
let HotelRoomsService = class HotelRoomsService {
    constructor(repo) {
        this.repo = repo;
    }
    create(dto, tenantId) {
        if (tenantId && tenantId !== dto.customerId)
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        return this.repo.save(this.repo.create(dto));
    }
    async findAll(query, tenantId) {
        const { page, limit } = (0, pagination_util_1.normalizePagination)(query);
        const qb = this.repo
            .createQueryBuilder('r')
            .orderBy('r.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (tenantId)
            qb.where('r.customer_id = :tenantId', { tenantId });
        if (query.propertyId)
            qb.andWhere('r.property_id = :propertyId', { propertyId: query.propertyId });
        if (query.search?.trim()) {
            qb.andWhere('r.room_no ILIKE :q', { q: `%${query.search.trim()}%` });
        }
        const [items, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.pagedResult)(items, total, page, limit);
    }
    async findOne(id, tenantId) {
        const item = await this.repo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Room not found');
        if (tenantId && item.customerId !== tenantId)
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        return item;
    }
    async update(id, dto, tenantId) {
        const item = await this.findOne(id, tenantId);
        Object.assign(item, dto);
        if (tenantId && item.customerId !== tenantId)
            throw new common_1.ForbiddenException('Tenant scope mismatch');
        return this.repo.save(item);
    }
};
exports.HotelRoomsService = HotelRoomsService;
exports.HotelRoomsService = HotelRoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_room_entity_1.HotelRoom)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelRoomsService);
//# sourceMappingURL=rooms.service.js.map