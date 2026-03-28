import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../properties/entities/property.entity';
import { OperatingDaybookEntry } from './entities/operating-daybook-entry.entity';
import { OperatingDaybookController } from './operating-daybook.controller';
import { OperatingDaybookService } from './operating-daybook.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperatingDaybookEntry, Property])],
  controllers: [OperatingDaybookController],
  providers: [OperatingDaybookService],
})
export class OperatingDaybookModule {}
