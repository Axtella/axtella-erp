import { Controller, Get } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';

@Controller('crm/opportunities')
export class OpportunitiesController {
  constructor(private readonly service: OpportunitiesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
