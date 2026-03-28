import { Injectable } from '@nestjs/common';
import { ScaffoldStatus } from '../scaffold-status.type';

@Injectable()
export class CrmCoreService {
  getScaffoldStatus(): ScaffoldStatus {
    return {
      domain: 'crm-core',
      phase: 5,
      ready: true,
      modules: [
        'leads',
        'accounts',
        'contacts',
        'opportunities',
        'quotations',
        'activities',
        'follow-up-reminders',
        'support-handoff',
      ],
      notes:
        'CRM scaffold is active. Add pipeline stage configs and quote versioning when wiring persistence.',
    };
  }
}
