import { CreateZatcaOnboardingDto } from './dto/create-zatca-onboarding.dto';
import { CreateZatcaInvoiceDto } from './dto/create-zatca-invoice.dto';
import { ZatcaConfigService } from './services/zatca-config.service';
import { ZatcaXmlBuilderService } from './services/zatca-xml-builder.service';
import { ZatcaOnboardingService } from './services/zatca-onboarding.service';
import { ZatcaComplianceService } from './services/zatca-compliance.service';
import { ZatcaReportingService } from './services/zatca-reporting.service';
export declare class ZatcaController {
    private readonly configService;
    private readonly xmlBuilderService;
    private readonly onboardingService;
    private readonly complianceService;
    private readonly reportingService;
    constructor(configService: ZatcaConfigService, xmlBuilderService: ZatcaXmlBuilderService, onboardingService: ZatcaOnboardingService, complianceService: ZatcaComplianceService, reportingService: ZatcaReportingService);
    config(): {
        enabled: boolean;
        environment: string;
        baseUrl: string;
        portalUrl: string;
        timeoutMs: number;
    };
    otpHint(): Promise<{
        step: string;
        message: string;
    }>;
    onboard(dto: CreateZatcaOnboardingDto): Promise<{
        status: string;
        payload: any;
        outputs: {
            preComplianceCsid: any;
            productionCsid: any;
        };
    }>;
    buildXml(dto: CreateZatcaInvoiceDto): {
        xml: string;
    };
    compliance(dto: CreateZatcaInvoiceDto): Promise<{
        status: string;
        xmlLength: number;
        notes: string[];
    }>;
    report(dto: CreateZatcaInvoiceDto): Promise<{
        status: string;
        mode: string;
        invoiceType: any;
    }>;
    clear(dto: CreateZatcaInvoiceDto): Promise<{
        status: string;
        mode: string;
        invoiceType: any;
    }>;
}
