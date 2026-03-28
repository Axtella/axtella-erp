import { Injectable } from '@nestjs/common';
import { ScaffoldStatus } from '../scaffold-status.type';

@Injectable()
export class HrCoreService {
  getScaffoldStatus(): ScaffoldStatus {
    return {
      domain: 'hr-core',
      phase: 4,
      ready: true,
      modules: [
        'employees',
        'org-structure',
        'attendance',
        'leave',
        'payroll',
        'shifts',
        'employee-documents',
        'compliance-tracking',
      ],
      notes:
        'HR scaffold is ready. Implement payroll calendar rules and country payroll compliance adapters next.',
    };
  }
}
