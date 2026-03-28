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
exports.PlatformTenantsService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const platform_tenant_entity_1 = require("../entities/platform-tenant.entity");
const platform_country_pack_entity_1 = require("../entities/platform-country-pack.entity");
const platform_compliance_pack_entity_1 = require("../entities/platform-compliance-pack.entity");
const platform_role_template_entity_1 = require("../entities/platform-role-template.entity");
const platform_module_catalog_entity_1 = require("../entities/platform-module-catalog.entity");
const platform_tenant_module_entity_1 = require("../entities/platform-tenant-module.entity");
const platform_tenant_branding_entity_1 = require("../entities/platform-tenant-branding.entity");
const platform_tenant_provision_run_entity_1 = require("../entities/platform-tenant-provision-run.entity");
let PlatformTenantsService = class PlatformTenantsService {
    constructor(dataSource, tenantRepo, countryPackRepo, compliancePackRepo, roleTemplateRepo, moduleCatalogRepo, tenantModuleRepo, brandingRepo, provisionRunRepo) {
        this.dataSource = dataSource;
        this.tenantRepo = tenantRepo;
        this.countryPackRepo = countryPackRepo;
        this.compliancePackRepo = compliancePackRepo;
        this.roleTemplateRepo = roleTemplateRepo;
        this.moduleCatalogRepo = moduleCatalogRepo;
        this.tenantModuleRepo = tenantModuleRepo;
        this.brandingRepo = brandingRepo;
        this.provisionRunRepo = provisionRunRepo;
    }
    normalizeCode(v) {
        return v.trim().toLowerCase();
    }
    async getTenantOrThrow(id) {
        const tenant = await this.tenantRepo.findOne({ where: { id } });
        if (!tenant)
            throw new common_1.NotFoundException('Platform tenant not found');
        return tenant;
    }
    async resolveCountryPackByCode(code) {
        const pack = await this.countryPackRepo.findOne({
            where: { code: code.trim().toUpperCase(), isActive: true },
        });
        if (!pack)
            throw new common_1.NotFoundException(`Country pack '${code}' not found`);
        return pack;
    }
    async resolveCompliancePackByCode(code) {
        const pack = await this.compliancePackRepo.findOne({
            where: { code: code.trim().toUpperCase(), isActive: true },
        });
        if (!pack)
            throw new common_1.NotFoundException(`Compliance pack '${code}' not found`);
        return pack;
    }
    assertCountryMatch(tenantCountryCode, packCountryCode, kind) {
        if (packCountryCode !== tenantCountryCode &&
            packCountryCode !== 'GCC' &&
            tenantCountryCode !== 'GCC') {
            throw new common_1.BadRequestException(`${kind} country '${packCountryCode}' does not match tenant country '${tenantCountryCode}'`);
        }
    }
    async upsertTenantModuleToggles(tenantId, toggles) {
        let updated = 0;
        for (const toggle of toggles) {
            const moduleCode = this.normalizeCode(toggle.moduleCode);
            const module = await this.moduleCatalogRepo.findOne({
                where: { code: moduleCode, isActive: true },
            });
            if (!module) {
                throw new common_1.NotFoundException(`Platform module '${toggle.moduleCode}' not found`);
            }
            let row = await this.tenantModuleRepo.findOne({
                where: { tenantId, moduleId: module.id },
            });
            if (!row) {
                row = this.tenantModuleRepo.create({
                    id: (0, crypto_1.randomUUID)(),
                    tenantId,
                    moduleId: module.id,
                    enabled: toggle.enabled,
                    source: toggle.source ?? 'manual',
                });
            }
            else {
                row.enabled = toggle.enabled;
                row.source = toggle.source ?? row.source;
            }
            await this.tenantModuleRepo.save(row);
            updated += 1;
        }
        return updated;
    }
    async createTenant(dto) {
        const code = this.normalizeCode(dto.code);
        const existing = await this.tenantRepo.findOne({ where: { code } });
        if (existing) {
            throw new common_1.ConflictException(`Tenant code '${dto.code}' already exists`);
        }
        let countryPack;
        if (dto.countryPackCode) {
            countryPack = await this.resolveCountryPackByCode(dto.countryPackCode);
            this.assertCountryMatch(dto.countryCode, countryPack.code, 'Country pack');
        }
        let compliancePack;
        if (dto.compliancePackCode) {
            compliancePack = await this.resolveCompliancePackByCode(dto.compliancePackCode);
            this.assertCountryMatch(dto.countryCode, compliancePack.countryCode, 'Compliance pack');
        }
        let roleTemplate;
        if (dto.roleTemplateCode) {
            roleTemplate = await this.roleTemplateRepo.findOne({
                where: { code: dto.roleTemplateCode.trim().toUpperCase(), isActive: true },
            });
            if (!roleTemplate) {
                throw new common_1.NotFoundException(`Role template '${dto.roleTemplateCode}' not found`);
            }
        }
        const tenant = this.tenantRepo.create({
            id: (0, crypto_1.randomUUID)(),
            code,
            legalName: dto.legalName.trim(),
            displayName: dto.displayName.trim(),
            countryCode: dto.countryCode,
            currencyCode: dto.currencyCode.trim().toUpperCase(),
            timezone: dto.timezone.trim(),
            defaultLanguage: dto.defaultLanguage,
            planCode: dto.planCode?.trim() || 'starter',
            status: 'draft',
            countryPackId: countryPack?.id ?? null,
            compliancePackId: compliancePack?.id ?? null,
            roleTemplateId: roleTemplate?.id ?? null,
            settings: {},
        });
        await this.tenantRepo.save(tenant);
        await this.brandingRepo.save(this.brandingRepo.create({
            tenantId: tenant.id,
            brandName: tenant.displayName,
        }));
        const defaults = await this.moduleCatalogRepo.find({
            where: { isDefault: true, isActive: true },
        });
        for (const module of defaults) {
            await this.tenantModuleRepo.save(this.tenantModuleRepo.create({
                id: (0, crypto_1.randomUUID)(),
                tenantId: tenant.id,
                moduleId: module.id,
                enabled: true,
                source: 'plan',
            }));
        }
        return {
            id: tenant.id,
            code: tenant.code,
            status: tenant.status,
            countryCode: tenant.countryCode,
            currencyCode: tenant.currencyCode,
            timezone: tenant.timezone,
            defaultLanguage: tenant.defaultLanguage,
            planCode: tenant.planCode,
        };
    }
    async findTenant(id) {
        const tenant = await this.getTenantOrThrow(id);
        const [countryPack, compliancePack, roleTemplate, branding] = await Promise.all([
            tenant.countryPackId
                ? this.countryPackRepo.findOne({ where: { id: tenant.countryPackId } })
                : Promise.resolve(null),
            tenant.compliancePackId
                ? this.compliancePackRepo.findOne({ where: { id: tenant.compliancePackId } })
                : Promise.resolve(null),
            tenant.roleTemplateId
                ? this.roleTemplateRepo.findOne({ where: { id: tenant.roleTemplateId } })
                : Promise.resolve(null),
            this.brandingRepo.findOne({ where: { tenantId: tenant.id } }),
        ]);
        const rows = await this.tenantModuleRepo.find({ where: { tenantId: tenant.id } });
        const moduleIds = rows.map((r) => r.moduleId);
        const modules = moduleIds.length
            ? await this.moduleCatalogRepo.findBy({ id: (0, typeorm_2.In)(moduleIds) })
            : [];
        const byId = new Map(modules.map((m) => [m.id, m]));
        return {
            ...tenant,
            countryPack: countryPack
                ? { code: countryPack.code, name: countryPack.name }
                : null,
            compliancePack: compliancePack
                ? { code: compliancePack.code, name: compliancePack.name }
                : null,
            roleTemplate: roleTemplate
                ? { code: roleTemplate.code, name: roleTemplate.name }
                : null,
            branding,
            modules: rows.map((r) => ({
                code: byId.get(r.moduleId)?.code ?? r.moduleId,
                name: byId.get(r.moduleId)?.name ?? r.moduleId,
                enabled: r.enabled,
                source: r.source,
            })),
        };
    }
    async setTenantModules(id, dto) {
        await this.getTenantOrThrow(id);
        const updated = await this.upsertTenantModuleToggles(id, dto.modules ?? []);
        return { tenantId: id, updated };
    }
    async assignCountryPack(id, dto) {
        const tenant = await this.getTenantOrThrow(id);
        const pack = await this.resolveCountryPackByCode(dto.countryPackCode);
        this.assertCountryMatch(tenant.countryCode, pack.code, 'Country pack');
        tenant.countryPackId = pack.id;
        await this.tenantRepo.save(tenant);
        return { tenantId: id, countryPackCode: pack.code };
    }
    async assignCompliancePack(id, dto) {
        const tenant = await this.getTenantOrThrow(id);
        const pack = await this.resolveCompliancePackByCode(dto.compliancePackCode);
        this.assertCountryMatch(tenant.countryCode, pack.countryCode, 'Compliance pack');
        tenant.compliancePackId = pack.id;
        await this.tenantRepo.save(tenant);
        return { tenantId: id, compliancePackCode: pack.code };
    }
    async updateBranding(id, dto) {
        await this.getTenantOrThrow(id);
        let branding = await this.brandingRepo.findOne({ where: { tenantId: id } });
        if (!branding) {
            branding = this.brandingRepo.create({ tenantId: id });
        }
        Object.assign(branding, dto);
        await this.brandingRepo.save(branding);
        return { tenantId: id, brandingUpdated: true };
    }
    async provisionTenant(id, dto) {
        const tenant = await this.getTenantOrThrow(id);
        if (!tenant.countryPackId || !tenant.compliancePackId) {
            throw new common_1.BadRequestException('Tenant must have both country pack and compliance pack before provisioning');
        }
        const enabledRows = await this.tenantModuleRepo.find({
            where: { tenantId: id, enabled: true },
        });
        if (!enabledRows.length) {
            throw new common_1.BadRequestException('Tenant must have at least one enabled module before provisioning');
        }
        const includeCodes = (dto.includeModules ?? []).map((x) => this.normalizeCode(x));
        const moduleCatalogRows = await this.moduleCatalogRepo.findBy({
            id: (0, typeorm_2.In)(enabledRows.map((r) => r.moduleId)),
        });
        const enabledCodes = moduleCatalogRows.map((m) => m.code);
        const requestedCodes = includeCodes.length ? includeCodes : enabledCodes;
        const run = this.provisionRunRepo.create({
            id: (0, crypto_1.randomUUID)(),
            tenantId: id,
            runStatus: 'started',
            dryRun: dto.dryRun ?? false,
            requestedModules: requestedCodes,
            resultSummary: {},
            startedAt: new Date(),
        });
        await this.provisionRunRepo.save(run);
        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();
        try {
            if (!run.dryRun) {
                await qr.manager.update(platform_tenant_entity_1.PlatformTenant, { id }, { status: 'provisioning' });
            }
            const summary = {
                modulesEnabled: requestedCodes.length,
                defaultsSeeded: dto.seedDefaults ?? true,
                tenantCode: tenant.code,
            };
            if (!run.dryRun) {
                await qr.manager.update(platform_tenant_entity_1.PlatformTenant, { id }, { status: 'active' });
            }
            await qr.manager.update(platform_tenant_provision_run_entity_1.PlatformTenantProvisionRun, { id: run.id }, {
                runStatus: 'success',
                resultSummary: summary,
                finishedAt: new Date(),
            });
            await qr.commitTransaction();
            return {
                runId: run.id,
                tenantId: id,
                status: 'started',
                dryRun: run.dryRun,
            };
        }
        catch (error) {
            await qr.rollbackTransaction();
            await this.tenantRepo.update({ id }, { status: 'draft' });
            await this.provisionRunRepo.update({ id: run.id }, {
                runStatus: 'failed',
                errorMessage: error instanceof Error ? error.message : String(error),
                finishedAt: new Date(),
            });
            throw error;
        }
        finally {
            await qr.release();
        }
    }
    async findProvisionRuns(id) {
        await this.getTenantOrThrow(id);
        const items = await this.provisionRunRepo.find({
            where: { tenantId: id },
            order: { startedAt: 'DESC' },
        });
        return { items, total: items.length };
    }
};
exports.PlatformTenantsService = PlatformTenantsService;
exports.PlatformTenantsService = PlatformTenantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(platform_tenant_entity_1.PlatformTenant)),
    __param(2, (0, typeorm_1.InjectRepository)(platform_country_pack_entity_1.PlatformCountryPack)),
    __param(3, (0, typeorm_1.InjectRepository)(platform_compliance_pack_entity_1.PlatformCompliancePack)),
    __param(4, (0, typeorm_1.InjectRepository)(platform_role_template_entity_1.PlatformRoleTemplate)),
    __param(5, (0, typeorm_1.InjectRepository)(platform_module_catalog_entity_1.PlatformModuleCatalog)),
    __param(6, (0, typeorm_1.InjectRepository)(platform_tenant_module_entity_1.PlatformTenantModule)),
    __param(7, (0, typeorm_1.InjectRepository)(platform_tenant_branding_entity_1.PlatformTenantBranding)),
    __param(8, (0, typeorm_1.InjectRepository)(platform_tenant_provision_run_entity_1.PlatformTenantProvisionRun)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PlatformTenantsService);
//# sourceMappingURL=platform-tenants.service.js.map