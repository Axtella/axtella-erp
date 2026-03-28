import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformModuleCatalog } from './entities/platform-module-catalog.entity';
import { PlatformCountryPack } from './entities/platform-country-pack.entity';
import { PlatformCompliancePack } from './entities/platform-compliance-pack.entity';
import { PlatformRoleTemplate } from './entities/platform-role-template.entity';
import { PlatformTenant } from './entities/platform-tenant.entity';
import { PlatformTenantModule } from './entities/platform-tenant-module.entity';
import { PlatformTenantBranding } from './entities/platform-tenant-branding.entity';
import { PlatformTenantProvisionRun } from './entities/platform-tenant-provision-run.entity';
import { PlatformTenantsController } from './tenants/platform-tenants.controller';
import { PlatformTenantsService } from './tenants/platform-tenants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlatformModuleCatalog,
      PlatformCountryPack,
      PlatformCompliancePack,
      PlatformRoleTemplate,
      PlatformTenant,
      PlatformTenantModule,
      PlatformTenantBranding,
      PlatformTenantProvisionRun,
    ]),
  ],
  controllers: [PlatformTenantsController],
  providers: [PlatformTenantsService],
  exports: [PlatformTenantsService, TypeOrmModule],
})
export class PlatformModule {}
