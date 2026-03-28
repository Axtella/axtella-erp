import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Get()
  @Permissions('tenants.read')
  findAll() {
    return this.service.findAll();
  }
}
