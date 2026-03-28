import { Controller, Get } from '@nestjs/common';
import { FinancialReportsService } from './financial-reports.service';

@Controller('accounting/financial-reports')
export class FinancialReportsController {
  constructor(private readonly service: FinancialReportsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
