import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { CreateHotelRoomTypeDto } from './dto/create-hotel-room-type.dto';
import { FindHotelRoomTypesDto } from './dto/find-hotel-room-types.dto';
import { UpdateHotelRoomTypeDto } from './dto/update-hotel-room-type.dto';
import { HotelRoomTypesService } from './room-types.service';

@Controller('hotel/room-types')
@UseGuards(TenantGuard)
export class HotelRoomTypesController {
  constructor(private readonly service: HotelRoomTypesService) {}

  @Post()
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  create(@Body() dto: CreateHotelRoomTypeDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindHotelRoomTypesDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId?: string) {
    return this.service.findOne(id, tenantId);
  }

  @Patch(':id')
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateHotelRoomTypeDto, @Tenant() tenantId?: string) {
    return this.service.update(id, dto, tenantId);
  }
}
