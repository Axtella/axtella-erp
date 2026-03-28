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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogItemGroupsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const catalog_item_groups_service_1 = require("./catalog-item-groups.service");
const create_catalog_item_group_dto_1 = require("./dto/create-catalog-item-group.dto");
const update_catalog_item_group_dto_1 = require("./dto/update-catalog-item-group.dto");
const find_catalog_item_groups_dto_1 = require("./dto/find-catalog-item-groups.dto");
let CatalogItemGroupsController = class CatalogItemGroupsController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll(query) {
        return this.service.findAll(query);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.CatalogItemGroupsController = CatalogItemGroupsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_catalog_item_group_dto_1.CreateCatalogItemGroupDto]),
    __metadata("design:returntype", void 0)
], CatalogItemGroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_catalog_item_groups_dto_1.FindCatalogItemGroupsDto]),
    __metadata("design:returntype", void 0)
], CatalogItemGroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogItemGroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_catalog_item_group_dto_1.UpdateCatalogItemGroupDto]),
    __metadata("design:returntype", void 0)
], CatalogItemGroupsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogItemGroupsController.prototype, "remove", null);
exports.CatalogItemGroupsController = CatalogItemGroupsController = __decorate([
    (0, common_1.Controller)('catalog-item-groups'),
    __metadata("design:paramtypes", [catalog_item_groups_service_1.CatalogItemGroupsService])
], CatalogItemGroupsController);
//# sourceMappingURL=catalog-item-groups.controller.js.map