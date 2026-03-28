import { Module } from '@nestjs/common';
import { EmployeeDocumentsController } from './employee-documents.controller';
import { EmployeeDocumentsService } from './employee-documents.service';

@Module({
  controllers: [EmployeeDocumentsController],
  providers: [EmployeeDocumentsService],
  exports: [EmployeeDocumentsService]
})
export class EmployeeDocumentsModule {}
