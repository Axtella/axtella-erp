import { Controller, Get } from '@nestjs/common';
import { VatService } from './vat.service';

@Controller('accounting/vat')
export class VatController {
  constructor(private readonly service: VatService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
