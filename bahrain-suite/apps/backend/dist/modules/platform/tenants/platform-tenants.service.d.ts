import { DataSource, Repository } from 'typeorm';
import { PlatformTenant } from '../entities/platform-tenant.entity';
import { PlatformCountryPack } from '../entities/platform-country-pack.entity';
import { PlatformCompliancePack } from '../entities/platform-compliance-pack.entity';
import { PlatformRoleTemplate } from '../entities/platform-role-template.entity';
import { PlatformModuleCatalog } from '../entities/platform-module-catalog.entity';
import { PlatformTenantModule } from '../entities/platform-tenant-module.entity';
import { PlatformTenantBranding } from '../entities/platform-tenant-branding.entity';
import { PlatformTenantProvisionRun } from '../entities/platform-tenant-provision-run.entity';
import { CreatePlatformTenantDto } from './dto/create-platform-tenant.dto';
import { SetPlatformTenantModulesDto } from './dto/set-platform-tenant-modules.dto';
import { AssignCountryPackDto } from '../packs/dto/assign-country-pack.dto';
import { AssignCompliancePackDto } from '../packs/dto/assign-compliance-pack.dto';
import { UpdatePlatformTenantBrandingDto } from './dto/update-platform-tenant-branding.dto';
import { ProvisionPlatformTenantDto } from '../provisioning/dto/provision-platform-tenant.dto';
export declare class PlatformTenantsService {
    private readonly dataSource;
    private readonly tenantRepo;
    private readonly countryPackRepo;
    private readonly compliancePackRepo;
    private readonly roleTemplateRepo;
    private readonly moduleCatalogRepo;
    private readonly tenantModuleRepo;
    private readonly brandingRepo;
    private readonly provisionRunRepo;
    constructor(dataSource: DataSource, tenantRepo: Repository<PlatformTenant>, countryPackRepo: Repository<PlatformCountryPack>, compliancePackRepo: Repository<PlatformCompliancePack>, roleTemplateRepo: Repository<PlatformRoleTemplate>, moduleCatalogRepo: Repository<PlatformModuleCatalog>, tenantModuleRepo: Repository<PlatformTenantModule>, brandingRepo: Repository<PlatformTenantBranding>, provisionRunRepo: Repository<PlatformTenantProvisionRun>);
    private normalizeCode;
    private getTenantOrThrow;
    private resolveCountryPackByCode;
    private resolveCompliancePackByCode;
    private assertCountryMatch;
    private upsertTenantModuleToggles;
    createTenant(dto: CreatePlatformTenantDto): Promise<{
        id: string;
        code: string;
        status: string;
        countryCode: string;
        currencyCode: string;
        timezone: string;
        defaultLanguage: string;
        planCode: string;
    }>;
    findTenant(id: string): Promise<{
        countryPack: {
            code: any;
            name: any;
        };
        compliancePack: {
            code: any;
            name: any;
        };
        roleTemplate: {
            code: any;
            name: any;
        };
        branding: PlatformTenantBranding;
        modules: {
            code: string;
            name: string;
            enabled: boolean;
            source: string;
        }[];
        code: string;
        legalName: string;
        displayName: string;
        countryCode: string;
        currencyCode: string;
        timezone: string;
        defaultLanguage: string;
        planCode: string;
        status: string;
        countryPackId?: string | null;
        compliancePackId?: string | null;
        roleTemplateId?: string | null;
        settings: Record<string, unknown>;
        createdBy?: string | null;
        updatedBy?: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    setTenantModules(id: string, dto: SetPlatformTenantModulesDto): Promise<{
        tenantId: string;
        updated: number;
    }>;
    assignCountryPack(id: string, dto: AssignCountryPackDto): Promise<{
        tenantId: string;
        countryPackCode: string;
    }>;
    assignCompliancePack(id: string, dto: AssignCompliancePackDto): Promise<{
        tenantId: string;
        compliancePackCode: string;
    }>;
    updateBranding(id: string, dto: UpdatePlatformTenantBrandingDto): Promise<{
        tenantId: string;
        brandingUpdated: boolean;
    }>;
    provisionTenant(id: string, dto: ProvisionPlatformTenantDto): Promise<{
        runId: string;
        tenantId: string;
        status: string;
        dryRun: boolean;
    }>;
    findProvisionRuns(id: string): Promise<{
        items: PlatformTenantProvisionRun[];
        total: number;
    }>;
}
