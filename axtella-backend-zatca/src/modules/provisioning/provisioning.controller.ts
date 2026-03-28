import { Body, Controller, Post } from '@nestjs/common';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { ProvisioningService } from './provisioning.service';

@Controller('provisioning')
export class ProvisioningController {
  constructor(private readonly service: ProvisioningService) {}

  @Post('workspace')
  @Permissions('provisioning.write')
  createWorkspace(@Body() payload: any) {
    return this.service.createWorkspace(payload);
  }
}
