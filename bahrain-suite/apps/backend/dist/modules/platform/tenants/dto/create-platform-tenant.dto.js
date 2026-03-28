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
exports.CreatePlatformTenantDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePlatformTenantDto {
}
exports.CreatePlatformTenantDto = CreatePlatformTenantDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(220),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "legalName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(220),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "displayName", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['BH', 'SA', 'AE', 'GCC']),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "countryCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "currencyCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "timezone", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['en', 'ar', 'bilingual']),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "defaultLanguage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "planCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "countryPackCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "compliancePackCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreatePlatformTenantDto.prototype, "roleTemplateCode", void 0);
//# sourceMappingURL=create-platform-tenant.dto.js.map