import { Controller, Get } from '@nestjs/common';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getRoot() {
    return {
      name: 'Axtella Property Management Co. API',
      status: 'ok',
      basePath: '/api/v1',
      docsUrl: '/docs',
      healthLivenessUrl: '/api/v1/health',
      healthReadinessUrl: '/api/v1/health/ready',
      timestamp: new Date().toISOString(),
    };
  }
}
