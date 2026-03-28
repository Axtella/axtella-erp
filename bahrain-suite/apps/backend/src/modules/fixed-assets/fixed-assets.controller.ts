import { Controller, Get } from '@nestjs/common';
import { FixedAssetsService } from './fixed-assets.service';

@Controller('fixed-assets')
export class FixedAssetsController {
  constructor(private readonly service: FixedAssetsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
