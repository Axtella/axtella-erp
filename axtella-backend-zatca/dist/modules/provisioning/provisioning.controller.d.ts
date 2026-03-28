import { ProvisioningService } from './provisioning.service';
export declare class ProvisioningController {
    private readonly service;
    constructor(service: ProvisioningService);
    createWorkspace(payload: any): {
        status: string;
        payload: any;
        nextSteps: string[];
    };
}
