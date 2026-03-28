export declare class ZatcaOnboardingService {
    requestOtpFlowHint(): Promise<{
        step: string;
        message: string;
    }>;
    onboard(payload: any): Promise<{
        status: string;
        payload: any;
        outputs: {
            preComplianceCsid: any;
            productionCsid: any;
        };
    }>;
}
