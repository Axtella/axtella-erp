import { Controller, Get } from '@nestjs/common';
import { JournalsService } from './journals.service';

@Controller('accounting/journals')
export class JournalsController {
  constructor(private readonly service: JournalsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
