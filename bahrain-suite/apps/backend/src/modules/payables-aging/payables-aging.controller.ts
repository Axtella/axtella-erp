import { Controller, Get } from '@nestjs/common';
import { PayablesAgingService } from './payables-aging.service';

@Controller('payables-aging')
export class PayablesAgingController {
  constructor(private readonly service: PayablesAgingService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
