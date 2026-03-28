"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogItemsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const catalog_item_group_entity_1 = require("../catalog-item-groups/entities/catalog-item-group.entity");
const catalog_item_entity_1 = require("./entities/catalog-item.entity");
const catalog_items_service_1 = require("./catalog-items.service");
const catalog_items_controller_1 = require("./catalog-items.controller");
let CatalogItemsModule = class CatalogItemsModule {
};
exports.CatalogItemsModule = CatalogItemsModule;
exports.CatalogItemsModule = CatalogItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([catalog_item_entity_1.CatalogItem, catalog_item_group_entity_1.CatalogItemGroup])],
        controllers: [catalog_items_controller_1.CatalogItemsController],
        providers: [catalog_items_service_1.CatalogItemsService],
        exports: [typeorm_1.TypeOrmModule, catalog_items_service_1.CatalogItemsService],
    })
], CatalogItemsModule);
//# sourceMappingURL=catalog-items.module.js.map