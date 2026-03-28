import { Controller, Get } from '@nestjs/common';
import { GuestsService } from './guests.service';

@Controller('hotel/guests')
export class GuestsController {
  constructor(private readonly service: GuestsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
