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
exports.CatalogItemGroup = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let CatalogItemGroup = class CatalogItemGroup extends base_entity_1.AppBaseEntity {
};
exports.CatalogItemGroup = CatalogItemGroup;
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 80 }),
    __metadata("design:type", String)
], CatalogItemGroup.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], CatalogItemGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CatalogItemGroup.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], CatalogItemGroup.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CatalogItemGroup.prototype, "notes", void 0);
exports.CatalogItemGroup = CatalogItemGroup = __decorate([
    (0, typeorm_1.Entity)({ name: 'catalog_item_groups' })
], CatalogItemGroup);
//# sourceMappingURL=catalog-item-group.entity.js.map