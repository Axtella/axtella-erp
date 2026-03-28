import { Controller, Get } from '@nestjs/common';
import { BankReconciliationService } from './bank-reconciliation.service';

@Controller('bank-reconciliation')
export class BankReconciliationController {
  constructor(private readonly service: BankReconciliationService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
