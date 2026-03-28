import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../properties/entities/property.entity';
import { AccountingModule } from '../accounting/accounting.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), AccountingModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
