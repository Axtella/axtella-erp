import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantSetting } from './entities/tenant-setting.entity';
import { TenantSettingsController } from './tenant-settings.controller';
import { TenantSettingsService } from './tenant-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantSetting])],
  controllers: [TenantSettingsController],
  providers: [TenantSettingsService],
  exports: [TenantSettingsService, TypeOrmModule],
})
export class TenantSettingsModule {}
