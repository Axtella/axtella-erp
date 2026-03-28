import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Investor } from '../investors/entities/investor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Investor])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [TypeOrmModule, PropertiesService],
})
export class PropertiesModule {}
