import { Controller, Get } from '@nestjs/common';
import { GovernmentPaymentsService } from './government-payments.service';

@Controller('government-payments')
export class GovernmentPaymentsController {
  constructor(private readonly service: GovernmentPaymentsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
