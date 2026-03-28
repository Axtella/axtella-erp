import { Controller, Get } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('hotel/properties')
export class PropertiesController {
  constructor(private readonly service: PropertiesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
