import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';
import { FindAttendanceDto } from './dto/find-attendance.dto';

const READ = [
  UserRole.ADMIN,
  UserRole.ACCOUNTANT,
  UserRole.HR,
  UserRole.DEVELOPER,
  UserRole.STAFF,
] as const;

@ApiTags('attendance')
@ApiBearerAuth('access-token')
@Controller('attendance')
@Roles(...READ)
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Get()
  @ApiOperation({ summary: 'List attendance records (filters optional)' })
  list(@Query() query: FindAttendanceDto) {
    return this.service.findAll(query);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Record attendance / time entry' })
  create(@Body() dto: CreateAttendanceRecordDto) {
    return this.service.create(dto);
  }
}
