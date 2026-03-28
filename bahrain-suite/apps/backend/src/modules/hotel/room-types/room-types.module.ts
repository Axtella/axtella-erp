import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomType } from './entities/hotel-room-type.entity';
import { HotelRoomTypesController } from './room-types.controller';
import { HotelRoomTypesService } from './room-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoomType])],
  controllers: [HotelRoomTypesController],
  providers: [HotelRoomTypesService],
  exports: [HotelRoomTypesService, TypeOrmModule],
})
export class HotelRoomTypesModule {}
