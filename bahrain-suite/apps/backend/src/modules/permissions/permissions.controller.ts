import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { FindPermissionsDto } from './dto/find-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
@UseGuards(TenantGuard)
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: FindPermissionsDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.service.update(id, dto);
  }
}
