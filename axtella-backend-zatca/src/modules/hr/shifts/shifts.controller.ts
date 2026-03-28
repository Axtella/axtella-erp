import { Controller, Get } from '@nestjs/common';
import { ShiftsService } from './shifts.service';

@Controller('hr/shifts')
export class ShiftsController {
  constructor(private readonly service: ShiftsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
