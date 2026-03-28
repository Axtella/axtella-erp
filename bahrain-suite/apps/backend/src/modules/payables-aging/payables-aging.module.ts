import { Module } from '@nestjs/common';
import { PayablesAgingController } from './payables-aging.controller';
import { PayablesAgingService } from './payables-aging.service';

@Module({
  controllers: [PayablesAgingController],
  providers: [PayablesAgingService],
  exports: [PayablesAgingService]
})
export class PayablesAgingModule {}
