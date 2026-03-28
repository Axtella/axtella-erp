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
exports.CustomerEnvironment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let CustomerEnvironment = class CustomerEnvironment extends base_entity_1.AppBaseEntity {
};
exports.CustomerEnvironment = CustomerEnvironment;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], CustomerEnvironment.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'environment_key', length: 100, unique: true }),
    __metadata("design:type", String)
], CustomerEnvironment.prototype, "environmentKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'environment_type', length: 30 }),
    __metadata("design:type", String)
], CustomerEnvironment.prototype, "environmentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'app_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CustomerEnvironment.prototype, "appUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CustomerEnvironment.prototype, "apiUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deployment_status', length: 30, default: 'pending' }),
    __metadata("design:type", String)
], CustomerEnvironment.prototype, "deploymentStatus", void 0);
exports.CustomerEnvironment = CustomerEnvironment = __decorate([
    (0, typeorm_1.Entity)({ name: 'customer_environments' })
], CustomerEnvironment);
//# sourceMappingURL=customer-environment.entity.js.map