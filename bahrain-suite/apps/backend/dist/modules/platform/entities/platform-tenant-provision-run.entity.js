"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformTenantProvisionRun = void 0;
const typeorm_1 = require("typeorm");
let PlatformTenantProvisionRun = class PlatformTenantProvisionRun {
};
exports.PlatformTenantProvisionRun = PlatformTenantProvisionRun;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], PlatformTenantProvisionRun.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_id', type: 'uuid' }),
    __metadata("design:type", String)
], PlatformTenantProvisionRun.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'run_status', length: 30, default: 'started' }),
    __metadata("design:type", String)
], PlatformTenantProvisionRun.prototype, "runStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dry_run', default: false }),
    __metadata("design:type", Boolean)
], PlatformTenantProvisionRun.prototype, "dryRun", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_modules', type: 'jsonb', default: () => "'[]'::jsonb" }),
    __metadata("design:type", Array)
], PlatformTenantProvisionRun.prototype, "requestedModules", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_summary', type: 'jsonb', default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], PlatformTenantProvisionRun.prototype, "resultSummary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlatformTenantProvisionRun.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], PlatformTenantProvisionRun.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finished_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], PlatformTenantProvisionRun.prototype, "finishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PlatformTenantProvisionRun.prototype, "createdBy", void 0);
exports.PlatformTenantProvisionRun = PlatformTenantProvisionRun = __decorate([
    (0, typeorm_1.Entity)({ name: 'platform_tenant_provision_runs' })
], PlatformTenantProvisionRun);
//# sourceMappingURL=platform-tenant-provision-run.entity.js.map