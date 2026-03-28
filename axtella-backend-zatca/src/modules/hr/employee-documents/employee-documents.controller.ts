import { Controller, Get } from '@nestjs/common';
import { EmployeeDocumentsService } from './employee-documents.service';

@Controller('hr/employee-documents')
export class EmployeeDocumentsController {
  constructor(private readonly service: EmployeeDocumentsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
