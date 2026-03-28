import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { PlatformTenantsService } from './platform-tenants.service';
import { CreatePlatformTenantDto } from './dto/create-platform-tenant.dto';
import { SetPlatformTenantModulesDto } from './dto/set-platform-tenant-modules.dto';
import { AssignCountryPackDto } from '../packs/dto/assign-country-pack.dto';
import { AssignCompliancePackDto } from '../packs/dto/assign-compliance-pack.dto';
import { UpdatePlatformTenantBrandingDto } from './dto/update-platform-tenant-branding.dto';
import { ProvisionPlatformTenantDto } from '../provisioning/dto/provision-platform-tenant.dto';

@Roles(UserRole.PLATFORM_SUPER_ADMIN)
@Controller('platform/tenants')
export class PlatformTenantsController {
  constructor(private readonly service: PlatformTenantsService) {}

  @Post()
  create(@Body() dto: CreatePlatformTenantDto) {
    return this.service.createTenant(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findTenant(id);
  }

  @Patch(':id/modules')
  setModules(@Param('id') id: string, @Body() dto: SetPlatformTenantModulesDto) {
    return this.service.setTenantModules(id, dto);
  }

  @Patch(':id/country-pack')
  setCountryPack(@Param('id') id: string, @Body() dto: AssignCountryPackDto) {
    return this.service.assignCountryPack(id, dto);
  }

  @Patch(':id/compliance-pack')
  setCompliancePack(
    @Param('id') id: string,
    @Body() dto: AssignCompliancePackDto,
  ) {
    return this.service.assignCompliancePack(id, dto);
  }

  @Patch(':id/branding')
  updateBranding(
    @Param('id') id: string,
    @Body() dto: UpdatePlatformTenantBrandingDto,
  ) {
    return this.service.updateBranding(id, dto);
  }

  @Post(':id/provision')
  provision(@Param('id') id: string, @Body() dto: ProvisionPlatformTenantDto) {
    return this.service.provisionTenant(id, dto);
  }

  @Get(':id/provision-runs')
  findProvisionRuns(@Param('id') id: string) {
    return this.service.findProvisionRuns(id);
  }
}
