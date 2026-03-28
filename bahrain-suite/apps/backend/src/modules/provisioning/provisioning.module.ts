import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvisioningRequest } from './entities/provisioning-request.entity';
import { ProvisioningController } from './provisioning.controller';
import { ProvisioningService } from './provisioning.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProvisioningRequest])],
  controllers: [ProvisioningController],
  providers: [ProvisioningService],
  exports: [ProvisioningService, TypeOrmModule],
})
export class ProvisioningModule {}
