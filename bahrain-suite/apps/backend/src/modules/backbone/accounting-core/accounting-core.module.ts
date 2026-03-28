import { Module } from '@nestjs/common';
import { AccountingCoreController } from './accounting-core.controller';
import { AccountingCoreService } from './accounting-core.service';

@Module({
  controllers: [AccountingCoreController],
  providers: [AccountingCoreService],
  exports: [AccountingCoreService],
})
export class AccountingCoreModule {}
