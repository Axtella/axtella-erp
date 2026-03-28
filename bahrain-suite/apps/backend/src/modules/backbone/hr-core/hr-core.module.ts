import { Module } from '@nestjs/common';
import { HrCoreController } from './hr-core.controller';
import { HrCoreService } from './hr-core.service';

@Module({
  controllers: [HrCoreController],
  providers: [HrCoreService],
  exports: [HrCoreService],
})
export class HrCoreModule {}
