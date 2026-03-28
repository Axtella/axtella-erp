import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenter } from './entities/cost-center.entity';
import { CostCentersService } from './cost-centers.service';
import { CostCentersController } from './cost-centers.controller';
import { Property } from '../properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostCenter, Property])],
  controllers: [CostCentersController],
  providers: [CostCentersService],
  exports: [TypeOrmModule, CostCentersService],
})
export class CostCentersModule {}
