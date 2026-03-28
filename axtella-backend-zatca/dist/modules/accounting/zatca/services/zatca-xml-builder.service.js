"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZatcaXmlBuilderService = void 0;
const common_1 = require("@nestjs/common");
const xmlbuilder2_1 = require("xmlbuilder2");
let ZatcaXmlBuilderService = class ZatcaXmlBuilderService {
    buildInvoiceXml(payload) {
        const total = (payload.lines || []).reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0);
        const root = (0, xmlbuilder2_1.create)({ version: '1.0', encoding: 'UTF-8' })
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
};
exports.ZatcaXmlBuilderService = ZatcaXmlBuilderService;
exports.ZatcaXmlBuilderService = ZatcaXmlBuilderService = __decorate([
    (0, common_1.Injectable)()
], ZatcaXmlBuilderService);
//# sourceMappingURL=zatca-xml-builder.service.js.map