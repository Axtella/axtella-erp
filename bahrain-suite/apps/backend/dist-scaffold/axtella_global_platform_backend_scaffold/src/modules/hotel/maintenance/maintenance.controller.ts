import { Controller, Get } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';

@Controller('hotel/maintenance')
export class MaintenanceController {
  constructor(private readonly service: MaintenanceService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
