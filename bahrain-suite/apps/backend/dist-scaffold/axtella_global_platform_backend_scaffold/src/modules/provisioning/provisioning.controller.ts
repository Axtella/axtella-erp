import { Body, Controller, Post } from '@nestjs/common';
import { ProvisioningService } from './provisioning.service';

@Controller('provisioning')
export class ProvisioningController {
  constructor(private readonly service: ProvisioningService) {}

  @Post('workspace')
  createWorkspace(@Body() payload: any) {
    return this.service.createWorkspace(payload);
  }
}
