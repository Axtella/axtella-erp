import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { CreateHotelPropertyDto } from './dto/create-hotel-property.dto';
import { FindHotelPropertiesDto } from './dto/find-hotel-properties.dto';
import { UpdateHotelPropertyDto } from './dto/update-hotel-property.dto';
import { HotelPropertiesService } from './properties.service';

@Controller('hotel/properties')
@UseGuards(TenantGuard)
export class HotelPropertiesController {
  constructor(private readonly service: HotelPropertiesService) {}

  @Post()
  @Roles(UserRole.PLATFORM_SUPER_ADMIN)
  create(@Body() dto: CreateHotelPropertyDto, @Tenant() tenantId?: string) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(@Query() query: FindHotelPropertiesDto, @Tenant() tenantId?: string) {
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
    @Body() dto: UpdateHotelPropertyDto,
    @Tenant() tenantId?: string,
  ) {
    return this.service.update(id, dto, tenantId);
  }
}
