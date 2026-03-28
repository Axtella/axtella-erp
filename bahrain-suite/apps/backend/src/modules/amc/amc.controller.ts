import { Controller, Get } from '@nestjs/common';
import { AmcService } from './amc.service';

@Controller('amc')
export class AmcController {
  constructor(private readonly service: AmcService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
