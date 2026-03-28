import { Injectable } from '@nestjs/common';

@Injectable()
export class BankReconciliationService {
  findAll() {
    return { module: 'bank-reconciliation', items: [] };
  }
}
