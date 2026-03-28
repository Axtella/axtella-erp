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
exports.HotelPropertiesController = void 0;
const common_1 = require("@nestjs/common");
const tenant_decorator_1 = require("../../../common/decorators/tenant.decorator");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../auth/user-role.enum");
const create_hotel_property_dto_1 = require("./dto/create-hotel-property.dto");
const find_hotel_properties_dto_1 = require("./dto/find-hotel-properties.dto");
const update_hotel_property_dto_1 = require("./dto/update-hotel-property.dto");
const properties_service_1 = require("./properties.service");
let HotelPropertiesController = class HotelPropertiesController {
    constructor(service) {
        this.service = service;
    }
    create(dto, tenantId) {
        return this.service.create(dto, tenantId);
    }
    findAll(query, tenantId) {
        return this.service.findAll(query, tenantId);
    }
    findOne(id, tenantId) {
        return this.service.findOne(id, tenantId);
    }
    update(id, dto, tenantId) {
        return this.service.update(id, dto, tenantId);
    }
};
exports.HotelPropertiesController = HotelPropertiesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_property_dto_1.CreateHotelPropertyDto, String]),
    __metadata("design:returntype", void 0)
], HotelPropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_hotel_properties_dto_1.FindHotelPropertiesDto, String]),
    __metadata("design:returntype", void 0)
], HotelPropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HotelPropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_property_dto_1.UpdateHotelPropertyDto, String]),
    __metadata("design:returntype", void 0)
], HotelPropertiesController.prototype, "update", null);
exports.HotelPropertiesController = HotelPropertiesController = __decorate([
    (0, common_1.Controller)('hotel/properties'),
    (0, common_1.UseGuards)(tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [properties_service_1.HotelPropertiesService])
], HotelPropertiesController);
//# sourceMappingURL=properties.controller.js.map