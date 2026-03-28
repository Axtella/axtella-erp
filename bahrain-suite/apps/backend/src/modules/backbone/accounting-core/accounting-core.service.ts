import { Injectable } from '@nestjs/common';
import { ScaffoldStatus } from '../scaffold-status.type';

@Injectable()
export class AccountingCoreService {
  getScaffoldStatus(): ScaffoldStatus {
    return {
      domain: 'accounting-core',
      phase: 3,
      ready: true,
      modules: [
        'accounts',
        'journals',
        'ar',
        'ap',
        'tax',
        'vat-zatca',
        'bank',
        'reconciliation',
        'fixed-assets',
        'budgets',
        'investor-statements',
        'financial-reports',
      ],
      notes:
        'Accounting scaffold is active. Add ledger posting pipeline and close-cycle workflows in feature modules.',
    };
  }
}
