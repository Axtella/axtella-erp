import { Injectable } from '@nestjs/common';

@Injectable()
export class PayrollService {
  generateRun(dto: { payrollMonth: number; payrollYear: number }) {
    return {
      message: 'Payroll run generated',
      ...dto,
      allocations: [
        { employee: 'Operations Manager', abbas: 40, diamond: 35, mirage: 25 },
        { employee: 'Accountant', abbas: 34, diamond: 33, mirage: 33 },
      ],
    };
  }

  previewSharedAllocation(month: number, year: number) {
    return {
      month,
      year,
      basis: 'fixed_percentage',
      items: [],
    };
  }
}
