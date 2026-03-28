import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateZatcaOnboardingDto } from './dto/create-zatca-onboarding.dto';
import { CreateZatcaInvoiceDto } from './dto/create-zatca-invoice.dto';
import { ZatcaConfigService } from './services/zatca-config.service';
import { ZatcaXmlBuilderService } from './services/zatca-xml-builder.service';
import { ZatcaOnboardingService } from './services/zatca-onboarding.service';
import { ZatcaComplianceService } from './services/zatca-compliance.service';
import { ZatcaReportingService } from './services/zatca-reporting.service';

@Controller('accounting/zatca')
export class ZatcaController {
  constructor(
    private readonly configService: ZatcaConfigService,
    private readonly xmlBuilderService: ZatcaXmlBuilderService,
    private readonly onboardingService: ZatcaOnboardingService,
    private readonly complianceService: ZatcaComplianceService,
    private readonly reportingService: ZatcaReportingService,
  ) {}

  @Get('config')
  config() {
    return this.configService.getConfig();
  }

  @Get('onboarding/otp-hint')
  otpHint() {
    return this.onboardingService.requestOtpFlowHint();
  }

  @Post('onboarding')
  onboard(@Body() dto: CreateZatcaOnboardingDto) {
    return this.onboardingService.onboard(dto);
  }

  @Post('invoice/xml')
  buildXml(@Body() dto: CreateZatcaInvoiceDto) {
    const xml = this.xmlBuilderService.buildInvoiceXml(dto);
    return { xml };
  }

  @Post('invoice/compliance')
  async compliance(@Body() dto: CreateZatcaInvoiceDto) {
    const xml = this.xmlBuilderService.buildInvoiceXml(dto);
    return this.complianceService.validateInvoice(xml);
  }

  @Post('invoice/report')
  report(@Body() dto: CreateZatcaInvoiceDto) {
    return this.reportingService.reportSimplifiedInvoice(dto);
  }

  @Post('invoice/clear')
  clear(@Body() dto: CreateZatcaInvoiceDto) {
    return this.reportingService.clearStandardInvoice(dto);
  }
}
