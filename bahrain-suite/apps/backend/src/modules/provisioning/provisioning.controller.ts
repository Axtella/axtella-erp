import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateProvisioningRequestDto } from './dto/create-provisioning-request.dto';
import { FindProvisioningRequestsDto } from './dto/find-provisioning-requests.dto';
import { UpdateProvisioningRequestDto } from './dto/update-provisioning-request.dto';
import { ProvisioningService } from './provisioning.service';

@Controller('provisioning')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
@UseGuards(TenantGuard)
export class ProvisioningController {
  constructor(private readonly service: ProvisioningService) {}

  @Post()
  create(
    @Body() dto: CreateProvisioningRequestDto,
    @Tenant() tenantId?: string,
  ) {
    return this.service.create(dto, tenantId);
  }

  @Get()
  findAll(
    @Query() query: FindProvisioningRequestsDto,
    @Tenant() tenantId?: string,
  ) {
    return this.service.findAll(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProvisioningRequestDto) {
    return this.service.update(id, dto);
  }
}
