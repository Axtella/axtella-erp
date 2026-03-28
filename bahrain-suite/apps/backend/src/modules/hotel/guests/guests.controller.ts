import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { CreateHotelGuestDto } from './dto/create-hotel-guest.dto';
import { FindHotelGuestsDto } from './dto/find-hotel-guests.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';
import { HotelGuestsService } from './guests.service';

@Controller('hotel/guests')
@UseGuards(TenantGuard)
export class HotelGuestsController {
  constructor(private readonly service: HotelGuestsService) {}

  @Post()
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  create(@Body() dto: CreateHotelGuestDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindHotelGuestsDto, @Tenant() tenantId?: string) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId?: string) {
    return this.service.findOne(id, tenantId);
  }

  @Patch(':id')
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateHotelGuestDto, @Tenant() tenantId?: string) {
    return this.service.update(id, dto, tenantId);
  }
}
