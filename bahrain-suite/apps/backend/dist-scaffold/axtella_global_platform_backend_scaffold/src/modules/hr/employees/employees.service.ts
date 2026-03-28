import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  findAll() {
    return { module: 'employees', items: [] };
  }
}
