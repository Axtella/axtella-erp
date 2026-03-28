import { Controller, Get } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('crm/leads')
export class LeadsController {
  constructor(private readonly service: LeadsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
