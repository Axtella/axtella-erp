import { Controller, Get } from '@nestjs/common';
import { RoomTypesService } from './room-types.service';

@Controller('hotel/room-types')
export class RoomTypesController {
  constructor(private readonly service: RoomTypesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
