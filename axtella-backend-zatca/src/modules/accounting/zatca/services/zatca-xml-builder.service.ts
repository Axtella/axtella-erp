import { Injectable } from '@nestjs/common';
import { create } from 'xmlbuilder2';

@Injectable()
export class ZatcaXmlBuilderService {
  buildInvoiceXml(payload: any) {
    const total = (payload.lines || []).reduce((sum: number, line: any) => sum + (line.quantity * line.unitPrice), 0);
    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('Invoice')
      .ele('InvoiceNumber').txt(payload.invoiceNumber).up()
      .ele('IssueDate').txt(payload.issueDate).up()
      .ele('IssueTime').txt(payload.issueTime).up()
      .ele('InvoiceType').txt(payload.invoiceType).up()
      .ele('SellerName').txt(payload.sellerName).up()
      .ele('SellerVATNumber').txt(payload.sellerVatNumber).up()
      .ele('TotalAmount').txt(String(total)).up();
    return root.end({ prettyPrint: true });
  }
}
