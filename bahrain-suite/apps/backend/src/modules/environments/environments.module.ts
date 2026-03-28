import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEnvironment } from './entities/customer-environment.entity';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from './environments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEnvironment])],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
  exports: [EnvironmentsService, TypeOrmModule],
})
export class EnvironmentsModule {}
