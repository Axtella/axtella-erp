import { Controller, Get } from '@nestjs/common';
import { QuotationsService } from './quotations.service';

@Controller('crm/quotations')
export class QuotationsController {
  constructor(private readonly service: QuotationsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
