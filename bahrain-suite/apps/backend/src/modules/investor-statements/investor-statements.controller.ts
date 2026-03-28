import { Controller, Get } from '@nestjs/common';
import { InvestorStatementsService } from './investor-statements.service';

@Controller('investor-statements')
export class InvestorStatementsController {
  constructor(private readonly service: InvestorStatementsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
