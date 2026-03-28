import { Injectable } from '@nestjs/common';

@Injectable()
export class FinancialReportsService {
  findAll() {
    return { module: 'financial-reports', items: [] };
  }
}
