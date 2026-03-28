"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZatcaController = void 0;
const common_1 = require("@nestjs/common");
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const create_zatca_onboarding_dto_1 = require("./dto/create-zatca-onboarding.dto");
const create_zatca_invoice_dto_1 = require("./dto/create-zatca-invoice.dto");
const zatca_config_service_1 = require("./services/zatca-config.service");
const zatca_xml_builder_service_1 = require("./services/zatca-xml-builder.service");
const zatca_onboarding_service_1 = require("./services/zatca-onboarding.service");
const zatca_compliance_service_1 = require("./services/zatca-compliance.service");
const zatca_reporting_service_1 = require("./services/zatca-reporting.service");
let ZatcaController = class ZatcaController {
    constructor(configService, xmlBuilderService, onboardingService, complianceService, reportingService) {
        this.configService = configService;
        this.xmlBuilderService = xmlBuilderService;
        this.onboardingService = onboardingService;
        this.complianceService = complianceService;
        this.reportingService = reportingService;
    }
    config() {
        return this.configService.getConfig();
    }
    otpHint() {
        return this.onboardingService.requestOtpFlowHint();
    }
    onboard(dto) {
        return this.onboardingService.onboard(dto);
    }
    buildXml(dto) {
        const xml = this.xmlBuilderService.buildInvoiceXml(dto);
        return { xml };
    }
    async compliance(dto) {
        const xml = this.xmlBuilderService.buildInvoiceXml(dto);
        return this.complianceService.validateInvoice(xml);
    }
    report(dto) {
        return this.reportingService.reportSimplifiedInvoice(dto);
    }
    clear(dto) {
        return this.reportingService.clearStandardInvoice(dto);
    }
};
exports.ZatcaController = ZatcaController;
__decorate([
    (0, common_1.Get)('config'),
    (0, permissions_decorator_1.Permissions)('zatca.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZatcaController.prototype, "config", null);
__decorate([
    (0, common_1.Get)('onboarding/otp-hint'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZatcaController.prototype, "otpHint", null);
__decorate([
    (0, common_1.Post)('onboarding'),
    (0, permissions_decorator_1.Permissions)('zatca.write'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zatca_onboarding_dto_1.CreateZatcaOnboardingDto]),
    __metadata("design:returntype", void 0)
], ZatcaController.prototype, "onboard", null);
__decorate([
    (0, common_1.Post)('invoice/xml'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zatca_invoice_dto_1.CreateZatcaInvoiceDto]),
    __metadata("design:returntype", void 0)
], ZatcaController.prototype, "buildXml", null);
__decorate([
    (0, common_1.Post)('invoice/compliance'),
    (0, permissions_decorator_1.Permissions)('zatca.write'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zatca_invoice_dto_1.CreateZatcaInvoiceDto]),
    __metadata("design:returntype", Promise)
], ZatcaController.prototype, "compliance", null);
__decorate([
    (0, common_1.Post)('invoice/report'),
    (0, permissions_decorator_1.Permissions)('zatca.write'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zatca_invoice_dto_1.CreateZatcaInvoiceDto]),
    __metadata("design:returntype", void 0)
], ZatcaController.prototype, "report", null);
__decorate([
    (0, common_1.Post)('invoice/clear'),
    (0, permissions_decorator_1.Permissions)('zatca.write'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zatca_invoice_dto_1.CreateZatcaInvoiceDto]),
    __metadata("design:returntype", void 0)
], ZatcaController.prototype, "clear", null);
exports.ZatcaController = ZatcaController = __decorate([
    (0, common_1.Controller)('accounting/zatca'),
    __metadata("design:paramtypes", [zatca_config_service_1.ZatcaConfigService,
        zatca_xml_builder_service_1.ZatcaXmlBuilderService,
        zatca_onboarding_service_1.ZatcaOnboardingService,
        zatca_compliance_service_1.ZatcaComplianceService,
        zatca_reporting_service_1.ZatcaReportingService])
], ZatcaController);
//# sourceMappingURL=zatca.controller.js.map