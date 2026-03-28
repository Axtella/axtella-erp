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
exports.TenantSetting = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let TenantSetting = class TenantSetting extends base_entity_1.AppBaseEntity {
};
exports.TenantSetting = TenantSetting;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], TenantSetting.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_language', length: 20, default: 'en' }),
    __metadata("design:type", String)
], TenantSetting.prototype, "defaultLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'supported_languages',
        type: 'jsonb',
        default: () => '\'["en"]\'::jsonb',
    }),
    __metadata("design:type", Array)
], TenantSetting.prototype, "supportedLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_format', length: 50, default: 'YYYY-MM-DD' }),
    __metadata("design:type", String)
], TenantSetting.prototype, "dateFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_format', length: 20, default: '24h' }),
    __metadata("design:type", String)
], TenantSetting.prototype, "timeFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_format', length: 50, default: 'en-US' }),
    __metadata("design:type", String)
], TenantSetting.prototype, "numberFormat", void 0);
exports.TenantSetting = TenantSetting = __decorate([
    (0, typeorm_1.Entity)({ name: 'tenant_settings' })
], TenantSetting);
//# sourceMappingURL=tenant-setting.entity.js.map