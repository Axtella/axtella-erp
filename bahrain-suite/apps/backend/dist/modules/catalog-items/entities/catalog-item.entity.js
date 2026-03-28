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
exports.CatalogItem = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const catalog_item_group_entity_1 = require("../../catalog-item-groups/entities/catalog-item-group.entity");
let CatalogItem = class CatalogItem extends base_entity_1.AppBaseEntity {
};
exports.CatalogItem = CatalogItem;
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 80 }),
    __metadata("design:type", String)
], CatalogItem.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], CatalogItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_type', length: 30, default: 'service' }),
    __metadata("design:type", String)
], CatalogItem.prototype, "itemType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_of_measure', length: 30, default: 'ea' }),
    __metadata("design:type", String)
], CatalogItem.prototype, "unitOfMeasure", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'default_price',
        type: 'numeric',
        precision: 14,
        scale: 3,
        default: 0,
    }),
    __metadata("design:type", Number)
], CatalogItem.prototype, "defaultPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], CatalogItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CatalogItem.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CatalogItem.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catalog_item_group_entity_1.CatalogItemGroup, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", catalog_item_group_entity_1.CatalogItemGroup)
], CatalogItem.prototype, "group", void 0);
exports.CatalogItem = CatalogItem = __decorate([
    (0, typeorm_1.Entity)({ name: 'catalog_items' })
], CatalogItem);
//# sourceMappingURL=catalog-item.entity.js.map