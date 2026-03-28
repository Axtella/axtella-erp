import { Controller, Get } from '@nestjs/common';
import { ReceivablesAgingService } from './receivables-aging.service';

@Controller('receivables-aging')
export class ReceivablesAgingController {
  constructor(private readonly service: ReceivablesAgingService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
