import { Controller, Get } from '@nestjs/common';
import { LeaveService } from './leave.service';

@Controller('hr/leave')
export class LeaveController {
  constructor(private readonly service: LeaveService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
