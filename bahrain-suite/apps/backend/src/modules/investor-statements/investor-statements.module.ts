import { Module } from '@nestjs/common';
import { InvestorStatementsController } from './investor-statements.controller';
import { InvestorStatementsService } from './investor-statements.service';

@Module({
  controllers: [InvestorStatementsController],
  providers: [InvestorStatementsService],
  exports: [InvestorStatementsService]
})
export class InvestorStatementsModule {}
