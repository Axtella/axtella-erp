import { Injectable } from '@nestjs/common';

@Injectable()
export class BudgetVsActualService {
  findAll() {
    return { module: 'budget-vs-actual', items: [] };
  }
}
