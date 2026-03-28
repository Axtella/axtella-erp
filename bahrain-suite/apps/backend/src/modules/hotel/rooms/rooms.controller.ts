import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { FindHotelRoomsDto } from './dto/find-hotel-rooms.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoomsService } from './rooms.service';

@Controller('hotel/rooms')
@UseGuards(TenantGuard)
export class HotelRoomsController {
  constructor(private readonly service: HotelRoomsService) {}

  @Post()
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  create(@Body() dto: CreateHotelRoomDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindHotelRoomsDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId?: string) {
    return this.service.findOne(id, tenantId);
  }

  @Patch(':id')
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateHotelRoomDto, @Tenant() tenantId?: string) {
    return this.service.update(id, dto, tenantId);
  }
}
