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
exports.PlatformCountryPack = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let PlatformCountryPack = class PlatformCountryPack extends base_entity_1.AppBaseEntity {
};
exports.PlatformCountryPack = PlatformCountryPack;
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 40 }),
    __metadata("design:type", String)
], PlatformCountryPack.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], PlatformCountryPack.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], PlatformCountryPack.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], PlatformCountryPack.prototype, "isActive", void 0);
exports.PlatformCountryPack = PlatformCountryPack = __decorate([
    (0, typeorm_1.Entity)({ name: 'platform_country_packs' })
], PlatformCountryPack);
//# sourceMappingURL=platform-country-pack.entity.js.map