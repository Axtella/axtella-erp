export declare class PlatformTenantModuleToggleDto {
    moduleCode: string;
    enabled: boolean;
    source?: 'plan' | 'manual' | 'country_pack';
}
export declare class SetPlatformTenantModulesDto {
    modules: PlatformTenantModuleToggleDto[];
}
