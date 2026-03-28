import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('hotel/rooms')
export class RoomsController {
  constructor(private readonly service: RoomsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
