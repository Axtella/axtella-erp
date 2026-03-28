"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ExcelJS = __importStar(require("exceljs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const typeorm_2 = require("typeorm");
const product_branding_1 = require("../../common/product-branding");
const property_entity_1 = require("../properties/entities/property.entity");
const accounting_service_1 = require("../accounting/accounting.service");
let ReportsService = class ReportsService {
    constructor(propRepo, accounting) {
        this.propRepo = propRepo;
        this.accounting = accounting;
    }
    pdfToBuffer(doc) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            doc.on('data', (c) => chunks.push(c));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);
        });
    }
    async buildPortfolioRegisterXlsx() {
        const items = await this.propRepo.find({
            order: { code: 'ASC' },
            take: 2000,
        });
        const wb = new ExcelJS.Workbook();
        wb.creator = product_branding_1.PRODUCT_COMPANY_NAME;
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
    async buildPortfolioRegisterPdf() {
        const items = await this.propRepo.find({
            order: { code: 'ASC' },
            take: 500,
        });
        const doc = new pdfkit_1.default({
            margin: 48,
            size: 'A4',
            info: { Title: 'Portfolio register', Author: product_branding_1.PRODUCT_COMPANY_NAME },
        });
        const bufPromise = this.pdfToBuffer(doc);
        doc.fillColor(product_branding_1.PRODUCT_BRAND_PRIMARY).fontSize(16).text(product_branding_1.PRODUCT_COMPANY_NAME, {
            align: 'left',
        });
        doc.moveDown(0.4);
        doc.fillColor('#475569')
            .fontSize(10)
            .text(`Property portfolio register · ${new Date().toISOString().slice(0, 10)}`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').fontSize(9);
        for (const p of items) {
            doc.text(`${p.code}  ·  ${p.name}  ·  ${p.propertyType}  ·  ${p.city}  ·  ${p.status}`, { lineGap: 2 });
        }
        if (items.length === 0) {
            doc.text('No properties in register.', { lineGap: 4 });
        }
        doc.end();
        return bufPromise;
    }
    async buildTrialBalancePdf(from, to, propertyId) {
        const tb = await this.accounting.trialBalance(from, to, propertyId);
        const doc = new pdfkit_1.default({
            margin: 48,
            size: 'A4',
            info: { Title: 'Trial balance', Author: product_branding_1.PRODUCT_COMPANY_NAME },
        });
        const bufPromise = this.pdfToBuffer(doc);
        doc.fillColor(product_branding_1.PRODUCT_BRAND_PRIMARY).fontSize(16).text(product_branding_1.PRODUCT_COMPANY_NAME);
        doc.moveDown(0.4);
        doc.fillColor('#475569')
            .fontSize(10)
            .text(`Trial balance · ${from} to ${to}`);
        doc.moveDown(1);
        doc.fillColor('#0f172a').fontSize(8);
        doc.text('Account          Debit        Credit       Net DR       Net CR', { continued: false });
        doc.moveDown(0.3);
        for (const r of tb.rows) {
            doc.text(`${r.accountCode.padEnd(14)} ${r.totalDebit.toFixed(2).padStart(12)} ${r.totalCredit.toFixed(2).padStart(12)} ${r.netDebit.toFixed(2).padStart(12)} ${r.netCredit.toFixed(2).padStart(12)}`);
        }
        doc.moveDown(0.5);
        doc.fontSize(9).fillColor(product_branding_1.PRODUCT_BRAND_PRIMARY);
        doc.text(`Totals  DR ${tb.totalDebit.toFixed(2)}  CR ${tb.totalCredit.toFixed(2)}  Δ ${tb.difference.toFixed(2)}`);
        doc.end();
        return bufPromise;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        accounting_service_1.AccountingService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map