import { Controller, Get } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('hr/payroll')
export class PayrollController {
  constructor(private readonly service: PayrollService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
