import { Injectable } from '@nestjs/common';

@Injectable()
export class ProvisioningService {
  createWorkspace(payload: any) {
    return {
      status: 'queued',
      payload,
      nextSteps: ['create tenant', 'assign modules', 'assign compliance pack', 'assign branding', 'provision environment']
    };
  }
}
