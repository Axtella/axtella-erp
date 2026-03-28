import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelProperty } from './entities/hotel-property.entity';
import { HotelPropertiesController } from './properties.controller';
import { HotelPropertiesService } from './properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelProperty])],
  controllers: [HotelPropertiesController],
  providers: [HotelPropertiesService],
  exports: [HotelPropertiesService, TypeOrmModule],
})
export class HotelPropertiesModule {}
