import { Controller, Get } from '@nestjs/common';
import { HousekeepingService } from './housekeeping.service';

@Controller('hotel/housekeeping')
export class HousekeepingController {
  constructor(private readonly service: HousekeepingService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
