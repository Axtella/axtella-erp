import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateTenantSettingDto } from './dto/create-tenant-setting.dto';
import { FindTenantSettingsDto } from './dto/find-tenant-settings.dto';
import { UpdateTenantSettingDto } from './dto/update-tenant-setting.dto';
import { TenantSettingsService } from './tenant-settings.service';

@Controller('tenant-settings')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
@UseGuards(TenantGuard)
export class TenantSettingsController {
  constructor(private readonly service: TenantSettingsService) {}

  @Post()
  create(@Body() dto: CreateTenantSettingDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindTenantSettingsDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantSettingDto) {
    return this.service.update(id, dto);
  }
}
