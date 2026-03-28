import { Controller, Get } from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller('accounting/payables')
export class PayablesController {
  constructor(private readonly service: PayablesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
