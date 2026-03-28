import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { Repository } from 'typeorm';
import {
  PRODUCT_BRAND_PRIMARY,
  PRODUCT_COMPANY_NAME,
} from '../../common/product-branding';
import { Property } from '../properties/entities/property.entity';
import { AccountingService } from '../accounting/accounting.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Property)
    private readonly propRepo: Repository<Property>,
    private readonly accounting: AccountingService,
  ) {}

  private pdfToBuffer(doc: InstanceType<typeof PDFDocument>): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });
  }

  async buildPortfolioRegisterXlsx(): Promise<Buffer> {
    const items = await this.propRepo.find({
      order: { code: 'ASC' },
      take: 2000,
    });
    const wb = new ExcelJS.Workbook();
    wb.creator = PRODUCT_COMPANY_NAME;
    wb.created = new Date();
    const ws = wb.addWorksheet('Portfolio_Register', {
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    ws.columns = [
      { header: 'Code', key: 'code', width: 14 },
      { header: 'Name', key: 'name', width: 36 },
      { header: 'Type', key: 'propertyType', width: 14 },
      { header: 'City', key: 'city', width: 16 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Owner rent / mo', key: 'ownerRentMonthly', width: 16 },
    ];
    ws.getRow(1).font = { bold: true };
    for (const p of items) {
      ws.addRow({
        code: p.code,
        name: p.name,
        propertyType: p.propertyType,
        city: p.city,
        status: p.status,
        ownerRentMonthly: Number(p.ownerRentMonthly),
      });
    }
    ws.getColumn('ownerRentMonthly').numFmt = '#,##0.00';
    return Buffer.from(await wb.xlsx.writeBuffer());
  }

  async buildPortfolioRegisterPdf(): Promise<Buffer> {
    const items = await this.propRepo.find({
      order: { code: 'ASC' },
      take: 500,
    });
    const doc = new PDFDocument({
      margin: 48,
      size: 'A4',
      info: { Title: 'Portfolio register', Author: PRODUCT_COMPANY_NAME },
    });
    const bufPromise = this.pdfToBuffer(doc);
    doc.fillColor(PRODUCT_BRAND_PRIMARY).fontSize(16).text(PRODUCT_COMPANY_NAME, {
      align: 'left',
    });
    doc.moveDown(0.4);
    doc.fillColor('#475569')
      .fontSize(10)
      .text(
        `Property portfolio register · ${new Date().toISOString().slice(0, 10)}`,
      );
    doc.moveDown(1);
    doc.fillColor('#0f172a').fontSize(9);
    for (const p of items) {
      doc.text(
        `${p.code}  ·  ${p.name}  ·  ${p.propertyType}  ·  ${p.city}  ·  ${p.status}`,
        { lineGap: 2 },
      );
    }
    if (items.length === 0) {
      doc.text('No properties in register.', { lineGap: 4 });
    }
    doc.end();
    return bufPromise;
  }

  async buildTrialBalancePdf(
    from: string,
    to: string,
    propertyId?: string,
  ): Promise<Buffer> {
    const tb = await this.accounting.trialBalance(from, to, propertyId);
    const doc = new PDFDocument({
      margin: 48,
      size: 'A4',
      info: { Title: 'Trial balance', Author: PRODUCT_COMPANY_NAME },
    });
    const bufPromise = this.pdfToBuffer(doc);
    doc.fillColor(PRODUCT_BRAND_PRIMARY).fontSize(16).text(PRODUCT_COMPANY_NAME);
    doc.moveDown(0.4);
    doc.fillColor('#475569')
      .fontSize(10)
      .text(`Trial balance · ${from} to ${to}`);
    doc.moveDown(1);
    doc.fillColor('#0f172a').fontSize(8);
    doc.text(
      'Account          Debit        Credit       Net DR       Net CR',
      { continued: false },
    );
    doc.moveDown(0.3);
    for (const r of tb.rows) {
      doc.text(
        `${r.accountCode.padEnd(14)} ${r.totalDebit.toFixed(2).padStart(12)} ${r.totalCredit.toFixed(2).padStart(12)} ${r.netDebit.toFixed(2).padStart(12)} ${r.netCredit.toFixed(2).padStart(12)}`,
      );
    }
    doc.moveDown(0.5);
    doc.fontSize(9).fillColor(PRODUCT_BRAND_PRIMARY);
    doc.text(
      `Totals  DR ${tb.totalDebit.toFixed(2)}  CR ${tb.totalCredit.toFixed(2)}  Δ ${tb.difference.toFixed(2)}`,
    );
    doc.end();
    return bufPromise;
  }
}
