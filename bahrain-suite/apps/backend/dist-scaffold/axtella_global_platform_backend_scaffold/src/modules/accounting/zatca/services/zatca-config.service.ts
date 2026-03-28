import { Injectable } from '@nestjs/common';

@Injectable()
export class ZatcaConfigService {
  getConfig() {
    return {
      enabled: process.env.SAUDI_ZATCA_ENABLED === 'true',
      environment: process.env.ZATCA_ENVIRONMENT || 'sandbox',
      baseUrl: process.env.ZATCA_BASE_URL || '',
      portalUrl: process.env.ZATCA_PORTAL_URL || '',
      timeoutMs: Number(process.env.ZATCA_TIMEOUT_MS || 20000),
    };
  }
}
