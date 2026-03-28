import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { FindEnvironmentsDto } from './dto/find-environments.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnvironmentsService } from './environments.service';

@Controller('environments')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
@UseGuards(TenantGuard)
export class EnvironmentsController {
  constructor(private readonly service: EnvironmentsService) {}

  @Post()
  create(@Body() dto: CreateEnvironmentDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindEnvironmentsDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEnvironmentDto) {
    return this.service.update(id, dto);
  }
}
