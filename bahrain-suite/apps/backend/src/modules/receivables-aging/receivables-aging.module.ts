import { Module } from '@nestjs/common';
import { ReceivablesAgingController } from './receivables-aging.controller';
import { ReceivablesAgingService } from './receivables-aging.service';

@Module({
  controllers: [ReceivablesAgingController],
  providers: [ReceivablesAgingService],
  exports: [ReceivablesAgingService]
})
export class ReceivablesAgingModule {}
