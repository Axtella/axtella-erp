import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';
import { UnitTypesController } from './unit-types.controller';
import { UnitTypesService } from './unit-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnitType])],
  controllers: [UnitTypesController],
  providers: [UnitTypesService],
  exports: [TypeOrmModule, UnitTypesService],
})
export class UnitTypesModule {}
