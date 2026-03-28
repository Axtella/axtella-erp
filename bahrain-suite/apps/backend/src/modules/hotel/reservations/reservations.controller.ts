import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import type { AuthUser } from '../../auth/types/jwt-payload.interface';
import { UserRole } from '../../auth/user-role.enum';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { FindHotelReservationsDto } from './dto/find-hotel-reservations.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';
import { HotelReservationsService } from './reservations.service';

@Controller('hotel/reservations')
@UseGuards(TenantGuard)
export class HotelReservationsController {
  constructor(private readonly service: HotelReservationsService) {}

  @Post()
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  create(
    @Body() dto: CreateHotelReservationDto,
    @Tenant() tenantId?: string,
    @CurrentUser() user?: AuthUser,
  ) {
    return this.service.create(dto, tenantId, user?.userId);
  }

  @Get()
  findAll(@Query() query: FindHotelReservationsDto, @Tenant() tenantId?: string) {
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
    @Body() dto: UpdateHotelReservationDto,
    @Tenant() tenantId?: string,
    @CurrentUser() user?: AuthUser,
  ) {
    return this.service.update(id, dto, tenantId, user?.userId);
  }
}
