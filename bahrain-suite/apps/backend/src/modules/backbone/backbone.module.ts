import { Module } from '@nestjs/common';
import { PrivilegedPlatformModule } from './privileged-platform/privileged-platform.module';
import { HotelCoreModule } from './hotel-core/hotel-core.module';
import { AccountingCoreModule } from './accounting-core/accounting-core.module';
import { HrCoreModule } from './hr-core/hr-core.module';
import { CrmCoreModule } from './crm-core/crm-core.module';

@Module({
  imports: [
    PrivilegedPlatformModule,
    HotelCoreModule,
    AccountingCoreModule,
    HrCoreModule,
    CrmCoreModule,
  ],
})
export class BackboneModule {}
