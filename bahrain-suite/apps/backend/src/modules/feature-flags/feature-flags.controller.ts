import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { FindFeatureFlagsDto } from './dto/find-feature-flags.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { FeatureFlagsService } from './feature-flags.service';

@Controller('feature-flags')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
@UseGuards(TenantGuard)
export class FeatureFlagsController {
  constructor(private readonly service: FeatureFlagsService) {}

  @Post()
  create(@Body() dto: CreateFeatureFlagDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindFeatureFlagsDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeatureFlagDto) {
    return this.service.update(id, dto);
  }
}
