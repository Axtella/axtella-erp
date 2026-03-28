import { Controller, Get } from '@nestjs/common';
import { ChartOfAccountsService } from './chart-of-accounts.service';

@Controller('accounting/chart-of-accounts')
export class ChartOfAccountsController {
  constructor(private readonly service: ChartOfAccountsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
