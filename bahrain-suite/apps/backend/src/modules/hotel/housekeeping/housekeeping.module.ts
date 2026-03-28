import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelHousekeepingController } from './housekeeping.controller';
import { HotelHousekeepingService } from './housekeeping.service';
import { HotelHousekeepingTask } from './entities/hotel-housekeeping-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelHousekeepingTask])],
  controllers: [HotelHousekeepingController],
  providers: [HotelHousekeepingService],
})
export class HotelHousekeepingModule {}
