import { Controller, Get } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';

@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly service: ApprovalsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
