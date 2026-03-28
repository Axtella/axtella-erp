import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../properties/entities/property.entity';
import { Unit } from '../units/entities/unit.entity';
import { UtilityEwaAccount } from './entities/utility-ewa-account.entity';
import { UtilityEwaBill } from './entities/utility-ewa-bill.entity';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UtilityEwaAccount,
      UtilityEwaBill,
      Property,
      Unit,
    ]),
  ],
  controllers: [UtilitiesController],
  providers: [UtilitiesService],
  exports: [UtilitiesService],
})
export class UtilitiesModule {}
