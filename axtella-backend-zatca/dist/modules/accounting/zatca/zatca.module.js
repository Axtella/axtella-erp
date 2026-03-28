"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZatcaModule = void 0;
const common_1 = require("@nestjs/common");
const zatca_controller_1 = require("./zatca.controller");
const zatca_config_service_1 = require("./services/zatca-config.service");
const zatca_xml_builder_service_1 = require("./services/zatca-xml-builder.service");
const zatca_onboarding_service_1 = require("./services/zatca-onboarding.service");
const zatca_compliance_service_1 = require("./services/zatca-compliance.service");
const zatca_reporting_service_1 = require("./services/zatca-reporting.service");
let ZatcaModule = class ZatcaModule {
};
exports.ZatcaModule = ZatcaModule;
exports.ZatcaModule = ZatcaModule = __decorate([
    (0, common_1.Module)({
        controllers: [zatca_controller_1.ZatcaController],
        providers: [zatca_config_service_1.ZatcaConfigService, zatca_xml_builder_service_1.ZatcaXmlBuilderService, zatca_onboarding_service_1.ZatcaOnboardingService, zatca_compliance_service_1.ZatcaComplianceService, zatca_reporting_service_1.ZatcaReportingService],
        exports: [zatca_config_service_1.ZatcaConfigService, zatca_xml_builder_service_1.ZatcaXmlBuilderService, zatca_onboarding_service_1.ZatcaOnboardingService, zatca_compliance_service_1.ZatcaComplianceService, zatca_reporting_service_1.ZatcaReportingService]
    })
], ZatcaModule);
//# sourceMappingURL=zatca.module.js.map