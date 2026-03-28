import { PlatformTenantsService } from './platform-tenants.service';
import { CreatePlatformTenantDto } from './dto/create-platform-tenant.dto';
import { SetPlatformTenantModulesDto } from './dto/set-platform-tenant-modules.dto';
import { AssignCountryPackDto } from '../packs/dto/assign-country-pack.dto';
import { AssignCompliancePackDto } from '../packs/dto/assign-compliance-pack.dto';
import { UpdatePlatformTenantBrandingDto } from './dto/update-platform-tenant-branding.dto';
import { ProvisionPlatformTenantDto } from '../provisioning/dto/provision-platform-tenant.dto';
export declare class PlatformTenantsController {
    private readonly service;
    constructor(service: PlatformTenantsService);
    create(dto: CreatePlatformTenantDto): Promise<{
        id: string;
        code: string;
        status: string;
        countryCode: string;
        currencyCode: string;
        timezone: string;
        defaultLanguage: string;
        planCode: string;
    }>;
    findOne(id: string): Promise<{
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
        branding: import("../entities/platform-tenant-branding.entity").PlatformTenantBranding;
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
    setModules(id: string, dto: SetPlatformTenantModulesDto): Promise<{
        tenantId: string;
        updated: number;
    }>;
    setCountryPack(id: string, dto: AssignCountryPackDto): Promise<{
        tenantId: string;
        countryPackCode: string;
    }>;
    setCompliancePack(id: string, dto: AssignCompliancePackDto): Promise<{
        tenantId: string;
        compliancePackCode: string;
    }>;
    updateBranding(id: string, dto: UpdatePlatformTenantBrandingDto): Promise<{
        tenantId: string;
        brandingUpdated: boolean;
    }>;
    provision(id: string, dto: ProvisionPlatformTenantDto): Promise<{
        runId: string;
        tenantId: string;
        status: string;
        dryRun: boolean;
    }>;
    findProvisionRuns(id: string): Promise<{
        items: import("../entities/platform-tenant-provision-run.entity").PlatformTenantProvisionRun[];
        total: number;
    }>;
}
