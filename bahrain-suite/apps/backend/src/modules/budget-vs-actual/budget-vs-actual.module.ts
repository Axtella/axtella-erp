import { Module } from '@nestjs/common';
import { BudgetVsActualController } from './budget-vs-actual.controller';
import { BudgetVsActualService } from './budget-vs-actual.service';

@Module({
  controllers: [BudgetVsActualController],
  providers: [BudgetVsActualService],
  exports: [BudgetVsActualService]
})
export class BudgetVsActualModule {}
