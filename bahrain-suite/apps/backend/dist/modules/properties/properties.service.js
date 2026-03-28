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
exports.PropertiesService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("./entities/property.entity");
const investor_entity_1 = require("../investors/entities/investor.entity");
let PropertiesService = class PropertiesService {
    constructor(repo, investorRepo) {
        this.repo = repo;
        this.investorRepo = investorRepo;
    }
    async ensureInvestor(investorId) {
        if (!investorId)
            return;
        const inv = await this.investorRepo.findOne({ where: { id: investorId } });
        if (!inv)
            throw new common_1.NotFoundException('Investor not found');
    }
    async create(dto) {
        const existing = await this.repo.findOne({ where: { code: dto.code } });
        if (existing) {
            throw new common_1.BadRequestException('Property code already exists');
        }
        if (dto.investorId) {
            const investor = await this.investorRepo.findOne({
                where: { id: dto.investorId },
            });
            if (!investor) {
                throw new common_1.BadRequestException('Investor not found');
            }
        }
        const entity = this.repo.create({
            id: (0, crypto_1.randomUUID)(),
            code: dto.code,
            name: dto.name,
            propertyType: dto.propertyType,
            address: dto.address,
            city: dto.city,
            investorId: dto.investorId,
            ownerRentMonthly: dto.ownerRentMonthly ?? 0,
            operationStartDate: dto.operationStartDate.slice(0, 10),
            status: dto.status || 'active',
            notes: dto.notes,
            accentColor: dto.accentColor,
        });
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { page = 1, limit = 20, search, investorId, status, propertyType } = query;
        const qb = this.repo.createQueryBuilder('p');
        if (investorId)
            qb.andWhere('p.investorId = :investorId', { investorId });
        if (status)
            qb.andWhere('p.status = :status', { status });
        if (propertyType)
            qb.andWhere('p.propertyType = :propertyType', { propertyType });
        if (search)
            qb.andWhere('(p.name ILIKE :q OR p.code ILIKE :q)', { q: `%${search}%` });
        qb.orderBy('p.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, limit };
    }
    async findOne(id) {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Property not found');
        return entity;
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        if (dto.code && dto.code !== entity.code) {
            const duplicate = await this.repo.findOne({
                where: { code: dto.code },
            });
            if (duplicate && duplicate.id !== id) {
                throw new common_1.BadRequestException('Property code already exists');
            }
        }
        if (dto.investorId) {
            const investor = await this.investorRepo.findOne({
                where: { id: dto.investorId },
            });
            if (!investor) {
                throw new common_1.BadRequestException('Investor not found');
            }
        }
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repo.remove(entity);
        return { deleted: true };
    }
    async bulkImportFromCsv(csvText) {
        const lines = csvText
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean);
        if (lines.length < 2) {
            throw new common_1.BadRequestException('CSV must include a header row and at least one data row');
        }
        const delim = lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';
        const hcols = lines[0].split(delim).map((c) => c.trim().replace(/^\ufeff/, '').toLowerCase());
        const ix = (k) => hcols.indexOf(k);
        const iCode = ix('code');
        const iName = ix('name');
        if (iCode < 0 || iName < 0) {
            throw new common_1.BadRequestException('CSV header must include columns: code, name (optional: property_type, city)');
        }
        const iType = ix('property_type');
        const iCity = ix('city');
        let created = 0;
        let skipped = 0;
        const errors = [];
        for (let r = 1; r < lines.length; r++) {
            const cols = lines[r]
                .split(delim)
                .map((c) => c.trim().replace(/^"|"$/g, ''));
            const code = cols[iCode];
            const name = cols[iName];
            if (!code || !name) {
                errors.push(`Row ${r + 1}: missing code or name`);
                continue;
            }
            const existing = await this.repo.findOne({ where: { code } });
            if (existing) {
                skipped++;
                continue;
            }
            try {
                const propertyType = iType >= 0 && cols[iType] ? cols[iType] : 'mixed';
                const city = iCity >= 0 && cols[iCity] ? cols[iCity] : 'Bahrain';
                const entity = this.repo.create({
                    code,
                    name,
                    propertyType,
                    city,
                    status: 'active',
                    ownerRentMonthly: 0,
                });
                await this.repo.save(entity);
                created++;
            }
            catch (e) {
                errors.push(`Row ${r + 1}: ${e instanceof Error ? e.message : 'save failed'}`);
            }
        }
        return { created, skipped, errors };
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, typeorm_1.InjectRepository)(investor_entity_1.Investor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map