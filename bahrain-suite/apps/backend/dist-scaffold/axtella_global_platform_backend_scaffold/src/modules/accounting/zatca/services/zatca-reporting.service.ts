import { Injectable } from '@nestjs/common';

@Injectable()
export class ZatcaReportingService {
  async reportSimplifiedInvoice(payload: any) {
    return { status: 'scaffolded', mode: 'reporting', invoiceType: payload.invoiceType };
  }

  async clearStandardInvoice(payload: any) {
    return { status: 'scaffolded', mode: 'clearance', invoiceType: payload.invoiceType };
  }
}
