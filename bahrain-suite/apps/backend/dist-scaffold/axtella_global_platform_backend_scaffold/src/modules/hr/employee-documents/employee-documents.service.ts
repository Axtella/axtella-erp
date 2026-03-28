import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeDocumentsService {
  findAll() {
    return { module: 'employee-documents', items: [] };
  }
}
