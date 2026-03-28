import { Injectable } from '@nestjs/common';

@Injectable()
export class ZatcaOnboardingService {
  async requestOtpFlowHint() {
    return {
      step: 'otp-required',
      message: 'Generate OTP from FATOORA portal and use it within validity window for onboarding flow.'
    };
  }

  async onboard(payload: any) {
    return {
      status: 'scaffolded',
      payload,
      outputs: { preComplianceCsid: null, productionCsid: null }
    };
  }
}
