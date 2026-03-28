import { Module } from '@nestjs/common';
import { GovernmentPaymentsController } from './government-payments.controller';
import { GovernmentPaymentsService } from './government-payments.service';

@Module({
  controllers: [GovernmentPaymentsController],
  providers: [GovernmentPaymentsService],
  exports: [GovernmentPaymentsService]
})
export class GovernmentPaymentsModule {}
