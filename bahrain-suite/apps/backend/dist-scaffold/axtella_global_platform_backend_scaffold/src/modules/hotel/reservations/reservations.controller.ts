import { Controller, Get } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('hotel/reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
