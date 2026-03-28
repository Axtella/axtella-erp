import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoom } from '../rooms/entities/hotel-room.entity';
import { HotelReservation } from './entities/hotel-reservation.entity';
import { HotelReservationsController } from './reservations.controller';
import { HotelReservationsService } from './reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelReservation, HotelRoom])],
  controllers: [HotelReservationsController],
  providers: [HotelReservationsService],
  exports: [HotelReservationsService],
})
export class HotelReservationsModule {}
