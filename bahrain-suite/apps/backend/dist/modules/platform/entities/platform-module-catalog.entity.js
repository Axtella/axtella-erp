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
exports.PlatformModuleCatalog = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let PlatformModuleCatalog = class PlatformModuleCatalog extends base_entity_1.AppBaseEntity {
};
exports.PlatformModuleCatalog = PlatformModuleCatalog;
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 80 }),
    __metadata("design:type", String)
], PlatformModuleCatalog.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 160 }),
    __metadata("design:type", String)
], PlatformModuleCatalog.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], PlatformModuleCatalog.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default', default: false }),
    __metadata("design:type", Boolean)
], PlatformModuleCatalog.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], PlatformModuleCatalog.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PlatformModuleCatalog.prototype, "sortOrder", void 0);
exports.PlatformModuleCatalog = PlatformModuleCatalog = __decorate([
    (0, typeorm_1.Entity)({ name: 'platform_modules' })
], PlatformModuleCatalog);
//# sourceMappingURL=platform-module-catalog.entity.js.map