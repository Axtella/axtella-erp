import { Controller, Get } from '@nestjs/common';
import { BudgetVsActualService } from './budget-vs-actual.service';

@Controller('budget-vs-actual')
export class BudgetVsActualController {
  constructor(private readonly service: BudgetVsActualService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
