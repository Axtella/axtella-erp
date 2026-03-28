export declare class PlatformTenantProvisionRun {
    id: string;
    tenantId: string;
    runStatus: string;
    dryRun: boolean;
    requestedModules: unknown[];
    resultSummary: Record<string, unknown>;
    errorMessage?: string;
    startedAt: Date;
    finishedAt?: Date;
    createdBy?: string;
}
