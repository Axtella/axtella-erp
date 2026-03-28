import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoom } from './entities/hotel-room.entity';
import { HotelRoomsController } from './rooms.controller';
import { HotelRoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoom])],
  controllers: [HotelRoomsController],
  providers: [HotelRoomsService],
  exports: [HotelRoomsService, TypeOrmModule],
})
export class HotelRoomsModule {}
