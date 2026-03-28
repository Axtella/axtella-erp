import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { PayrollService } from './payroll.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';

@Controller('payroll')
@Roles(UserRole.HR, UserRole.ADMIN)
export class PayrollController {
  constructor(private readonly service: PayrollService) {}

  @Post('runs/generate')
  generate(@Body() dto: CreatePayrollRunDto) {
    return this.service.generateRun(dto);
  }

  @Get('shared-allocation/preview')
  preview(@Query('month') month: string, @Query('year') year: string) {
    return this.service.previewSharedAllocation(Number(month), Number(year));
  }
}
