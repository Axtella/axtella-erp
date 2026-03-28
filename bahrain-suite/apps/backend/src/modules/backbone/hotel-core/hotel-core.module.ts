import { Module } from '@nestjs/common';
import { HotelCoreController } from './hotel-core.controller';
import { HotelCoreService } from './hotel-core.service';

@Module({
  controllers: [HotelCoreController],
  providers: [HotelCoreService],
  exports: [HotelCoreService],
})
export class HotelCoreModule {}
