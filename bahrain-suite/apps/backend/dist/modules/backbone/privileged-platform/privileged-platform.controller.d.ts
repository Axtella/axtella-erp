import { PrivilegedPlatformService } from './privileged-platform.service';
export declare class PrivilegedPlatformController {
    private readonly service;
    constructor(service: PrivilegedPlatformService);
    getStatus(): import("../scaffold-status.type").ScaffoldStatus;
}
