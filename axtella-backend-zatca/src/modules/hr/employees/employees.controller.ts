import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../../auth/decorators/permissions.decorator';
import { EmployeesService } from './employees.service';

@Controller('hr/employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Get()
  @Permissions('hr.read')
  findAll() {
    return this.service.findAll();
  }
}
