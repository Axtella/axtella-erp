import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('crm/activities')
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
