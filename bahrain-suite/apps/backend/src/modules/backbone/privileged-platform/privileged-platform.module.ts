import { Module } from '@nestjs/common';
import { PrivilegedPlatformController } from './privileged-platform.controller';
import { PrivilegedPlatformService } from './privileged-platform.service';

@Module({
  controllers: [PrivilegedPlatformController],
  providers: [PrivilegedPlatformService],
  exports: [PrivilegedPlatformService],
})
export class PrivilegedPlatformModule {}
