import { Controller, Get } from '@nestjs/common';
import { ReceivablesService } from './receivables.service';

@Controller('accounting/receivables')
export class ReceivablesController {
  constructor(private readonly service: ReceivablesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
