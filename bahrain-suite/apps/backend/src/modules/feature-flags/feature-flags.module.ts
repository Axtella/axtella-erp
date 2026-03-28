import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerFeatureFlag } from './entities/customer-feature-flag.entity';
import { FeatureFlagsController } from './feature-flags.controller';
import { FeatureFlagsService } from './feature-flags.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerFeatureFlag])],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagsService],
  exports: [FeatureFlagsService, TypeOrmModule],
})
export class FeatureFlagsModule {}
