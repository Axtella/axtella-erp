import { Controller, Get } from '@nestjs/common';
import { FoliosService } from './folios.service';

@Controller('hotel/folios')
export class FoliosController {
  constructor(private readonly service: FoliosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
