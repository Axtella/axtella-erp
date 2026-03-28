export declare class CreatePlatformTenantDto {
    code: string;
    legalName: string;
    displayName: string;
    countryCode: 'BH' | 'SA' | 'AE' | 'GCC';
    currencyCode: string;
    timezone: string;
    defaultLanguage: 'en' | 'ar' | 'bilingual';
    planCode?: string;
    countryPackCode?: string;
    compliancePackCode?: string;
    roleTemplateCode?: string;
}
