import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelGuest } from './entities/hotel-guest.entity';
import { HotelGuestsController } from './guests.controller';
import { HotelGuestsService } from './guests.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelGuest])],
  controllers: [HotelGuestsController],
  providers: [HotelGuestsService],
  exports: [HotelGuestsService, TypeOrmModule],
})
export class HotelGuestsModule {}
