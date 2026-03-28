import { randomUUID } from 'crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { PlatformTenant } from '../entities/platform-tenant.entity';
import { PlatformCountryPack } from '../entities/platform-country-pack.entity';
import { PlatformCompliancePack } from '../entities/platform-compliance-pack.entity';
import { PlatformRoleTemplate } from '../entities/platform-role-template.entity';
import { PlatformModuleCatalog } from '../entities/platform-module-catalog.entity';
import { PlatformTenantModule } from '../entities/platform-tenant-module.entity';
import { PlatformTenantBranding } from '../entities/platform-tenant-branding.entity';
import { PlatformTenantProvisionRun } from '../entities/platform-tenant-provision-run.entity';
import { CreatePlatformTenantDto } from './dto/create-platform-tenant.dto';
import {
  PlatformTenantModuleToggleDto,
  SetPlatformTenantModulesDto,
} from './dto/set-platform-tenant-modules.dto';
import { AssignCountryPackDto } from '../packs/dto/assign-country-pack.dto';
import { AssignCompliancePackDto } from '../packs/dto/assign-compliance-pack.dto';
import { UpdatePlatformTenantBrandingDto } from './dto/update-platform-tenant-branding.dto';
import { ProvisionPlatformTenantDto } from '../provisioning/dto/provision-platform-tenant.dto';

@Injectable()
export class PlatformTenantsService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(PlatformTenant)
    private readonly tenantRepo: Repository<PlatformTenant>,
    @InjectRepository(PlatformCountryPack)
    private readonly countryPackRepo: Repository<PlatformCountryPack>,
    @InjectRepository(PlatformCompliancePack)
    private readonly compliancePackRepo: Repository<PlatformCompliancePack>,
    @InjectRepository(PlatformRoleTemplate)
    private readonly roleTemplateRepo: Repository<PlatformRoleTemplate>,
    @InjectRepository(PlatformModuleCatalog)
    private readonly moduleCatalogRepo: Repository<PlatformModuleCatalog>,
    @InjectRepository(PlatformTenantModule)
    private readonly tenantModuleRepo: Repository<PlatformTenantModule>,
    @InjectRepository(PlatformTenantBranding)
    private readonly brandingRepo: Repository<PlatformTenantBranding>,
    @InjectRepository(PlatformTenantProvisionRun)
    private readonly provisionRunRepo: Repository<PlatformTenantProvisionRun>,
  ) {}

  private normalizeCode(v: string): string {
    return v.trim().toLowerCase();
  }

  private async getTenantOrThrow(id: string): Promise<PlatformTenant> {
    const tenant = await this.tenantRepo.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Platform tenant not found');
    return tenant;
  }

  private async resolveCountryPackByCode(
    code: string,
  ): Promise<PlatformCountryPack> {
    const pack = await this.countryPackRepo.findOne({
      where: { code: code.trim().toUpperCase(), isActive: true },
    });
    if (!pack) throw new NotFoundException(`Country pack '${code}' not found`);
    return pack;
  }

  private async resolveCompliancePackByCode(
    code: string,
  ): Promise<PlatformCompliancePack> {
    const pack = await this.compliancePackRepo.findOne({
      where: { code: code.trim().toUpperCase(), isActive: true },
    });
    if (!pack) throw new NotFoundException(`Compliance pack '${code}' not found`);
    return pack;
  }

  private assertCountryMatch(
    tenantCountryCode: string,
    packCountryCode: string,
    kind: string,
  ) {
    if (
      packCountryCode !== tenantCountryCode &&
      packCountryCode !== 'GCC' &&
      tenantCountryCode !== 'GCC'
    ) {
      throw new BadRequestException(
        `${kind} country '${packCountryCode}' does not match tenant country '${tenantCountryCode}'`,
      );
    }
  }

  private async upsertTenantModuleToggles(
    tenantId: string,
    toggles: PlatformTenantModuleToggleDto[],
  ): Promise<number> {
    let updated = 0;
    for (const toggle of toggles) {
      const moduleCode = this.normalizeCode(toggle.moduleCode);
      const module = await this.moduleCatalogRepo.findOne({
        where: { code: moduleCode, isActive: true },
      });
      if (!module) {
        throw new NotFoundException(`Platform module '${toggle.moduleCode}' not found`);
      }
      let row = await this.tenantModuleRepo.findOne({
        where: { tenantId, moduleId: module.id },
      });
      if (!row) {
        row = this.tenantModuleRepo.create({
          id: randomUUID(),
          tenantId,
          moduleId: module.id,
          enabled: toggle.enabled,
          source: toggle.source ?? 'manual',
        });
      } else {
        row.enabled = toggle.enabled;
        row.source = toggle.source ?? row.source;
      }
      await this.tenantModuleRepo.save(row);
      updated += 1;
    }
    return updated;
  }

  async createTenant(dto: CreatePlatformTenantDto) {
    const code = this.normalizeCode(dto.code);
    const existing = await this.tenantRepo.findOne({ where: { code } });
    if (existing) {
      throw new ConflictException(`Tenant code '${dto.code}' already exists`);
    }

    let countryPack: PlatformCountryPack | undefined;
    if (dto.countryPackCode) {
      countryPack = await this.resolveCountryPackByCode(dto.countryPackCode);
      this.assertCountryMatch(dto.countryCode, countryPack.code, 'Country pack');
    }

    let compliancePack: PlatformCompliancePack | undefined;
    if (dto.compliancePackCode) {
      compliancePack = await this.resolveCompliancePackByCode(dto.compliancePackCode);
      this.assertCountryMatch(
        dto.countryCode,
        compliancePack.countryCode,
        'Compliance pack',
      );
    }

    let roleTemplate: PlatformRoleTemplate | undefined;
    if (dto.roleTemplateCode) {
      roleTemplate = await this.roleTemplateRepo.findOne({
        where: { code: dto.roleTemplateCode.trim().toUpperCase(), isActive: true },
      });
      if (!roleTemplate) {
        throw new NotFoundException(`Role template '${dto.roleTemplateCode}' not found`);
      }
    }

    const tenant = this.tenantRepo.create({
      id: randomUUID(),
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

    await this.brandingRepo.save(
      this.brandingRepo.create({
        tenantId: tenant.id,
        brandName: tenant.displayName,
      }),
    );

    const defaults = await this.moduleCatalogRepo.find({
      where: { isDefault: true, isActive: true },
    });
    for (const module of defaults) {
      await this.tenantModuleRepo.save(
        this.tenantModuleRepo.create({
          id: randomUUID(),
          tenantId: tenant.id,
          moduleId: module.id,
          enabled: true,
          source: 'plan',
        }),
      );
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

  async findTenant(id: string) {
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
      ? await this.moduleCatalogRepo.findBy({ id: In(moduleIds) })
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

  async setTenantModules(id: string, dto: SetPlatformTenantModulesDto) {
    await this.getTenantOrThrow(id);
    const updated = await this.upsertTenantModuleToggles(id, dto.modules ?? []);
    return { tenantId: id, updated };
  }

  async assignCountryPack(id: string, dto: AssignCountryPackDto) {
    const tenant = await this.getTenantOrThrow(id);
    const pack = await this.resolveCountryPackByCode(dto.countryPackCode);
    this.assertCountryMatch(tenant.countryCode, pack.code, 'Country pack');
    tenant.countryPackId = pack.id;
    await this.tenantRepo.save(tenant);
    return { tenantId: id, countryPackCode: pack.code };
  }

  async assignCompliancePack(id: string, dto: AssignCompliancePackDto) {
    const tenant = await this.getTenantOrThrow(id);
    const pack = await this.resolveCompliancePackByCode(dto.compliancePackCode);
    this.assertCountryMatch(tenant.countryCode, pack.countryCode, 'Compliance pack');
    tenant.compliancePackId = pack.id;
    await this.tenantRepo.save(tenant);
    return { tenantId: id, compliancePackCode: pack.code };
  }

  async updateBranding(id: string, dto: UpdatePlatformTenantBrandingDto) {
    await this.getTenantOrThrow(id);
    let branding = await this.brandingRepo.findOne({ where: { tenantId: id } });
    if (!branding) {
      branding = this.brandingRepo.create({ tenantId: id });
    }
    Object.assign(branding, dto);
    await this.brandingRepo.save(branding);
    return { tenantId: id, brandingUpdated: true };
  }

  async provisionTenant(id: string, dto: ProvisionPlatformTenantDto) {
    const tenant = await this.getTenantOrThrow(id);
    if (!tenant.countryPackId || !tenant.compliancePackId) {
      throw new BadRequestException(
        'Tenant must have both country pack and compliance pack before provisioning',
      );
    }
    const enabledRows = await this.tenantModuleRepo.find({
      where: { tenantId: id, enabled: true },
    });
    if (!enabledRows.length) {
      throw new BadRequestException(
        'Tenant must have at least one enabled module before provisioning',
      );
    }

    const includeCodes = (dto.includeModules ?? []).map((x) =>
      this.normalizeCode(x),
    );
    const moduleCatalogRows = await this.moduleCatalogRepo.findBy({
      id: In(enabledRows.map((r) => r.moduleId)),
    });
    const enabledCodes = moduleCatalogRows.map((m) => m.code);
    const requestedCodes = includeCodes.length ? includeCodes : enabledCodes;
    const run = this.provisionRunRepo.create({
      id: randomUUID(),
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
        await qr.manager.update(PlatformTenant, { id }, { status: 'provisioning' });
      }
      const summary: Record<string, unknown> = {
        modulesEnabled: requestedCodes.length,
        defaultsSeeded: dto.seedDefaults ?? true,
        tenantCode: tenant.code,
      };
      if (!run.dryRun) {
        await qr.manager.update(PlatformTenant, { id }, { status: 'active' });
      }
      await qr.manager.update(
        PlatformTenantProvisionRun,
        { id: run.id },
        {
          runStatus: 'success',
          resultSummary: summary,
          finishedAt: new Date(),
        },
      );
      await qr.commitTransaction();
      return {
        runId: run.id,
        tenantId: id,
        status: 'started',
        dryRun: run.dryRun,
      };
    } catch (error) {
      await qr.rollbackTransaction();
      await this.tenantRepo.update({ id }, { status: 'draft' });
      await this.provisionRunRepo.update(
        { id: run.id },
        {
          runStatus: 'failed',
          errorMessage: error instanceof Error ? error.message : String(error),
          finishedAt: new Date(),
        },
      );
      throw error;
    } finally {
      await qr.release();
    }
  }

  async findProvisionRuns(id: string) {
    await this.getTenantOrThrow(id);
    const items = await this.provisionRunRepo.find({
      where: { tenantId: id },
      order: { startedAt: 'DESC' },
    });
    return { items, total: items.length };
  }
}
