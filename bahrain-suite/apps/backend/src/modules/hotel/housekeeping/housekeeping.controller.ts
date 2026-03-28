import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { CreateHotelHousekeepingTaskDto } from './dto/create-hotel-housekeeping-task.dto';
import { FindHotelHousekeepingTasksDto } from './dto/find-hotel-housekeeping-tasks.dto';
import { UpdateHotelHousekeepingTaskDto } from './dto/update-hotel-housekeeping-task.dto';
import { HotelHousekeepingService } from './housekeeping.service';

@Controller('hotel/housekeeping')
@UseGuards(TenantGuard)
export class HotelHousekeepingController {
  constructor(private readonly service: HotelHousekeepingService) {}

  @Post()
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  create(@Body() dto: CreateHotelHousekeepingTaskDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindHotelHousekeepingTasksDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId?: string) {
    return this.service.findOne(id, tenantId);
  }

  @Patch(':id')
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHotelHousekeepingTaskDto,
    @Tenant() tenantId?: string,
  ) {
    return this.service.update(id, dto, tenantId);
  }
}
