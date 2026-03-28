export declare class CreateFeatureFlagDto {
    customerId: string;
    moduleFeatureId: string;
    isEnabled?: boolean;
    configJson?: Record<string, unknown>;
}
