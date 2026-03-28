import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { Property } from '../properties/entities/property.entity';
import { CostCenter } from '../cost-centers/entities/cost-center.entity';
import { UnitType } from '../unit-types/entities/unit-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Property, CostCenter, UnitType])],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [TypeOrmModule, UnitsService],
})
export class UnitsModule {}
