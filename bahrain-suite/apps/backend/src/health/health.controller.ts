import {
  Controller,
  Get,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Public } from '../modules/auth/decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Liveness (process up; no DB check)' })
  live() {
    return {
      status: 'ok',
      service: 'axtella-property-management-api',
      check: 'liveness',
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Get('ready')
  @ApiOperation({ summary: 'Readiness (PostgreSQL ping; 503 if DB down)' })
  async ready() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'ok',
        check: 'readiness',
        database: 'up',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        check: 'readiness',
        database: 'down',
      });
    }
  }
}
