import { Controller, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('hr/attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
