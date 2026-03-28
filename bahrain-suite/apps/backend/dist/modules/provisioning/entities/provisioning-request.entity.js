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
exports.ProvisioningRequest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let ProvisioningRequest = class ProvisioningRequest extends base_entity_1.AppBaseEntity {
};
exports.ProvisioningRequest = ProvisioningRequest;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProvisioningRequest.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProvisioningRequest.prototype, "requestedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_type', length: 50 }),
    __metadata("design:type", String)
], ProvisioningRequest.prototype, "requestType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'draft' }),
    __metadata("design:type", String)
], ProvisioningRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_config_json', type: 'jsonb', default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], ProvisioningRequest.prototype, "requestedConfigJson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_json', type: 'jsonb', default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], ProvisioningRequest.prototype, "resultJson", void 0);
exports.ProvisioningRequest = ProvisioningRequest = __decorate([
    (0, typeorm_1.Entity)({ name: 'provisioning_requests' })
], ProvisioningRequest);
//# sourceMappingURL=provisioning-request.entity.js.map