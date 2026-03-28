import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { Roles as RoleDecorator } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRolesDto } from './dto/find-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
@RoleDecorator(UserRole.PLATFORM_SUPER_ADMIN)
@UseGuards(TenantGuard)
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: FindRolesDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.service.update(id, dto);
  }
}
