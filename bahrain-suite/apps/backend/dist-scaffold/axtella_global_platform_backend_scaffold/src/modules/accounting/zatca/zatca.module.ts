import { Module } from '@nestjs/common';
import { ZatcaController } from './zatca.controller';
import { ZatcaConfigService } from './services/zatca-config.service';
import { ZatcaXmlBuilderService } from './services/zatca-xml-builder.service';
import { ZatcaOnboardingService } from './services/zatca-onboarding.service';
import { ZatcaComplianceService } from './services/zatca-compliance.service';
import { ZatcaReportingService } from './services/zatca-reporting.service';

@Module({
  controllers: [ZatcaController],
  providers: [ZatcaConfigService, ZatcaXmlBuilderService, ZatcaOnboardingService, ZatcaComplianceService, ZatcaReportingService],
  exports: [ZatcaConfigService, ZatcaXmlBuilderService, ZatcaOnboardingService, ZatcaComplianceService, ZatcaReportingService]
})
export class ZatcaModule {}
