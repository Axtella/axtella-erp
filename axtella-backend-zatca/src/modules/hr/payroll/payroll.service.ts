import { Injectable } from '@nestjs/common';

@Injectable()
export class PayrollService {
  findAll() {
    return { module: 'payroll', items: [] };
  }
}
